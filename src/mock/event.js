import {getRandomArrayElement, getRandomNumber} from '../util';
import {
  CITIES, DESCRIPTIONS, MAX_COUNT_DESCRIPTION, MAX_COUNT_OFFER, MAX_NUMBER, MIN_COUNT_DESCRIPTION, MIN_COUNT_OFFER,
  MIN_NUMBER, OFFERS,
  WAYPOINTS
} from '../const';

const mockEvents = [
  {
    eventDate: new Date(23, 4, 19),
    waypointType: getRandomArrayElement(WAYPOINTS),
    city: getRandomArrayElement(CITIES),
    dateTimeStart: new Date(23, 4, 19, 0, 0),
    dateTimeEnd: new Date(23,4, 19, 12, 0),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: Array.from({length: getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER)},
      () => getRandomArrayElement(OFFERS)),
    description: Array.from({length: getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)},
      () => getRandomArrayElement(DESCRIPTIONS)),
    photo: [{
      src: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
      description: 'This is description photo',
    }],
    isFavorite: true,
  },
  {
    eventDate: new Date(23, 4, 20),
    waypointType: getRandomArrayElement(WAYPOINTS),
    city: getRandomArrayElement(CITIES),
    dateTimeStart: new Date(23, 4, 29, 6, 0),
    dateTimeEnd: new Date(23,4, 29, 15, 30),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: Array.from({length: getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER)},
      () => getRandomArrayElement(OFFERS)),
    description: Array.from({length: getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)},
      () => getRandomArrayElement(DESCRIPTIONS)),
    photo: [{
      src: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
      description: 'This is description photo',
    }],
    isFavorite: true,
  },
  {
    eventDate: new Date(23, 4, 24),
    waypointType: getRandomArrayElement(WAYPOINTS),
    city: getRandomArrayElement(CITIES),
    dateTimeStart: new Date(23, 4, 19, 13, 0),
    dateTimeEnd: new Date(23,4, 19, 22, 20),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: Array.from({length: getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER)},
      () => getRandomArrayElement(OFFERS)),
    description: Array.from({length: getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)},
      () => getRandomArrayElement(DESCRIPTIONS)),
    photo: [{
      src: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
      description: 'This is description photo',
    }],
    isFavorite: true,
  },
  {
    eventDate: new Date(2022, 4, 22),
    waypointType: getRandomArrayElement(WAYPOINTS),
    city: getRandomArrayElement(CITIES),
    dateTimeStart: new Date(23, 4, 23, 10, 0),
    dateTimeEnd: new Date(23,4, 23, 20, 0),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: Array.from({length: getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER)},
      () => getRandomArrayElement(OFFERS)),
    description: Array.from({length: getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)},
      () => getRandomArrayElement(DESCRIPTIONS)),
    photo: [{
      src: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
      description: 'This is description photo',
    }],
    isFavorite: false,
  },
];

function getRandomEvent() {
  return getRandomArrayElement(mockEvents);
}

console.log(getRandomEvent());

export {getRandomEvent};
