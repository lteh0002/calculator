const buttonNumber = document.querySelectorAll('.number')
const display = document.querySelector('.calc-display')
const decimal = document.querySelector('.decimal')
const clearAll = document.querySelector('.clearall')
const operators = document.querySelectorAll('.operator')
const add = document.querySelector(".add")
const minus = document.querySelector(".minus")
const multiply = document.querySelector(".multiply")
const divide = document.querySelector(".divide")

let btnNumberInput1 = ''
let operatorType = ''
let calculatorDisplay = ''
let firstInput = ''
let firstInputChecker
let haveDot = false
let initialNumber = "0"
let numChar

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
        if (numChar > 9) {
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

    })
    
})

clearAll.addEventListener("click", function () {
    btnNumberInput1 = ''
    calculatorDisplay = ''
    decimalInput = ''
    haveDot = false
    display.innerText = "0"
    removeClass()
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
        operatorType = this.innerText
        firstInput = calculatorDisplay
        if (operatorType === "+") {
            noFirstInput()
            removeClass()
            firstInputChecker = true
            add.classList.add("operatorToggle")
        } else if (operatorType === "-") {
            noFirstInput()
            removeClass()
            firstInputChecker = true
            minus.classList.add("operatorToggle")
        } else if (operatorType === "×") {
            noFirstInput()
            removeClass()
            firstInputChecker = true
            multiply.classList.add("operatorToggle")
        } else {
            noFirstInput()
            removeClass()
            firstInputChecker = true
            divide.classList.add("operatorToggle")
        }

    })
})

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