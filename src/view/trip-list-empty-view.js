import AbstractView from '../framework/view/abstract-view';

function createTripListEmptyTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class TripListEmptyView extends AbstractView {
  get template() {
    return createTripListEmptyTemplate();
  }
}
