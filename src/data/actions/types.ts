import { EventCardDetails, Society, ProfileDetails } from "../../constants/types";
import { AuthResponse } from "../types/dataInterfaces";
import { UserState } from "../types/stateTypes";

export const FETCH_EVENTS_CARDS = "FETCH_EVENTS_CARDS";
export const FETCH_SEARCH_EVENT_CARDS = "FETCH_SEARCH_EVENT_CARDS"

export const FETCH_CAL_EVENTS = "FETCH_CAL_EVENTS";

export const FETCH_PROFILE_DETAILS = "FETCH_PROFILE_DETAILS"
export const FETCH_PROFILE_INTERESTS = "FETCH_PROFILE_INTERESTS"
export const REMOVE_PROFILE_INTEREST = "REMOVE_PROFILE_INTEREST"
export const FETCH_PROFILE_SOCS = "FETCH_PROFILE_SOCS"

export interface FetchEventCardsAction {
   type: typeof FETCH_EVENTS_CARDS,
   payload: EventCardDetails[]
}

export interface FetchSearchEventCardsAction {
   type: typeof FETCH_SEARCH_EVENT_CARDS,
   payload: EventCardDetails[]
}


export interface FetchCalendarEventsAction {
   type: typeof FETCH_CAL_EVENTS,
   payload: EventCardDetails[]
}


export interface FetchProfileDetailsAction {
   type: typeof FETCH_PROFILE_DETAILS,
   payload: ProfileDetails
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



export type FetchEventType = FetchEventCardsAction | FetchSearchEventCardsAction;

export type FetchCalType = FetchCalendarEventsAction;

export type FetchProfileType =  FetchProfileDetailsAction | FetchProfileInterestsAction | RemoveProfileInterestAction | FetchProfileSocsAction;

export type AppActions = FetchEventType | FetchCalType | FetchProfileType | UserType;



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