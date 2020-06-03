
import { UserProfile } from "./dataInterfaces";
import { Society, EventCardDetails, EventDetails, Post, ProfileDetails } from "../../constants/types";

export interface SocietyCardState {
   societies: Society[]
}

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

export interface ProfileDetailsState {
   profileDetails: ProfileDetails,
   invalidResponse: boolean
}