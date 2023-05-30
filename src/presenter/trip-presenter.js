import {render, RenderPosition} from '../framework/render';
import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import EventPresenter from './event-presenter';
import TripInfoView from '../view/trip-info-view';

export default class TripPresenter {
  #tripContainer = null;
  #headerContainer = null;
  #eventsModel = null;

  #tripListComponent = new TripListView();
  #sortComponent = new SortView();
  #tripEmptyComponent = new TripListEmptyView();
  #tripInfoComponent = null;

  #tripEvents = [];
  #destinations = [];
  #offers = [];

  constructor({tripContainer, headerContainer, eventsModel}) {
    this.#tripContainer = tripContainer;
    this.#headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripEvents = [...this.#eventsModel.events];
    this.#destinations = [...this.#eventsModel.destinations];
    this.#offers = [...this.#eventsModel.offers];

    this.#renderTrip();
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEvent({eventTrip, destination, offers}) {
    const eventPresenter = new EventPresenter({eventListContainer: this.#tripListComponent.element});
    eventPresenter.init({eventTrip, destination, offers});
  }

  #renderEvents() {
    this.#tripEvents.forEach((event) => this.#renderEvent({
      eventTrip: event,
      destination: this.#destinations.find((destination) => destination.id === event.destination),
      offers: this.#offers.find((offer) => offer.type === event.type).offers
    }));
  }

  #renderTripEmpty() {
    render(this.#tripEmptyComponent, this.#tripContainer);
  }

  #renderTripList() {
    render(this.#tripListComponent, this.#tripContainer);
    this.#renderEvents();
  }

  #renderTripInfo() {
    this.#tripInfoComponent = new TripInfoView({eventsModel: this.#eventsModel});
    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTrip() {
    render(this.#tripListComponent, this.#tripContainer);

    if (this.#tripEvents.length === 0) {
      this.#renderTripEmpty();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
    this.#renderTripInfo();
  }
}
