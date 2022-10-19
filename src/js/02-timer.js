import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';
const input = document.querySelector('#datetime-picker')
const btn = document.querySelector('button')
const days = document.querySelector('span[data-days]')
const hours = document.querySelector('span[data-hours]')
const minutes = document.querySelector('span[data-minutes]')
const seconds = document.querySelector('span[data-seconds]')
const timer = document.querySelector('.timer')
const timerValue = document.querySelectorAll('.value')
const timerText = document.querySelectorAll('.label')
const timerItem = document.querySelectorAll('.field')
timerText.forEach(function (e,) {
    e.style.display = 'flex'


    e.style.fontSize = '20px'
    e.style.lineHeight = '0'
    e.style.justifyContent = 'center'
});
timerValue.forEach(function (e) {
    e.style.fontSize = '35px'
    e.style.display = 'flex'
    e.style.justifyContent = 'center'

})
timer.style.display = 'flex'
timerItem.forEach(element => {
    element.style.padding = '5px'
});




btn.setAttribute('disabled', 'disabled')
const d = {
    day: 1,
    hour: 23,
    minutes: 2,
    seconds: 45
}

function addLeadingZero(value) {
    if (value.length < 2) {
      return  value.padStart(2, '0')
    }
    return value
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}



const currentDate = () => {
    let date = new Date().getTime()
    return date
}
const setTimer = (timer, days, hours, minutes, seconds, addZero) => {
    days.textContent = addZero(String(timer.days))
    hours.textContent = addZero(String(timer.hours))
    minutes.textContent = addZero(String(timer.minutes))
    seconds.textContent = addZero(String(timer.seconds))
    
    
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let myTimer
        if (new Date().getTime() > selectedDates[0].getTime()) {
            btn.setAttribute('disabled', 'disabled')
            Report.failure("Please choose a date in the future")
        } else {
            btn.removeAttribute('disabled')
            btn.addEventListener('click', () => {
                myTimer = setInterval(() => {
                    let timer = convertMs(selectedDates[0].getTime() - currentDate())
                    if (selectedDates[0].getTime() - currentDate() < 500) {
                        clearInterval(myTimer)
                    } else {
                        setTimer(timer, days, hours, minutes, seconds, addLeadingZero)
                    }


                }, 1000);


            })
        }
    },
};
flatpickr(input, options)
