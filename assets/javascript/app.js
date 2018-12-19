// Declare the global variables to be used in the game.
// Below is an object full of the questions, selections and answers to the trivia questions.
var triviaQuestions = [{
    question: "What is Michael Scott's hidden talent?",
    selection: ["Comedy", "Basketball", "Ice Hockey", "Party Planning"],
    correct: "Ice Hockey"
}, {
    question: "What does Darryl tell Michael to never touch while in the warehouse?",
    selection: ["Baler", "Forklift", "Ladder", "Knife"],
    correct: "Baler"
}, {
    question: "What is the name of the Dentist that Dwight goes to see but really meets up with Jan",
    selection: ["Dr. Hunter", "Crentist", "Rentist", "Dr. Mahan"],
    correct: "Crentist"
}, {
    question: "Who does Michael Scott NOT have a relationship with?",
    selection: ["Pam's Mom", "Cynthia", "Jan", "Carol"],
    correct: "Cynthia"
}, {
    question: "What band was Creed Bratton actually a part of in real life",
    selection: ["Steve Miller Band", "Rolling Stones", "The Pat Travers Band", "Grass Roots"],
    correct: "Grass Roots"
}, {
    question: "What day does Stanley say he likes?",
    selection: ["Pretzel Day", "Michael's Last Day", "Diversity Day", "Recyclops Day"],
    correct: "Pretzel Day"
}];

// Declaring the variables for userinputs
// Declare the global functions to be used in the game.
function triviaDisplay() {
    $("#start").on("click", function() {
        $("#trivia-display").show(triviaQuestions);
        $("#timer").setTimeout();
        $("#trivia-display").hide(triviaQuestions.correct);
        
    });
}

function rightAnswer() {

}

function wrongAnswer() {

}

setTimeout(function(){
    resultDisplay()
}, 2000)


function resultDisplay() {
    var userInput;
    var correct;
    var displayCorrect = 0;
    var displayWrong = 0;
    var displayNoInput = 0;

    for (let i = 0; i < triviaQuestions.length; i++)
        correct = triviaQuestions[i].length
    if (userInput === correct) {
        displayCorrect++;
    } else if (userInput !== correct) {
        displayWrong++;
    } else {
        displayNoInput++;
    }
}