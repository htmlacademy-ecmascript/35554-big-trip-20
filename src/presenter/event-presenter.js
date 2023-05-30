import EventView from '../view/event-view';
import {remove, render, replace} from '../framework/render';
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

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

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

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#eventListContainer.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventListContainer.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
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
