/*
todo
no multiple dots

*/

var storedNumber;
var workingNumber = '0';
var operand;

function numberPress(num) {
    if (workingNumber === '0') {
        workingNumber = num.toString();
    } else {
        workingNumber += num.toString();
    }
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

    }
    
}

function operatorPress(operator) {
    if(storedNumber && operand){ //checks if there is an operation stored in memory, if so does it, then saves the new one
        equalsPress();
    }
    if (!storedNumber){
        storedNumber = workingNumber; //if there is no saved number, moves working number to that space
        workingNumber = '0'
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
        
        
        document.getElementById('display').innerHTML = workingNumber;

        if(clickedID === 'equal')
            equalsPress();
    }
    e.stopPropagation;
    console.log(workingNumber);
}


/*
workingNumber = '55';
operatorPress('add');
workingNumber = '10';
console.log(storedNumber);
equalsPress();
console.log(storedNumber);
workingNumber = '5';
operatorPress('divide');
operatorPress('add');
console.log(storedNumber);
workingNumber = 5;
equalsPress();
console.log(storedNumber);


console.log(workingNumber);
numberPress(4);

console.log(workingNumber);
numberPress('.');

console.log(workingNumber);
numberPress(7);

console.log(workingNumber);
numberPress(0);
console.log(workingNumber);

//initial test for adding to working numbers

console.log(operators.add(5, 5));
console.log(operators['add'](10, 5));
console.log(operators['subtract'](5, 3));
console.log(operators['multiply'](3, 4));
console.log(operators['divide'](10, 2));
//tests for my operators.*/