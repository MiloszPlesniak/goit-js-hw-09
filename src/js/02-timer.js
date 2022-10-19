import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const timer = document.querySelector('.timer')
const input = document.querySelector('#datetime-picker')
const btn = document.querySelector('button')
const days = document.querySelector('span[date-days]')
const hours = document.querySelector('span[date-hours]')
const minutes = document.querySelector('span[date-minutes]')
const seconds = document.querySelector('span[date-seconds]')


btn.setAttribute('disabled', 'disabled')

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
const setTimer = (time) => {
  days.textContent = time.days
  hours.textContent = time.hours
  minutes.textContent = time.minutes
  seconds.textContent = time.seconds
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
      alert("Please choose a date in the future")
    } else {
      btn.removeAttribute('disabled')
      btn.addEventListener('click', () => {
        myTimer = setInterval(() => {
          let timer =convertMs(selectedDates[0].getTime() - currentDate())
          if (timer.seconds === 0) {
            clearInterval(myTimer)
          } else {
            console.log(timer)
          }


        }, 1000);

      })
    }
  },
};
flatpickr(input, options)