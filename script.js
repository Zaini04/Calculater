const calculator = {
    displayValue: '' ,
};

function updateDisplay(){
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculater-keys');
keys.addEventListener('click', (event)=>{
    const {target} = event;
    const {value} = target;

    if(!target.matches('button')){
        return;
    }
    
    handleInput(value);
    updateDisplay();
});



function handleInput(value){
    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
            handleOperator(value);
            break;

        case '=':
            calculator.displayValue = evaluateExpression(calculator.displayValue);
            break;
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'pi':
        case '√':
            handleFunction(value);
            break;
        case '.':
        case '(':
        case ')':
            inputSymbol(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        case 'cancel':
            deleteLastCharacter();
            break;
        case 'x2':
            calculator.displayValue += '^2';
            break;
        default :

        if(Number.isInteger(parseFloat(value)) || value === '.'){
            inputDigit(value);
        }


    }    
}


function inputDigit(digit){
    calculator.displayValue += digit;
}

function inputSymbol(symbol){
    calculator.displayValue += symbol;
}
function handleOperator(nextOperator){
    calculator.displayValue += ` ${nextOperator} `;
}

function evaluateExpression(expression){
    try {
        const safeExpression = expression
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/√/g, 'Math.sqrt')
        .replace(/pi/g, 'Math.PI')
        .replace(/\^/g, '**')

        return new Function('return ' + safeExpression)();
    } catch (e) {
        return 'Error';
    }
}

function handleFunction(func){
    if(func === 'pi'){
        calculator.displayValue += 'Math.PI';

    }else{
        calculator.displayValue += `${func}(`;
    }
}
function deleteLastCharacter(){
    calculator.displayValue = calculator.displayValue.slice(0,-1);
}

function resetCalculator(){
    calculator.displayValue = '';
}




document.addEventListener('keydown' , (event) =>{
    const key = event.key;

    if(key >=0 && key <=9 || key === '.'){
        handleInput(key);
    }else if(key === '+' || key === '-' || key === '*' || key === '/' || key === '^' ){
        handleInput(key);
    }else if(key === 'Enter'){
        handleInput('=');
    }else if(key === 'Backspace'){
        handleInput('cancel');
    }

    updateDisplay();
})

