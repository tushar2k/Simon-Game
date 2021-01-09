var colorSequence = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;
var k = 0;


$('.btn').click(function() {
  var userChosenColour = this.id;
  userPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (checkPress(userChosenColour) === true) {
    k++;
    if (k === level) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
});

$(document).keypress(function() {
  if (started === false) {
    started = true;
    $('#level-title').html('Level ' + level.toString());
    setTimeout(function() {
      nextSequence();
    }, 500);
  }
});


function checkPress(userChosenColour) {
  // console.log(userChosenColour);
  // console.log(gamePattern[k]);
  if (userChosenColour === gamePattern[k]) {
    return true;
  } else {
    return false;
  }
}

function gameOver() {
  $('#level-title').text('Game Over, Press Any Key to Restart');
  var aud = new Audio('sounds/wrong.mp3');
  aud.play();
  $('body').addClass('game-over');
  setTimeout(function() {
    $('body').removeClass('game-over');
  }, 200);
  startOver();
}

function nextSequence() {
  level += 1;
  k = 0;
  $('#level-title').html('Level ' + level.toString());
  var randomNumber = Math.floor(Math.random() * 4);
  var randColor = colorSequence[randomNumber];
  gamePattern.push(randColor);
  $('#' + randColor).fadeOut(100).fadeIn(100);
  playSound(randColor);
}

function playSound(name) {
  var aud = new Audio('sounds/' + name + '.mp3');
  aud.play();
}

function startOver() {
  gamePattern = [];
  userPattern = [];
  level = 0;
  started = false;
  k = 0;
}

function animatePress(name) {
  $('#' + name).addClass('pressed');
  setTimeout(function() {
    $('#' + name).removeClass('pressed');
  }, 100);
}
