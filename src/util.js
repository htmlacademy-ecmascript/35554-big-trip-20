import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
dayjs.extend(utc);
dayjs.extend(duration);

const DATE_SHORT_FORMAT = 'MMM D';
const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const TIME_FORMAT = 'HH:mm';
const DATE_FULL_FORMAT = 'DD/MM/YY HH:mm';
const MSEC_IN_HOUR = 3600000;
const MSEC_IN_DAY = 86400000;

function getRandomArrayElement(element) {
  return element[Math.floor(Math.random() * element.length)];
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRefineEventDateTime(date) {
  return date ? dayjs(date).format(DATE_TIME_FORMAT) : '';
}

function getRefineEventDateShort(date) {
  return date ? dayjs(date).format(DATE_SHORT_FORMAT) : '';
}

function getRefineTimeDate(date) {
  return date ? dayjs(date).utc().format(TIME_FORMAT) : '';
}

function getRefineFullDate(date) {
  return date ? dayjs(date).utc().format(DATE_FULL_FORMAT) : '';
}

function getRefineTimeDifference(dateOne, dateTwo) {
  const timeDifference = dayjs(dateOne).diff(dayjs(dateTwo));
  let durationPoint = 0;
  switch (true) {
    case (durationPoint >= MSEC_IN_DAY):
      durationPoint = dayjs.duration(timeDifference).format('DD[D] hh[H] mm[M]');
      break;
    case (durationPoint >= MSEC_IN_HOUR):
      durationPoint = dayjs.duration(timeDifference).format('hh[H] mm[M]');
      break;
    case (durationPoint < MSEC_IN_HOUR):
      durationPoint = dayjs.duration(timeDifference).format('mm[M]');
      break;
  }
  return durationPoint;
}

export {
  getRandomArrayElement,
  getRandomNumber,
  getRefineEventDateShort,
  getRefineTimeDate,
  getRefineTimeDifference,
  getRefineFullDate,
  getRefineEventDateTime
};
