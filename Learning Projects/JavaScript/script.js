function addition(operand1, operand2) {
    return operand1 + operand2;
}

function subtraction(operand1, operand2) {
    return operand1 - operand2;
}

function division(operand1, operand2) {
    return operand1 / operand2;
}

function multiplication(operand1, operand2) {
    return operand1 * operand2;
}

function modular(operand1, operand2) {
    return operand1 % operand2;
}


function calculator(operand1, operand2, operator) {
    let result;
    switch (operator.toLowerCase()) {
        case "addition":
            result = addition(operand1, operand2);
            break;
        case "subtraction":
            result = subtraction(operand1, operand2);
            break;
        case "division":
            result = division(operand1, operand2);
            break;
        case "multiplication":
            result = multiplication(operand1, operand2);
            break;
        case "modular":
            result = modular(operand1, operand2);
            break;
        default:
            result = "Invalid operator. Please use one of the following: addition, subtraction, division, multiplication,modular";
            return;

    }
    console.log(`${operator} of ${operand1} and ${operand2} is : ${result}`);
}

var operation = prompt("Enter operation : ");
var num1 = prompt("Enter first number : ");
var num2 = prompt("Enter second number : ");

calculator(Number(num1), Number(num2), operation);