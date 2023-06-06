import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';
import InfoPresenter from './presenter/info-presenter';

const siteTripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const filtersContainerElement = document.querySelector('.trip-controls__filters');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  eventsModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainerElement,
  filterModel,
  eventsModel
});

const infoPresenter = new InfoPresenter({
  infoContainer: siteTripMainElement,
  eventsModel
});

filterPresenter.init();
infoPresenter.init();
tripPresenter.init();

