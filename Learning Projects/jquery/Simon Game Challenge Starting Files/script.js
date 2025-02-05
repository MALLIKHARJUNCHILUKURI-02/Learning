var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence() {
    var userClickedPattern = [];
    level++;
    $("h1").text("Level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var sound = new Audio("./sounds/" + randomChosenColour + ".mp3");
    sound.play();
   
}

$(".btn").on("click", function () {
    var buttonClicked = $(this).attr("id");
    $(this).fadeOut(100).fadeIn(100);
    var sound = new Audio("./sounds/" + buttonClicked + ".mp3");
    sound.play();
    animatePress(buttonClicked);
    userClickedPattern.push(buttonClicked);
    checkAnswer(userClickedPattern.length-1)
});


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }else{
        console.log("fail");
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    
        $("#level-title").text("Game Over! Press any key to restart");
        startOver()
    }
}


function startOver(){
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
}