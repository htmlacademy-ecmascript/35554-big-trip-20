import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view';
import {render, RenderPosition} from '../render';

export default class HeaderPresenter {
  constructor({container}) {
    this.container = container;
    this.infoContainer = container.querySelector('.trip-controls__filters');
  }

  init() {
    render(new TripInfoView(), this.container, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.infoContainer);
  }
}
