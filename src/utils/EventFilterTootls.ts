import { CalendarEvent, EventGroupByDate } from "../constants/types";
import { sameDay } from "./DateTimeTools";

export function groupByDate(events: CalendarEvent[]) {
  if (events.length == 0) {
    return [];
  }

  let currDate = events[0].datetimeStart
  const groupedItems: EventGroupByDate[] = [{
    date: currDate,
    events: []
  }];

  events.forEach((event) => {
    if (sameDay(currDate, event.datetimeStart)) {
      groupedItems[groupedItems.length - 1].events.push(event);
    } else {
      currDate = event.datetimeStart
      groupedItems.push({
        date: currDate,
        events: [event]
      })
    }
  })

  return groupedItems;
}

export const myEvent = (event: CalendarEvent, socId: string) => {
  return event.organiser.id === socId;
}