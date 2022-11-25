import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

import '../css/02-timer.css';

const refs = {
    dataPicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),    
    timer: document.querySelector('.timer'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    mins: document.querySelector('[data-minutes]'),
    secs: document.querySelector('[data-seconds]'),
}

let timerId = null;
let inputDate = 0;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose: ([date]) => {
    inputDate = date.getTime();
    if (inputDate <= Date.now()) {
        Notiflix.Notify.failure('Please choose a date in the future');
    refs.startBtn.disabled = true;
      return;
      };      
    refs.startBtn.disabled = false;
  },
};

refs.startBtn.addEventListener('click', onTimer);

flatpickr(refs.dataPicker, options);
// const expireTime = datetimePicker.selectedDates[0].getTime();

function onTimer() {
    timerId = setInterval(() => {
    let countdown = inputDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(countdown);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = minutes;
    refs.secs.textContent = seconds;
    if (countdown < 1000) {
      clearInterval(timerId);
    }
    }, 1000);
    refs.startBtn.disabled = true;
}
    
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}