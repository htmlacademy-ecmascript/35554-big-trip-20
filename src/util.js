import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const DATA_FORMAT = 'MMM D';
const TIME_FORMAT = 'h:mm';
const DATA_GAP_FORMAT = 'hh[H] mm[M]';

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
  return dayjs(dayjs(dateOne).diff(dateTwo)).utc().format(DATA_GAP_FORMAT);
}

export {getRandomArrayElement, getRandomNumber, getRefineEventDate, getRefineTimeDate,getRefineTimeDifference};
