import { EventCardDetails } from "../../constants/types";

export const FETCH_EVENTS_CARDS = "FETCH_EVENTS_CARDS";

interface FetchEventCardsAction {
   type: typeof FETCH_EVENTS_CARDS,
   payload: EventCardDetails[]
}

export type FetchEventType = FetchEventCardsAction;

interface AuthResponseBodyProfile {
   firstname: string,
   surname: string,
   email: string
}


interface AuthResponseBody {
   token: string,
   profile: AuthResponseBodyProfile
}

export interface AuthResponse {
   status: number,
   body: AuthResponseBody
}

// {"status":number,"body":{"token":string,"profile":{"firstname":string,"surname":string,"email":string}}}


export const USER_LOGIN = "USER_LOGIN";

interface LoginAction {
   type: typeof USER_LOGIN,
   payload: AuthResponse
}

export type UserType = LoginAction;