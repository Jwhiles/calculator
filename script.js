'use strict';

var storedNumber;
var workingNumber = '0';
var operand;
var prev = document.getElementById('prev').innerHTML;
var equalRepeat = false;
var numRepeat;
var opRepeat;
var resRepeat;

function repeat(result, ope, repNum) {
    storedNumber = result;
    workingNumber = repNum;
    operand = ope;
    equalsPress();
}

function numberPress(num) {
    if ((/\./g).test(workingNumber) && num === '.') {
        return;
    }
    
    if (workingNumber === '0') {
        workingNumber = num.toString();
    } else {
        workingNumber += num.toString();
    }
    document.getElementById('display').innerHTML = workingNumber;

}

function clearPress() {
    storedNumber = null;
    workingNumber = '0';
    operand = null;
    document.getElementById('display').innerHTML = workingNumber;

}

function equalsPress() {
    if (storedNumber && workingNumber && operand) {
        numRepeat = workingNumber;
        opRepeat = operand;
        var result = operators[operand](parseFloat(storedNumber, 10), parseFloat(workingNumber, 10));
        var theCalculation = storedNumber + ' ' + symbols[operand] + ' ' + workingNumber + ' = ' + result + '<br>';
        storedNumber = result;
        console.log(result, storedNumber);
        resRepeat = result;
        workingNumber = '0';
        operand = null;
        //changes the storednumber to the result of our calculation, sets working number to 0, sets operator to null
        document.getElementById('display').innerHTML = storedNumber;
        console.log(theCalculation);
        console.log(prev);
        document.getElementById('prev').innerHTML = theCalculation + document.getElementById('prev').innerHTML;
        equalRepeat = true;
    } else {
        storedNumber = workingNumber;
        workingNumber = '0';
        //if there is not enough stuff to work with, assumes we want to move working number to stored
        document.getElementById('display').innerHTML = workingNumber;
    }
}

function operatorPress(operator) {
    if (operand) {
        equalsPress();
    }
    
    if (workingNumber !== '0') {
        storedNumber = workingNumber;
        workingNumber = '0';
        document.getElementById('display').innerHTML = storedNumber;    
    }
    
    operand = operator;
    }

var operators = {
    "add": function (object, subject) {
        return object + subject;
    },
    "subtract": function (object, subject) {
        return object - subject;
    },
    "multiply": function (object, subject) {
        return object * subject;
    },
    "divide": function (object, subject) {
        return object / subject;
    }
};  //an object with my operators, which can be accessed with string literals :)

var symbols = {
    'add': '+',
    'subtract': '-',
    'multiply': 'x',
    'divide': '÷'
}



var parent = document.querySelector("#calculate");
parent.addEventListener("click", somefunction, false);

function somefunction(e) {
    if (e.target !== e.currentTarget) {
        var clickedID = e.target.id;
        var clickedClass = e.target.className;
        if (equalRepeat && clickedID === 'equal') {
            repeat(resRepeat, opRepeat, numRepeat);
            
        } else if (clickedID === 'equal') {
            equalsPress();
        } else { 
            equalRepeat = false;
        }
        
        if (clickedClass === 'number') {
            numberPress(clickedID);
        }
        if (clickedClass === "operator") {
            operatorPress(clickedID);
        }
    
        if (clickedID === 'clear') {
            clearPress();
        }
    }
    e.stopPropagation;
    console.log("Stored Number: " + storedNumber, "Working Number: " + workingNumber, "Operand: " + operand)
}

