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

const btn = document.querySelectorAll('.btn')
const display = document.querySelector('.display')
let first = '';
let second = '';
let displayValue = '';

const btnClick = btn.forEach(function(el) {
    if(!el.classList.contains('display')) {
        el.addEventListener('click', function(e) {
            console.log(typeof display.innerHTML)
            if(display.innerHTML === '0') {
                display.innerHTML = parseInt(e.target.innerHTML);
                displayValue += parseInt(e.target.innerHTML)
            } else {
                console.log('else')
                display.innerHTML += parseInt(e.target.innerHTML)
                displayValue += parseInt(e.target.innerHTML)
            }
        })
    }
})






// const one = document.querySelector('.one')
// const two = document.querySelector('.two')
// const three = document.querySelector('.three')
// const four = document.querySelector('.four')
// const five = document.querySelector('.five')
// const six = document.querySelector('.six')
// const seven = document.querySelector('.seven')
// const eight = document.querySelector('.eight')
// const nine = document.querySelector('.nine')
// const zero = document.querySelector('.zero')
// const clear = document.querySelector('.clear')
// const add = document.querySelector('.add')
// const subtract = document.querySelector('.subtract')
// const multiply = document.querySelector('.multiply')
// const divide = document.querySelector('.divide')
// const equals = document.querySelector('.equals')

