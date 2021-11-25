import LoadingIcon from '../images/icons/loading.svg';

export default class OptionButton {
    constructor({ data, paymentCallback }) {
        this._price = data.price;
        this._name = data.name;
        this._paymentCallback = paymentCallback;
    }

    _generatePaymentLink = (phone) => {
        const data = {
            
        }
        this._paymentCallback(data);
    }

    _formSubmitHandler = (e) => {
        e.preventDefault();
        this._formSubmitButton.style.backgroundImage = `url("${LoadingIcon}")`;
        this._formSubmitButton.disabled = true;
        this._generatePaymentLink(this._formElement.elements.phone.value);
    }

    _elementClickHandler() {
        this._formElement.style.display = 'block';
        this._buttonElement.classList.add('prices__option-button_selected')
    }

    _setEventListeners() {
        this._element.addEventListener('click', () => this._elementClickHandler())
        this._formElement.addEventListener('submit', (e) => this._formSubmitHandler(e))
    }

    generate() {
        this._element = document.querySelector('#priceOptionTemplate')
        .content
        .querySelector('.prices__option-payment')
        .cloneNode(true);

        this._formElement = this._element.querySelector('.prices__form');
        this._buttonElement = this._element.querySelector('.prices__option-button');
        this._formSubmitButton = this._formElement.querySelector('.prices__form-submit');
        this._formPhoneInput = this._formElement.querySelector('.prices__form-input');

        this._setEventListeners();
        return this._element;
    }

    put(container) {
        container.append(this._element);
    }

}