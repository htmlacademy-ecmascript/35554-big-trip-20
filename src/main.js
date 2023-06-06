import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventsModel from './model/events-model';
// import {generateFilter} from './mock/filters';
import FilterModel from './model/filter-model';
import {render} from './framework/render';
import FilterView from './view/filter-view';

const siteTripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const filtersContainerElement = document.querySelector('.trip-controls__filters');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
// const filters = generateFilter(eventsModel.events);
const filters = [
  {
    type: 'all',
    count: 0,
  },
];

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  headerContainer: siteTripMainElement,
  eventsModel,
});

render(new FilterView({
  filters,
  currentFilterType: 'all',
  onFilterTypeChange: () => {}
}), filtersContainerElement);

const filterPresenter = new FilterPresenter({filters});

filterPresenter.init();
tripPresenter.init();

