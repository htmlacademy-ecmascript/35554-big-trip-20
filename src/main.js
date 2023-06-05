import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventsModel from './model/events-model';
import {generateFilter} from './mock/filters';
import FilterModel from './model/filter-model';

const siteTripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const filters = generateFilter(eventsModel.events);

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  headerContainer: siteTripMainElement,
  eventsModel,
});

const filterPresenter = new FilterPresenter({filters});

filterPresenter.init();
tripPresenter.init();

