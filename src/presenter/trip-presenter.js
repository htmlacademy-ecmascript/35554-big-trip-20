import {remove, render, RenderPosition} from '../framework/render';
import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import EventPresenter from './event-presenter';
import {FilterType, SortType, UpdateType, UserAction} from '../const';
import {sortByDay, sortByPrice, sortByTime} from '../utils/events';
import {filter} from '../utils/filter';

export default class TripPresenter {
  #tripContainer = null;
  #headerContainer = null;
  #eventsModel = null;
  #filterModel = null;

  #tripListComponent = new TripListView();
  #sortComponent = null;
  #tripEmptyComponent = null;

  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({tripContainer, headerContainer, eventsModel, filterModel}) {
    this.#tripContainer = tripContainer;
    this.#headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredEvents.sort(sortByDay);
      case SortType.TIME:
        return filteredEvents.sort(sortByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
    }
    return filteredEvents;
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  get offers() {
    return this.#eventsModel.offers;
  }

  init() {
    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTrip();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderEvent({eventTrip, destinations, offers}) {
    const eventPresenter = new EventPresenter({
      eventListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations, offers
    });

    eventPresenter.init(eventTrip);
    this.#eventPresenters.set(eventTrip.id, eventPresenter);
  }

  #renderEvents(events, destinations, offers) {
    events.forEach((event) => this.#renderEvent({
      eventTrip: event,
      destinations: destinations,
      offers: offers
    }));
  }

  #renderTripEmpty() {
    this.#tripEmptyComponent = new TripListEmptyView({
      filterType: this.#filterType,
    });
    render(this.#tripEmptyComponent, this.#tripContainer);
  }

  #renderTripList() {
    const events = this.events;
    const destinations = this.destinations;
    const offers = this.offers;

    render(this.#tripListComponent, this.#tripContainer);
    this.#renderEvents(events, destinations, offers);
  }

  #clearTrip({resetSortType = false} = {}) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);

    if (this.#tripEmptyComponent) {
      remove(this.#tripEmptyComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip() {
    render(this.#tripListComponent, this.#tripContainer);

    if (this.events.length === 0) {
      this.#renderTripEmpty();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
  }
}
