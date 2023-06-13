import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const DateFormat = {
  DATE_SHORT: 'MMM D',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
  TIME: 'HH:mm',
  DATE_FULL: 'DD/MM/YY HH:mm',
  MINUTES: 'mm[M]',
  HOURS_MINUTE: 'HH[H] mm[M]',
  DAYS_HOURS_MINUTES: 'DD[D] HH[H] mm[M]',
};
const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

function getRefineEventDateTime(date) {
  return date ? dayjs(date).utc().format(DateFormat.DATE_TIME) : '';
}

function getRefineEventDateShort(date) {
  return date ? dayjs(date).utc().format(DateFormat.DATE_SHORT) : '';
}

function getRefineTimeDate(date) {
  return date ? dayjs(date).utc().format(DateFormat.TIME) : '';
}

function getRefineFullDate(date) {
  return date ? dayjs(date).utc().format(DateFormat.DATE_FULL) : '';
}

function getTimeDifference(dateFrom, dateTo) {
  const timeDifference = dayjs(dateTo).diff(dayjs(dateFrom));
  let durationPoint = 0;
  switch (true) {
    case (timeDifference >= MSEC_IN_DAY):
      durationPoint = dayjs.duration(timeDifference).format(DateFormat.DAYS_HOURS_MINUTES);
      break;
    case (timeDifference >= MSEC_IN_HOUR):
      durationPoint = dayjs.duration(timeDifference).format(DateFormat.HOURS_MINUTE);
      break;
    case (timeDifference < MSEC_IN_HOUR):
      durationPoint = dayjs.duration(timeDifference).format(DateFormat.MINUTES);
      break;
  }
  return durationPoint;
}

function isEventFuture(dateFrom) {
  return dayjs(dateFrom).isAfter(dayjs());
}

function isEventPresent(dateFrom, dateTo) {
  return dayjs(dateFrom).isSameOrBefore((dayjs())) && dayjs(dateTo).isSameOrAfter((dayjs()));
}

function isEventPast(dateTo) {
  return dayjs(dateTo).isBefore((dayjs()));
}

function sortByDay(eventA, eventB) {
  if (dayjs(eventA.dateFrom).isAfter(dayjs(eventB.dateFrom))) {
    return 1;
  }
  if (dayjs(eventA.dateFrom) === dayjs(eventB.dateFrom)) {
    return 0;
  }
  if (dayjs(eventA.dateFrom).isBefore(dayjs(eventB.dateFrom))) {
    return -1;
  }
}

function sortByTime(eventA, eventB) {
  return dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom)) - dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom));
}

function sortByPrice(eventA, eventB) {
  return eventB.basePrice - eventA.basePrice;
}

export {
  getRefineEventDateShort,
  getRefineTimeDate,
  getTimeDifference,
  getRefineFullDate,
  getRefineEventDateTime,
  isEventFuture,
  isEventPast,
  isEventPresent,
  sortByDay,
  sortByTime,
  sortByPrice
};
