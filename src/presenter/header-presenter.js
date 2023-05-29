import {render, RenderPosition} from '../framework/render';
import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';

export default class HeaderPresenter {
  #container = null;
  #infoContainer = null;
  #filters = null;

  constructor({container, filters}) {
    this.#container = container;
    this.#filters = filters;
    this.#infoContainer = container.querySelector('.trip-controls__filters');
  }

  init() {
    render(new TripInfoView(), this.#container, RenderPosition.AFTERBEGIN);
    render(new FilterView({filters: this.#filters}), this.#infoContainer);
  }
}
