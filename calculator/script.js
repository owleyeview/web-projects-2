// Rashaan Lightpool
// Class Project: Calculator WebApp
// SD235 - Professor Stuart, WCC
// 11/06/2023

// Based on a vague description of the Shunting Yard algorithm from
// Data Structures and Algorithm Analysis in Java, 3rd Edition

let display = document.getElementById("display");
let buttons = document.querySelectorAll(".buttons button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let value = this.textContent;
    processInput(value);
  });
});

let inputStack = [];

function processInput(value) {
  if (value === "Clear") {
    // Clear the display and the stack
    display.value = "";
    inputStack = [];
    return;
  }
  if (value !== "=") {
    // If it's not "=", store the input in the stack
    inputStack.push(value);
    display.value += value;
  } else {
    // Loop through inputStack and combine digits into numbers
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
  }
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
