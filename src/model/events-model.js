import {
  generateEvents,
  generateMockOffers,
  getRandomMockDestination,
} from '../mock/event';
import {MAX_COUNT_DESCRIPTION, MAX_COUNT_OFFER, MIN_COUNT_OFFER, WAYPOINTS} from '../const';
import {getRandomArrayElement, getRandomNumber} from '../utils/common';

const EVENT_COUNT = 4;

export default class EventsModel {
  #events = null;
  #destinations = null;
  #offers = null;

  constructor() {
    this.#destinations = this.#generateDestinations();
    this.#offers = this.#generateOffers();
    this.#events = this.#generateEvents();
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get events() {
    return this.#events;
  }

  #generateDestinations() {
    return Array.from({length:MAX_COUNT_DESCRIPTION}, () => getRandomMockDestination());
  }

  #generateOffers() {
    return WAYPOINTS.map((type) => ({
      type,
      offers: Array.from({length: getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER)}, generateMockOffers)
    }));
  }

  #generateEvents() {
    return Array.from({length: EVENT_COUNT}, () => {
      const type = getRandomArrayElement(WAYPOINTS);
      const destination = getRandomArrayElement(this.destinations);

      const hasOffer = getRandomNumber(0,1);

      const offersByType = this.offers.find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffer)
        ? offersByType.offers
          .slice(0, getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER))
          .map((offer) => offer.id)
        : [];

      return generateEvents(type, destination.id, offerIds);
    });
  }

}
