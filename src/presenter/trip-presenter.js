import {render, RenderPosition, replace} from '../framework/render';
import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';
import EventPresenter from './event-presenter';

export default class TripPresenter {
  #tripContainer = null;
  #eventsModel = null;

  #tripListComponent = new TripListView();
  #sortComponent = new SortView();
  #tripEmptyComponent = new TripListEmptyView();

  #tripEvents = [];
  #destinations = [];
  #offers = [];

  constructor({tripContainer, eventsModel}) {
    this.#tripContainer = tripContainer;
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
    // const escKeyDownHandler = (evt) => {
    //   if (evt.key === 'Escape') {
    //     evt.preventDefault();
    //     replaceEditorToEvent();
    //     document.removeEventListener('keydown', escKeyDownHandler);
    //   }
    // };
    //
    // const eventComponent = new EventView({
    //   eventTrip,
    //   destination,
    //   offers,
    //   onEditClick: () => {
    //     replaceEventToEditor();
    //     document.addEventListener('keydown', escKeyDownHandler);
    //   }
    // });
    //
    // const eventEditComponent = new EventEditView({
    //   eventTrip,
    //   destination,
    //   offers,
    //   onFormSubmit: () => {
    //     replaceEditorToEvent();
    //     document.removeEventListener('keydown', escKeyDownHandler);
    //   },
    //   onToggleClick: () => {
    //     replaceEditorToEvent();
    //     document.removeEventListener('keydown', escKeyDownHandler);
    //   }
    // });
    //
    // function replaceEventToEditor() {
    //   replace(eventEditComponent, eventComponent);
    // }
    //
    // function replaceEditorToEvent() {
    //   replace(eventComponent, eventEditComponent);
    // }
    //
    // render(eventComponent, this.#tripListComponent.element);
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

  #renderTrip() {
    render(this.#tripListComponent, this.#tripContainer);

    if (this.#tripEvents.length === 0) {
      this.#renderTripEmpty();
      return;
    }

    this.#renderSort();
    this.#renderTripList();


    // for (let i = 0; i < this.#tripEvents.length; i++) {
    //   const event = this.#tripEvents[i];
    //   const eventDestination = this.#destinations.find((destination) => destination.id === event.destination);
    //   const eventOffers = this.#offers.find((offer) => offer.type === event.type).offers;
    //
    //   this.#renderEvent({
    //     eventTrip: event,
    //     destination: eventDestination,
    //     offers: eventOffers
    //   });
    // }
  }
}
