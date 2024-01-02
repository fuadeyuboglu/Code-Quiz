const startButton = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('questions');
const time = document.getElementById('time');



startButton.addEventListener('click', () => {
    startScreen.classList.add('hide');
    questionScreen.classList.remove('hide');

    let seconds = 75;
    setInterval(() => {
        seconds = seconds - 1;
        time.innerHTML = seconds;
    }, 1000);
})