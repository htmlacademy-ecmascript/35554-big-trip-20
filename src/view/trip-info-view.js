import AbstractView from '../framework/view/abstract-view';

function createTripInfoTemplate(eventModel) {
  const events = eventModel.events;
  const destinations = eventModel.destinations;
  const offers = eventModel.offers;
  console.log(destinations, offers, events);
  const priceEventsList = events.map((element) => element.basePrice);
  const priceSum = priceEventsList.reduce((a, b) => a + b);
  console.log(priceEventsList, priceSum);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>
      <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${priceSum}</span>
      </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #eventsModel = null;

  constructor({eventsModel}) {
    super();
    this.#eventsModel = eventsModel;
  }

  get template() {
    return createTripInfoTemplate(this.#eventsModel);
  }
}
