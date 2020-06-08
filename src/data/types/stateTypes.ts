import { EventCardDetails, Post, ProfileDetails, EventDetails, SocietyCard, CalendarEvent, InterestDetails } from "../../constants/types";

import { UserProfile } from "./dataInterfaces";

export interface SocietyCardState {
   societies: SocietyCard[]
}

export interface EventCardState {
   events: EventCardDetails[],
   moreResults: boolean
}

export interface ViewEventState {
   event: EventDetails,
   eventsEvent: EventDetails,
   discoverEvent: EventDetails,
   loading: boolean
}

export interface EventPostsState {
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