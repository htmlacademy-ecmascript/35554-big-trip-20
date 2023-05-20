import {getRandomArrayElement, getRandomNumber} from '../util';
import {
  CITIES,
  COUNT_OFFER,
  DESCRIPTIONS,
  MAX_COUNT_DESCRIPTION,
  MAX_COUNT_OFFER,
  MAX_NUMBER,
  MIN_COUNT_DESCRIPTION,
  MIN_COUNT_OFFER,
  MIN_NUMBER,
  OFFERS,
  WAYPOINTS
} from '../const';

// function generateMockOffer() {
//   return {
//     id: crypto.randomUUID(),
//     title: getRandomArrayElement(OFFERS),
//     price: getRandomNumber(MIN_NUMBER, MAX_NUMBER / 10),
//   };
// }

function generateMockOffers() {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFERS),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER / 10),
  };
}

function getRandomMockOffers() {
  return Array.from({length: MAX_COUNT_OFFER},
    () => generateMockOffers());
}

console.log(getRandomMockOffers());
const mockOffers = generateMockOffers();

function getRandomMockDestination() {
  const city = getRandomArrayElement(CITIES);
  return {
    id: crypto.randomUUID(),
    name: city,
    description: getRandomArrayElement(DESCRIPTIONS),
    photo: Array.from({length: getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)}, () => ({
      src: `https://loremflickr.com/248/152?random=${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`,
      description: `This is description ${city}`,
    }))
  };
}

function getRandomDestination() {
  return Array.from({length: getRandomNumber(MIN_COUNT_DESCRIPTION, MAX_COUNT_DESCRIPTION)},
    () => getRandomMockDestination());
}

console.log(getRandomDestination());

const mockEvents = [
  {
    id: crypto.randomUUID(),
    dateTimeFrom: new Date(23, 4, 19, 0, 0),
    dateTimeTo: new Date(23,4, 19, 12, 0),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: getRandomMockOffers(),
    destination: getRandomMockDestination().id,
    isFavorite: true,
    waypointType: getRandomArrayElement(WAYPOINTS),
  },
  {
    id: crypto.randomUUID(),
    dateTimeFrom: new Date(23, 4, 20, 12, 0),
    dateTimeTo: new Date(23,4, 20, 23, 0),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: getRandomMockOffers(),
    destination: getRandomMockDestination().id,
    isFavorite: false,
    waypointType: getRandomArrayElement(WAYPOINTS),
  },
  {
    id: crypto.randomUUID(),
    dateTimeFrom: new Date(23, 4, 22, 7, 10),
    dateTimeTo: new Date(23,4, 22, 16, 30),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: getRandomMockOffers(),
    destination: getRandomMockDestination().id,
    isFavorite: true,
    waypointType: getRandomArrayElement(WAYPOINTS),
  },
  {
    id: crypto.randomUUID(),
    dateTimeFrom: new Date(23, 4, 18, 10, 20),
    dateTimeTo: new Date(23,4, 18, 20, 0),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: getRandomMockOffers(),
    destination: getRandomMockDestination().id,
    isFavorite: false,
    waypointType: getRandomArrayElement(WAYPOINTS),
  },
];

function generateEvents(type, destinationId, offerIds) {
  return {
    id: crypto.randomUUID(),
    dateTimeFrom: new Date(23, 4, 18, 10, 20),
    dateTimeTo: new Date(23,4, 18, 20, 0),
    price: getRandomNumber(MIN_NUMBER, MAX_NUMBER),
    offers: offerIds,
    destination: destinationId,
    isFavorite: getRandomNumber(0,1),
    type,
  };
}

function getRandomEvent() {
  const eventTrip = getRandomArrayElement(mockEvents);


  // eventTrip.offers = offersList
  //   .find((element) => element.waypointType === eventTrip.waypointType).offers
  //   .map((offer) => offer.id);
  // console.log(eventTrip.offers);
  return eventTrip;
}

console.log(getRandomEvent());

export {generateEvents, generateMockOffers, getRandomMockDestination};
