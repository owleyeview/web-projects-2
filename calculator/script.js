// Rashaan Lightpool
// Class Project: Calculator WebApp
// SD235 - Professor Stuart, WCC
// 11/15/2023

// Based on a vague description of the Shunting Yard algorithm from
// Data Structures and Algorithm Analysis in Java, 3rd Edition

let display = document.getElementById("display");
let buttons = document.querySelectorAll(".buttons button");
let history = document.getElementById("history");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let value = this.textContent;
    processInput(value);
  });
});

let inputStack = [];

function processInput(value) {
  // Handle Clear
  if (value === "Clear") {
    clearDisplayAndHistory();
    return;
  }

  // Handle Unary Operator
  if (value === "(-)" && inputStack.length > 0) {
    toggleSign();
    return;
  }

  // Handle Multiple Decimal Points
  if (value === "." && hasMultipleDecimals(inputStack)) {
    displayError("Multiple decimal points");
    return;
  }

  // Handle Equals
  if (value === "=") {
    if (inputStack.length > 0) {
      calculateResult();
    }
    return;
  }

  // Default case: add the value to the stack and display
  inputStack.push(value);
  display.value += value;
}

function clearDisplayAndHistory() {
  display.value = "";
    inputStack = [];
    let clearItem = document.createElement("li");
    clearItem.textContent = "-----Cleared-----";
    history.appendChild(clearItem);
}

function toggleSign() {
  let lastInput = inputStack.pop();
  if (typeof lastInput === "number") {
    lastInput = -lastInput;
  } else {
    lastInput += " * -1"; 
  }
  inputStack.push(lastInput);
  updateDisplay();
}

function hasMultipleDecimals(stack) {
  let currentNumber = "";
  for (let i = stack.length - 1; i >= 0; i--) {
    if (!isNaN(stack[i]) || stack[i] === ".") {
      currentNumber = stack[i] + currentNumber;
    } else {
      break;
    }
  }
  return currentNumber.includes(".") && value === ".";
}

function updateDisplay() {
  display.value = inputStack.join("");
}

function calculateResult() {
  let newStack = [];
  let currentNumber = "";
  for (let i = 0; i < inputStack.length; i++) {
    // If the input is part of a number, add it to the currentNumber
    if (!isNaN(inputStack[i]) || inputStack[i] === ".") {
      currentNumber += inputStack[i];
    } else {
      if (currentNumber !== "") {
        newStack.push(Number(currentNumber));
        currentNumber = "";
      }
      newStack.push(inputStack[i]);
    }
  }
  if (currentNumber !== "") {
    newStack.push(Number(currentNumber));
  }

  let postfix = infixToPostfix(newStack);
  let result = evaluatePostfixExpression(postfix);
  // Display the result and store it for more operations
  display.value = result;

  inputStack = [];
  inputStack.push(result);

  // Add the expression and result to the history
  let expression = "";
  for (let i = 0; i < newStack.length; i++) {
    expression += newStack[i];
  }
  let listItem = document.createElement("li");
  listItem.textContent = `${expression} = ${result}`;
  history.appendChild(listItem);
}

function evaluatePostfixExpression(tokens) {
  let numberStack = [];

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      numberStack.push(token);
    } else {
      let operand2 = numberStack.pop();
      let operand1 = numberStack.pop();
      let result = evaluate(token, operand1, operand2);
      numberStack.push(result);
    }
  });

  return numberStack.pop();
}

function infixToPostfix(tokens) {
  let output = [];
  let operatorStack = [];

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    if (!isNaN(token)) {
      // If it's a number
      output.push(token);
    } else if (
      token === "+" ||
      token === "-" ||
      token === "*" ||
      token === "/" ||
      token === "^"
    ) {
      while (
        operatorStack.length > 0 &&
        hasPrecedence(operatorStack[operatorStack.length - 1], token)
      ) {
        output.push(operatorStack.pop());
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (operatorStack[operatorStack.length - 1] !== "(") {
        output.push(operatorStack.pop());
      }
      operatorStack.pop();
    }
  }

  while (operatorStack.length > 0) {
    output.push(operatorStack.pop());
  }

  return output;
}

function hasPrecedence(op1, op2) {
  if (op1 === "^") {
    return false;
  }
  if ((op1 === "*" || op1 === "/") && (op2 === "+" || op2 === "-")) {
    return true;
  }
  if ((op1 === "+" || op1 === "-") && (op2 === "*" || op2 === "/")) {
    return false;
  }
  if (op1 === "(" || op1 === ")") {
    return false;
  }
  return true;
}

function evaluate(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 * operand2;
    case "/":
      if (operand2 === 0) {
        alert("Cannot divide by zero!");
        return 0;
      }
      return operand1 / operand2;
    case "^":
      return Math.pow(operand1, operand2);
  }
}

function displayError(message) {
  display.value = message;
  inputStack = [];
  let errorItem = document.createElement("li");
  errorItem.textContent = "Error: " + message;
  history.appendChild(errorItem);
}