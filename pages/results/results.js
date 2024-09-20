const resultsBlock = document.querySelector('.results-block')
const resultsBtn = document.querySelector('.results-btn')

let myScore = localStorage.getItem('gameResults');


if (myScore == 30) {
    resultsBlock.innerHTML = `Поздравляем с победой!!! Вы прошли викторину и набрали ${myScore} из 30`
} else if (myScore > 0){
    resultsBlock.innerHTML = `Поздравляем! Вы прошли викторину и набрали ${myScore} из 30`
} else {
    resultsBlock.innerHTML = `Пройдите викторину, нажав на вкладку Quiz`
}


resultsBtn.addEventListener('click', function(){
    window.location.href = '../quiz/quiz.html';
    return false;
})