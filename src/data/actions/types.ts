import { EventCardDetails } from "../../constants/types";

export const FETCH_EVENTS_CARDS = "FETCH_EVENTS_CARDS";

interface FetchEventCardsAction {
   type: typeof FETCH_EVENTS_CARDS,
   payload: EventCardDetails[]
}

export type FetchEventType = FetchEventCardsAction;



export const USER_LOGIN = "USER_LOGIN";

interface LoginAction {
   type: typeof USER_LOGIN,
   payload: boolean
}

export type UserType = LoginAction;