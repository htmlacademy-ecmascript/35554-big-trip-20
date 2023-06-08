import EventEditView from '../view/event-edit-view';
import {remove, render, RenderPosition} from '../framework/render';
import {UpdateType, UserAction} from '../const';
import {nanoid} from 'nanoid';

export default class NewEventPresenter {
  #eventListContainer = null;
  #destinations = null;
  #offers = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #eventEditComponent = null;

  constructor({eventListContainer, destinations, offers, onDataChange, onDestroy}) {
    this.#eventListContainer = eventListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    // if (this.#eventListContainer !== null) {
    //   return;
    // }

    this.#eventEditComponent = new EventEditView({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#eventEditComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
