var counter=0;
var secret;

function handleInstructionsModal() {
	// when users click on the element with
	// `.js-what` class, we'll fade in
	// the instructions modal
	$('.js-what').click(function() {
		$('.overlay').fadeIn(1000);
	});

	// when users click on the element with the
	// `.js-close` class, we'll fade out
	// the instructions modal
	$('.js-close').click(function(){
  		$(".overlay").fadeOut(1000);
  	});
}

// This function generates a secret number between 
// 1 and 100 for the user to guess
function secretNumber() {
	// Returns a random number between 0 (inclusive) and 1 (exclusive)
	function getRandom() {
	  return Math.random();
	}

	secret = Math.round(getRandom()*100);
	console.log('secret is '+secret);
}

// This function allows user to start a new game, either
// by clicking "New Game", or by reloading the page.
function newGame() {
	$('.new').click(function() {
		secretNumber();	// on clicking "New Game"
		console.log('new game:');
		counter = 0;
		console.log('counter is '+counter);
		$('.count').text(counter);
		$( "#guessList" ).empty();
		$('#feedback').text('Make your Guess!');
		showElements();
	});
	
	secretNumber();	// on page refresh
	feedbackGenerator();
}


// This function gives user feedback about each guess –
// if too low, too high, or just right. It takes user’s
// guess and determines which feedback to provide.
function feedbackGenerator() {

	$('form').submit(function(event) {
		
		event.preventDefault(); 	// cancels default submit() action
		counter++;
		console.log(counter);

		var guess = $('#js-user-guess').val();
		console.log(guess);

		if(guess < 1 || guess >100) {
			alert("Please choose a number between 1 and 100")
		}

		appendItem();

		function appendItem(entry) {

			$('#js-user-guess').val('');  // clear the user guess input field

			$('.count').text(counter);

			var x = Math.abs(secret - guess);	// the diff btw secret and guess
			
			if(x > 50) {
				$('#feedback').text('Ice Cold');
			} else if(x >= 31 && x <=50)  {
			// guess is 30-50pts off from secret
				$('#feedback').text('Cold');
			} else if(x >= 21 && x <=30)  {
			// guess is 20-30pts off from secret
				$('#feedback').text('Warm');
			} else if(x >= 11 && x <=20)  {
			// guess is 10-20pts off from secret
				$('#feedback').text('Hot');
			} else if(x >= 1 && x <=10)  {
			// guess is 1-10pts off from secret
				$('#feedback').text('Very Hot');	
			} else {
			// secret == guess
				if(counter==1){
					$('#feedback').text('CONGRATS! Only '+counter+' guess!');
				} else {
					$('#feedback').text('CONGRATS! Only '+counter+' guesses!');
				}
				hideElements();
			}

			$( "#guessList" ).append( '<li>' + Number(guess).toString() +'</li>' );	// remove leading zeros from displayed guesses (e.g., "080"-> "80")
			console.log('guess is '+x+' off from secret');
		};
	});
}

function hideElements() {
	$('#js-guess-submit').css('visibility', 'hidden');
	$('#js-user-guess').css('visibility', 'hidden');
	$('.game p').css('visibility', 'hidden');
}
 function showElements() {
	$('#js-guess-submit').css('visibility', 'visible');
	$('#js-user-guess').css('visibility', 'visible');
	$('.game p').css('visibility', 'visible');
 }

// `$()` (a jQuery shortcut for `$( document ).ready()`)
// lets you specify one or more functions that should execute 
// when all the resources required by your web page have loaded.
$(function() {
	handleInstructionsModal();
	newGame();
});