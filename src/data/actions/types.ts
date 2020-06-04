import { AuthResponse } from "../types/dataInterfaces";
import { UserState } from "../types/stateTypes";
import { Society, EventCardDetails, EventDetails, Post, ProfileDetails } from "../../constants/types";

export const FETCH_SEARCH_SOCIETY_CARDS = "FETCH_SEARCH_SOCIETY_CARDS";

export interface FetchSearchSocietyCardsAction {
   type: typeof FETCH_SEARCH_SOCIETY_CARDS,
   payload: Society[]
}

export type FetchSocietyType = FetchSearchSocietyCardsAction;


export const FETCH_EVENTS_CARDS = "FETCH_EVENTS_CARDS";
export const FETCH_SEARCH_EVENT_CARDS = "FETCH_SEARCH_EVENT_CARDS";

export interface FetchEventCardsAction {
   type: typeof FETCH_EVENTS_CARDS,
   payload: EventCardDetails[]
}

export interface FetchSearchEventCardsAction {
   type: typeof FETCH_SEARCH_EVENT_CARDS,
   payload: EventCardDetails[]
}

export type FetchEventType = FetchEventCardsAction | FetchSearchEventCardsAction;


export const FETCH_CAL_EVENTS = "FETCH_CAL_EVENTS";

export interface FetchCalendarEventsAction {
   type: typeof FETCH_CAL_EVENTS,
   payload: EventCardDetails[]
}

export type FetchCalType = FetchCalendarEventsAction;


export const FETCH_PROFILE_DETAILS = "FETCH_PROFILE_DETAILS"
export const FETCH_PROFILE_DETAILS_FAILED = "FETCH_PROFILE_DETAILS_FAILED"
export const RESET_PROFILE_INVALID_RESPONSE = "RESET_PROFILE_INVALID_RESPONSE"
export const ADD_PROFILE_INTEREST = "ADD_PROFILE_INTEREST"
export const REMOVE_PROFILE_INTEREST = "REMOVE_PROFILE_INTEREST"

export interface FetchProfileDetailsAction {
   type: typeof FETCH_PROFILE_DETAILS,
   payload: ProfileDetails
}

export interface FetchProfileDetailsFailedAction {
   type: typeof FETCH_PROFILE_DETAILS_FAILED,
}

export interface ResetProfileInvalidResponseAction {
   type: typeof RESET_PROFILE_INVALID_RESPONSE,
}

export interface AddProfileInterestAction {
   type: typeof ADD_PROFILE_INTEREST,
   status: string,
   payload: string
}

export interface RemoveProfileInterestAction {
   type: typeof REMOVE_PROFILE_INTEREST,
   status: string,
   payload: string
}

export type FetchProfileType =  FetchProfileDetailsAction | FetchProfileDetailsFailedAction | ResetProfileInvalidResponseAction | AddProfileInterestAction | RemoveProfileInterestAction;


export const LOAD_EVENT_DETAILS = "LOAD_EVENT_DETAILS"
export const EVENTS_LOAD_EVENT_DETAILS = "EVENTS_LOAD_EVENT_DETAILS"
export const DISCOVER_LOAD_EVENT_DETAILS = "DISCOVER_LOAD_EVENT_DETAILS"
export const LOAD_BLANK_EVENT_DETAILS = "LOAD_BLANK_EVENT_DETAILS"
export const LOADING_EVENT = "LOADING_EVENT"
export const EVENT_GOING = "EVENT_GOING"
export const EVENT_INTERESTED = "EVENT_INTERESTED"
export const EVENT_NOT_GOING = "EVENT_NOT_GOING"

interface LoadEventDetailsAction {
   type: typeof LOAD_EVENT_DETAILS,
   payload: EventDetails
}

interface EventsLoadEventDetailsAction {
   type: typeof EVENTS_LOAD_EVENT_DETAILS,
   payload: EventDetails
}

interface DiscoverLoadEventDetailsAction {
   type: typeof DISCOVER_LOAD_EVENT_DETAILS,
   payload: EventDetails
}

interface LoadBlankEventDetailsAction {
   type: typeof LOAD_BLANK_EVENT_DETAILS
}

interface LoadingEventAction {
   type: typeof LOADING_EVENT
}

interface GoingAction {
   type: typeof EVENT_GOING
}

interface InterestedAction {
   type: typeof EVENT_INTERESTED
}

interface NotGoingAction {
   type: typeof EVENT_NOT_GOING
}

export type ViewEventType = LoadEventDetailsAction 
                          | LoadingEventAction 
                          | GoingAction 
                          | InterestedAction 
                          | NotGoingAction 
                          | LoadBlankEventDetailsAction 
                          | EventsLoadEventDetailsAction 
                          | DiscoverLoadEventDetailsAction;


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

export const GET_EVENT_POSTS = "GET_EVENT_POSTS";

interface GetEventPostsAction {
   type: typeof GET_EVENT_POSTS,
   payload: Post[]
}

export type EventPostType = GetEventPostsAction;

export type AppActions = FetchSocietyType | FetchEventType | FetchCalType | FetchProfileType | ViewEventType | UserType | EventPostType;
