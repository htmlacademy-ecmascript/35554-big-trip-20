const DEFAULT_TYPE = 'Taxi';

const EVENT_EMPTY = {
  type: DEFAULT_TYPE,
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  offers: [],
  destination: null,
  isFavorite: false
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {EVENT_EMPTY, FilterType, SortType, UpdateType, UserAction};
