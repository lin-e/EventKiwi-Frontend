import { EventCardDetails, Post, ProfileDetails, EventDetails, SocietyCard, CalendarEvent, InterestDetails, EventPosts } from "../../constants/types";

import { UserProfile } from "./dataInterfaces";

export interface SocietyCardState {
   societies: SocietyCard[]
}

export interface EventCardState {
   events: EventCardDetails[]
}

export interface ViewEventState {
   events: EventDetails[],
   loading: boolean
}

export interface EventPostsState {
   eventPosts: EventPosts[],
   posts: Post[],
   discoverPosts: Post[],
   eventsPost: Post[]
}

export interface UserState {
   loading: boolean,
   isLoggedIn: boolean,
   userToken: string,
   profile: UserProfile
}

export interface CalendarEventsState {
   events: CalendarEvent[];
}

export interface ProfileDetailsState {
   profileDetails: ProfileDetails,
   invalidResponse: boolean
}

export interface interestSearchState {
   interests: InterestDetails[]
}