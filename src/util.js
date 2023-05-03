import dayjs from 'dayjs';

const DATA_FORMAT = 'MMM D';

function getRandomArrayElement(element) {
  return element[Math.floor(Math.random() * element.length)];
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRefineEventDate(eventDate) {
  return eventDate ? dayjs(eventDate).format(DATA_FORMAT) : '';
}

export {getRandomArrayElement, getRandomNumber, getRefineEventDate};
