import { EventCardDetails, Society } from "../../constants/types";

export const FETCH_EVENTS_CARDS = "FETCH_EVENTS_CARDS";

export const FETCH_CAL_EVENTS = "FETCH_CAL_EVENTS";

export const FETCH_PROFILE_INTERESTS = "FETCH_PROFILE_INTERESTS"
export const REMOVE_PROFILE_INTEREST = "REMOVE_PROFILE_INTEREST"
export const FETCH_PROFILE_SOCS = "FETCH_PROFILE_SOCS"

interface FetchEventCardsAction {
   type: typeof FETCH_EVENTS_CARDS,
   payload: EventCardDetails[]
}

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

export type FetchEventType = FetchEventCardsAction;

export type FetchCalType = FetchCalendarEventsAction;

export type FetchProfileType =  FetchProfileInterestsAction | RemoveProfileInterestAction | FetchProfileSocsAction;

export type AppActions = FetchEventType | FetchCalType | FetchProfileType;