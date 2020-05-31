import { FetchEventType, FETCH_EVENTS_CARDS, USER_LOGIN, UserType,  } from "../actions/types";
import { UserState } from "../types/stateTypes";

const initialState: UserState = {
   isLoggedIn: false
}

export function userReducer(state = initialState, action: UserType): UserState {
   switch(action.type) {
      case USER_LOGIN:
         return {
            ...state,
            isLoggedIn: action.payload
         }
      default:
         return state;

   }

}