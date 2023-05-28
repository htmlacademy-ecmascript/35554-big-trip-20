import {render, RenderPosition} from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';

export default class HeaderPresenter {
  #container = null;
  #infoContainer = null;

  constructor({container}) {
    this.#container = container;
    this.#infoContainer = container.querySelector('.trip-controls__filters');
  }

  init() {
    render(new TripInfoView(), this.#container, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.#infoContainer);
  }
}
