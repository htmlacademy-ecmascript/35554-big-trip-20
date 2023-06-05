import EventView from '../view/event-view';
import {remove, render, replace} from '../framework/render';
import EventEditView from '../view/event-edit-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #eventTrip = null;
  #destination = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor({eventListContainer, onDataChange, onModeChange, destination, destinations, offers}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#destination = destination;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init(eventTrip) {
    this.#eventTrip = eventTrip;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      eventTrip: this.#eventTrip,
      destination: this.#destination,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });
    this.#eventEditComponent = new EventEditView({
      eventTrip: this.#eventTrip,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onToggleClick: this.#handleToggleClick,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventEditComponent.reset(this.#eventTrip);
      this.#replaceEditorToEvent();
    }
  }

  #replaceEventToEditor() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditorToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#eventTrip);
      this.#replaceEditorToEvent();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToEditor();
  };

  #handleToggleClick = () => {
    this.#eventEditComponent.reset(this.#eventTrip);
    this.#replaceEditorToEvent();
  };

  #handleDeleteClick = () => {
    this.#eventEditComponent.reset(this.#eventTrip);
    this.#replaceEditorToEvent();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#eventTrip, isFavorite: !this.#eventTrip.isFavorite});
  };

  #handleFormSubmit = (eventTrip) => {
    this.#handleDataChange(eventTrip);
    this.#replaceEditorToEvent();
  };
}
