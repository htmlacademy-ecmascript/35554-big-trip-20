import TripInfoView from '../view/trip-info-view';
import {render, RenderPosition} from '../framework/render';

export default class InfoPresenter {
  #infoContainer = null;
  #eventsModel = null;

  #infoComponent = null;

  constructor({infoContainer, eventsModel}) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#infoComponent = new TripInfoView({
      eventsModel: this.#eventsModel
    });

    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
