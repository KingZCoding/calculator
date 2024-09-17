const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');
const extras = document.querySelectorAll('.extras');
const screen = document.getElementById('screen');

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;

function selectDigit(e) {
  let currentDigit = e.target.textContent;
  if (currentOperator === null) {
    firstOperand += currentDigit;
    console.log(firstOperand);
  } else {
    secondOperand += currentDigit;
  }

  if (screen.textContent === '0') {
    screen.textContent = currentDigit;
  } else {
    screen.textContent += currentDigit;
  }
}

function selectOperator(e) {
  let selectedOperator = e.target.textContent;
  if (currentOperator === null) {
    currentOperator = selectedOperator;
  } else {
    return;
  }

  if (currentOperator === selectedOperator) {
    screen.textContent = `${currentdigit} + ${selectedOperator}`;
  }
  console.log(selectedOperator);
}

function selectExtras(e) {
  console.log(e.target.textContent);
}

operators.forEach(operator => {
  operator.addEventListener('click', selectOperator);
});

digits.forEach(digit => {
  digit.addEventListener('click', selectDigit);
});

extras.forEach(extra => {
  extra.addEventListener('click', selectExtras);
});
