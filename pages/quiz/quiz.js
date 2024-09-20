import {birdsData} from '../../js/birds.js';

let currentArrData = 0 


const questionGroup = document.querySelectorAll('.menu_item');

const imgQuestion = document.querySelector('.img-question');
const questionNameBird = document.querySelector('.question-name-bird');
let audio = document.querySelector('#audio');
let answerBlock = document.querySelector('.answer-variants')

const answersArr = document.querySelectorAll('.div-answer')
const nextButton = document.querySelector('.next-btn')
const headerScore = document.querySelector('.header-score')
let imageAnswer = document.querySelector('.image-answer')
const descriptionBlock = document.querySelector('.description-block')
const questionAudio = document.querySelector('#audio-answer')
let descriptionName = document.querySelector('.description-name')
const descriptionEnName = document.querySelector('.english-name')
let descriptionText = document.querySelector('.description-text')
const correctAnswerIntro = document.querySelector('.correct-answer-intro')

let randomNumber = 0

randomQuestion(birdsData[currentArrData])


function randomQuestion (currentArray){
    
    randomNumber = Math.floor(Math.random() * (6)) + 0; 
    audio.setAttribute('src', birdsData[currentArrData][randomNumber].audio)
     
    questionNameBird.innerHTML = '*****';
    descriptionBlock.style.display = 'none';
    questionAudio.style.display = 'none';
    descriptionText.style.display = 'none';
    correctAnswerIntro.style.display = 'block'
    
   birdsData[currentArrData].map(answer => {
        answerVariant(answer)
    
    })
    
    questionGroup[currentArrData].className = 'menu_item active'
    return currentArray[randomNumber].id, randomNumber     
}


let isCorrect = false


function answerVariant(element){
    const divContainerForAnswer = document.createElement('div')
    divContainerForAnswer.className = 'each-answer'
        let divAnswer = document.createElement('div');
        let divColorAnswer = document.createElement('div');
        divColorAnswer.className = 'answer-color'
        divAnswer.className = 'div-answer'
        divAnswer.innerHTML = element.name

        divContainerForAnswer.append(divColorAnswer)
        divContainerForAnswer.append(divAnswer)
      
       answerBlock.append(divContainerForAnswer)
 
    
    divAnswer.addEventListener('click', function(){
        correctAnswerIntro.style.display = 'none'
        descriptionBlock.style.display = 'block';
        questionAudio.style.display = 'block';
        descriptionText.style.display = 'block';
        imageAnswer.setAttribute('src',  element.image)
        descriptionName.innerHTML = element.name
        descriptionEnName.innerHTML = element.species
        descriptionText.innerHTML = element.description

        let audioAnswer = document.querySelector('#audio-answer');

        audioAnswer.setAttribute('src', element.audio)
        
        
        checkCorrect(element,divColorAnswer)
        playClick(isCorrect)
      

       if(!isCorrect){
        divColorAnswer.style.backgroundColor = 'red' 
       }
    })  
}

let score = 5

let correctAudio = new Audio('../../assets/audio/correct.mp3')


function playClick(isCorrect) {

    let wrongAudio = new Audio('../../assets/audio/wrong.mp3')
 
    if (!isCorrect){
        wrongAudio.play()  
    } 
}

let scoreRound = 0
let totalScore = 0
headerScore.innerHTML =  `Score: ${totalScore}` 

function checkCorrect (element, divColorAnswer){
    
    if (element.id === birdsData[currentArrData][randomNumber].id) {
        isCorrect = true
        nextButton.removeAttribute('disabled')
        imgQuestion.setAttribute('src', birdsData[currentArrData][randomNumber].image)
        questionNameBird.innerHTML = birdsData[currentArrData][randomNumber].name
        correctAudio.play()
        audio.pause()
        divColorAnswer.style.backgroundColor = 'green' 
       } 

       if(!(element.id === birdsData[currentArrData][randomNumber].id)){
        if(!isCorrect) {
            score--
            console.log(`Score: ${score}`)
        }
       
       } else {
        scoreRound += score 
        totalScore += scoreRound
        console.log(`scoreRound: ${scoreRound}`)
        console.log(`totalScore: ${totalScore}`)
       }
     
       headerScore.innerHTML =  `Score: ${totalScore}` 
       console.log(`HeadertotalScore: ${totalScore}`)

       if (currentArrData === questionGroup.length-1){
        localStorage.setItem('gameResults', totalScore);
    }
}
 

nextButton.addEventListener('click', function(){
    currentArrData++
    let divAnswererd = document.querySelectorAll('.each-answer');
    divAnswererd.forEach(forEl => forEl.remove())
    nextButton.setAttribute('disabled', 'true')
    imgQuestion.setAttribute('src', '../../assets/img/bird-zaglushka.jpg')
    questionNameBird.innerHTML = '*****'
    questionGroup[currentArrData - 1].className = 'menu_item'
    isCorrect = false
    scoreRound = 0
    score = 5

    
    randomQuestion(birdsData[currentArrData])
    console.log(birdsData[currentArrData])

    if (currentArrData === questionGroup.length-1){
        nextButton.innerHTML = 'Results'
        nextButton.addEventListener('click',function() {
            window.location.href = '../results/results.html';
            return false;
        }) 
    }
})

// console.log('230/270')
// console.log('Вёрстка, дизайн, UI всех трёх страниц приложения +60')
// console.log('стандартный HTML5 +10')
// console.log('Верхняя панель страницы викторины +20')
// console.log('Блок с вопросом +20')
// console.log('Блок с вариантами ответов (названия птиц) +60')
// console.log('Блок с описанием птицы: +30')
// console.log('Кнопка перехода к следующему вопросу +30')



