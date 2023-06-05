import {render, RenderPosition} from '../framework/render';
import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import EventPresenter from './event-presenter';
import TripInfoView from '../view/trip-info-view';
// import {updateItem} from '../utils/common';
import {SortType, UpdateType, UserAction} from '../const';
import {sortByDay, sortByPrice, sortByTime} from '../utils/events';

export default class TripPresenter {
  #tripContainer = null;
  #headerContainer = null;
  #eventsModel = null;

  #tripListComponent = new TripListView();
  #sortComponent = null;
  #tripEmptyComponent = new TripListEmptyView();
  #tripInfoComponent = null;

  // #tripEvents = [];
  // #destinations = [];
  // #offers = [];
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({tripContainer, headerContainer, eventsModel}) {
    this.#tripContainer = tripContainer;
    this.#headerContainer = headerContainer;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.handleModelEvent);
  }

  get events() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#eventsModel.events].sort(sortByDay);
      case SortType.TIME:
        return [...this.#eventsModel.events].sort(sortByTime);
      case SortType.PRICE:
        return [...this.#eventsModel.events].sort(sortByPrice);
    }
    return this.#eventsModel.events;
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  get offers() {
    return this.#eventsModel.offers;
  }

  init() {
    // this.#tripEvents = [...this.#eventsModel.events];
    // this.#destinations = [...this.#eventsModel.destinations];
    // this.#offers = [...this.#eventsModel.offers];

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
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
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:

        break;
      case UpdateType.MAJOR:

        break;
    }
  };

  // #handleEventChange = (updatedEvent) => {
  //   // this.#tripEvents = updateItem(this.#tripEvents, updatedEvent);
  //   this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  // };

  // #sortEvents(sortType) {
  //   switch (sortType) {
  //     case SortType.DAY:
  //       this.#tripEvents.sort(sortByDay);
  //       break;
  //     case SortType.TIME:
  //       this.#tripEvents.sort(sortByTime);
  //       break;
  //     case SortType.PRICE:
  //       this.#tripEvents.sort(sortByPrice);
  //       break;
  //   }
  //   this.#currentSortType = sortType;
  // }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderTripList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
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
    render(this.#tripEmptyComponent, this.#tripContainer);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) =>presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderTripList() {
    const events = this.events;
    const destinations = this.destinations;
    const offers = this.offers;

    render(this.#tripListComponent, this.#tripContainer);
    this.#renderEvents(events, destinations, offers);
  }

  #renderTripInfo() {
    this.#tripInfoComponent = new TripInfoView({eventsModel: this.#eventsModel});
    render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTrip() {
    render(this.#tripListComponent, this.#tripContainer);

    if (this.events.length === 0) {
      this.#renderTripEmpty();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
    this.#renderTripInfo();
  }
}
