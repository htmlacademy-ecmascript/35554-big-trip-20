import {getRandomArrayElement, getRandomNumber} from '../util';
import {
  CITIES, MAX_COUNT_DESCRIPTION,
  MAX_COUNT_OFFER,
  MAX_NUMBER,
  MIN_COUNT_DESCRIPTION,
  MIN_COUNT_OFFER,
  MIN_NUMBER,
  WAYPOINTS
} from '../const';

const mockEvents = [
  {
    eventData: new Date('04-20'),
    waypointType: getRandomArrayElement(WAYPOINTS),
    city: getRandomArrayElement(CITIES),
    startTime: new Date('23-04-19 00:00'),
    endTime: new Date('23-04-19 00:00'),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: getRandomArrayElement(MIN_COUNT_OFFER, MAX_COUNT_OFFER),
    description: getRandomArrayElement(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION),
    photo: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
    isFavorite: true,
  },
  {
    eventData: new Date('04-20'),
    waypointType: getRandomArrayElement(WAYPOINTS),
    city: getRandomArrayElement(CITIES),
    startTime: new Date('23-04-19 00:00'),
    endTime: new Date('23-04-19 00:00'),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: getRandomArrayElement(MIN_COUNT_OFFER, MAX_COUNT_OFFER),
    description: getRandomArrayElement(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION),
    photo: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
    isFavorite: true,
  },
  {
    eventData: new Date('04-20'),
    waypointType: getRandomArrayElement(WAYPOINTS),
    city: getRandomArrayElement(CITIES),
    startTime: new Date('23-04-19 00:00'),
    endTime: new Date('23-04-19 00:00'),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: getRandomArrayElement(MIN_COUNT_OFFER, MAX_COUNT_OFFER),
    description: getRandomArrayElement(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION),
    photo: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
    isFavorite: true,
  },
  {
    eventData: new Date('04-20'),
    waypointType: getRandomArrayElement(WAYPOINTS),
    city: getRandomArrayElement(CITIES),
    startTime: new Date('23-04-19 00:00'),
    endTime: new Date('23-04-19 00:00'),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: getRandomArrayElement(MIN_COUNT_OFFER, MAX_COUNT_OFFER),
    description: getRandomArrayElement(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION),
    photo: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
    isFavorite: true,
  },
];

function getRandomEvent() {
  return getRandomArrayElement(mockEvents);
}

export {getRandomEvent};
