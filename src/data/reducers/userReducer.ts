import { USER_LOGIN, UserType, LOAD_USER_DATA,  } from "../actions/types";
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
      case LOAD_USER_DATA:
         return {
            ...state,
            isLoggedIn: action.payload.isLoggedIn,
            userToken: action.payload.userToken,
            profile: action.payload.profile
         }
      default:
         return state;

   }

}