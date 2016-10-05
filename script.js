/*
todo
no multiple dots

*/

var storedNumber;
var workingNumber = '0';
var operand;

function numberPress(num) {
    if ((/\./g).test(workingNumber) && num === '.'){
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
        storedNumber = operators[operand](parseInt(storedNumber, 10), parseInt(workingNumber, 10));
        workingNumber = '0';
        operand = null;  
        //changes the storednumber to the result of our calculation, sets working number to 0, sets operator to null
        document.getElementById('display').innerHTML = storedNumber;

    } else {
        storedNumber = workingNumber;
        workingNumber = '0';
        //if there is not enough stuff to work with, assumes we want to move working number to stored
        document.getElementById('display').innerHTML = workingNumber;
    }
    
}

function operatorPress(operator) {
    if(storedNumber && operand){ //checks if there is an operation stored in memory, if so does it, then saves the new one
        equalsPress();
    }
    if (!storedNumber){
        storedNumber = workingNumber; //if there is no saved number, moves working number to that space
        workingNumber = '0'
        document.getElementById('display').innerHTML = storedNumber;
    }
    
    operand = operator; //sets out operator
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



var parent = document.querySelector("#calculate");
parent.addEventListener("click", somefunction, false);

function somefunction(e) {
    if (e.target !== e.currentTarget) {
        var clickedID = e.target.id;
        var clickedClass = e.target.className;
        if(clickedClass === 'number')
            numberPress(clickedID);
        if(clickedClass === "operator")
            operatorPress(clickedID);
        
        if(clickedID === 'equal')
            equalsPress();
        if(clickedID === 'clear')
            clearPress();
    }
    e.stopPropagation;
    console.log(workingNumber);
}
