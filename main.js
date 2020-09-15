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
  return operator(a, b);
}

const display = document.querySelector('#display p');
const buttons = Array.from(document.querySelectorAll('button'));

buttons.forEach(btn => btn.addEventListener('click', inputClick));

const parameters = {};

function inputClick() {

  switch (getInputType(this)) {
    
    case "clear":
      updateDisplay(0);
      clearMemory();
      break;

    case "numerical":
      updateDisplay((display.textContent == 0) ? this.textContent : display.textContent + this.textContent);
      break;

    case "equals":
      parameters.a = (!parameters.operator) ? +display.textContent : 
        operate(parameters.operator, parameters.a, +display.textContent);

      updateDisplay(parameters.a);
      clearMemory();
      break;

    case "operator":
      // if last click wasn't an operator 
      if (!getOperator(parameters.lastClick)) {
        // carry out previous operation if there is one stored
        parameters.a = (parameters.a) ? 
          operate(parameters.operator, parameters.a, +display.textContent) : +display.textContent;
      }

      // get the operator from the previous
      parameters.operator = getOperator(this.textContent);
      updateDisplay(0);
      break;
  }

  // store previous button value 
  parameters.lastClick = this.textContent;
}

function getInputType(btn) {
  if (btn.textContent == "CLR") return "clear";
  if (btn.textContent.match(/[0-9.]/)) return "numerical";
  if (btn.textContent == "=") return "equals";
  return "operator";
}

// return the operator function depending on the input used
function getOperator(str) {
  switch (str) {
    case "+":
      return add;
    case "-":
      return subtract;
    case "×":
      return multiply;
    case "÷":
      return divide;
    default:
      return null;
  }
}

// clear calculator memory
function clearMemory() {
  delete parameters.a;
  delete parameters.operator;
  delete parameters.lastClick;
}

// update the display
function updateDisplay(output) {
  if (output.toString().length > 13) output = output.toString().slice(0, 13);
  display.textContent = output;
}