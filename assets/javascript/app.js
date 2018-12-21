// An object full of the questions, selections and answers to the trivia questions.
var triviaQuestions = [{
    question: "What is Michael Scott's hidden talent?",
    selection: ["Comedy", "Basketball", "Ice Hockey", "Party Planning"],
    answer: "Ice Hockey"
}, {
    question: "What does Darryl tell Michael to never touch while in the warehouse?",
    selection: ["Baler", "Forklift", "Ladder", "Knife"],
    answer: "Baler"
}, {
    question: "What is the name of the Dentist that Dwight goes to see but really meets up with Jan",
    selection: ["Dr. Hunter", "Crentist", "Rentist", "Dr. Mahan"],
    answer: "Crentist"
}, {
    question: "Who does Michael Scott NOT have a relationship with?",
    selection: ["Pam's Mom", "Cynthia", "Jan", "Carol"],
    answer: "Cynthia"
}, {
    question: "What band was Creed Bratton actually a part of in real life",
    selection: ["Steve Miller Band", "Rolling Stones", "The Pat Travers Band", "Grass Roots"],
    answer: "Grass Roots"
}, {
    question: "What day does Stanley say he likes?",
    selection: ["Pretzel Day", "Michael's Last Day", "Diversity Day", "Recyclops Day"],
    answer: "Pretzel Day"
}];
// Loops through the array of questions
for (let i = 0; i < triviaQuestions.length; i++) {
    var questionDiv = $("#questions-div");
    // This adds the questions to display on the html
    questionDiv.append("<div>" + triviaQuestions[i].question + "</div>");
    // This adds the selection to each question as a radio button to the html
    $("#questions-div").append('<label class="container">' + '<input type="radio" name="radio">' + '<span class="checkmark">' + '</span>' + triviaQuestions[i].selection[0] + '</label>');
    $("#questions-div").append('<label class="container">' + '<input type="radio" name="radio">' + '<span class="checkmark">' + '</span>' + triviaQuestions[i].selection[1] + '</label>');
    $("#questions-div").append('<label class="container">' + '<input type="radio" name="radio">' + '<span class="checkmark">' + '</span>' + triviaQuestions[i].selection[2] + '</label>');
    $("#questions-div").append('<label class="container">' + '<input type="radio" name="radio">' + '<span class="checkmark">' + '</span>' + triviaQuestions[i].selection[3] + '</label>');
}

// Variable for the timer
var timerCurrent = 12000;

// When the timer stops...
function timerStop() {
    clearInterval();
    displayResults();
};

// This will countdown the seconds until 0 is reached
function displayCurrentTime() {
    timerCurrent--;
    $("#timer").append("Time remaining: " + timerCurrent);
    if (timerCurrent === 0) {
        timerStop();
        $("#timer").empty();
    }
};

// This will start the timer
function timerStart() {
    $("#timer").append("Time remaining: " + timerCurrent);
    //setInterval(displayCurrentTime(1000));
    displayResults();
};

// Varibles for the results page
var userInput;
var userCorrect;
var displayCorrect = $("#right");
var displayWrong = $("#wrong");
var displayNoInput = $("#undefined");

// This function will hide and clear trivia data,
// loop though the users answers and display the score
function displayResults() {
    $("#trivia-div").hide().empty();
    $("#result-div").show();
    for (let i = 0; i < triviaQuestions.length; i++)
        userCorrect = triviaQuestions[i].answer.length;
        userInput = $("<input type='radio' name='radio' checked='checked'>")
    if (userInput === triviaQuestions.answer) {
        displayCorrect++;
    } else if (userInput !== triviaQuestions.answer) {
        displayWrong++;
    } else {
        displayNoInput++;
    }
}

// By clicking the start button it will "start" the game.
$("#start").click(function() {
    $(".start-div").hide();
    $("#trivia-div").show();
});

// By clicking the finish button it will display the results page
$("#finish").click(function() {
    displayResults();
});