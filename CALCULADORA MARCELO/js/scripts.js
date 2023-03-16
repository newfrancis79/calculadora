const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // add digit to calculator screen
        addDigit(digit) {
        console.log(digit);
        // check if current operation already has a dot
        if(digit === "," && this.currentOperationText.innerText.includes(",")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Process all calculator operations
    processOperation(operation) {
    // Check if current is empty
    if(this.currentOperationText.innerText === ""&& operation !== "C") {
        // Change operation
        if(this.previousOperationText.innerText !== "") {
            this.changeOperation(operation);
        }
        return;
    }   

    // Get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch(operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "÷":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "x":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;  
      case "%":
        operationValue = previous % current;
        this.updateScreen(operationValue, operation, current, previous);
        break;  
      case "<":
        this.processClearCurrentOperator();
        break;  
      case "C":
        this.processClearOperator();
        break; 
      case "=":
        this.processEqualOperator();
        break;   
      default:
        return;  
    }
    }

    // Change values of the calculator screen
    updateScreen(
      operationValue = null, 
      operation = null, 
      current = null, 
      previous = null
    ) {
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current
            }

            // Add curent value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // Change math operation
    changeOperation(operation) {
        const mathOperations = ["x", "÷", "+", "-","%"];

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }    

    // Clear current operation
    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    // clear operations
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Process operation
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ",") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }        
    });
});