import { EventCardDetails, Post, ProfileDetails, EventDetails, SocietyCard } from "../../constants/types";

import { UserProfile } from "./dataInterfaces";

export interface SocietyCardState {
   societies: SocietyCard[]
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