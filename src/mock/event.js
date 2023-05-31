import {getRandomArrayElement, getRandomNumber} from '../utils/common';
import {
  CITIES,
  DESCRIPTIONS,
  MAX_COUNT_DESCRIPTION,
  MAX_NUMBER,
  MIN_COUNT_DESCRIPTION,
  MIN_NUMBER,
  OFFERS,
} from '../const';
import {getDate} from '../utils/events';
import {nanoid} from 'nanoid';

function generateMockOffers() {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: Math.ceil((getRandomNumber(MIN_NUMBER, MAX_NUMBER / 10) / 10)) * 10,
  };
}

function getRandomMockDestination() {
  const city = getRandomArrayElement(CITIES);
  return {
    id: crypto.randomUUID(),
    name: city,
    description: getRandomArrayElement(DESCRIPTIONS),
    pictures: Array.from({length: getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)}, () => ({
      src: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
      description: `This is description ${city}`,
    }))
  };
}

function generateEvents(type, destinationId, offerIds) {
  return {
    id: nanoid(),
    dateFrom: getDate().from,
    dateTo: getDate().to,
    basePrice: Math.ceil(getRandomNumber(MIN_NUMBER, MAX_NUMBER) / 10) * 10,
    offers: offerIds,
    destination: destinationId,
    isFavorite: !getRandomNumber(0,1),
    type,
  };
}

export {generateEvents, generateMockOffers, getRandomMockDestination};
