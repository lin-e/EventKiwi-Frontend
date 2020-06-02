import { ViewEventState } from "../types/stateTypes";
import { blankEventDetails } from "../../constants/types";
import { ViewEventType, LOAD_EVENT_DETAILS, LOADING_EVENT } from "../actions/types";

const initialState: ViewEventState = {
   event: blankEventDetails,
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
      case LOADING_EVENT:
         return {
            ...state,
            loading: true
         }
      default:
         return state;

   }

}