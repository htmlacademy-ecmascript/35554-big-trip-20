import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';
import InfoPresenter from './presenter/info-presenter';
import {render} from './framework/render';
import NewEventButtonView from './view/new-event-button-view';
import EventsApiService from './events-api-service';

const AUTHORIZATION = 'Basic Sskjkf3d8drbn4d';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const siteTripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const filtersContainerElement = document.querySelector('.trip-controls__filters');

const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
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

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripPresenter.createEvent();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, siteTripMainElement);

filterPresenter.init();
infoPresenter.init();
tripPresenter.init();
eventsModel.init();

