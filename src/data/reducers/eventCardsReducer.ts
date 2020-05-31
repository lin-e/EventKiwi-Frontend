import { FetchEventType, FETCH_EVENTS_CARDS,  } from "../actions/types";
import { EventCardState } from "../types/stateTypes";

const initialState: EventCardState = {
   events: []
}

export function eventCardsReducer(state = initialState, action: FetchEventType): EventCardState {
   switch(action.type) {
      case FETCH_EVENTS_CARDS:
         return {
            ...state,
            events: action.payload
         }
      default:
         return state;

   }

}