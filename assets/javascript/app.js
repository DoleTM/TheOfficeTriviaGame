var trivia = [{
    question: "In S1E1 'Pilot': Who started their first day at Dunder Mifflin Scranton?",
    answers: [
        { a1: "Jim Halpert", value: false },
        { a2: "Ryan Howard", value: true, pic: "ryanhoward.gif" },
        { a3: "Michael Scott", value: false },
        { a4: "Erin Hannon", value: false }
    ]
},
{
    question: "In S1E2 'Diversity Day': What famous comedian's stand up routine does Michael imitate?",
    answers: [
        { a1: "Chris Rock", value: true, pic: "diversityday.gif" },
        { a2: "Richard Pryor", value: false },
        { a3: "Robin Williams", value: false },
        { a4: "George Carlin", value: false }
    ],
},
{
    question: "In S1E3 'Health Care': Which of these is NOT one of Jim and Pam's made up diseases?",
    answers: [
        { a1: "Killer Nanorobots", value: false },
        { a2: "Hot Dog Fingers", value: false },
        { a3: "Spontaneous Dental Hydroplosion", value: false },
        { a4: "Hair Cancer", value: true, pic: "haircancer.gif" }
    ],
},
{
    question: "In S1E4 'The Alliance': How much money does Michael donate to Oscar's nephew's charity, not realizing it is a walk-a-thon and the amount is per mile?",
    answers: [
        { a1: "$40", value: false },
        { a2: "$10", value: false },
        { a3: "$25", value: true, pic: "25.gif" },
        { a4: "$100", value: false }
    ],
},
{
    question: "In S1E5 'Basketball': What small appliance of Pam's breaks down? (It was given to her at her engagement party three years earlier) ",
    answers: [
        { a1: "Toaster", value: false },
        { a2: "Microwave", value: false },
        { a3: "Blender", value: false },
        { a4: "Toaster Oven", value: true, pic: "toasteroven.gif" }
    ],
},
{
    question: "In S1E6 'Hot Girl' What is the Hot Girl's name?",
    answers: [
        { a1: "Amy", value: false },
        { a2: "Christy", value: false },
        { a3: "Kelly", value: false },
        { a4: "Katy", value: true, pic: "katy.gif" }
    ],
},
{
    question: "In S2E1 'The Dundies': What Dundie award does Phyllis take home?",
    answers: [
        { a1: "The Busiest Beaver Dundie", value: false },
        { a2: "The Bushiest Beaver Dundie", value: true, pic: "bushiestbeaver.gif" },
        { a3: "Spicy Curry Dundie", value: false },
        { a4: "Whitest Sneakers Dundie", value: false }
    ],
},
{
    question: "In S2E2 'Sexual Harassment': What is on Todd Packer's vanity license plate?",
    answers: [
        { a1: "LUVMKR", value: false },
        { a2: "WLHUNG", value: true, pic: "wlhung.gif" },
        { a3: "TODPKR", value: false },
        { a4: "BGDADY", value: false }
    ],
},
{
    question: "In S2E3 'Office Olympics': What does Pam name 'Box of paper snowshoe racing'?",
    answers: [
        { a1: "Flonkerton", value: true, pic: "placeholder.gif" },
        { a2: "Icelandic Snowshoe Racing", value: false },
        { a3: "Bixing", value: false },
        { a4: "Pegerhosen", value: false }
    ],
},
{
    question: "In S2E5 'Halloween': What is Jim's costume?",
    answers: [
        { a1: "'Dave'", value: true, pic: "threeholepunchjim.gif" },
        { a2: "Bookface", value: false },
        { a3: "Three Hole Punch Jim", value: false },
        { a4: "Rational Consumer", value: false }
    ],
}];

var quesNum, correct, incorrect, unanswered;
var quesSeconds = 15,
    resultSeconds = 5;
var intervalId, number;
var mode; // 1 for question screen, 2 for result screen

function stopTimer() {
    clearInterval(intervalId);
};

function runTimer() {
    number--;
    if (mode === 1) {
        $("#remaining").text("Time remaining: " + number + " seconds");
        if (number === 0) {
            stopTimer();
            displayResult(-2);
        }
    } else { // mode equals 2
        if (number === 0) {
            stopTimer();
            quesNum++;
            if (quesNum < trivia.length) {
                nextQuestion();
            } else {
                displayStats();
            };
        };
    }
};

function nextQuestion() {
    $("#question").text(trivia[quesNum].question);
    $("#a1").text(trivia[quesNum].answers[0].a1);
    $("#a2").text(trivia[quesNum].answers[1].a2);
    $("#a3").text(trivia[quesNum].answers[2].a3);
    $("#a4").text(trivia[quesNum].answers[3].a4);

    $("#start").hide();
    $("#correct-text").hide();
    $("#gif").hide();
    $("#stats").hide();

    $("#remaining").show();
    $("#question").show();
    $(".answer").show();

    mode = 1;
    number = quesSeconds;
    $("#remaining").text("Time remaining: " + number + " seconds");
    intervalId = setInterval(runTimer, 1000);
}

function displayResult(result) {
    var answer;
    var src = "assets/images/"
    for (i = 0; i < trivia[quesNum].answers.length; i++) {
        if (trivia[quesNum].answers[i].value) {
            switch (i) {
                case 0:
                    answer = trivia[quesNum].answers[i].a1;
                    break;

                case 1:
                    answer = trivia[quesNum].answers[i].a2;
                    break;

                case 2:
                    answer = trivia[quesNum].answers[i].a3;
                    break;

                case 3:
                    answer = trivia[quesNum].answers[i].a4;
            }
            $("#correct-text").text("The correct answer is: " + answer);
            $("#gif").attr("src", src + trivia[quesNum].answers[i].pic);
        };
    };

    switch (result) {
        case -1:
            $("#question").text("Wrong!");
            incorrect++;
            break;
        case -2:
            $("#question").text("Unanswered!");
            unanswered++;
            break;
        default:
            correct++;
            $("#question").text("Correct!");
    }

    if (result < 0) {
        $("#correct-text").show();
    };

    $(".answer").hide();
    $("#gif").show();

    mode = 2;
    number = resultSeconds;
    intervalId = setInterval(runTimer, 1000);
};

var displayStats = function () {
    $("#question").text("All done! Here's how you did:");
    $("#correct-text").hide();
    $("#gif").hide();
    $("#stats").html("Correct answers: " + correct + "<br>Incorrect answers: " + incorrect + "<br>Unanswered: " + unanswered);
    $("#stats").show();
    $("#start").text("TRY AGAIN");
    $("#start").show();
}

$("#start").on("click", function () {
    quesNum = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    nextQuestion();
});

$(".answer").on("click", function () {
    stopTimer();
    var index = parseInt($(this).data("index"));
    if (trivia[quesNum].answers[index].value) {
        displayResult(index);
    } else {
        displayResult(-1);
    };
});