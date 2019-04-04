const btn = document.querySelectorAll('.btn')
const numBtn = document.querySelectorAll('.num')
const opBtn = document.querySelectorAll('.operator')
const display = document.querySelector('.display')
const clearBtn = document.querySelector('.clear')
const equalsBtn = document.querySelector('.equals')

let firstNum = '';
let secondNum = '';
let operation = '';
let displayValue = '';
let evaluated = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if(operator === '+') {
        return add(a, b);
    } else if(operator === '-') {
        return subtract(a, b);
    } else if(operator === '*') {
        return multiply(a, b);
    } else if(operator === '/') {
        return divide(a, b);
    }
}

function resetValues() {
    firstNum = '';
    secondNum = '';
    operation = '';
    displayValue = '';
}

function clearDisplay() {
    display.innerHTML = '0';
    resetValues();
}

function renderNumbers(numClicked) {
    if(display.innerHTML === '0' || evaluated) {
        display.innerHTML = parseInt(numClicked.target.innerHTML);
        if(evaluated) {
            evaluated = false;
            resetValues();
            }
        displayValue += parseInt(numClicked.target.innerHTML);
    } else {
        display.innerHTML += parseInt(numClicked.target.innerHTML);
        displayValue += parseInt(numClicked.target.innerHTML);
    }
}

function preEvaluate() {
    secondNum = display.innerHTML.substring(display.innerHTML.lastIndexOf(' ') + 1);
    operation = display.innerHTML.match(/[/+\-*]/)[0];
}


numBtn.forEach(function(el) {
    el.addEventListener('click', function(e) {
        renderNumbers(e);
    });
})

opBtn.forEach(function(el) {
    el.addEventListener('click', function(e) {
        firstNum = displayValue;
        display.innerHTML += ` ${e.target.innerHTML} `;
    });
})

clearBtn.addEventListener('click', function() {
    clearDisplay();
})

equalsBtn.addEventListener('click', function() {
    preEvaluate();
    const parsedFirst = Number.parseInt(firstNum, 10);
    const parsedSecond = Number.parseInt(secondNum, 10);
    display.innerHTML = operate(operation, parsedFirst, parsedSecond);
    evaluated = true;
})

