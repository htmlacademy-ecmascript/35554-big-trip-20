import {render, RenderPosition} from '../framework/render';
import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import EventPresenter from './event-presenter';
import TripInfoView from '../view/trip-info-view';
import {updateItem} from '../utils/common';
import {SortType} from '../const';
import {sortByDay, sortByPrice, sortByTime} from '../utils/events';

export default class TripPresenter {
  #tripContainer = null;
  #headerContainer = null;
  #eventsModel = null;

  #tripListComponent = new TripListView();
  #sortComponent = null;
  #tripEmptyComponent = new TripListEmptyView();
  #tripInfoComponent = null;

  #tripEvents = [];
  #destinations = [];
  #offers = [];
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

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

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#tripEvents.sort(sortByDay);
        break;
      case SortType.TIME:
        this.#tripEvents.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#tripEvents.sort(sortByPrice);
        break;
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderTripList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEvent({eventTrip, destination, offers}) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
      destination, offers
    });

    eventPresenter.init(eventTrip);
    this.#eventPresenters.set(eventTrip.id, eventPresenter);
  }

  #renderEvents() {
    this.#tripEvents.forEach((eventTrip) => this.#renderEvent({
      eventTrip,
      destination: this.#destinations.find((destination) => destination.id === eventTrip.destination),
      offers: this.#offers.find((offer) => offer.type === eventTrip.type).offers
    }));
  }

  #renderTripEmpty() {
    render(this.#tripEmptyComponent, this.#tripContainer);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) =>presenter.destroy());
    this.#eventPresenters.clear();
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
