var eggs = document.querySelectorAll('img');
var livesImages = document.getElementById('lives');
var titleDisplay = document.getElementById('title-display');
var blankSpaces = document.getElementById('blank-spaces');
var answerList = document.querySelectorAll('li');
var levelDisplay = document.getElementById('level-display');
var biggerBoard = document.querySelectorAll('.level-up-invisible');
var rightHalf = document.getElementById('right-half');
var directions = document.createElement('h2');
var score=document.getElementById('score')
var t1 = document.getElementById('t1');
var t2 = document.getElementById('t2');
var t3 = document.getElementById('t3');
var t4 = document.getElementById('t4');
var t5 = document.getElementById('t5');
var t6 = document.getElementById('t6');
var t7 = document.getElementById('t7');
var t8 = document.getElementById('t8');
var t9 = document.getElementById('t9');
var l1 = document.getElementById('l1');
var l2 = document.getElementById('l2');
var l3 = document.getElementById('l3');
var l4 = document.getElementById('l4');
var l5 = document.getElementById('l5');
var l6 = document.getElementById('l6');
var l7 = document.getElementById('l7');




var lifeLoss;
var lives = [];

function initGame(){
    gameWon = false;
    gameOver = false;
    lifeLoss = false;
    addClickListener()
    answerDisplay();
    completedWords.length = 0;
    lettersPlayed.length = 0;
    levelDisplay.textContent = "Level: " + (level + 1);
    lifeCreator();
    boardLetterAssigner();
}

window.addEventListener('DOMContentLoaded', function() {
    initGame();
  });

function nextLevel(){
    level+=1;
    lettersPlayed.length = 0;
    completedWords.length = 0;
    addClickListener()
    answerDisplay();
    lives.length = 5;
    completedWords = [];
    lettersPlayed = [];
    gameWon = false;
    gameOver = false;
    lifeLoss = false;
    levelDisplay.textContent = "Level: " + (level + 1);
    score.innerText="score : " +level*10;
    titleDisplay.textContent = "word scramble";
    for(let cube of wordTable){
        cube.style.borderColor = "black";
    }
    levelUp();
    boardLetterAssigner();
}

function checkForWin() {
    var enteredWord = lettersPlayed.join('');
    var correct = false;
    levelsArray[level].levelAnswers.forEach(function(item) {
        if (item.includes(enteredWord)) {
            correct = true;
        }
    });
    if (!correct) {
        lives.shift();
        livesImages.removeChild(livesImages.lastChild);
        lettersPlayed.length = 0;
        completedWords.length = 0;
        addClickListener();
        answerDisplay();
    };
    if(levelsArray[level].levelAnswers.includes(lettersPlayed.join(''))){
        completedWords.push(this.lettersPlayed.join(''));
        for(let w = 0; w < blankSpaces.childElementCount; w++){
            if(this.lettersPlayed.join('').length === blankSpaces.childNodes[w].textContent.length){
                blankSpaces.childNodes[w].textContent = this.lettersPlayed.join('');
            }
        }
        lettersPlayed.length = 0;
    };    
    if(completedWords.length === levelsArray[level].levelAnswers.length){
    titleDisplay.textContent = "Level Complete!";
    setTimeout(nextLevel, 500);
    }
}

function answerDisplay(){
    blankSpaces.textContent = "";
    for(let word of levelsArray[level].levelAnswers){
        let wordArray = word.length;
        let space = "_"
        let newLi = document.createElement('li');
        newLi.textContent = space.repeat(wordArray);
        blankSpaces.appendChild(newLi);
    }
}

function addClickListener(){
    var tableElements = [t1,t2,t3,t4,t5,t6,t7,t8,t9,l1,l2,l3,l4,l5,l6,l7];
    tableElements.forEach(function(element){
        element.addEventListener('click',letterPush);
        element.style.borderColor = "black";
    })
}

function letterPush(){
    lettersPlayed.push(event.target.textContent);
    event.target.style.borderColor = "violet";
    event.target.removeEventListener('click', letterPush);
    levelCheck();
    checkForWin();
}

function lifeCreator (){
  while(livesImages.firstChild)
  livesImages.removeChild(livesImages.firstChild);
    for(let i = 0; i < 5; i++){
        let eggs = document.createElement('img');
        eggs.src = levelsArray[level].image;
        lives.push(eggs);
        livesImages.appendChild(eggs);
        console.log(livesImages)
    }
            
}

function lifeCount(){
    titleDisplay.textContent = ("Life Lost. " + lives.length + " left.");
    lettersPlayed.length = 0;
    completedWords.length=0;
}

function levelUp(){
    if(level >= 7 ){
        for(let i = 0; i < biggerBoard.length; i++){
            biggerBoard[i].className = "level-up-bigger";
        }
    }    
}


function boardLetterAssigner(){
    t1.textContent = levelsArray[level].board[0];
    t2.textContent = levelsArray[level].board[1];
    t3.textContent = levelsArray[level].board[2];
    t4.textContent = levelsArray[level].board[3];
    t5.textContent = levelsArray[level].board[4];
    t6.textContent = levelsArray[level].board[5];
    t7.textContent = levelsArray[level].board[6];
    t8.textContent = levelsArray[level].board[7];
    t9.textContent = levelsArray[level].board[8];

    l1.textContent = levelsArray[level].board[9];
    l2.textContent = levelsArray[level].board[10];
    l3.textContent = levelsArray[level].board[11];
    l4.textContent = levelsArray[level].board[12];
    l5.textContent = levelsArray[level].board[13];
    l6.textContent = levelsArray[level].board[14];
    l7.textContent = levelsArray[level].board[15];
}

function levelCheck(){
    if (level==10){
        alert(score.innerText)
        setTimeout(()=>{quit()},100);
    }

    if(level === 9 && (completedWords.length === levelsArray[level].levelAnswers.length)){
        titleDisplay.textContent = " Congratulations!";
        setTimeout(()=>{quit()},1000)
    }
    if(lives.length === 0){
        titleDisplay.textContent = "Game Over";
        quit();
    }else if(lives.length >= 1)
        titleDisplay.textContent = "word scramble";
}

