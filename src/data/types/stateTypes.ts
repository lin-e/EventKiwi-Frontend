import { EventCardDetails, Society, EventDetails } from "../../constants/types";
import { UserProfile } from "./dataInterfaces";

export interface EventCardState {
   events: EventCardDetails[]
}

export interface ViewEventState {
   event: EventDetails
}

export interface UserState {
   loading: boolean,
   isLoggedIn: boolean,
   userToken: string,
   profile: UserProfile
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