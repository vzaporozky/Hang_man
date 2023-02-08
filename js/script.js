let letters_main = document.querySelector('.letters');
let word_displayed = document.querySelector('.word');
let lives_result = document.querySelector('.lives_result');
let clue = document.querySelector('.clue');
let stick_man = document.querySelector('.stick_man');
let buttons = document.querySelector('.buttons');
let category_main = document.querySelector('.category');

let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'];

let arrCategor = [
    ["everton", "liverpool", "swansea", "chelsea", "hull"],
    ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
    ["manchester", "milan", "madrid", "amsterdam", "prague"]
];

let arrHint = [
    ["Based in Mersyside", "Based in Mersyside", 
    "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", 
    "Once managed by Phil Brown"],

    ["Science-Fiction horror film", "1971 American action film", "Historical drama", 
    "Anamated Fish", "Giant great white shark"],

    ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", 
    "Netherlands capital", "Czech Republic capital"]
];

let category = [
    "The Chosen Category Is Premier League Football Teams", 
    "The Chosen Category Is Films", 
    "The Chosen Category Is Cities"];

let indexArr, indexWord, indexCategor;

function createLetter(letters_main, arrLetter){
    let letter = document.createElement('div');
    letter.classList.add('letter');
    letter.innerHTML = arrLetter;
    letters_main.append(letter);
}

function randomWord(){
    indexArr = Math.floor(Math.random()*3);
    indexWord = Math.floor(Math.random()*5);
    return [arrCategor[indexArr][indexWord], arrHint[indexArr][indexWord], category[indexArr]]
}

function displayWord(word){
    word_displayed.innerHTML = '';
    for(let i = 0; i < word.length; i++){
        if(word[i] == '-'){
            word_displayed.append('- ');
        }
        else{
            word_displayed.append('_ ');
        }
    } 
}
  
head = function(){
    myStickman = document.querySelector(".stick_man");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
}
    
draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    myStickman = document.querySelector(".stick_man");
    context = myStickman.getContext('2d');
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
}

frame1 = function() {draw (0, 150, 150, 150)}
frame2 = function() {draw (10, 0, 10, 600)}
frame3 = function() {draw (0, 5, 70, 5)}
frame4 = function() {draw (60, 5, 60, 15)}
torso = function() {draw (60, 36, 60, 70)}
rightArm = function() {draw (60, 46, 100, 50)}
leftArm = function() {draw (60, 46, 20, 50)}
rightLeg = function() {draw (60, 70, 100, 100)}
leftLeg = function() {draw (60, 70, 20, 100)}

drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 

//====================================================================================================================================================================
function createHtmlGame(){
    lives_result.innerHTML = 'You have <span class="count">10</span> lives'
    let counter = document.querySelector('.count');
    let count = 10;

    let stickCount = 9;
    let nextStick;

    letters_main.innerHTML = '';

    for(let i = 0; i < alphabet.length; i++){
        createLetter(letters_main, alphabet[i])
    }

    let wr = randomWord();

    category_main.innerHTML = wr[2];

    displayWord(wr[0]);

    letters_main.onclick = function(event){
        let copyWord = wr[0];
        let copyWordDisplayed = word_displayed.innerHTML.split(' ')

        if(!event.target.classList.contains('selected')){
            for(let i = 0; i < copyWord.length; i++){
                let index = wr[0].indexOf(event.target.innerHTML);
                if(index >= 0){
                    event.target.classList.add('selected');
                    copyWordDisplayed[index] = copyWord[index];
                    word_displayed.innerHTML = copyWordDisplayed.join(' ');
                    if(copyWordDisplayed.indexOf('_') < 0){
                        if(lives_result.innerHTML != "You lose!"){
                            lives_result.innerHTML = 'You Win!';
                        }
                    }
                }
            } 
        }

        if(!event.target.classList.contains('selected')){
            if(lives_result.innerHTML == 'You Win!'){
                event.target.classList.add('selected');
            }else if(lives_result.innerHTML == "You lose!"){
                event.target.classList.add('selected');
            }else if(count > 1){
                count--;
                event.target.classList.add('selected');
                counter.innerHTML = count;

                nextStick =  drawArray[stickCount];
                nextStick();
                --stickCount;
            }else{
                lives_result.innerHTML = "You lose!";
                nextStick =  drawArray[stickCount];
                nextStick();
            }
        }
    }

    buttons.onclick = function(event){
        if(event.target.classList.contains('hint'))
            clue.innerHTML = 'Clue - ' + wr[1];
    
        if(event.target.classList.contains('playAgain')){
            context.clearRect(0, 0, 600, 600);
            createHtmlGame()
            stickCount = 9;
        }
    }
}
//====================================================================================================================================================================

document.addEventListener("DOMContentLoaded", createHtmlGame())





// создать функцию для рандомного выбора слова  +
// функию для вывода его в word                 +
// функцию для нахождения буквы в слове и удаления буквы из списка letters, если буква правильная +
// сдлеать переменную counter для числа жизнец  +
// функцию для подсказки                        +
// функцию для play again                       +
// canvas                                       +
// добавить новые слова                         +

// choosen category                             +
