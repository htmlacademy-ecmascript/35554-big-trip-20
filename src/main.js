import TripPresenter from './presenter/trip-presenter';
import HeaderPresenter from './presenter/header-presenter';

const siteTripMainElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({tripContainer: tripEventsElement});
const headerPresenter = new HeaderPresenter({container: siteTripMainElement});

headerPresenter.init();
tripPresenter.init();

