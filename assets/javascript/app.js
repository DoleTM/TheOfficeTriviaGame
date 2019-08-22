$(document).ready(function () {

    var fps = 50; // 50 frames per second
    var seconds = 30; // Current amount of seconds

    var myGameArea = {
        canvas: $("canvas").get()[0],
        mode: "intro",
        userPresent: true,

        // Display questions
        display() {
            const subject = myGameStats.subject;
            if (_G.myQuestions[subject].length <= myGameStats.question) {
                this.end();
                return;
            };
            const question = _G.myQuestions[subject][myGameStats.question];
            this.mode = "transition";
            $("#transition").css("display", "block");
            setTimeout(() => {
                $("#transition").css("display", "none");
                frame = 0;
                this.mode = "playing";
            }, 2000);
            // Reset timer
            seconds = 30;
            $("#time").css("color", "white");
            $("#time").text(seconds);

            // Reset text
            $('#question').text(question.q);
            $('#choices').html(''); // Clearing answer choices
            let currChoices = question.choices.slice();
            let newChoice = "<div class='tab'> <p>Replacement</p> <img src='assets/images/btn2.png' height='100%' width='100%' style='position:absolute;display:block;left:0;'> </div>"
            let correctBtn = $(newChoice.replace("Replacement", question.a));

            for (var i = 0; i < question.choices.length; i++) {
                const randomIndex = Math.floor(Math.random() * currChoices.length);
                $('#choices').append($(newChoice.replace("Replacement", currChoices[randomIndex])));
                currChoices.splice(randomIndex, 1);
            };

            const randomIndex = Math.floor(Math.random() * (question.choices.length + 1));
            if (randomIndex == question.choices.length) {
                $("#choices").append(correctBtn);
            }
            else {
                correctBtn.insertBefore($("#choices").children()[randomIndex]);
            };

            $("#choices .tab").on("click", function (event) {
                $("#choices .tab").off("click"); // Turn off event listener
                myGameArea.mode = "transition";
                $("#choices .tab img").css("filter", "grayscale(1) brightness(0.75)");
                if (this == correctBtn.get()[0]) {
                    myGameStats.correct++;
                }
                else {
                    $(this).find("img").css("filter", "brightness(1)");
                    myGameStats.incorrect++;
                };
                correctBtn.find("img").css("filter", "hue-rotate(100deg) brightness(1)"); // Displays correct answer
                setTimeout(function () {
                    myGameStats.question++;
                    myGameArea.display(subject);
                }, 2000);
            });
        },

        timer() {
            let dispSeconds = seconds; // Creating variable to store current seconds
            if (seconds < 10) {
                if (seconds == 9) {
                    $("#countdown").get()[0].play();
                };
                dispSeconds = "0" + dispSeconds;
                $("#time").css({ "color": "red", "font-size": "44px", "opacity": 0.5 });
                $("#time").animate({ "font-size": "32px", "opacity": 1 }, 300);
            }

            if (seconds <= 0) {
                const tabs = $("#choices .tab");
                tabs.off("click"); // Turn off answer choices click listener
                tabs.find("img").css("filter", "brightness(1)");

                // Find correct answer and highlight it
                for (let i = 0; i < tabs.length; i++) {
                    let choice = $(tabs[i]);
                    if (choice.find("p").text() == _G.myQuestions[myGameStats.subject][myGameStats.question].a) {
                        choice.find("img").css("filter", "hue-rotate(100deg) brightness(1)");
                    };
                };

                $("#countdown").get()[0].currentTime = 18;
                setTimeout(() => {
                    myGameStats.question++;
                    // Checking if user is still playing
                    if (this.userPresent) {
                        setTimeout(() => {
                            this.display();
                        }, 1000);
                    }
                    else {
                        $("#game-container").css("display", "none");
                        $("#pause-screen").slideDown();
                        clearInterval(this.interval);
                    };
                }, 3000);
            };
            $("#time").text(dispSeconds);
        },
        // End screen
        end() {
            this.mode = "end";
            $("#game-container").css("display", "none");
            let total = _G.myQuestions[myGameStats.subject].length;
            $("#correct-text").text(myGameStats.correct);
            $("#incorrect-text").text(myGameStats.incorrect);
            $("#unanswered").text(total - myGameStats.correct - myGameStats.incorrect);
            $("#end-screen").css("display", "block");
            myGameStats.scar = myGameStats.correct / total < 0.7 || true;
        },
    };

    var myGameStats = {
        incorrect: 0,
        correct: 0,
        question: 0,
        subject: 'The Office',
        scar: false,
        reset: function () {
            var arr = Object.keys(this);
            for (var i = 0; i < arr.length; i++) {
                let prop = this[arr[i]];
                if (typeof (prop) == "number") {
                    this[arr[i]] = 0;
                };
            };
        },
    };

    // Starting the game
    $("#play").on("click", function () {
        myGameStats.reset();
        $("#intro-container").css("display", "none");
        $("#game-container").css("display", "block");
        myGameArea.display();
    });

    // Resume the game
    $("#resume").on("click", function () {
        $("#pause-screen").slideUp(function () {
            myGameArea.interval = setInterval(updateGameArea, 1000 / fps);
            myGameArea.display();
            $("#game-container").css("display", "block");
        });
    });

    // Restart the game
    $("#play-again").on("click", function () {
        $("#end-screen").css("display", "none");
        myGameStats.reset();
        $("#game-container").css("display", "block");
        myGameArea.display();
    });

    // When the user comes back to the page
    $(window).focus(function () {
        myGameArea.userPresent = true;
    });

    // When the user leaves the page
    $(window).blur(function () {
        myGameArea.userPresent = false;
    });
});