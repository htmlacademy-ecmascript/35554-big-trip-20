import {filter} from '../utils/filter';

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(events).length,
    })
  );
}

export {generateFilter};
