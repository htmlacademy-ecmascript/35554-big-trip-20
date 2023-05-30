import EventView from '../view/event-view';
import {render, replace} from '../framework/render';
import EventEditView from '../view/event-edit-view';

export default class EventPresenter {
  #eventListContainer = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #eventTrip = null;
  #destination = null;
  #offers = null;

  constructor({eventListContainer}) {
    this.#eventListContainer = eventListContainer;
  }

  init({eventTrip, destination, offers}) {
    this.#eventTrip = eventTrip;
    this.#destination = destination;
    this.#offers = offers;

    this.#eventComponent = new EventView({
      eventTrip: this.#eventTrip,
      destination: this.#destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick
    });
    this.#eventEditComponent = new EventEditView({
      eventTrip: this.#eventTrip,
      destination: this.#destination,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onToggleClick: this.#handleToggleClick
    });
    render(this.#eventComponent, this.#eventListContainer);
  }

  #replaceEventToEditor() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditorToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditorToEvent();
    }
  }

  #handleEditClick = () => this.#replaceEventToEditor();

  #handleFormSubmit = () => this.#replaceEditorToEvent();

  #handleToggleClick = () => this.#replaceEditorToEvent();
}
