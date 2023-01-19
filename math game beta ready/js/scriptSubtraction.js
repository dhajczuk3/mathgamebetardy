const audioRight = document.getElementById("audioRight");
const audioWrong = document.getElementById("audioWrong");

//DRAGGABLES START HERE
$(".circle").draggable({
    revert: "invalid",
    helper: "clone",
    containment: "#container",
    disabled: true
}).css("opacity", 0.5);

//DROPZONES START HERE
$("#result1").droppable({
    accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
    hoverClass: "drop-hover",
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent
});
$("#result2").droppable({
    accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
    hoverClass: "drop-hover",
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent
});
$("#result3").droppable({
    accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
    hoverClass: "drop-hover",
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent
});
$("#result4").droppable({
    accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
    hoverClass: "drop-hover",
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent
});
$("#result5").droppable({
    accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
    hoverClass: "drop-hover",
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent
});
$("#result6").droppable({
    accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
    hoverClass: "drop-hover",
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent
});
$("#result7").droppable({
    accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
    hoverClass: "drop-hover",
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent
});
$("#result8").droppable({
    accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
    hoverClass: "drop-hover",
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent
});
$("#result9").droppable({
    accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
    hoverClass: "drop-hover",
    over: handleOverEvent,
    out: handleOutEvent,
    drop: handleDropEvent
});

//GLOBAL VARIABLES
let score = 0;
let clearTimer;
let counter;
let rightAnswers = 1;


//----- FUNCTIONS BEGIN HERE -----\\

// WIN GAME function
// if the user matches all 9 circles, calculate the final score
// final score is the score + remain time
// the end message and the score will be displayed
// stop the timer 
function checkScore() {
    if (rightAnswers === 9) {
        $(".scoremessage").fadeIn();
        score = score + counter;
        $('#score').text(score);
        $(".scoremessage").text("You won! Your score was: " + score);
        stopTimer();
    } //END check score
}

// DROP THE CIRCLE EVENT
function handleDropEvent(event, ui) {

    let elementID = $(ui.draggable).attr('id');
    let dropzoneID = $(this).attr("data-value");

    console.log(elementID);
    console.log(dropzoneID);

    //---what happens if the answer is correct--\\

    // make the answer circle disabled and show a tick image on the answer field
    if (dropzoneID === elementID) {
        ui.draggable.draggable({
            disabled: true
        }).css("opacity", 0.5);
        $(this).html(`<img src="images/thumb.png">`);
        $(this).droppable("destroy");



        //add 10 points to the total score
        score = score + 10;

        //add 4 (shown 3) seconds
        if (rightAnswers < 8) {
            counter = counter + 4;
        }

        //update score on the display
        $('#score').text(score);
        checkScore();

        //play audio
        audioRight.play();

        //add 1 to correct answers count
        rightAnswers++;


    }

    //--what happens if answer is incorrect--\\
    //do nothing with the answer circle and show the question mark image on the answer field again
    else if (dropzoneID !== elementID) {
        ui.draggable.draggable({
            disabled: false
        })
        //play audio
        audioWrong.play();
        //show the question mark image on answer field again
        $(this).html(`<img src="images/questionmark.png">`);
        //remove 5 points from the score
        score = score - 5;
        //remove 2 seconds from the timer
        counter = counter - 2;
        //update the score
        checkScore();
        $('#score').text(score);
    }
}

//handleover event
function handleOverEvent(event, ui) {
    $(this).html();
}

//handle out event - if the user doesnt match answer with the field, 
//show the question mark image on the field again
function handleOutEvent(event, ui) {
    $(this).html(`<img src="images/questionmark.png">`);
} //END handleOutEvent 



// Reload page (New Game) Button
// basically just refreshes the script
let btn = $("#btn_reload").on("click", function () {
    location.reload(true);
});
$("#btn_start").on("click", startGame);


//GAME CODE

//START GAME / START TIMER FUNCTION
function startGame() {
    //hide a start timer button
    $("#btn_start").hide();
    //make the circles draggable and able to play with
    $(".circle").draggable({
        disabled: false
    }).css("opacity", 1);

    //start the timer
    startTimer();
    //fade out score message which could appear on the last run
    $(".scoremessage").fadeOut();

}

//START TIMER FUNCTION
function startTimer() {
    //set up 15 seconds
    counter = 16;
    //reset the score
    score = 0;

    clearTimer = setInterval(function () {
        counter--;
        if (counter >= 0) {
            let countdown = document.getElementById("timer");
            countdown.innerHTML = " " + counter;

        }

        //end message if the time runs out
        //disable circles and calculate the final score
        //display final message with the final score

        if (counter < 0) {
            clearInterval(clearTimer);
            $(".circle").draggable({
                disabled: true
            }).css("opacity", 0.5);
            $('#score').text(score);
            $(".scoremessage").fadeIn();
            $(".scoremessage").text("Out of time! Your score was: " + score + ". Try again!");

        }

    }, 1000)
}

//stop timer function
//used when the user wins the game
function stopTimer() {
    clearInterval(clearTimer);
}

//shuffle the circles so they're displayed in the random order 
var circles = document.getElementById("circles").children;

for (let i = 0; i < circles.length; i++) {
    circles[i].style.order = Math.floor(Math.random() * circles.length) + 1;
}
