let screens = {};
const operators = document.querySelectorAll('.operator');
const digits = document.querySelectorAll('.digit');
const equals = document.querySelectorAll('.equal');
const clears = document.querySelectorAll('.clear');
const dels = document.querySelectorAll('.del');
const negatives = document.querySelectorAll('.plus-minus');
const decimals = document.querySelectorAll('.decimal');
const percents = document.querySelectorAll('.percent');
const calculators = document.querySelectorAll('.calculator');

let shouldClearScreen = false;
const validOperators = ['+', '-', '/', '*'];

function setCurrentCalculator(e) {
  currentScreenID = e.target.querySelector('.screen').id;
  console.log(currentScreenID);
  console.log(screens);
}

function selectDigit(e) {
  console.log(e);
  if (shouldClearScreen) {
    screens[currentScreenID].display.textContent = '';
    shouldClearScreen = false;
  }
  let currentDigit = null;
  if (e.type === 'click') {
    currentDigit = e.target.textContent;
  } else if (e.type === 'keyup') {
    currentDigit = e.key;
  }
  if (screens[currentScreenID].currentOperator === null) {
    screens[currentScreenID].firstOperand += currentDigit;
    console.log(screens[currentScreenID].firstOperand);
  } else {
    screens[currentScreenID].secondOperand += currentDigit;
    console.log(screens[currentScreenID].secondOperand);
  }

  if (
    screens[currentScreenID].display.textContent === '0' &&
    currentDigit !== '0' &&
    currentDigit !== '.'
  ) {
    screens[currentScreenID].display.textContent += currentDigit;
  } else {
    screens[currentScreenID].display.textContent += currentDigit;
  }

  if (
    screens[currentScreenID].display.textContent.length > 1 &&
    screens[currentScreenID].display.textContent.startsWith('0')
  ) {
    screens[currentScreenID].display.textContent =
      screens[currentScreenID].display.textContent.slice(1);
  }
}

function selectOperator(e) {
  let selectedOperator = null;

  if (e.type === 'click') {
    selectedOperator = e.target.textContent;
  } else if (e.type === 'keyup') {
    selectedOperator = e.key;
  }

  if (
    screens[currentScreenID].currentOperator !== null &&
    screens[currentScreenID].secondOperand !== ''
  ) {
    operate(e, true);
  }

  if (
    screens[currentScreenID].firstOperand !==
    screens[currentScreenID].display.textContent
  ) {
    screens[currentScreenID].firstOperand =
      screens[currentScreenID].display.textContent;
  }

  screens[currentScreenID].currentOperator = selectedOperator;
  shouldClearScreen = true;

  console.log(selectedOperator);
}

function add() {
  return parseFloat(
    (
      parseFloat(screens[currentScreenID].firstOperand) +
      parseFloat(screens[currentScreenID].secondOperand)
    ).toFixed(3)
  );
}

function subtract() {
  return parseFloat(
    (
      parseFloat(screens[currentScreenID].firstOperand) -
      parseFloat(screens[currentScreenID].secondOperand)
    ).toFixed(3)
  );
}

function multiply() {
  return parseFloat(
    (
      parseFloat(screens[currentScreenID].firstOperand) *
      parseFloat(screens[currentScreenID].secondOperand)
    ).toFixed(3)
  );
}

function divide() {
  if (screens[currentScreenID].secondOperand > 0) {
    return parseFloat(
      (
        parseFloat(screens[currentScreenID].firstOperand) /
        parseFloat(screens[currentScreenID].secondOperand)
      ).toFixed(3)
    );
  } else {
    alert(`You can't divide by 0!! Please input a new number to divide by!!`);
  }
  selectDigit();
}

function operate(e, isOperator = false) {
  let result = 0;

  if (screens[currentScreenID].currentOperator === null) {
    return;
  }

  if (
    screens[currentScreenID].firstOperand != '' &&
    screens[currentScreenID].secondOperand == ''
  ) {
    screens[currentScreenID].secondOperand =
      screens[currentScreenID].firstOperand;
    screens[currentScreenID].firstOperand =
      screens[currentScreenID].display.textContent;
  }

  if (screens[currentScreenID].currentOperator === '+') {
    result = add();
  } else if (screens[currentScreenID].currentOperator === '-') {
    result = subtract();
  } else if (screens[currentScreenID].currentOperator === '*') {
    result = multiply();
  } else if (screens[currentScreenID].currentOperator === '/') {
    result = divide();
  }

  if (Number.isInteger(result)) {
    result = result.toString();
  }
  screens[currentScreenID].display.textContent = result;

  screens[currentScreenID].firstOperand = isOperator
    ? result.toString()
    : screens[currentScreenID].secondOperand;
  screens[currentScreenID].secondOperand = '';
  screens[currentScreenID].currentOperator = isOperator
    ? null
    : screens[currentScreenID].currentOperator;
  shouldClearScreen = true;
}

function clearResult() {
  screens[currentScreenID].display.textContent = '0';
  screens[currentScreenID].firstOperand =
    screens[currentScreenID].display.textContent;
  screens[currentScreenID].secondOperand = '';
  screens[currentScreenID].currentOperator = null;
  shouldClearScreen = false;
}

function delLastNum() {
  let length = 0;
  firstOperand = screens[currentScreenID].display.textContent;
  if (screens[currentScreenID].currentOperator === null) {
    if (screens[currentScreenID].firstOperand === 0) {
      return;
    }
    length = screens[currentScreenID].firstOperand.includes('-')
      ? screens[currentScreenID].firstOperand.length - 1
      : screens[currentScreenID].firstOperand.length;
    screens[currentScreenID].firstOperand =
      length > 1
        ? screens[currentScreenID].firstOperand.slice(0, -1)
        : screens[currentScreenID].firstOperand;
    screens[currentScreenID].display.textContent =
      screens[currentScreenID].firstOperand;
  } else {
    if (screens[currentScreenID].secondOperand === '0') {
      return;
    }
    length = screens[currentScreenID].secondOperand.includes('-')
      ? screens[currentScreenID].secondOperand.length - 1
      : screens[currentScreenID].secondOperand.length;
    screens[currentScreenID].secondOperand =
      length > 1
        ? screens[currentScreenID].secondOperand.slice(0, -1)
        : screens[currentScreenID].secondOperand;
    screens[currentScreenID].display.textContent =
      screens[currentScreenID].secondOperand;
  }
}

function toggleSign(number) {
  return (parseFloat(number) * -1).toString();
}

function makeNegative() {
  if (
    screens[currentScreenID].currentOperator == null ||
    screens[currentScreenID].secondOperand == ''
  ) {
    screens[currentScreenID].firstOperand =
      screens[currentScreenID].display.textContent;
    screens[currentScreenID].firstOperand = toggleSign(
      screens[currentScreenID].firstOperand
    );
    screens[currentScreenID].display.textContent =
      screens[currentScreenID].firstOperand;
  } else {
    screens[currentScreenID].secondOperand = toggleSign(
      screens[currentScreenID].secondOperand
    );
    screens[currentScreenID].display.textContent =
      screens[currentScreenID].secondOperand;
  }
}

function makeDecimal() {
  if (screens[currentScreenID].currentOperator === null) {
    screens[currentScreenID].firstOperand = screens[
      currentScreenID
    ].firstOperand.includes('.')
      ? screens[currentScreenID].firstOperand
      : screens[currentScreenID].firstOperand + '.';
    screens[currentScreenID].display.textContent =
      screens[currentScreenID].firstOperand;
  } else {
    screens[currentScreenID].secondOperand = screens[
      currentScreenID
    ].secondOperand.includes('.')
      ? screens[currentScreenID].secondOperand
      : screens[currentScreenID].secondOperand + '.';
    screens[currentScreenID].display.textContent =
      screens[currentScreenID].secondOperand;
  }
}

function togglePercent(number) {
  return parseFloat(number / 100).toString();
}

function makePercent() {
  screens[currentScreenID].firstOperand = screen.textContent;
  if (
    screens[currentScreenID].currentOperator === null ||
    screens[currentScreenID].secondOperand === ''
  ) {
    screens[currentScreenID].firstOperand = togglePercent(
      screens[currentScreenID].firstOperand
    );
    screens[currentScreenID].display.textContent =
      screens[currentScreenID].firstOperand;
  } else {
    screens[currentScreenID].secondOperand = togglePercent(
      screens[currentScreenID].secondOperand
    );
    screens[currentScreenID].display.textContent =
      screens[currentScreenID].secondOperand;
  }
}

calculators.forEach(calculator => {
  calculator.addEventListener('mouseenter', setCurrentCalculator);
  let currentScreen = calculator.querySelector('.screen').id;
  screens[currentScreen] = {
    display: document.getElementById(currentScreen),
    firstOperand: '',
    secondOperand: '',
    currentOperator: null,
  };
});

equals.forEach(equal => {
  equal.addEventListener('click', operate);
});

clears.forEach(clear => {
  clear.addEventListener('click', clearResult);
});

dels.forEach(del => {
  del.addEventListener('click', delLastNum);
});

negatives.forEach(negative => {
  negative.addEventListener('click', makeNegative);
});

decimals.forEach(decimal => {
  decimal.addEventListener('click', makeDecimal);
});

percents.forEach(percent => {
  percent.addEventListener('click', makePercent);
});

operators.forEach(operator => {
  operator.addEventListener('click', selectOperator);
});

digits.forEach(digit => {
  digit.addEventListener('click', selectDigit);
});

function handleKeyup(e) {
  console.log(e);
  if (validOperators.includes(e.key)) {
    selectOperator(e);
  } else if (!isNaN(e.key)) {
    selectDigit(e);
  } else if (e.key === 'Enter') {
    operate(e);
  } else if (e.key === 'Backspace') {
    delLastNum(e);
  }
}

document.addEventListener('keyup', handleKeyup);
