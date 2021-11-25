import './index.css';
import Timer from '../components/Timer.js';
import Lesson from '../components/Lesson.js';
import initialLessons from '../utils/initialLessons.js';
import OptionButton from '../components/OptionButton.js';

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

calculatorReset.addEventListener('click', calculatorResetHandler);


const courseStartTimer = new Timer({
    element: document.querySelector('.countdown__heading'),
    targetDate: new Date("Dec 16, 2021 14:00:00").getTime(),
    finishText: 'Курс начался'
})

courseStartTimer.start();

initialLessons.forEach(data => {
    const lesson = new Lesson({
        lesson: data,
        paymentCallback: (data) => {
            console.log(data)
        }
    });
    lesson.generate();
    lesson.put('.methodology');
})

const pricesOptions = document.querySelectorAll('.prices__option');
pricesOptions.forEach(option => {
    const optionButton = new OptionButton({
        data: {},
        paymentCallback: () => {}
    })
    const element = optionButton.generate();
    optionButton.put(option);

    const timerContainer = element.querySelector('.prices__option-expired');
        
    const priceTimer = new Timer({
        element: timerContainer,
        targetDate: new Date("Nov 24, 2021 12:00:00").getTime(),
        finishText: 'Скидки больше нет',
        smallText: true
    })

    priceTimer.start();

})