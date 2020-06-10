import { FetchEventType, FETCH_EVENTS_CARDS, FETCH_SEARCH_EVENT_CARDS, FETCH_MORE_SEARCH_EVENT_CARDS  } from "../actions/types";
import { EventCardState } from "../types/stateTypes";
import { EVENT_SEARCH_BATCH_SIZE } from "../../constants/constants";

const initialState: EventCardState = {
   events: [],
   moreResults: false
}

export function eventCardsReducer(state = initialState, action: FetchEventType): EventCardState {
   switch(action.type) {
      case FETCH_EVENTS_CARDS:
         return {
            ...state,
            events: action.payload,
            moreResults: action.payload.length === EVENT_SEARCH_BATCH_SIZE
         };
      case FETCH_SEARCH_EVENT_CARDS:
         return {
            ...state,
            events: action.payload,
            moreResults: action.payload.length === EVENT_SEARCH_BATCH_SIZE
         };
      case FETCH_MORE_SEARCH_EVENT_CARDS:
         return {
            ...state,
            events: state.events.concat(action.payload.filter((event) => !state.events.includes(event))),
            moreResults: action.payload.length === EVENT_SEARCH_BATCH_SIZE
         };
      default:
         return state;

   }

}