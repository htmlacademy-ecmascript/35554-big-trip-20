import {render, replace} from '../framework/render';
import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';

export default class TripPresenter {
  #tripContainer = null;
  #eventsModel = null;

  #tripListComponent = new TripListView();
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

  #renderEvent({eventTrip, destination, offers}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const eventComponent = new EventView({
      eventTrip,
      destination,
      offers,
      onEditClick: () => {
        replaceEventToEditor();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EventEditView({
      eventTrip,
      destination,
      offers,
      onFormSubmit: () => {
        replaceEditorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onToggleClick: () => {
        replaceEditorToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceEventToEditor() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceEditorToEvent() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#tripListComponent.element);
  }

  #renderTrip() {
    if (this.#tripEvents.length === 0) {
      render(new TripListEmptyView, this.#tripContainer);
      return;
    }
    render(new SortView(), this.#tripListComponent.element);
    render(this.#tripListComponent, this.#tripContainer);

    for (let i = 0; i < this.#tripEvents.length; i++) {
      const event = this.#tripEvents[i];
      const eventDestination = this.#destinations.find((destination) => destination.id === event.destination);
      const eventOffers = this.#offers.find((offer) => offer.type === event.type).offers;

      this.#renderEvent({
        eventTrip: event,
        destination: eventDestination,
        offers: eventOffers
      });
    }
  }
}
