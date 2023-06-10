import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class EventsModel extends Observable {
  #events = [];
  #destinations = [];
  #offers = [];
  #eventsApiService = null;

  constructor({eventsApiService}) {
    super();
    // this.#destinations = this.#generateDestinations();
    // this.#offers = this.#generateOffers();
    // this.#events = this.#generateEvents();
    this.#eventsApiService = eventsApiService;

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

  async init() {
    try {
      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);
      const destinations = await this.#eventsApiService.destinations;
      this.#destinations = destinations;
      const offers = await this.#eventsApiService.offers;
      this.#offers = offers;
    } catch (err) {
      this.#events = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1)
      ];
      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1)
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }
  }

  // #generateDestinations() {
  //   return Array.from({length:MAX_COUNT_DESCRIPTION}, () => getRandomMockDestination());
  // }
  //
  // #generateOffers() {
  //   return WAYPOINTS.map((type) => ({
  //     type,
  //     offers: Array.from({length: getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER)}, generateMockOffers)
  //   }));
  // }
  //
  // #generateEvents() {
  //   return Array.from({length: EVENT_COUNT}, () => {
  //     const type = getRandomArrayElement(WAYPOINTS);
  //     const destination = getRandomArrayElement(this.destinations);
  //
  //     const hasOffer = getRandomNumber(0,1);
  //
  //     const offersByType = this.offers.find((offerByType) => offerByType.type === type);
  //
  //     const offerIds = (hasOffer)
  //       ? offersByType.offers
  //         .slice(0, getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER))
  //         .map((offer) => offer.id)
  //       : [];
  //
  //     return generateEvents(type, destination.id, offerIds);
  //   });
  // }

  #adaptToClient(event) {
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      isFavorite: event['is_favorite']
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
