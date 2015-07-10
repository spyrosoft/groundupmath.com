var correct_answer;

var correct_messages = ['Excellent', 'Correct', 'Superb', 'Fantastic', 'Marvelous', 'Admirable', 'Ace', 'First-class', 'Dandy', 'Exquisite', 'Fantastic', 'Golden', 'Marvellous', 'Outstanding', 'Splendid', 'Magnificent', 'Smashing', 'Terrific', 'Topnotch', 'Tremendous', 'Wonderful', 'Champion', 'First-rate', 'Brilliant', 'Fabulous', 'Stunning', 'Commendable'];
var correct_message_index = 0;

var which_arithmetic_functions = {
	'addition': generate_addition_problem,
	'subtraction': generate_subtraction_problem,
	'multiplication': generate_multiplication_problem,
	'division': generate_division_problem
};

$( document ).ready(
	function()
	{
		generate_problem();
		$( '#user-input' ).select();
		initialize_event_listeners();
	}
);

function initialize_event_listeners()
{
	$( '#user-input' ).keyup( check_user_input );
	$( '#settings-button' ).click( toggle_settings );
}

function generate_problem()
{
	var new_problem;
	var which_arithmetic_function = choose_available_arithmetic_function();
	new_problem = which_arithmetic_function();
	update_problem( new_problem );
}

function choose_available_arithmetic_function()
{
	var which_arithmetic_elements = $( '.which-arithmetic:checked' );
	if ( which_arithmetic_elements.length === 0 )
	{
		return false;
	}
	var which_arithmetic_element_index = parseInt( Math.random() * which_arithmetic_elements.length );
	var which_arithmetic = $( which_arithmetic_elements[ which_arithmetic_element_index ] ).val();
	var which_arithmetic_function = which_arithmetic_functions[ which_arithmetic ];
	return which_arithmetic_function;
}

function generate_addition_problem()
{
	var upper_limit = get_upper_limit( 'addition' );
	var lower_limit = get_lower_limit( 'addition' );
	
	var first_number = parseInt( Math.random() * ( upper_limit + 1 ) );
	var second_number = parseInt( Math.random() * ( upper_limit + 1 ) );
	if ( first_number < second_number )
	{
		var temp_number = first_number;
		first_number = second_number;
		second_number = temp_number;
	}
	correct_answer = first_number + second_number;
	return first_number + '\n+ ' + second_number;
}

function generate_subtraction_problem()
{
	var upper_limit = get_upper_limit( 'subtraction' );
	var lower_limit = get_lower_limit( 'subtraction' );
	
	var first_number = parseInt( Math.random() * ( upper_limit + 1 ) );
	var second_number = parseInt( Math.random() * ( upper_limit + 1 ) );
	
	if ( first_number < second_number )
	{
		var temp_number = first_number;
		first_number = second_number;
		second_number = temp_number;
	}
	correct_answer = first_number - second_number;
	return first_number + '\n- ' + second_number;
}

function generate_multiplication_problem()
{
	var upper_limit = get_upper_limit( 'multiplication' );
	var lower_limit = get_lower_limit( 'multiplication' );
	
	var first_number = parseInt( Math.random() * ( upper_limit + 1 ) );
	var second_number = parseInt( Math.random() * ( upper_limit + 1 ) );
	
	if ( first_number < second_number )
	{
		var temp_number = first_number;
		first_number = second_number;
		second_number = temp_number;
	}
	correct_answer = first_number * second_number;
	return first_number + '\nx ' + second_number;
}

function generate_division_problem()
{
	var upper_limit = get_upper_limit( 'division' );
	var lower_limit = get_lower_limit( 'division' );
	
	var first_number = parseInt( Math.random() * ( upper_limit ) ) + 1;
	var second_number = parseInt( Math.random() * ( upper_limit ) ) + 1;
	
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
		notify_user_correct();
		clear_user_input();
		next_problem();
	}
	else if ( user_input.toString().length < correct_answer.toString().length )
	{
		return;
	}
	else
	{
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
		$( '#settings' ).removeClass( 'display-none' )
		$( '#settings-button' ).html( 'Close Settings' );
	}
	else
	{
		$( '#settings' ).addClass( 'display-none' );
		$( '#settings-button' ).html( 'Settings' );
	}
}

function clear_user_input()
{
	$( '#user-input' ).val( '' );
}