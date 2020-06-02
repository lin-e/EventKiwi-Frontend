import { ViewEventState } from "../types/stateTypes";
import { blankEventDetails } from "../../constants/types";
import { ViewEventType, LOAD_EVENT_DETAILS } from "../actions/types";

const initialState: ViewEventState = {
   event: blankEventDetails
}


export function viewEventReducer(state = initialState, action: ViewEventType): ViewEventState {
   switch(action.type) {
      case LOAD_EVENT_DETAILS:
         return {
            ...state,
            event: action.payload
         }
      default:
         return state;

   }

}