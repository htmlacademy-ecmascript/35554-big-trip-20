import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const';

const EmptyTripListTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no points in the future',
  [FilterType.PRESENT]: 'There are no points today',
  [FilterType.PAST]: 'There are no points in the past',
};

function createTripListEmptyTemplate(filterType) {
  const emptyTripListTextValue = EmptyTripListTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${emptyTripListTextValue}
    </p>`
  );
}

export default class TripListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTripListEmptyTemplate(this.#filterType);
  }
}
