import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
dayjs.extend(utc);
dayjs.extend(duration);

const DATA_FORMAT = 'MMM D';
const TIME_FORMAT = 'h:mm';
const DATA_GAP_FORMAT = 'hh[H] mm[M]';
const MSEC_IN_SEC = 1000;
const MSEC_IN_HOUR = 3600000;
const MSEC_IN_DAY = 86400000;

function getRandomArrayElement(element) {
  return element[Math.floor(Math.random() * element.length)];
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRefineEventDate(date) {
  return date ? dayjs(date).format(DATA_FORMAT) : '';
}

function getRefineTimeDate(date) {
  return date ? dayjs(date).utc().format(TIME_FORMAT) : '';
}

function getRefineTimeDifference(dateOne, dateTwo) {
  const timeDifference = dayjs(dateTwo).diff(dayjs(dateOne));
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
  console.log(timeDifference, durationPoint);
  return durationPoint;
}

export {getRandomArrayElement, getRandomNumber, getRefineEventDate, getRefineTimeDate,getRefineTimeDifference};
