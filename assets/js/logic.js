import {questions} from "./questions.js";

const startButton = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const questionScreen = document.getElementById('questions');
const time = document.getElementById('time');
const questionTitle = document.getElementById('question-title');
const questionChoices = document.getElementById('choices');
const feedback = document.getElementById('feedback');
const finalScore = document.getElementById('final-score');
const submitButton = document.getElementById('submit');
const successAudio = new Audio('./assets/sfx/correct.wav');
const failAudio = new Audio('./assets/sfx/incorrect.wav');


let currentIndex = 0;
let score = 0;
let scores = [];
let seconds = 75;

const endGame = (timer) => {
    clearInterval(timer);
    time.innerHTML = 0;
    startScreen.classList.add('hide');
    questionScreen.classList.add('hide');
    feedback.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScore.innerText = score;
}

const reset = () => {
    questionTitle.innerText = '';
    questionChoices.innerHTML = '';
    currentIndex++;
    if (currentIndex === questions.length) {
        endGame();
    } else {
        fetchQuestion();
        setTimeout(() => {
            feedback.classList.add('hide');
            feedback.innerHTML = '';
        }, 1000);
    }
}

const answerClicked = (e) => {
    const buttonClicked = e.target.value;
    console.log(buttonClicked);
    if (buttonClicked === questions[currentIndex].answer) {
        feedback.classList.remove('hide');
        feedback.innerHTML = 'Correct!';
        score += 5;
        successAudio.play();
        reset();
    } else {
        feedback.classList.remove('hide');
        feedback.innerHTML = 'Wrong!';
        seconds -= 10;
        failAudio.play();
        reset();
    }
}

const fetchQuestion = () => {
        const question = questions[currentIndex];
        questionTitle.innerText = question.text + ' = ?';

        question.options.forEach((option) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.value = option;
            button.addEventListener('click', answerClicked);
            questionChoices.appendChild(button);
        })

}



startButton.addEventListener('click', () => {
    startScreen.classList.add('hide');
    questionScreen.classList.remove('hide');

    const timer = setInterval(() => {
        time.innerHTML = seconds;
        if (seconds < 1) {
            endGame(timer);
        }
        seconds = seconds - 1;
    }, 1000);

    fetchQuestion(currentIndex);

})

submitButton.addEventListener('click', () => {
    const initials = document.getElementById('initials').value;
    if (localStorage.getItem('scores')) {
        scores = JSON.parse(localStorage.getItem('scores'));
    }
    scores.push({'initials': initials, 'score': score})
    console.log(scores);
    localStorage.setItem('scores', JSON.stringify(scores));
    window.location.href = '/highscores.html';
});