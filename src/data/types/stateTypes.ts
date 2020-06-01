import { EventCardDetails, Society } from "../../constants/types";

export interface EventCardState {
   events: EventCardDetails[]
}

export interface CalendarEventsState {
   events: EventCardDetails[];
}

export interface ProfileInterestState {
   interests: string[];
}

export interface ProfileSocState {
   societies: Society[]
}