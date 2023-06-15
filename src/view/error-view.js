import AbstractView from '../framework/view/abstract-view';

const createErrorTemplate = () => '<p class="trip-events__msg">The server is unavailable, please try again later.</p>';

export default class ErrorView extends AbstractView {
  get template() {
    return createErrorTemplate();
  }
}
