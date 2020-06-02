import { EventCardDetails, Society, SocietyBasic, ProfileDetails } from "../../constants/types";
import { UserProfile } from "./dataInterfaces";

export interface EventCardState {
   events: EventCardDetails[]
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
   profileDetails: ProfileDetails
}

export interface ProfileInterestState {
   interests: string[];
}

export interface ProfileSocState {
   societies: Society[]
}