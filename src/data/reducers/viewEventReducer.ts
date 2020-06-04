import { ViewEventState } from "../types/stateTypes";
import { blankEventDetails } from "../../constants/types";
import { ViewEventType, 
         LOAD_EVENT_DETAILS, 
         LOADING_EVENT,
         EVENT_NOT_GOING, 
         EVENT_INTERESTED, 
         EVENT_GOING, 
         LOAD_BLANK_EVENT_DETAILS, 
         EVENTS_LOAD_EVENT_DETAILS, 
         DISCOVER_LOAD_EVENT_DETAILS, 
         EVENTS_EVENT_GOING, EVENTS_EVENT_NOT_GOING, 
         EVENTS_EVENT_INTERESTED, 
         DISCOVER_EVENT_GOING, 
         DISCOVER_EVENT_NOT_GOING, 
         DISCOVER_EVENT_INTERESTED, 
         LOAD_EVENTS_BLANK_EVENT_DETAILS, 
         LOAD_DISCOVER_BLANK_EVENT_DETAILS} from "../actions/viewEvent/viewEventTypes";
import { NOT_GOING, GOING, INTERESTED } from "../../constants/constants";

const initialState: ViewEventState = {
   event: blankEventDetails,
   eventsEvent: blankEventDetails,
   discoverEvent: blankEventDetails,
   loading: true
}


export function viewEventReducer(state = initialState, action: ViewEventType): ViewEventState {
   switch(action.type) {
      case LOAD_EVENT_DETAILS:
         return {
            ...state,
            event: action.payload,
            loading: false
         }

      case EVENTS_LOAD_EVENT_DETAILS:
         return {
            ...state,
            eventsEvent: action.payload,
            loading: false
         }
      
      case DISCOVER_LOAD_EVENT_DETAILS:
         return {
            ...state,
            discoverEvent: action.payload,
            loading: false
         }

      case LOAD_BLANK_EVENT_DETAILS:
         return {
            ...state,
            event: blankEventDetails
         }
      
      case LOAD_EVENTS_BLANK_EVENT_DETAILS:
         return {
            ...state,
            eventsEvent: blankEventDetails
         }

      case LOAD_DISCOVER_BLANK_EVENT_DETAILS:
         return {
            ...state,
            discoverEvent: blankEventDetails
         }

      case LOADING_EVENT:
         return {
            ...state,
            loading: true
         }

      case EVENT_GOING:
         const going = state.event;
         going.goingStatus = GOING;
         return {
            ...state,
            event: going
         }

      case EVENT_NOT_GOING:
         const notGoing = state.event;
         notGoing.goingStatus = NOT_GOING;
         return {
            ...state,
            event: notGoing
         }

      case EVENT_INTERESTED:
         const interested = state.event;
         interested.goingStatus = INTERESTED;
         return {
            ...state,
            event: interested
         }

      case EVENTS_EVENT_GOING:
         const e_going = state.eventsEvent;
         e_going.goingStatus = GOING;
         return {
            ...state,
            eventsEvent: e_going
         }

      case EVENTS_EVENT_NOT_GOING:
         const e_notGoing = state.eventsEvent;
         e_notGoing.goingStatus = NOT_GOING;
         return {
            ...state,
            eventsEvent: e_notGoing
         }

      case EVENTS_EVENT_INTERESTED:
         const e_interested = state.eventsEvent;
         e_interested.goingStatus = INTERESTED;
         return {
            ...state,
            eventsEvent: e_interested
         }

      case DISCOVER_EVENT_GOING:
         const d_going = state.discoverEvent;
         d_going.goingStatus = GOING;
         return {
            ...state,
            discoverEvent: d_going
         }

      case DISCOVER_EVENT_NOT_GOING:
         const d_notGoing = state.discoverEvent;
         d_notGoing.goingStatus = NOT_GOING;
         return {
            ...state,
            discoverEvent: d_notGoing
         }

      case DISCOVER_EVENT_INTERESTED:
         const d_interested = state.discoverEvent;
         d_interested.goingStatus = INTERESTED;
         return {
            ...state,
            discoverEvent: d_interested
         }

      default:
         return state;

   }

}