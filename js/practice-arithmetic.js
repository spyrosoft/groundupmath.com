var current_which_arithmetic;
var correct_first_number;
var correct_second_number;
var correct_answer;

var correct_messages = ['Excellent', 'Correct', 'Superb', 'Fantastic', 'Marvelous', 'Admirable', 'Ace', 'First-class', 'Dandy', 'Exquisite', 'Fantastic', 'Golden', 'Marvellous', 'Outstanding', 'Splendid', 'Magnificent', 'Smashing', 'Terrific', 'Topnotch', 'Tremendous', 'Wonderful', 'Champion', 'First-rate', 'Brilliant', 'Fabulous', 'Stunning', 'Commendable', 'Huzzah'];
var correct_message_index = 0;

var which_arithmetic_functions = {
	'addition': generate_addition_problem,
	'subtraction': generate_subtraction_problem,
	'multiplication': generate_multiplication_problem,
	'division': generate_division_problem
};

var which_arithmetic_operators = {
	'addition': '+',
	'subtraction': '-',
	'multiplication': 'x',
	'division': '&div;'
}

var arithmetic_tables_correct = {
	'addition': {
		'correct': new Array,
		'incorrect': new Array
	},
	'subtraction': {
		'correct': new Array,
		'incorrect': new Array
	},
	'multiplication': {
		'correct': new Array,
		'incorrect': new Array
	},
	'division': {
		'correct': new Array,
		'incorrect': new Array
	}
};

var red_yellow_green_range = new Array;

$( document ).ready(
	function()
	{
		initialize_red_yellow_green_range();
		generate_problem();
		$( '#user-input' ).select();
		initialize_event_listeners();
	}
);

function initialize_event_listeners()
{
	$( '#user-input' ).keyup( check_user_input );
	$( '#settings-button' ).click( toggle_settings );
	$( '#statistics-button' ).click( toggle_statistics );
	$( '.which-arithmetic' ).click( generate_problem );
}

function generate_problem()
{
	var which_arithmetic = choose_available_arithmetic();
	if ( !which_arithmetic )
	{
		alert( 'At least one type of arithmetic must be checked in Settings.' )
		return;
	}
	
	var new_problem = look_up_arithmetic_function( which_arithmetic )();
	update_problem( new_problem );
	select_arithmetic_table( which_arithmetic );
}

function choose_available_arithmetic()
{
	var which_arithmetic_elements = $( '.which-arithmetic:checked' );
	if ( which_arithmetic_elements.length === 0 )
	{
		return false;
	}
	var which_arithmetic_element_index = parseInt( Math.random() * which_arithmetic_elements.length );
	var which_arithmetic = $( which_arithmetic_elements[ which_arithmetic_element_index ] ).val();
	return which_arithmetic;
}

function look_up_arithmetic_function( which_arithmetic )
{
	var which_arithmetic_function = which_arithmetic_functions[ which_arithmetic ];
	return which_arithmetic_function;
}

function generate_addition_problem()
{
	var upper_limit = get_upper_limit( 'addition' );
	var lower_limit = get_lower_limit( 'addition' );
	
	var first_number = parseInt( Math.random() * ( upper_limit + 1 - lower_limit ) ) + lower_limit;
	var second_number = parseInt( Math.random() * ( upper_limit + 1 - lower_limit ) ) + lower_limit;
	if ( first_number < second_number )
	{
		var temp_number = first_number;
		first_number = second_number;
		second_number = temp_number;
	}
	current_which_arithmetic = 'addition';
	correct_first_number = first_number;
	correct_second_number = second_number;
	correct_answer = first_number + second_number;
	return first_number + '\n+ ' + second_number;
}

function generate_subtraction_problem()
{
	var upper_limit = get_upper_limit( 'subtraction' );
	var lower_limit = get_lower_limit( 'subtraction' );
	
	var first_number = parseInt( Math.random() * ( upper_limit + 1 - lower_limit ) ) + lower_limit;
	var second_number = parseInt( Math.random() * ( upper_limit + 1 - lower_limit ) ) + lower_limit;
	
	if ( first_number < second_number )
	{
		var temp_number = first_number;
		first_number = second_number;
		second_number = temp_number;
	}
	current_which_arithmetic = 'subtraction';
	correct_first_number = first_number;
	correct_second_number = second_number;
	correct_answer = first_number - second_number;
	return first_number + '\n- ' + second_number;
}

function generate_multiplication_problem()
{
	var upper_limit = get_upper_limit( 'multiplication' );
	var lower_limit = get_lower_limit( 'multiplication' );
	
	var first_number = parseInt( Math.random() * ( upper_limit + 1 - lower_limit ) ) + lower_limit;
	var second_number = parseInt( Math.random() * ( upper_limit + 1 - lower_limit ) ) + lower_limit;
	
	if ( first_number < second_number )
	{
		var temp_number = first_number;
		first_number = second_number;
		second_number = temp_number;
	}
	current_which_arithmetic = 'multiplication';
	correct_first_number = first_number;
	correct_second_number = second_number;
	correct_answer = first_number * second_number;
	return first_number + '\nx ' + second_number;
}

function generate_division_problem()
{
	var upper_limit = get_upper_limit( 'division' );
	var lower_limit = get_lower_limit( 'division' );
	
	var first_number = parseInt( Math.random() * ( upper_limit + 1 - lower_limit ) ) + lower_limit;
	var second_number = parseInt( Math.random() * ( upper_limit + 1 - lower_limit ) ) + lower_limit;
	
	current_which_arithmetic = 'division';
	correct_first_number = ( first_number * second_number );
	correct_second_number = second_number;
	correct_answer = first_number;
	return ( first_number * second_number ) + '\n&div; ' + second_number;
}

function get_upper_limit( which_arithmetic )
{
	return parseInt( $( '#' + which_arithmetic + '-upper-limit' ).val() );
}

function get_lower_limit( which_arithmetic )
{
	return parseInt( $( '#' + which_arithmetic + '-lower-limit' ).val() );
}

function check_user_input()
{
	var unsanitized_user_input = $( '#user-input' ).val();
	if ( unsanitized_user_input === '' )
	{
		return;
	}
	var user_input = sanitize_user_input( unsanitized_user_input );
	if ( user_input === correct_answer )
	{
		mark_correct_answer();
		notify_user_correct();
		clear_user_input();
		next_problem();
	}
	else if ( user_input.toString().length < correct_answer.toString().length )
	{
		var correct_answer_string = correct_answer.toString();
		var user_input_string = user_input.toString();
		if ( correct_answer_string.substr( 0, user_input_string.length ) === user_input_string )
		{
			return;
		}
		else
		{
			mark_incorrect_answer();
			notify_user_incorrect();
			clear_user_input();
		}
	}
	else
	{
		mark_incorrect_answer();
		notify_user_incorrect();
		clear_user_input();
	}
}

function sanitize_user_input( user_input )
{
	if ( isFinite( user_input ) )
	{
		return parseFloat( user_input );
	}
	
	var sanitized_user_input = '';
	for ( var i = 0; i < user_input.length; i++ )
	{
		if ( isFinite( user_input[ i ] ) )
		{
			sanitized_user_input += user_input[ i ];
		}
	}
	$( '#user-input' ).val( sanitized_user_input );
	return parseFloat( sanitized_user_input );
}

function mark_correct_answer()
{
	if ( !arithmetic_tables_correct[ current_which_arithmetic ][ 'correct' ][ correct_first_number ] )
	{
		arithmetic_tables_correct[ current_which_arithmetic ][ 'correct' ][ correct_first_number ] = new Array;
	}
	
	if ( !arithmetic_tables_correct[ current_which_arithmetic ][ 'correct' ][ correct_first_number ][ correct_second_number ] )
	{
		arithmetic_tables_correct[ current_which_arithmetic ][ 'correct' ][ correct_first_number ][ correct_second_number ] = 0;
	}
	
	arithmetic_tables_correct[ current_which_arithmetic ][ 'correct' ][ correct_first_number ][ correct_second_number ]++;
}

function notify_user_correct()
{
	var correct_message = get_correct_message();
	$( '.user-message' ).addClass( 'correct' )
		.html( correct_message );
}

function get_correct_message()
{
	var correct_message = correct_messages[ correct_message_index ];
	correct_message_index++;
	if ( correct_message_index >= correct_messages.length )
	{
		correct_message_index = 0;
	}
	return correct_message + '!';
}

function mark_incorrect_answer()
{
	if ( !arithmetic_tables_correct[ current_which_arithmetic ][ 'incorrect' ][ correct_first_number ] )
	{
		arithmetic_tables_correct[ current_which_arithmetic ][ 'incorrect' ][ correct_first_number ] = new Array;
	}
	
	if ( !arithmetic_tables_correct[ current_which_arithmetic ][ 'incorrect' ][ correct_first_number ][ correct_second_number ] )
	{
		arithmetic_tables_correct[ current_which_arithmetic ][ 'incorrect' ][ correct_first_number ][ correct_second_number ] = 0;
	}
	
	arithmetic_tables_correct[ current_which_arithmetic ][ 'incorrect' ][ correct_first_number ][ correct_second_number ]++;
}

function notify_user_incorrect()
{
	$( '.user-message' ).removeClass( 'correct' )
		.html( 'Try Again' );
}

function update_problem( new_problem )
{
	var problem_output_text = new_problem.replace( /\n/, '<br>' );
	$( '.problem-output' ).html( problem_output_text );
}

function next_problem()
{
	generate_problem();
}

function toggle_settings()
{
	if ( $( '#settings' ).hasClass( 'display-none' ) )
	{
		hide_statistics();
		show_settings();
	}
	else
	{
		hide_settings();
	}
}

function show_settings()
{
	$( '#settings' ).removeClass( 'display-none' )
	$( '#settings-button' ).html( 'Close Settings' );
}

function hide_settings()
{
	$( '#settings' ).addClass( 'display-none' );
	$( '#settings-button' ).html( 'Settings' );
}

function toggle_statistics()
{
	if ( $( '.arithmetic-table-wrapper' ).hasClass( 'display-none' ) )
	{
		hide_settings();
		show_statistics();
	}
	else
	{
		hide_statistics();
	}
}

function show_statistics()
{
	$( '.arithmetic-table-wrapper' ).removeClass( 'display-none' )
	$( '#statistics-button' ).html( 'Close Statistics' );
}

function hide_statistics()
{
	$( '.arithmetic-table-wrapper' ).addClass( 'display-none' );
	$( '#statistics-button' ).html( 'Statistics' );
}

function clear_user_input()
{
	$( '#user-input' ).val( '' );
}

/* -------------------- Arithmetic Table -------------------- */

function select_arithmetic_table( which_arithmetic )
{
	$( '.arithmetic-table' ).html( '' );
	populate_arithmetic_table( which_arithmetic );
}

function populate_arithmetic_table( which_arithmetic )
{
	var upper_limit = get_upper_limit( which_arithmetic );
	var lower_limit = get_lower_limit( which_arithmetic );
	var arithmetic_table_element = $( '.arithmetic-table' );
	
	for (
		var row_index = lower_limit;
		row_index <= upper_limit;
		row_index++
	) {
		var new_row = $( '<div/>', {
			class: 'arithmetic-table-row'
		} );
		
		for (
			var column_index = row_index;
			column_index <= upper_limit;
			column_index++
		) {
			var new_cell = get_new_cell( which_arithmetic, column_index, row_index );
			new_row.append( new_cell );
		}
		
		arithmetic_table_element.append( new_row );
	}
}

function get_new_cell( which_arithmetic, column_index, row_index )
{
	var new_cell_class = 'arithmetic-table-cell';
	var new_cell_options = {
		class: new_cell_class,
		text: column_index
	};
	var new_cell_correct_range_color = get_correct_range_color( which_arithmetic, column_index, row_index );
	
	if ( new_cell_correct_range_color )
	{
		new_cell_options.style = 'background-color: ' + new_cell_correct_range_color;
	}
	var new_cell = $( '<div/>', new_cell_options );
	new_cell.append( '<br>' );
	new_cell.append( which_arithmetic_operators[ which_arithmetic ] + ' ' + row_index );
	return new_cell;
}

function get_correct_range_color( which_arithmetic, first_number, second_number )
{
	var times_correct;
	var times_incorrect;
	
	if (
		arithmetic_tables_correct[ which_arithmetic ][ 'correct' ][ first_number ]
		&& arithmetic_tables_correct[ which_arithmetic ][ 'correct' ][ first_number ][ second_number ]
	) {
		times_correct = arithmetic_tables_correct[ which_arithmetic ][ 'correct' ][ first_number ][ second_number ];
	}
	else
	{
		times_correct = 0;
	}
	
	if (
		arithmetic_tables_correct[ which_arithmetic ][ 'incorrect' ][ first_number ]
		&& arithmetic_tables_correct[ which_arithmetic ][ 'incorrect' ][ first_number ][ second_number ]
	) {
		times_incorrect = arithmetic_tables_correct[ which_arithmetic ][ 'incorrect' ][ first_number ][ second_number ];
	}
	else
	{
		times_incorrect = 0;
	}
	
	return calculate_correct_range_color( times_correct, times_incorrect );
}

function calculate_correct_range_color( times_correct, times_incorrect )
{
	if ( times_correct === 0 && times_incorrect === 0 )
	{
		return false;
	}
	
	var total_times = times_correct + times_incorrect;
	var times_correct_ratio = times_correct / total_times;
	
	return get_red_yellow_green_range_color( times_correct_ratio );
}

function get_red_yellow_green_range_color( range_percentage )
{
	var range_index = parseInt( range_percentage * ( red_yellow_green_range.length - 1 ) );
	var range_color_integer = red_yellow_green_range[ range_index ];
	var range_color = pad_with_zeros( int_to_hex( range_color_integer ), 6 );
	
	return '#' + range_color;
}

function initialize_red_yellow_green_range()
{
	var current_hex_step;
	for (
		var red_to_yellow_index = 0;
		red_to_yellow_index < 256;
		red_to_yellow_index++
	) {
		current_hex_step = pad_with_zeros( int_to_hex( red_to_yellow_index ), 2 );
		red_yellow_green_range.push( hex_to_int( 'ff' + current_hex_step + '00' ) );
	}
	
	for (
		var yellow_to_green_index = 255;
		yellow_to_green_index >= 0;
		yellow_to_green_index--
	) {
		current_hex_step = pad_with_zeros( int_to_hex( yellow_to_green_index ), 2 );
		red_yellow_green_range.push( hex_to_int( current_hex_step + 'ff00' ) );
	}
}

/* -------------------- End Arithmetic Table -------------------- */


/* -------------------- Utilities -------------------- */

function int_to_hex( integer_to_convert )
{
	return integer_to_convert.toString( 16 );
}

function hex_to_int( hex_to_convert )
{
	return parseInt( hex_to_convert, 16 );
}

function pad_with_zeros( string_to_pad, number_of_places )
{
	while ( string_to_pad.length < number_of_places )
	{
		string_to_pad = '0' + string_to_pad;
	}
	return string_to_pad;
}

/* -------------------- Utilities -------------------- */