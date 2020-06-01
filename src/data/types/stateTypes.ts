import { EventCardDetails } from "../../constants/types";

export interface EventCardState {
   events: EventCardDetails[]
}

interface UserProfile {
   firstname: string,
   surname: string,
   email: string
}


export interface UserState {
   isLoggedIn: boolean,
   userToken: string,
   profile: UserProfile
}