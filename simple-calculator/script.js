class Calculator{ 
    constructor(previousOperandTextElement, currentOperandTextElement){
        //  References to HTML elements in the DOM, pointer to where text should be and next supposed to change in calc's lifetime
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        // in the output div, we have these 3 values
        // data values, actual one which the calc owrks with, they change
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operator = undefined;
    }

    delete() {
        if(this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if(this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        if(this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else if(this.currentOperand === '0' && number === '.') { 
            this.currentOperand = '0.';
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operator) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        
        
    }
    
    compute() {
        let result;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) return;
        switch(this.operator) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '÷':
                result = previous / current;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operator = undefined;
        this.previousOperand = '';
    }
    
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {   
                maximumFractionDigits: 0,
            });
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operator != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        } else {
            this.getDisplayNumber(this.previousOperandTextElement.innerText = '');
        }
    }
}




const numberButtons = document.querySelectorAll('[data-number');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
    // calculator.clear();
});