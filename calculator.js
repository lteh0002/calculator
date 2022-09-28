const buttonNumber = document.querySelectorAll('.number')
const display = document.querySelector('.calc-display')
const decimal = document.querySelector('.decimal')
const clearAll = document.querySelector('.clearall')
const operators = document.querySelectorAll('.operator')
const add = document.querySelector(".add")
const minus = document.querySelector(".minus")
const multiply = document.querySelector(".multiply")
const divide = document.querySelector(".divide")
const negative = document.querySelector(".negative")
const result = document.querySelector(".equal")
const backspace = document.querySelector(".clear")

let btnNumberInput1 = ''
let operatorType = ''
let calculatorDisplay = ''
let firstInput = ''
let secondInput = ''
let negativeNumber = ''
let firstInputChecker
let haveDot = false
let initialNumber = "0"
let numChar = ''
let zeroEqualChecker = false
let deleteAllower = true
let disallowInput = false

buttonNumber.forEach(number => {
    number.addEventListener("click", function () {
        btnNumberInput1 = this.innerText
        if (btnNumberInput1 === "0" && display.innerText === "0") {
            display.innerText = "0"
        } else {
            calculatorDisplay += btnNumberInput1
            display.innerText = calculatorDisplay
        }

        numChar = calculatorDisplay.length
        if (numChar > 12) {
            charLimit = calculatorDisplay.slice(0, -1)
            calculatorDisplay = charLimit
            display.innerText = calculatorDisplay
            haveDot = true
        }

        if (firstInputChecker) {
            firstInputChecker = false
            calculatorDisplay = ''
            calculatorDisplay += btnNumberInput1
            display.innerText = calculatorDisplay
        }

        if (disallowInput) {
            disallowInput = false
            calculatorDisplay = ''
            calculatorDisplay += btnNumberInput1
            display.innerText = calculatorDisplay
        }
    })
})

clearAll.addEventListener("click", function () {
    btnNumberInput1 = ''
    calculatorDisplay = ''
    decimalInput = ''
    haveDot = false
    operatorType = ''
    display.innerText = "0"
    removeClass()
    firstInput = ''
    secondInput = ''
    percentageChecker = ''
    deleteAllower = true
    disallowInput = false
})

decimal.addEventListener("click", function () {
    decimalInput = this.innerText
    if (display.innerText === '0' && !haveDot) {
        calculatorDisplay = initialNumber + decimalInput
        display.innerText = calculatorDisplay
    }

    if (!calculatorDisplay.includes(".") && !haveDot) {
        calculatorDisplay += decimalInput
        display.innerText = calculatorDisplay
        haveDot = true
    } 
})

operators.forEach(operator => {
    operator.addEventListener("click", function () { 
        deleteAllower = true
        operatorType = this.innerText
        firstInput = calculatorDisplay
        if (operatorType === "+") {
            operatorFunction()
            add.classList.add("operatorToggle")
        } else if (operatorType === "-") {
            operatorFunction()
            minus.classList.add("operatorToggle")
        } else if (operatorType === "×") {
            operatorFunction()
            multiply.classList.add("operatorToggle")
        } else {
            operatorFunction()
            divide.classList.add("operatorToggle")
        }

    })
})

negative.addEventListener("click", function () {
    haveDot = false
    negativeNumber = parseFloat(turnNegative(calculatorDisplay))
    calculatorDisplay = negativeNumber.toString()
    display.innerText = calculatorDisplay
    if (display.innerText === '0') {
        calculatorDisplay = ''
        display.innerText === calculatorDisplay
    }
})

function operatorFunction () {
    noFirstInput()
    removeClass()
    haveDot = false
    firstInputChecker = true
}

function removeClass () {
    add.classList.remove("operatorToggle")
    minus.classList.remove("operatorToggle")
    multiply.classList.remove("operatorToggle")
    divide.classList.remove("operatorToggle")
}

function noFirstInput () {
    if (display.innerText === "0") {
        firstInput = display.innerText
    }
    
}

result.addEventListener("click", function () {
    deleteAllower = false
    disallowInput = true
    secondInput = calculatorDisplay
    if (firstInput == '') {
        return;
    }

    firstInput = parseFloat(firstInput)
    secondInput = parseFloat(secondInput)
    if (operatorType === "+") {
       outcome = operation(firstInput,secondInput,addition)
       removeClass()
       calculatorDisplay = outcome.toString()
       display.innerText = calculatorDisplay
    } else if (operatorType === "-") {
        outcome = operation(firstInput,secondInput,deduction)
        removeClass()
        calculatorDisplay = outcome.toString()
        display.innerText = calculatorDisplay
    } else if (operatorType === "×") {
        if (firstInput == '') {
            secondInput = 0
        }
        outcome = operation(firstInput,secondInput,multiplication)
        removeClass()
        calculatorDisplay = outcome.toString()
        calculatorDisplay = parseFloat(calculatorDisplay.substring(0,12))
        display.innerText = calculatorDisplay
    } else {
        outcome = operation(firstInput,secondInput,division)
        removeClass()
        calculatorDisplay = outcome.toString()
        calculatorDisplay = parseFloat(calculatorDisplay.substring(0,12))
        display.innerText = calculatorDisplay
        if (secondInput === 0) {
            calculatorDisplay = "∞"
            display.innerText = calculatorDisplay
        }
    }

    numChar = calculatorDisplay.length
    if (numChar > 9) {
        calculatorDisplay = calculatorDisplay.substring(0,9)
        display.innerText = calculatorDisplay
    }
})

backspace.addEventListener("click", function() {
    if (deleteAllower) {
        calculatorDisplay = calculatorDisplay.slice(0, -1);
        display.innerText = calculatorDisplay
    } else if (!deleteAllower) {
        return
    }

    if (calculatorDisplay.length < 1) {
        calculatorDisplay = ''
        display.innerText = 0
    }
})


function addition (x, y) {
    return x + y
}

function deduction (x, y) {
    return x - y
}

function multiplication (x, y) {
    return x * y
}

function division (x, y) {
    return x / y
}

function turnNegative (x) {
    return x * -1
}

function operation (x, y, operator) {
    return operator(x, y)
}