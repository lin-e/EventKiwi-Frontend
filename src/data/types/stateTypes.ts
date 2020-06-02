import { EventCardDetails, Society, SocietyBasic, ProfileDetails, EventDetails } from "../../constants/types";
import { UserProfile } from "./dataInterfaces";

export interface EventCardState {
   events: EventCardDetails[]
}

export interface ViewEventState {
   event: EventDetails,
   loading: boolean
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

export interface ProfileDetailsState {
   profileDetails: ProfileDetails,
   invalidResponse: boolean
}