let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let isStarted = false;
let level = 0;

$(this).keypress((e) => {
    if (!isStarted) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click((e) => {
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnwser(userClickedPattern.length - 1);
});

//--------------Is Anwser Correct-------------------------

function checkAnwser(currnetLevel) {
    if (userClickedPattern[currnetLevel] === gamePattern[currnetLevel]) {
        // console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 1000);
        startOver();
    }
}
//--------------Game Logic-------------------------

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);

    playSound(randomChosenColour);
}

//--------------Start New Game-------------------------

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//--------------Sounds-------------------------

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//--------------Animations-------------------------

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
