const questions = [
    {'question': '5 X 5',
        'options': [
        '15',
        '35',
        '20',
        '25'],
        'answer': '25'
    },
    
    {'question': '3 X 5',
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
const questionScreen = document.getElementById('questions');
const time = document.getElementById('time');
const questionTitle = document.getElementById('question-title');
const questionChoices = document.getElementById('choices');
const feedback = document.getElementById('feedback');

const fetchQuestion = () => {
     // Fetching question with answers
     questionTitle.innerText = questions[0].question + ' = ?';

     const answer = questions[0].answer;
    
     choiceList = '';
 
     for (let i = 0; i <= 3; i++) {
         choiceList += `<button class='choice' value='${questions[0].options[i]}'>${questions[0].options[i]}</button>`;
     }
 
     questionChoices.innerHTML = `${choiceList}`;

     const buttonsArray = document.querySelectorAll('.choice');

     buttonsArray.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonClicked = button.value;
            if (buttonClicked === answer) {
                feedback.classList.remove('hide');
                feedback.innerHTML = 'Correct!';
            } else {
                feedback.classList.remove('hide');
                feedback.innerHTML = 'Wrong!';
            }
        })
     })
}



startButton.addEventListener('click', () => {
    startScreen.classList.add('hide');
    questionScreen.classList.remove('hide');

    let seconds = 75;
    setInterval(() => {
        seconds = seconds - 1;
        time.innerHTML = seconds;
    }, 1000);

    fetchQuestion();

})