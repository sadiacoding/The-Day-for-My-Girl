/* =========================================================
   BIRTHDAY SURPRISE WEBSITE
========================================================= */

let currentStep = 1;

/* =========================================================
   GENERAL STEP NAVIGATION
========================================================= */

function nextStep(stepNumber) {

    const current = document.getElementById(`step${currentStep}`);
    const next = document.getElementById(`step${stepNumber}`);

    if (!next) return;

    if (current) {
        current.classList.remove("active");
    }

    currentStep = stepNumber;

    next.classList.remove("active");

    // Force animation restart
    void next.offsetWidth;

    next.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (stepNumber === 7) {
        restartVaultAnimation();
    }

    if (stepNumber === 9) {
        resetGiftGame();
    }

    if (stepNumber === 11) {
        startTypewriter();
    }

    if (stepNumber === 14) {
        finalCelebration();
    }
}

/* =========================================================
   STEP 3 — FIRST PUZZLE
========================================================= */

function checkPuzzleAnswer() {

    const input = document.getElementById("puzzleAnswer");
    const message = document.getElementById("puzzleMessage");
    const nextArea = document.getElementById("puzzleNext");

    const answer = input.value.trim().toLowerCase();

    if (!answer) {
        message.textContent = "Hey… you have to give me an answer first. 👀❤️";
        return;
    }

    const correct =
        answer === "aadi" ||
        answer === "sadia";

    if (correct) {

        message.innerHTML =
            "Oh… really? 👀❤️<br>" +
            "So this is the person you think cares for you the most? 😏<br>" +
            "Maybe they feel exactly the same about you… ✨<br>" +
            "Well, I guess you found your answer. 🔓❤️";

        input.disabled = true;

        document.querySelector(
            "#step3 .magic-button:not(.hint-button)"
        ).disabled = true;

        setTimeout(() => {

            nextArea.innerHTML = `
                <button class="magic-button" onclick="nextStep(4)">
                    UNLOCK THE NEXT CHALLENGE 🔓❤️
                </button>
            `;

        }, 1200);

    } else {

        message.textContent =
            "Hmm… that answer wasn't the one I was looking for. 👀❤️ Try again.";

    }
}

function showHint(number) {

    if (number === 1) {

        document.getElementById("hint1").textContent =
            "Think about someone who feels a little different from everyone else. 👀❤️";

    } else {

        document.getElementById("hint2").textContent =
            "Go back to the first page for a moment… 👀 You might have noticed a certain name there.";

    }
}

/* =========================================================
   STEP 4 — QUIZ
========================================================= */

const quizAttempts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0
};

const quizData = {

    1: {
        answers: ["chadar", "chadar as hijab"],
        correctMessage:
            "Yes! ❤️ Chadar as hijab. I really love seeing you in that. 😌❤️",
        wrongMessages: [
            "Hmm… close, but not quite. 👀 Think about which one I notice more. ❤️",
            "Okay, My Girl… look at the two choices again. 😏❤️ You know this one.",
            "Alright, I'm giving you this one. 😌❤️ It's **Chadar as hijab**."
        ]
    },

    2: {
        answers: ["red", "red colour", "red color"],
        correctMessage:
            "RED. ❤️ Exactly! I really love seeing you in red. It suits you so beautifully. 🔥❤️",
        wrongMessages: [
            "Nope… think about the colour that catches my attention the most. 👀",
            "Not that one, My Girl. 😏 Imagine which colour I would notice first.",
            "Fine, I'll save you this time. ❤️ The answer is **Red**."
        ]
    },

    3: {
        answers: ["sidra"],
        correctMessage:
            "Sidra. ❤️ Yes, you got it. She really is the most special girl in my life. 👀❤️",
        wrongMessages: [
            "Hmm… someone's name is missing here. 👀 Think carefully.",
            "Come on, My Girl 😏 You know exactly who I'm talking about.",
            "Okay okay… I'll reveal it. ❤️ The answer is **Sidra**."
        ]
    },

    4: {
        answers: [
            "college terrace",
            "college roof",
            "college building ki chhat",
            "college chhat",
            "terrace",
            "roof",
            "chhat"
        ],
        correctMessage:
            "YES! ❤️ The college terrace. That's where our story actually started. 🏫❤️",
        wrongMessages: [
            "Not quite… go back to that very first meeting in your mind. 👀",
            "Think about where we were standing that day, My Girl. ❤️",
            "Okay, memory rescue time. 😏❤️ We first met on the **college terrace**."
        ]
    },

    5: {
        answers: [
            "nothing",
            "i said nothing",
            "i didn't say anything",
            "i did not say anything",
            "didn't say anything",
            "did not say anything"
        ],
        correctMessage:
            "Exactly! 😂❤️ **I said nothing.** That's actually what makes this memory funny. 😏",
        wrongMessages: [
            "Hmm… I think you're remembering a conversation that never happened. 😂",
            "Nope, My Girl. 😏 Think about that very first moment…",
            "Here's the truth. 😂❤️ **I said nothing.**"
        ]
    },

    6: {
        answers: [
            "rain",
            "raining",
            "rainy",
            "barish"
        ],
        correctMessage:
            "YES! 🌧️❤️ It was raining that day. Somehow even the weather became part of our first memory. ✨",
        wrongMessages: [
            "Look outside in your memory… what was falling from the sky? 🌧️👀",
            "Not quite. 😏 Think about the weather around us that day.",
            "Okay, I'll remind you. ❤️ It was **raining** when we first met. 🌧️"
        ]
    },

    7: {
        answers: [
            "white rose",
            "white rose.",
            "white",
            "rose"
        ],
        correctMessage:
            "YES! 🤍🌹 A **white rose**. You remembered the little detail I wanted you to remember. ❤️",
        wrongMessages: [
            "Hmm… think about the flower I gave you that first time. 🤍🌹",
            "Almost there, My Girl. 👀 It wasn't just any flower.",
            "I'll give you the answer. ❤️ It was a **white rose**. 🤍🌹"
        ]
    }
};

function normalizeAnswer(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[.,!?]/g, "")
        .replace(/\s+/g, " ");
}

function checkQuizAnswer(number) {

    const input = document.getElementById(`answer${number}`);
    const message = document.getElementById(`quizMessage${number}`);
    const question = document.getElementById(`question${number}`);

    if (!input || !message || !question) return;

    const answer = normalizeAnswer(input.value);

    if (!answer) {
        message.textContent =
            "You can't escape this one that easily. 😂❤️ Type an answer first.";
        return;
    }

    const data = quizData[number];

    const isCorrect = data.answers.some(correctAnswer =>
        answer === normalizeAnswer(correctAnswer)
    );

    if (isCorrect) {

        message.innerHTML = data.correctMessage;

        input.disabled = true;

        const button = question.querySelector("button");
        if (button) button.disabled = true;

        setTimeout(() => {

            question.classList.add("hidden-question");

            if (number < 7) {

                const nextQuestion =
                    document.getElementById(`question${number + 1}`);

                if (nextQuestion) {
                    nextQuestion.classList.remove("hidden-question");
                }

            } else {

                document.getElementById("quizComplete")
                    .classList.remove("hidden");

            }

        }, 3000);

        return;
    }

    quizAttempts[number]++;

    const attempt = quizAttempts[number];

    if (attempt < 3) {

        message.textContent =
            data.wrongMessages[attempt - 1] ||
            "Hmm… think again. 👀❤️";

    } else {

        message.innerHTML = data.wrongMessages[2];

        input.disabled = true;

        const button = question.querySelector("button");
        if (button) button.disabled = true;

        /*
           IMPORTANT:
           After the third wrong attempt, the user does NOT
           have to type the revealed answer.
        */

        setTimeout(() => {

            question.classList.add("hidden-question");

            if (number < 7) {

                const nextQuestion =
                    document.getElementById(`question${number + 1}`);

                if (nextQuestion) {
                    nextQuestion.classList.remove("hidden-question");
                }

            } else {

                document.getElementById("quizComplete")
                    .classList.remove("hidden");

            }

        }, 4000);
    }
}

/* =========================================================
   STEP 5 — MATHEMATICS
========================================================= */

let mathQuestionNumber = 1;
let mathAttempts = 0;

function checkMathAnswer() {

    const input = document.getElementById("mathAnswer");
    const message = document.getElementById("mathMessage");
    const question = document.getElementById("mathQuestion");

    const answer = normalizeAnswer(input.value);

    if (!answer) {
        message.textContent = "Come on, My Girl… give me a number first. 😏🧮";
        return;
    }

    let correct = false;

    if (mathQuestionNumber === 1) {
        correct = answer === "42";
    }

    if (mathQuestionNumber === 2) {
        correct =
            answer === "no" ||
            answer === "nope" ||
            answer === "not equal";
    }

    if (mathQuestionNumber === 3) {
        correct =
            answer === "3/8" ||
            answer === "0.375" ||
            answer === "37.5" ||
            answer === "37.5%";
    }

    if (correct) {

        if (mathQuestionNumber === 1) {

            message.textContent =
                "YES! 🧮❤️ 42 is correct. You still remember your maths. 😏";

            setTimeout(() => {

                mathQuestionNumber = 2;
                mathAttempts = 0;
                input.value = "";

                question.innerHTML = `
                    2. A number is increased by 20% and then decreased by 20%.
                    <br><br>
                    Is the final number equal to the original number? 👀
                `;

                message.textContent = "";

            }, 3000);

        } else if (mathQuestionNumber === 2) {

            message.textContent =
                "Exactly! 👀🧮 No, it doesn't return to the original number. Nice one, My Girl. ❤️";

            setTimeout(() => {

                mathQuestionNumber = 3;
                mathAttempts = 0;
                input.value = "";

                question.innerHTML = `
                    3. A fair coin is tossed 3 times.
                    <br><br>
                    What is the probability of getting exactly 2 Heads?
                `;

                message.textContent = "";

            }, 3200);

        } else {

            message.textContent =
                "YES! 🧮❤️ 3/8 = 0.375 = 37.5%. Mathematics survived. 😂";

            input.disabled = true;

            setTimeout(() => {

                document.getElementById("mathArea")
                    .classList.add("hidden");

                document.getElementById("mathComplete")
                    .classList.remove("hidden");

            }, 3200);
        }

        return;
    }

    mathAttempts++;

    if (mathAttempts === 1) {

        message.textContent =
            "Hmm… that's not it. 🤔 Take another look at the numbers.";

    } else if (mathAttempts === 2) {

        message.textContent =
            "Okay, My Girl 😏🧮 Slow down and think about the pattern.";

    } else {

        if (mathQuestionNumber === 1) {
            message.textContent =
                "I'll save you this time. ❤️ The answer is 42.";
        }

        if (mathQuestionNumber === 2) {
            message.textContent =
                "Here's the little trick. 😏 The answer is NO.";
        }

        if (mathQuestionNumber === 3) {
            message.textContent =
                "The answer is 3/8, or 37.5%. ❤️";
        }

        input.disabled = true;

        setTimeout(() => {

            if (mathQuestionNumber < 3) {

                mathQuestionNumber++;
                mathAttempts = 0;
                input.disabled = false;
                input.value = "";
                message.textContent = "";

                if (mathQuestionNumber === 2) {
                    question.innerHTML = `
                        2. A number is increased by 20% and then decreased by 20%.
                        <br><br>
                        Is the final number equal to the original number? 👀
                    `;
                }

                if (mathQuestionNumber === 3) {
                    question.innerHTML = `
                        3. A fair coin is tossed 3 times.
                        <br><br>
                        What is the probability of getting exactly 2 Heads?
                    `;
                }

            } else {

                document.getElementById("mathArea")
                    .classList.add("hidden");

                document.getElementById("mathComplete")
                    .classList.remove("hidden");

            }

        }, 3500);
    }
}

/* =========================================================
   STEP 6 — MEMORY CHALLENGE
========================================================= */

function selectMemoryPhoto(number) {

    const message = document.getElementById("memoryMessage1");

    if (number === 0) {

        message.innerHTML =
            "Right. ❤️ Your smile is your real beauty… and you're not smiling in any of these. 😊❤️";

    } else {

        message.innerHTML =
            "Nope. 😂❤️ Not any of these… because you're not smiling in any of them. " +
            "Your smile is the real beauty I love seeing. ❤️✨";
    }

    document.querySelectorAll("#memoryPart1 .photo-option")
        .forEach(photo => photo.style.pointerEvents = "none");

    document.querySelector("#memoryPart1 .none-button")
        .disabled = true;

    setTimeout(() => {

        document.getElementById("memoryPart1")
            .classList.add("hidden");

        document.getElementById("memoryPart2")
            .classList.remove("hidden");

    }, 5000);
}

function selectMakeupPhoto(number) {

    const message = document.getElementById("memoryMessage2");

    if (number === 1) {

        message.innerHTML =
            "Nope. 😏❤️ You're so beautiful that you don't need makeup to look beautiful. " +
            "You look gorgeous even without it. ✨";

    } else {

        message.innerHTML =
            "Absolutely. ❤️ You're so beautiful that you don't need makeup at all. " +
            "You're beautiful just the way you are. ✨";
    }

    document.querySelectorAll("#memoryPart2 .photo-option")
        .forEach(photo => photo.style.pointerEvents = "none");

    setTimeout(() => {

        document.getElementById("memoryPart2")
            .classList.add("hidden");

        document.getElementById("memoryPart3")
            .classList.remove("hidden");

    }, 5000);
}

function checkFavoriteMemory() {

    const input = document.getElementById("memoryFavorite");
    const message = document.getElementById("memoryMessage3");

    if (!input.value.trim()) {

        message.textContent =
            "You have to choose one… or at least pretend you can. 😂❤️";

        return;
    }

    message.innerHTML =
        "The right answer was… **ALL OF THEM. ❤️**<br><br>" +
        "Every picture has something different, but in every picture, " +
        "there's one thing I love most — YOU. ❤️<br>" +
        "So how could I choose just one? 🥹❤️";

    input.disabled = true;

    document.querySelector("#memoryPart3 button")
        .disabled = true;

    setTimeout(() => {

        document.getElementById("memoryPart3")
            .classList.add("hidden");

        document.getElementById("memoryComplete")
            .classList.remove("hidden");

    }, 6000);
}

/* =========================================================
   STEP 7 — MEMORY VAULT
========================================================= */

function restartVaultAnimation() {

    const items = document.querySelectorAll(".vault-item");

    items.forEach(item => {

        item.style.animation = "none";

        void item.offsetWidth;

        item.style.animation = "";

    });
}

/* =========================================================
   STEP 8 — NO BUTTON
========================================================= */

function moveNoButton() {

    const button = document.getElementById("noButton");

    if (!button) return;

    const maxX = Math.min(180, window.innerWidth / 3);
    const maxY = 100;

    const x = Math.random() * (maxX * 2) - maxX;
    const y = Math.random() * (maxY * 2) - maxY;

    button.style.transform =
        `translate(${x}px, ${y}px) rotate(${Math.random() * 20 - 10}deg)`;

    document.getElementById("noMessage").textContent =
        "Nice try. 😂 You don't get to choose NO that easily.";
}

function acceptGift() {

    document.getElementById("noMessage").textContent =
        "I knew you'd say YES. 😏❤️";

    document.getElementById("giftStart")
        .classList.remove("hidden");

    createConfetti(35);
}

/* =========================================================
   STEP 9 — GIFT GAME
========================================================= */

let correctGiftBox = 7;
let giftGameLocked = false;

function resetGiftGame() {

    giftGameLocked = false;

    const boxes = document.querySelectorAll(".gift-box");

    boxes.forEach(box => {

        box.disabled = false;

        box.classList.remove(
            "wrong-box",
            "correct-box"
        );

        box.style.visibility = "visible";
    });

    document.getElementById("giftMessage").textContent = "";

    document.getElementById("giftComplete")
        .classList.add("hidden");

    // Fixed secret box for this game
    correctGiftBox = 7;
}

function chooseGift(number) {

    if (giftGameLocked) return;

    const boxes = document.querySelectorAll(".gift-box");
    const selected = boxes[number - 1];

    if (!selected) return;

    if (number === correctGiftBox) {

        giftGameLocked = true;

        selected.classList.add("correct-box");

        boxes.forEach(box => box.disabled = true);

        document.getElementById("giftMessage").innerHTML =
            "WAIT… 👀❤️<br>" +
            "You found the hidden one! 🎁✨";

        createConfetti(70);

        setTimeout(() => {

            document.getElementById("giftComplete")
                .classList.remove("hidden");

        }, 1800);

    } else {

        selected.disabled = true;

        selected.classList.add("wrong-box");

        document.getElementById("giftMessage").textContent =
            "BOOM! 😂💥 Not this one! The search continues… 👀🎁";

        setTimeout(() => {

            selected.style.visibility = "hidden";

            document.getElementById("giftMessage").textContent =
                "Nope! 😂 That box didn't have it. Keep searching… 👀❤️";

        }, 850);
    }
}

/* =========================================================
   STEP 10 — CAKE
========================================================= */

function blowCandles() {

    const cake = document.getElementById("birthdayCake");
    const button = document.getElementById("blowCandlesButton");
    const message = document.getElementById("cakeMessage");
    const final = document.getElementById("cakeFinal");

    if (cake.classList.contains("cake-blown")) return;

    cake.classList.add("cake-blown");

    button.disabled = true;

    message.innerHTML =
        "WHOOOOSH! 💨✨<br>" +
        "All the candles are out! ❤️";

    createConfetti(90);

    setTimeout(() => {

        final.classList.remove("hidden");

    }, 2800);
}

function cutCake() {

    const cake = document.getElementById("birthdayCake");
    const button = document.getElementById("cakeNext");
    const message = document.getElementById("cakeMessage");

    button.disabled = true;

    message.textContent =
        "Wait… the cake is cutting itself. 👀🎂✨";

    cake.classList.add("cutting");

    createConfetti(80);

    setTimeout(() => {

        nextStep(11);

    }, 2500);
}

/* =========================================================
   STEP 11 — TYPEWRITER
========================================================= */

let typewriterStarted = false;

function startTypewriter() {

    if (typewriterStarted) return;

    typewriterStarted = true;

    const element =
        document.getElementById("typewriterMessage");

    const nextButton =
        document.getElementById("messageNext");

    const text =
`My Girl… ❤️

I don't know if words can ever completely explain what you mean to me.

But today, I just want you to know one thing.

You are incredibly special to me. ❤️

The memories we've made, the little moments, the silly conversations, the things that made us laugh…

I remember them.

And I value them more than you probably realize. ✨

So on your birthday, I don't just wish you another year.

I wish you happiness.

Real happiness.

The kind that stays.

Happy Birthday, My Girl. 🎂❤️`;

    element.textContent = "";

    let index = 0;

    function type() {

        if (index < text.length) {

            element.textContent += text.charAt(index);
            index++;

            setTimeout(type, 32);

        } else {

            setTimeout(() => {

                nextButton.classList.remove("hidden");

            }, 1600);
        }
    }

    type();
}

/* =========================================================
   STEP 12 — LOVE QUESTION
========================================================= */

function moveLoveNoButton() {

    const button = document.getElementById("loveNoButton");

    if (!button) return;

    const x =
        Math.random() * 260 - 130;

    const y =
        Math.random() * 130 - 65;

    button.style.transform =
        `translate(${x}px, ${y}px) rotate(${Math.random() * 18 - 9}deg)`;

    document.getElementById("loveMessage").textContent =
        "Hmm… that NO button seems to be running away. 😂❤️";
}

function loveYes() {

    const message =
        document.getElementById("loveMessage");

    const next =
        document.getElementById("loveNext");

    message.innerHTML =
        "I KNEW IT. 😏❤️<br><br>" +
        "You have no idea how happy that made me. ✨❤️";

    createConfetti(55);

    setTimeout(() => {

        next.classList.remove("hidden");

    }, 2800);
}

/* =========================================================
   STEP 13 — HER MESSAGE
========================================================= */

function saveHerMessage() {

    const textarea =
        document.getElementById("herMessage");

    const result =
        document.getElementById("herMessageResult");

    const finalArea =
        document.getElementById("finalButtonArea");

    const message = textarea.value.trim();

    if (!message) {

        result.textContent =
            "Write something first, My Girl. ❤️ Even a few words are enough.";

        return;
    }

    try {
        localStorage.setItem(
            "birthdayHerMessage",
            message
        );
    } catch (error) {
        // Site still works if localStorage is unavailable.
    }

    result.innerHTML =
        "Your message is saved. ❤️<br>" +
        "And now… there's only one thing left. 👀✨";

    textarea.disabled = true;

    finalArea.classList.remove("hidden");

    createConfetti(45);
}

/* =========================================================
   STEP 14 — FINAL SURPRISE
========================================================= */

function finalCelebration() {

    createConfetti(120);

    createHeartExplosion(45);

    setTimeout(() => {
        createConfetti(100);
    }, 1600);

    setTimeout(() => {
        createHeartExplosion(30);
    }, 2300);
}

/* =========================================================
   CONFETTI
========================================================= */

function createConfetti(amount = 50) {

    let container =
        document.querySelector(".confetti-container");

    if (!container) {

        container = document.createElement("div");

        container.className =
            "confetti-container";

        document.body.appendChild(container);
    }

    const pieces = [
        "❤️",
        "💕",
        "✨",
        "💗",
        "🌸",
        "🎀",
        "⭐"
    ];

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.textContent =
            pieces[Math.floor(Math.random() * pieces.length)];

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.fontSize =
            (12 + Math.random() * 20) + "px";

        piece.style.setProperty(
            "--drift",
            `${Math.random() * 240 - 120}px`
        );

        piece.style.animationDuration =
            (2 + Math.random() * 2) + "s";

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 4500);
    }
}

/* =========================================================
   HEART EXPLOSION
========================================================= */

function createHeartExplosion(amount = 30) {

    const container =
        document.createElement("div");

    container.className =
        "confetti-container";

    document.body.appendChild(container);

    for (let i = 0; i < amount; i++) {

        const heart =
            document.createElement("div");

        heart.textContent =
            Math.random() > 0.5 ? "❤️" : "💕";

        heart.style.position = "absolute";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.fontSize =
            (18 + Math.random() * 25) + "px";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            180 + Math.random() * 420;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        heart.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.2)`,
                    opacity: 0
                }
            ],
            {
                duration: 1500 + Math.random() * 1200,
                easing: "cubic-bezier(.2,.8,.2,1)",
                fill: "forwards"
            }
        );

        container.appendChild(heart);
    }

    setTimeout(() => {
        container.remove();
    }, 3200);
}

/* =========================================================
   ENTER KEY SUPPORT
========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key !== "Enter") return;

    const activeStep =
        document.querySelector(".step.active");

    if (!activeStep) return;

    const input =
        document.activeElement;

    if (!input) return;

    if (input.id === "puzzleAnswer") {
        checkPuzzleAnswer();
    }

    if (
        input.id &&
        input.id.startsWith("answer")
    ) {

        const number =
            Number(input.id.replace("answer", ""));

        if (number >= 1 && number <= 7) {
            checkQuizAnswer(number);
        }
    }

    if (input.id === "mathAnswer") {
        checkMathAnswer();
    }

    if (input.id === "memoryFavorite") {
        checkFavoriteMemory();
    }
});