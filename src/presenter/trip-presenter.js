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
    render(new SortView(), this.tripListComponent.getElement());
    render(this.tripListComponent, this.tripContainer);
    render(new EventEditView(), this.tripListComponent.getElement());

    for (let i = 0; i < this.tripEvents.length; i++) {
      render(new EventView({eventTrip: this.tripEvents[i]}), this.tripListComponent.getElement());
    }
  }
}
