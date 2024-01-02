const questions = [
    {'text': '5 X 5',
        'options': [
        '15',
        '35',
        '20',
        '25'],
        'answer': '25'
    },
    
    {'text': '3 X 5',
        'options': [
        '15',
        '35',
        '20',
        '25'],
        'answer': '15'
    }, 
]


const startButton = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const questionScreen = document.getElementById('questions');
const time = document.getElementById('time');
const questionTitle = document.getElementById('question-title');
const questionChoices = document.getElementById('choices');
const feedback = document.getElementById('feedback');
const finalScore = document.getElementById('final-score');


let currentIndex = 0;
let score = 0;

const reset = () => {
    questionTitle.innerText = '';
    questionChoices.innerHTML = '';
    currentIndex++;
    fetchQuestion();
    setTimeout(() => {
        feedback.classList.add('hide');
        feedback.innerHTML = '';
    }, 1000);
}

const answerClicked = (e) => {
    const buttonClicked = e.target.value;
    console.log(buttonClicked);
    if (buttonClicked === questions[currentIndex].answer) {
        feedback.classList.remove('hide');
        feedback.innerHTML = 'Correct!';
        score += 5;
        reset();
    } else {
        feedback.classList.remove('hide');
        feedback.innerHTML = 'Wrong!';
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

    let seconds = 5;
    const timer = setInterval(() => {
        time.innerHTML = seconds;
        if (seconds < 1) {
            clearInterval(timer);
            questionScreen.classList.add('hide');
            endScreen.classList.remove('hide');
            feedback.classList.add('hide');
            finalScore.innerText = score;
        }
        seconds = seconds - 1;
    }, 1000);

    fetchQuestion(currentIndex);

})