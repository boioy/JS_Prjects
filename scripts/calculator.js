let calculation = '';
      
function addToCalc(char){
  calculation += char;
  document.querySelector('.js-display-calc').innerHTML = calculation;
}

function calcResult(){
  const result = eval(calculation);
  document.querySelector('.js-display-result').innerHTML = result;
  console.log(`${calculation} = ${result}`);
  calculation = '';
}

function clearCalc(){
  calculation = ''
  document.querySelector('.js-display-calc').innerHTML = ''
  document.querySelector('.js-display-result').innerHTML = ''
}