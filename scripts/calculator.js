let calculation = '';

let buttons = document.querySelectorAll('button');

buttons.forEach((buttonElement, index) => {
  buttonElement.addEventListener('click', () => {
    let char = buttonElement.innerHTML;
    if (char === '='){
      calcResult();
    } else if (char === 'C'){
      backspace();
    } else if (char === 'Clear'){
      clearCalc();
    }
    else{
      addToCalc(char);
    }
    
  });
});
      
function addToCalc(char){
  calculation += char;
  document.querySelector('.js-display-calc').innerHTML = calculation;
}

function calcResult(){
  if (calculation.substring(0,1) === '*' || calculation.substring(0,1) === '/'){
    document.querySelector('.js-display-result').innerHTML = 'Math Error';
    console.log(`${calculation} => Math Error`);
    calculation = '';
  }
  const result = eval(calculation);
  if (result != undefined){
    document.querySelector('.js-display-result').innerHTML = result;
    console.log(`${calculation} = ${result}`);
    calculation = '';
  }
  
}

function backspace(){
  calculation = calculation.slice(0,-1);
  console.log(calculation);
  document.querySelector('.js-display-calc').innerHTML = calculation;
}

function clearCalc(){
  calculation = ''
  document.querySelector('.js-display-calc').innerHTML = ''
  document.querySelector('.js-display-result').innerHTML = ''
}

