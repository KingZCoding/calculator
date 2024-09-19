const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');
const extras = document.querySelectorAll('.extras');
const screen = document.getElementById('screen');
const equal = document.getElementById('equal');
const clear = document.getElementById('clear');
const del = document.getElementById('del');
const negative = document.getElementById('plus-minus');
const decimal = document.getElementById('decimal');
const percent = document.getElementById('percent');

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
    operate(e, true);
  }

  if (firstOperand !== screen.textContent) {
    firstOperand = screen.textContent;
  }

  currentOperator = selectedOperator;
  shouldClearScreen = true;

  console.log(selectedOperator);
}

function add() {
  return parseFloat(
    (parseFloat(firstOperand) + parseFloat(secondOperand)).toFixed(3)
  );
}

function subtract() {
  return parseFloat(
    (parseFloat(firstOperand) - parseFloat(secondOperand)).toFixed(3)
  );
}

function multiply() {
  return parseFloat(
    (parseFloat(firstOperand) * parseFloat(secondOperand)).toFixed(3)
  );
}

function divide() {
  return parseFloat(
    (parseFloat(firstOperand) / parseFloat(secondOperand)).toFixed(3)
  );
}

function operate(e, isOperator = false) {
  let result = 0;

  if (currentOperator == null) {
    return;
  }

  if (firstOperand != '' && secondOperand == '') {
    secondOperand = firstOperand;
    firstOperand = screen.textContent;
  }

  if (currentOperator === '+') {
    result = add();
  } else if (currentOperator === '-') {
    result = subtract();
  } else if (currentOperator === '*') {
    result = multiply();
  } else if (currentOperator === '/') {
    result = divide();
  }

  if (Number.isInteger(result)) {
    result = result.toString();
  }
  screen.textContent = result;

  firstOperand = isOperator ? result.toString() : secondOperand;
  secondOperand = '';
  currentOperator = isOperator ? null : currentOperator;
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

function makeNegative() {
  if (currentOperator === null) {
    firstOperand = firstOperand.toString();
    firstOperand = firstOperand.startsWith('-')
      ? firstOperand.slice(1)
      : '-' + firstOperand;
    screen.textContent = firstOperand;
  } else if (secondOperand) {
    secondOperand = secondOperand.startsWith('-')
      ? secondOperand.slice(1)
      : '-' + secondOperand;
    screen.textContent = secondOperand;
  }

  if (firstOperand < 0) {
    firstOperand = Math.abs(firstOperand);
    screen.textContent = firstOperand;
    return;
  } else if (secondOperand < 0) {
    secondOperand = Math.abs(secondOperand);
    screen.textContent = secondOperand;
    return;
  }
}

function makeDecimal() {
  if (currentOperator === null) {
    firstOperand = firstOperand.includes('.')
      ? firstOperand
      : firstOperand + '.';
    screen.textContent = firstOperand;
  } else {
    secondOperand = secondOperand.includes('.')
      ? secondOperand
      : secondOperand + '.';
    screen.textContent = secondOperand;
  }
}

function makePercent() {
  if (firstOperand) {
    firstOperand = (parseFloat(firstOperand) * 100) / 2;
    screen.textContent = firstOperand;
  }
}

equal.addEventListener('click', operate);

clear.addEventListener('click', clearResult);

del.addEventListener('click', delLastNum);

negative.addEventListener('click', makeNegative);

decimal.addEventListener('click', makeDecimal);

percent.addEventListener('click', makePercent);

operators.forEach(operator => {
  operator.addEventListener('click', selectOperator);
});

digits.forEach(digit => {
  digit.addEventListener('click', selectDigit);
});
