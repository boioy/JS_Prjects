
//JSON-String in ein Object konvertieren, mit den gespeicherten Werten
//Wenn links von || true, dann wird rechts nicht ausgeführt
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
/*
  if(!score){
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
*/
updateScore();

let isAutoPlaying = false;
let intervalID;
const rockButton = document.querySelector('.js-rock-button');
const paperButton = document.querySelector('.js-paper-button');
const scissorsButton = document.querySelector('.js-scissors-button');


function pickCpuMove(){
  const randNumber = Math.random();
  let cpuMove = '';
  let result = '';
  if(randNumber >= 0 && randNumber < 1/3){
    cpuMove = 'rock';
  }
  else if(randNumber >= 1/3 && randNumber < 2/3){
    cpuMove = 'paper';
  }
  else if(randNumber >= 2/3 && randNumber < 1){
    cpuMove = 'scissors';
  } else{console.log('Invalid value!')}

  return cpuMove;
}

rockButton.addEventListener('click', () => {
  startGame('rock');
});
paperButton.addEventListener('click', () => {
  startGame('paper');
});
scissorsButton.addEventListener('click', () => {
  startGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r' || event.key === 'R'){
    startGame('rock');
  } else if(event.key === 'p' || event.key === 'P'){
    startGame('paper');
  } else if(event.key === 's' || event.key === 'S'){
    startGame('scissors');
  }
})

function startGame(playerMove){
  cpuMove = pickCpuMove();
  
  if(playerMove === 'rock'){
    
    if (cpuMove === 'rock'){
        result = 'It\'s a Tie!';
    } else if (cpuMove === 'paper'){
        result = 'You Lose!';
    } else if (cpuMove === 'scissors'){
        result = 'You Win!';
    }

  } else if(playerMove === 'paper'){
    
    if (cpuMove === 'paper'){
      result = 'It\'s a Tie!';
    } else if (cpuMove === 'scissors'){
      result = 'You Lose!';
    } else if (cpuMove === 'rock'){
      result = 'You Win!';
    }
    
  } else if(playerMove === 'scissors'){

    if (cpuMove === 'scissors'){
      result = 'It\'s a Tie!';
    } else if (cpuMove === 'rock'){
      result = 'You Lose!';
    } else if (cpuMove === 'paper'){
      result = 'You Win!';
    }
  }

  if(result === 'You Win!'){
    score.wins ++;
  } else if (result === 'You Lose!'){
    score.losses ++;
  } else if (result === 'It\'s a Tie!'){
    score.ties ++;
  }

  //score.Object in String konvertieren und Werte speichern
  scoreString = JSON.stringify(score);
  localStorage.setItem('score', scoreString);

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML
    = `You - 
      <img class="move-icon" src="Icons/${playerMove}-emoji.svg"> 
      <img class="move-icon" src="Icons/${cpuMove}-emoji-flip.svg">
        - CPU`;
  updateScore();      

  console.log(result);
}

function updateScore(){
  document.querySelector('.js-score').innerHTML
    = `Wins: ${score.wins}, Losses: ${score.losses}, Ties ${score.ties}`;
}

function autoPlay(){
  if(!isAutoPlaying){
    intervalID = setInterval(() => {
      startGame(pickCpuMove())
    }, 1000);

    isAutoPlaying = true
  } else{
    clearInterval(intervalID);
    isAutoPlaying = false;
  }

  const autoPlayBtn = document.querySelector('.js-auto-play');

  if(autoPlayBtn.innerText === 'Auto Play'){
    autoPlayBtn.innerHTML = 'Stop Playing';
  } else{
    autoPlayBtn.innerHTML = 'Auto Play';
  }
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
  updateScore();
  localStorage.removeItem('score');
}