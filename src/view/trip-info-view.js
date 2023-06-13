import AbstractView from '../framework/view/abstract-view';
import {getRefineEventDateDayShort, getRefineEventDateShort} from '../utils/events';
import dayjs from 'dayjs';

function createTripInfoTemplate(events, destinations, offers) {
  const sumEvents = events.map((element) => element.basePrice).reduce((a, b) => a + b);

  const allOffers = [];
  events.forEach((event) => {
    const currentOffers = offers.find((element) => element.type === event.type).offers;
    const selectedOffers = event.offers.map((offerId) => currentOffers.find((element) => element.id === offerId));
    allOffers.push(...selectedOffers);
  });
  const sumOffers = allOffers.map((element) => element.price).reduce((a,b) => a + b);
  const sumEventsTotal = sumEvents + sumOffers;

  const allDestinations = [];
  events.forEach((event) => {
    const destinationCurrent = destinations.find((element) => element.id === event.destination);
    allDestinations.push(destinationCurrent);
  });
  const firstDestination = allDestinations[0].name;
  const lastDestination = allDestinations[allDestinations.length - 1].name;
  const middleDestination = allDestinations.length > 3 ? '...' : `&mdash; ${allDestinations[1].name} &mdash;`;

  const firstDateEvent = getRefineEventDateShort(events[0].dateFrom);
  let lastDateEvent = getRefineEventDateShort(events[events.length - 1].dateTo);
  if (dayjs(firstDateEvent).month() === dayjs(lastDateEvent).month()) {
    lastDateEvent = getRefineEventDateDayShort(events[events.length - 1].dateTo);
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${firstDestination} ${middleDestination} ${lastDestination}</h1>
        <p class="trip-info__dates">${firstDateEvent}&nbsp;&mdash;&nbsp;${lastDateEvent}</p>
      </div>
      <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sumEventsTotal}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #events = null;
  #destinations = null;
  #offers = null;

  constructor({events, destinations, offers}) {
    super();
    this.#events = events;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#events, this.#destinations, this.#offers);
  }
}
