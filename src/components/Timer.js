export default class Timer {
    constructor({ element, targetDate, finishText, smallText = false }) {
        this._targetDate = targetDate;
        this._finishText = finishText;
        this._element = element;
        this._smallText = smallText;
    }

    _declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    
    _update() {
    
        const now = new Date().getTime();
    
        const distance = this._targetDate - now;
      
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
        const dayLabel = this._declensionNum(days, ['день', 'дня', 'дней']);
        const hoursLabel = this._declensionNum(hours, ['час', 'часа', 'часов']);
        const minuteLabel = this._declensionNum(minutes, ['минута', 'минуты', 'минут']);
        const secondLabel = this._declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
      
        if(this._smallText) {
            this._element.innerHTML = `Осталось: ${hours}ч. ${minutes}м. ${seconds}с.`
        } else {
            this._element.innerHTML = `${days}&nbsp;${dayLabel} ${hours}&nbsp;${hoursLabel} ${minutes}&nbsp;${minuteLabel} ${seconds}&nbsp;${secondLabel}`
        }
        
      
        if (distance < 0) {
          this._element.innerHTML = this._finishText;
        }
    }
    
    start() {
        this._update();
        setInterval(() => this._update(), 1000);
    }

}