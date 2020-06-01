import { USER_LOGIN, UserType,  } from "../actions/types";
import { UserState } from "../types/stateTypes";

const initialState: UserState = {
   isLoggedIn: false,
   userToken: "",
   profile: {
      firstname: "",
      surname: "",
      email: ""
   }

}

export function userReducer(state = initialState, action: UserType): UserState {
   switch(action.type) {
      case USER_LOGIN:
         return {
            ...state,
            isLoggedIn: true,
            userToken: action.payload.body.token,
            profile: action.payload.body.profile
         }
      default:
         return state;

   }

}