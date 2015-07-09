var correct_answer;

var correct_messages = ['Excellent', 'Correct', 'Superb', 'Fantastic', 'Marvelous', 'Admirable', 'Ace', 'First-class', 'Dandy', 'Exquisite', 'Fantastic', 'Golden', 'Marvellous', 'Outstanding', 'Splendid', 'Magnificent', 'Smashing', 'Terrific', 'Topnotch', 'Tremendous', 'Wonderful', 'Champion', 'First-rate', 'Brilliant', 'Fabulous', 'Stunning', 'Commendable'];
var correct_message_index = 0;

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
	$( '#user-input' ).keyup(
		function( key_event )
		{
			check_user_input();
		}
	);
}

function generate_problem()
{
	var new_problem;
	new_problem = generate_subtraction_problem();
	update_problem( new_problem );
}

function generate_subtraction_problem()
{
	var first_number = parseInt( Math.random() * 13 );
	var second_number = parseInt( Math.random() * 12 );
	if ( first_number < second_number )
	{
		var temp_number = first_number;
		first_number = second_number;
		second_number = temp_number;
	}
	correct_answer = first_number - second_number;
	return first_number + '\n-' + second_number;
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

function clear_user_input()
{
	$( '#user-input' ).val( '' );
}