import { EventCardDetails } from "../../constants/types";

export const FETCH_EVENTS_CARDS = "FETCH_EVENTS_CARDS";
export const FETCH_CAL_EVENTS = "FETCH_CAL_EVENTS";

interface FetchEventCardsAction {
   type: typeof FETCH_EVENTS_CARDS,
   payload: EventCardDetails[]
}

export interface FetchCalendarEventsAction {
   type: typeof FETCH_CAL_EVENTS,
   payload: EventCardDetails[]
}

export type FetchEventType = FetchEventCardsAction;

export type FetchCalType = FetchCalendarEventsAction;

export type AppActions = FetchEventType | FetchCalType;