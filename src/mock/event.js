import {getRandomArrayElement, getRandomNumber} from '../util';
import {
  CITIES,
  DESCRIPTIONS,
  MAX_COUNT_DESCRIPTION,
  MAX_NUMBER,
  MIN_COUNT_DESCRIPTION,
  MIN_NUMBER,
  OFFERS,
} from '../const';

function generateMockOffers() {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER / 10),
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
    id: crypto.randomUUID(),
    dateFrom: new Date(2023, 4, 18, 10, 20),
    dateTo: new Date(2023,4, 18, 20, 0),
    basePrice: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: offerIds,
    destination: destinationId,
    isFavorite: getRandomNumber(0,1),
    type,
  };
}

export {generateEvents, generateMockOffers, getRandomMockDestination};
