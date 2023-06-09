import Observable from '../framework/observable';

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

    this.#eventsApiService.events.then((events) => {
      console.log(events.map(this.#adaptToClient));
    });
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
  }

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType);
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
