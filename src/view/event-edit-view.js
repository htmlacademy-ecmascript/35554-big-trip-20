import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {CITIES, EVENT_EMPTY, WAYPOINTS} from '../const';
import {getRefineFullDate} from '../utils/events';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEventEditTypeTemplate(currentType) {
  return WAYPOINTS.map((type) => `
    <div class="event__type-item">
      <input id="event-type-${type}-1"
      class="event__type-input  visually-hidden"
      type="radio"
      name="event-type"
      value="${type}"
       ${currentType === type ? 'checked' : ''}
       />
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`).join('');
}

function createDestinationCitiesTemplate() {
  return CITIES.map((element) => `<option value="${element}"></option>`).join('');
}

function createOffersTemplate(event, offers) {
  const isChecked = (offer) => event.offers.includes(offer.id) ? 'checked' : '';

  return offers.map((offer) => `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}"
      type="checkbox" name="event-offer-luggage" data-offer-id="${offer.id}" ${isChecked(offer)}/>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');
}

function createPicturesDestinationTemplate(destination) {
  if (destination) {
    return destination.pictures.map((picture) => `
    <img class="event__photo" src="${picture.src}" alt="${picture.description}"/>`).join('');
  }
}

function createEventEditTemplate({state, destinations, offers}) {
  const {eventTrip} = state;
  const {basePrice, type, dateFrom, dateTo} = eventTrip;
  const dateFullFrom = getRefineFullDate(dateFrom);
  const dateFullTo = getRefineFullDate(dateTo);
  const citiesTemplate = createDestinationCitiesTemplate();
  const currentOffers = offers.find((element) => element.type === type).offers;
  const offersList = createOffersTemplate(eventTrip, currentOffers);
  const destination = destinations.find((element) => element.id === eventTrip.destination);
  const picturesList = createPicturesDestinationTemplate(destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventEditTypeTemplate(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1"
            type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
            <datalist id="destination-list-1"/>
              ${citiesTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text"
            name="event-start-time" value="${dateFullFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text"
            name="event-end-time" value="${dateFullTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1"
            type="text" name="event-price" value="${basePrice}"/>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${offersList}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
              ${picturesList}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class EventEditView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleToggleClick = null;
  #handleDeleteClick = null;
  #handleCancelClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({eventTrip = EVENT_EMPTY, destinations, offers, onFormSubmit, onToggleClick, onDeleteClick, onCanselClick}) {
    super();
    this._setState(EventEditView.parseEventToState({eventTrip}));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleToggleClick = onToggleClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCancelClick = onCanselClick;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate({
      state: this._state,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset = (event) => this.updateElement({event});

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#toggleClickHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#canselClickHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeEventClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#cityChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceInputHandler);
    this.element.querySelectorAll('.event__offer-selector')
      .forEach((input) => input.addEventListener('change', this.#offerClickHandler));

    this.#setDatepicker();
  }

  #toggleClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleToggleClick();
  };

  #canselClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventEditView.parseStateToEvent(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToEvent(this._state));
  };

  #typeEventClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      eventTrip: {
        ...this._state.eventTrip,
        type: evt.target.value,
      },
    });
  };

  #cityChangeHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = this.#destinations
      .find((element) => element.name === evt.target.value);

    if (currentDestination) {
      this.updateElement({
        eventTrip: {
          ...this._state.eventTrip,
          destination: currentDestination.id
        },
      });
    }
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      eventTrip: {
        ...this._state.eventTrip,
        basePrice: evt.target.value
      },
    });
  };

  #offerClickHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      eventTrip: {
        ...this._state.eventTrip,
        offers: checkedOffers.map((element) => element.dataset.offerId)
      }
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      eventTrip: {
        ...this._state.eventTrip,
        dateFrom: userDate
      },
    });
    this.#datepickerTo.set('minDate', this._state.eventTrip.dateFrom);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      eventTrip: {
        ...this._state.eventTrip,
        dateTo: userDate
      },
    });

    this.#datepickerFrom.set('maxDate', this._state.eventTrip.dateTo);
  };

  #setDatepicker = () => {
    const [dateFrom, dateTo] = this.element.querySelectorAll('.event__input--time');
    this.#datepickerFrom = flatpickr(
      dateFrom,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo,
        enableTime: true,
        'time_24hr': true,
      },
    );

    this.#datepickerTo = flatpickr(
      dateTo,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
        enableTime: true,
        minDate: this._state.dateFrom,
        'time_24hr': true,
      },
    );
  };

  static parseEventToState = ({eventTrip}) => ({eventTrip});

  static parseStateToEvent = (state) => state.eventTrip;
}
