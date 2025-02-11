let currentOperand = '';
let previousOperand = '';
let operation = null;

function appendNumber(number) {
    const display = document.getElementById('display');
    currentOperand = currentOperand.toString() + number.toString();
    display.value = currentOperand;
}

function chooseOperation(op) {
    const display = document.getElementById('display');
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    display.value = previousOperand + ' ' + operation + ' ';
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = null;
    previousOperand = '';
    document.getElementById('display').value = currentOperand;
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    document.getElementById('display').value = '';
}