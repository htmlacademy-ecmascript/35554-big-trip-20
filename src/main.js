import TripInfoView from './view/trip-info-view';
import FilterView from './view/filter-view';
import {render} from './render';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');

render(new TripInfoView(), siteTripMainElement);
render(new FilterView(), siteFilterElement);

