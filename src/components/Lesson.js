import LoadingIcon from '../images/icons/loading.svg';

export default class Lesson {
    constructor({ lesson, paymentCallback }) {
        this._number = lesson.number,
        this._heading = lesson.heading,
        this._description = lesson.description,
        this._price = lesson.price,
        this._duration = lesson.duration,
        this._icon = lesson.icon
        this._paymentCallback = paymentCallback;
    }

    _elementClickHandler = () => {
        this._element.classList.add('methodology__item_opened');
        this._descriptionElement.style.display = 'block';
        this._buyButtonElement.style.display = 'block';
    }

    _buyButtonClickHandler = () => {
        this._buyButtonElement.style.display = 'none';
        this._formElement.style.display = 'block';
        this._formPhoneInput.focus();
    }

    _generatePaymentLink = (phone) => {
        const data = {
            id: this._number,
            name: this._heading,
            price: this._price,
            phone
        }
        this._paymentCallback(data);
    }

    _formSubmitHandler = (e) => {
        e.preventDefault();
        this._formSubmitButton.style.backgroundImage = `url("${LoadingIcon}")`;
        this._formSubmitButton.disabled = true;
        this._generatePaymentLink(this._formElement.elements.phone.value);
    }

    _setEventListeners() {

        this._element.addEventListener('click', this._elementClickHandler, { once: true })
        this._buyButtonElement.addEventListener('click', this._buyButtonClickHandler)
        this._formElement.addEventListener('submit', this._formSubmitHandler)

    }

    generate() {
        this._element = document.querySelector('#lessonTemplate')
        .content
        .querySelector('.methodology__item')
        .cloneNode(true);

        this._captionElement = this._element.querySelector('.methodology__item-caption');
        this._durationElement = this._element.querySelector('.methodology__item-time');
        this._iconElement = this._element.querySelector('.methodology__item-icon');
        this._headingElement = this._element.querySelector('.methodology__item-name');
        this._descriptionElement = this._element.querySelector('.methodology__item-description');
        this._buyButtonElement = this._element.querySelector('.methodology__item-button');
        this._formElement = this._element.querySelector('.methodology__form');
        this._formSubmitButton = this._formElement.querySelector('.methodology__form-submit');
        this._formPhoneInput = this._formElement.querySelector('.methodology__form-input');

        this._captionElement.textContent = `Модуль ${this._number}`;
        this._durationElement.textContent = this._duration;
        this._iconElement.src = this._icon;
        this._headingElement.innerHTML = this._heading;
        this._descriptionElement.innerHTML = this._description;
        this._buyButtonElement.textContent = `Купить за ${this._price}₽`
        this._formElement.setAttribute('data-lesson', this._number);

        // this._setEventListeners();

    }

    put(selector) {
        const container = document.querySelector(selector);
        container.append(this._element);
    }

}