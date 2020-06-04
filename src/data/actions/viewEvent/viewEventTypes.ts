import { EventDetails } from "../../../constants/types"

export const LOAD_EVENT_DETAILS = "LOAD_EVENT_DETAILS"
export const EVENTS_LOAD_EVENT_DETAILS = "EVENTS_LOAD_EVENT_DETAILS"
export const DISCOVER_LOAD_EVENT_DETAILS = "DISCOVER_LOAD_EVENT_DETAILS"
export const LOAD_BLANK_EVENT_DETAILS = "LOAD_BLANK_EVENT_DETAILS"
export const LOAD_DISCOVER_BLANK_EVENT_DETAILS = "LOAD_DISCOVER_BLANK_EVENT_DETAILS"
export const LOAD_EVENTS_BLANK_EVENT_DETAILS = "LOAD_EVENTS_BLANK_EVENT_DETAILS"
export const LOADING_EVENT = "LOADING_EVENT"
export const EVENT_GOING = "EVENT_GOING"
export const EVENT_INTERESTED = "EVENT_INTERESTED"
export const EVENT_NOT_GOING = "EVENT_NOT_GOING"
export const EVENTS_EVENT_GOING = "EVENTS_EVENT_GOING"
export const EVENTS_EVENT_INTERESTED = "EVENTS_EVENT_INTERESTED"
export const EVENTS_EVENT_NOT_GOING = "EVENTS_EVENT_NOT_GOING"
export const DISCOVER_EVENT_GOING = "DISCOVER_EVENT_GOING"
export const DISCOVER_EVENT_INTERESTED = "DISCOVER_EVENT_INTERESTED"
export const DISCOVER_EVENT_NOT_GOING = "DISCOVER_EVENT_NOT_GOING"

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

interface LoadBlankDiscoverEventDetailsAction {
   type: typeof LOAD_DISCOVER_BLANK_EVENT_DETAILS
}

interface LoadBlankEventsEventDetailsAction {
   type: typeof LOAD_EVENTS_BLANK_EVENT_DETAILS
}

interface LoadingEventAction {
   type: typeof LOADING_EVENT
}

interface GoingAction { type: typeof EVENT_GOING }
interface InterestedAction { type: typeof EVENT_INTERESTED }
interface NotGoingAction { type: typeof EVENT_NOT_GOING }

interface EventsGoingAction { type: typeof EVENTS_EVENT_GOING }
interface EventsInterestedAction { type: typeof EVENTS_EVENT_INTERESTED }
interface EventsNotGoingAction { type: typeof EVENTS_EVENT_NOT_GOING }

interface DiscoverGoingAction { type: typeof DISCOVER_EVENT_GOING }
interface DiscoverInterestedAction { type: typeof DISCOVER_EVENT_INTERESTED }
interface DiscoverNotGoingAction { type: typeof DISCOVER_EVENT_NOT_GOING }

export type ViewEventType = LoadEventDetailsAction 
                          | LoadingEventAction 
                          | GoingAction 
                          | InterestedAction 
                          | NotGoingAction 
                          | LoadBlankEventDetailsAction 
                          | EventsLoadEventDetailsAction 
                          | DiscoverLoadEventDetailsAction
                          | EventsGoingAction
                          | EventsInterestedAction
                          | EventsNotGoingAction
                          | DiscoverGoingAction
                          | DiscoverInterestedAction
                          | DiscoverNotGoingAction
                          | LoadBlankDiscoverEventDetailsAction
                          | LoadBlankEventsEventDetailsAction;