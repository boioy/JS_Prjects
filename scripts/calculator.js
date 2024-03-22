let calculation = '';
let operators = [];

const buttons = document.querySelectorAll('button');
const operator_btns = document.querySelectorAll('.op-btn');
const dot_btn = document.querySelector('.dot-btn').innerHTML;
const equal_btn = document.querySelector('.equal-btn').innerHTML;
const del_btn = document.querySelector('.del-btn').innerHTML;
const clear_btn = document.querySelector('.clear-btn').innerHTML;

operator_btns.forEach(operatorElement => {
  operators.push(operatorElement.innerHTML);
})

buttons.forEach(buttonElement => {
  buttonElement.addEventListener('click', () => {
    let char = buttonElement.innerHTML;

    // Wenn letzter char Rechenoperator ist, soll es ersetzt werden
    if (operators.includes(char)){
      if (operators.includes(calculation.slice(-1))){
        calculation = calculation.slice(0,-1) + char;
        document.querySelector('.js-display-calc').innerHTML = calculation;
      } else{
        addToCalc(char);
      }
    } 
    
    // Math Error wenn letzter char = operator
    else if (char === equal_btn){
      if(operators.includes(calculation.slice(-1))){
        document.querySelector('.js-display-result').innerHTML = 'Math Error';
      } else calcResult();
    }
    
    else if (char === dot_btn){
      if (calculation.slice(-1) === dot_btn){
        return;
      } else addToCalc(char);
    } else if (char === del_btn){
      backspace();
    } else if (char === clear_btn){
      clearCalc();
    } else{
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

