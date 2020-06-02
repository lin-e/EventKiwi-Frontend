import { EventCardDetails, Society, EventDetails } from "../../constants/types";
import { AuthResponse } from "../types/dataInterfaces";
import { UserState } from "../types/stateTypes";
import { type } from "os";

export const FETCH_EVENTS_CARDS = "FETCH_EVENTS_CARDS";

export const FETCH_CAL_EVENTS = "FETCH_CAL_EVENTS";

export const FETCH_PROFILE_INTERESTS = "FETCH_PROFILE_INTERESTS"
export const REMOVE_PROFILE_INTEREST = "REMOVE_PROFILE_INTEREST"
export const FETCH_PROFILE_SOCS = "FETCH_PROFILE_SOCS"

interface FetchEventCardsAction {
   type: typeof FETCH_EVENTS_CARDS,
   payload: EventCardDetails[]
}


export type FetchEventType = FetchEventCardsAction;

export interface FetchCalendarEventsAction {
   type: typeof FETCH_CAL_EVENTS,
   payload: EventCardDetails[]
}

export interface FetchProfileInterestsAction {
   type: typeof FETCH_PROFILE_INTERESTS,
   payload: string[]
}

export interface RemoveProfileInterestAction {
   type: typeof REMOVE_PROFILE_INTEREST,
   payload: string
}

export interface FetchProfileSocsAction {
   type: typeof FETCH_PROFILE_SOCS,
   payload: Society[]
}



export type FetchCalType = FetchCalendarEventsAction;

export type FetchProfileType =  FetchProfileInterestsAction | RemoveProfileInterestAction | FetchProfileSocsAction;

export type AppActions = FetchEventType | FetchCalType | FetchProfileType | ViewEventType;

export const LOAD_EVENT_DETAILS = "LOAD_EVENT_DETAILS"

interface LoadEventDetailsAction {
   type: typeof LOAD_EVENT_DETAILS,
   payload: EventDetails
}

export type ViewEventType = LoadEventDetailsAction;

export const USER_LOGIN = "USER_LOGIN";
export const LOAD_USER_DATA = "LOAD_USER_DATA";
export const USER_LOGOUT = "USER_LOGOUT";

interface LoginAction {
   type: typeof USER_LOGIN,
   payload: AuthResponse
}

interface LogoutAction {
   type: typeof USER_LOGOUT
}

interface LoadUserDataAction {
   type: typeof LOAD_USER_DATA,
   payload: UserState
}

export type UserType = LoginAction | LoadUserDataAction | LogoutAction;