import './index.css';

const calculatorForm = document.forms.calculator;
const calculatorResult = document.querySelector('.calculator__result');
const calculatorTotal = document.querySelector('.calculator__total');
const calculatorReset = document.querySelector('.calculator__reset');

const calculatorSubmitHandler = (e) => {
    e.preventDefault();
    
    const month = parseInt(e.target.elements.month.value);
    const day = parseInt(e.target.elements.day.value);
    const count = parseInt(e.target.elements.count.value);
    const sum = ((day * 28) - month) * count;
    
    calculatorResult.style.display = 'flex';
    calculatorTotal.textContent = `${sum}₽ — общая выручка со всех квартир`
}

calculatorForm.addEventListener('submit', calculatorSubmitHandler);

const calculatorResetHandler = (e) => {
    e.preventDefault();
    calculatorForm.reset();
    calculatorResult.style.display = 'none';
}

calculatorReset.addEventListener('click', calculatorResetHandler)