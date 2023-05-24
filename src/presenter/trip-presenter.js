import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
// import TripListEmptyView from '../view/trip-list-empty-view';
import EventView from '../view/event-view';
import EventEditView from '../view/event-edit-view';
import {render} from '../render';

export default class TripPresenter {
  tripListComponent = new TripListView();

  constructor({tripContainer, eventsModel}) {
    this.tripContainer = tripContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.tripEvents = [...this.eventsModel.getEvents()];
    this.destinations = [...this.eventsModel.getDestinations()];
    this.offers = [...this.eventsModel.getOffers()];
    render(new SortView(), this.tripListComponent.getElement());
    render(this.tripListComponent, this.tripContainer);

    const eventEditing = this.tripEvents[0];
    const eventEditingDestination = this.destinations.find((destination) => destination.id === eventEditing.destination);
    const eventEditingOffers = this.offers.find((offer) => offer.type === eventEditing.type).offers;

    render(new EventEditView({
      eventTrip: eventEditing,
      destination: eventEditingDestination,
      offers: eventEditingOffers
    }),
    this.tripListComponent.getElement());

    for (let i = 1; i < this.tripEvents.length; i++) {
      const event = this.tripEvents[i];
      const eventDestination = this.destinations.find((destination) => destination.id === event.destination);
      const eventOffers = this.offers.find((offer) => offer.type === event.type).offers;

      render(new EventView({
        eventTrip: event,
        destination: eventDestination,
        offers: eventOffers
      }),
      this.tripListComponent.getElement());
    }
  }
}
