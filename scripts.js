const btn = document.querySelectorAll('.btn')
const numBtn = document.querySelectorAll('.num')
const opBtn = document.querySelectorAll('.operator')
const display = document.querySelector('.display')
const clearBtn = document.querySelector('.clear')
const equalsBtn = document.querySelector('.equals')
const backBtn = document.querySelector('.backspace')
const decimalBtn = document.querySelector('.decimal')


let numArr = [];
let opArr = [];
let total = 0;
let firstNum = '';
let secondNum = '';
let operation = '';
let displayValue = '';
let evaluated = false;
let stop = false;

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
    if(b > 0) {
        return a / b;
    } else {
        return 'Oh, a wise guy, eh?';
    }

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

function backspace() {
    if(display.innerHTML.length > 1) {
        display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length-1);
        displayValue = displayValue.substring(0, displayValue.length-1)
    } else {
        display.innerHTML = 0;
        displayValue = '';
    }
}

function decimal() {
    if(displayValue.indexOf('.') < 0) {
        displayValue = `${displayValue}.`;
        display.innerHTML = `${display.innerHTML}.`;
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
    display.setAttribute('style', '');
    stop = false;
    resetValues();
}

function renderNumbers(numClicked) {
    if(!stop) {
        if(display.innerHTML === '0' || evaluated) {
            display.innerHTML = parseInt(numClicked.target.innerHTML);
            if(evaluated) {
                evaluated = false;
                resetValues();
                }
            displayValue += parseInt(numClicked.target.innerHTML);
        } else {
            if(display.innerHTML.length >= 16) {
                display.setAttribute('style', 'font-size: 2.5rem;');
                if(display.innerHTML.length >= 40) {
                    display.innerHTML = 'Stop screwing with the calculator!';
                    stop = true;
                    return;
                }
            } else {
                display.setAttribute('style', '')
            }
            display.innerHTML += parseInt(numClicked.target.innerHTML);
            displayValue += parseInt(numClicked.target.innerHTML);
        }
    }
};

numBtn.forEach(function(el) {
    el.addEventListener('click', function(e) {
        renderNumbers(e);
    });
});

opBtn.forEach(function(el) {
    el.addEventListener('click', function(e) {
        if(!display.innerHTML.charAt(-1)) {
            numArr.push(displayValue)
            opArr.push(e.target.innerHTML);
            display.innerHTML += ` ${e.target.innerHTML} `;
            displayValue = '';
            total++;
        }
    });
});

clearBtn.addEventListener('click', function() {
    clearDisplay();
});

equalsBtn.addEventListener('click', function() {
    if(!display.innerHTML.match(/\d$/).length < 1) {
        numArr.push(displayValue);
        let first = undefined;
        let second = undefined;
        let operator = undefined;
        for(let i = 0; i < total+1; i++) {
            if(first === undefined && second === undefined) {
                first = numArr.shift();
                second = numArr.shift();
                operator = opArr.shift();
            } else if(second === undefined) {
                break;
            } else if (first === 'Oh, a wise guy, eh?') {
                break;
            } else {
                if(first.toString().indexOf('.') < 0) {
                    first = Number.parseInt(first, 10);
                } else {
                    first = Number.parseFloat(first, 10);
                }
                if(second.toString().indexOf('.') < 0) {
                    second = Number.parseInt(second, 10);
                } else {
                    second = Number.parseFloat(second, 10);
                }
                    first = operate(operator, first, second);
                    second = numArr.shift();
                    operator = opArr.shift();
            }
        }
        if(first.toString().indexOf('.') > -1 && first.toString().length > 10) {
            display.innerHTML = Number.parseFloat(first).toFixed(10).replace(/0+$/g, '');
        } else {
            display.innerHTML = first;
        }
    
        evaluated = true;
    }

});

backBtn.addEventListener('click', function() {
    backspace();
});

decimalBtn.addEventListener('click', function() {
    decimal();
});

