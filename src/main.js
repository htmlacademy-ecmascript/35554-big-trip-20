import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import {render, RenderPosition} from './render';
import TripPresenter from './presenter/trip-presenter';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({tripContainer: tripEventsElement});

render(new TripInfoView(), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), siteFilterElement);

tripPresenter.init();

