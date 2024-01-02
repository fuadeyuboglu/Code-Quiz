const scoreList = document.getElementById('highscores');
const clearButton = document.getElementById('clear');

const scoresArray = JSON.parse(localStorage.getItem('scores'));
let list = "";

// Sort the score list by descending order
scoresArray.sort((a, b) => {
    return b.score - a.score;
});

scoresArray.forEach(element => {
    list += `<li>${element.initials}-${element.score}</li>`;
});

scoreList.innerHTML = list;

clearButton.addEventListener('click', () => {
    localStorage.setItem('scores', '');
    scoreList.innerHTML = '';
});