import { EventCardDetails, Society, EventDetails, Post } from "../../constants/types";
import { UserProfile } from "./dataInterfaces";

export interface EventCardState {
   events: EventCardDetails[]
}

export interface ViewEventState {
   event: EventDetails,
   loading: boolean
}

export interface EventPostsState {
   posts: Post[]
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