import {render} from '../framework/render';
import FilterView from '../view/filter-view';

export default class FilterPresenter {
  #infoContainer = null;
  #filters = null;

  constructor({filters}) {
    this.#filters = filters;
    this.#infoContainer = document.querySelector('.trip-controls__filters');
  }

  init() {
    render(new FilterView({filters: this.#filters}), this.#infoContainer);
  }
}
