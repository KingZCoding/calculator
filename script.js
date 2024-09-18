const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');
const extras = document.querySelectorAll('.extras');
const screen = document.getElementById('screen');
const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const del = document.getElementById('del');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldClearScreen = false;

function selectDigit(e) {
  if (shouldClearScreen) {
    screen.textContent = '';
    shouldClearScreen = false;
  }
  let currentDigit = e.target.textContent;
  if (currentOperator === null) {
    firstOperand += currentDigit;
    console.log(firstOperand);
  } else {
    secondOperand += currentDigit;
    console.log(secondOperand);
  }

  if (screen.textContent === '0') {
    screen.textContent = currentDigit;
  } else {
    screen.textContent += currentDigit;
  }
}

function selectOperator(e) {
  let selectedOperator = e.target.textContent;
  if (currentOperator !== null && secondOperand !== '') {
    operate();
  }
  currentOperator = selectedOperator;
  shouldClearScreen = true;

  console.log(selectedOperator);
}

function add() {
  return parseFloat(firstOperand) + parseFloat(secondOperand);
}

function subtract() {
  return parseFloat(firstOperand) - parseFloat(secondOperand);
}

function multiply() {
  return parseFloat(firstOperand) * parseFloat(secondOperand);
}

function divide() {
  return parseFloat(firstOperand) / parseFloat(secondOperand);
}

function operate() {
  let result = 0;
  if (currentOperator === '+') {
    result = add();
  } else if (currentOperator === '-') {
    result = subtract();
  } else if (currentOperator === '*') {
    result = multiply();
  } else if (currentOperator === '/') {
    result = divide();
  }
  screen.textContent = result;

  firstOperand = result.toString();
  secondOperand = '';
  currentOperator = null;
  shouldClearScreen = true;
}

function clearResult() {
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
  shouldClearScreen = true;
  screen.textContent = '0';
}

function delLastNum() {
  if (currentOperator === null) {
    firstOperand = firstOperand.length > 1 ? firstOperand.slice(0, -1) : '0';
    screen.textContent = firstOperand;
  } else {
    secondOperand = secondOperand.length > 1 ? secondOperand.slice(0, -1) : '0';
    screen.textContent = secondOperand;
  }
}

equal.addEventListener('click', operate);

clear.addEventListener('click', clearResult);

del.addEventListener('click', delLastNum);

operators.forEach(operator => {
  operator.addEventListener('click', selectOperator);
});

digits.forEach(digit => {
  digit.addEventListener('click', selectDigit);
});
