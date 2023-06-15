import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';
import EventsApiService from './events-api-service';

const AUTHORIZATION = 'Basic Sskjkf3d8drbn4d';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const siteTripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const filtersContainerElement = document.querySelector('.trip-controls__filters');

const main = async() => {
  const eventsModel = new EventsModel({
    eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
  });

  await eventsModel.init();

  const filterModel = new FilterModel();

  const tripPresenter = new TripPresenter({
    tripContainer: tripEventsElement,
    eventsModel,
    filterModel,
    infoContainer: siteTripMainElement,
  });

  const filterPresenter = new FilterPresenter({
    filterContainer: filtersContainerElement,
    filterModel,
    eventsModel
  });

  filterPresenter.init();
  tripPresenter.init();
  eventsModel.init();
};

main();
