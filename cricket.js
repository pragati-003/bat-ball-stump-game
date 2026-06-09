let scoreStr = localStorage.getItem('Score');
let score;
resetScore(scoreStr);

const emojiMap = {
    Bat: "🏏",
    Ball: "🏐",
    Stump: "🥅"
};

function resetScore(scoreStr) {
    score = scoreStr ? JSON.parse(scoreStr) : {
        win: 0,
        lost: 0,
        tie: 0,  
    };

    score.displayScore = function() {
        return `Won: ${score.win}, Lost: ${score.lost},Tie: ${score.tie}`;
    };

}

function resetGame(){
    localStorage.clear();

    score = {
        win: 0,
        lost: 0,
        tie: 0
    };

    score.displayScore = function(){
        return `Won: ${score.win}, Lost: ${score.lost}, Tie: ${score.tie}`;
    };

    showResult('', '', '');

}



//-----FUNCTION FOR GENERATING COMPUTERCHOICE---------------
function generateComputerChoice(){
    //This will generate random number between 0 to 3
    let randomNumber = Math.random() * 3; 

    if (randomNumber > 0 && randomNumber <= 1) {
        return 'Bat';
    } else if (randomNumber > 1 && randomNumber <= 2){
        return 'Ball';
    } else {
        return 'Stump';
    }
}


//-------FUNCTION FOR CALCULATING RESULT------------------------
function getResult(userMove, computerMove){

    if(userMove === 'Bat'){
        if(computerMove == 'Ball'){
            score.win++;
            return 'User has won.';
        } else if (computerMove == 'Bat'){
            score.tie++;
            return `It's a tie.`;
        } else {
            score.lost++;
            return `Computer has won.`;
        }
    } else if(userMove === 'Ball'){
        if(computerMove == 'Ball'){
            score.tie++;
            return  `It's a tie.`;
        } else if (computerMove == 'Bat'){
            score.lost++;
            return `Computer has won.`;
        } else {
            score.win++;
            return `User has won.`;
        }
    } else {
        if(computerMove == 'Ball'){
            score.lost++;
            return 'Computer has won.';
        } else if (computerMove == 'Bat'){
            score.win++;
            return `User has won.`;
        } else {
            score.tie++;
            return `It's a tie.`;
        }
    }
}


//FUNCTION FOR RESULT----------------------
function showResult(userMove, computerMove, result){
    localStorage.setItem('Score', JSON.stringify(score));
    console.log(score);
    
    document.querySelector('#user-move').innerText =
    userMove ? `You chose: ${userMove} ${emojiMap[userMove]}` : '';

    document.querySelector('#computer-move').innerText =
    computerMove ? `Computer chose: ${computerMove} ${emojiMap[computerMove]}` : '';

    const resultElement = document.querySelector('#result');

    resultElement.innerText = result ? result : '';

    if(result && result.includes('User')){
        resultElement.style.color = 'lightgreen';
    }
    else if(result && result.includes('Computer')){
        resultElement.style.color = 'tomato';
    }
    else if(result){
        resultElement.style.color = 'gold';
    }

    document.querySelector('#score').innerText = `Score :  ${score.displayScore()}`;

}