import { combineReducers } from "redux";
import { eventCardsReducer } from "./eventCardsReducer";
import { userReducer } from "./userReducer";
import { calEventReducer } from "./calendarReducer";
import { profileDetailsReducer, profileInterestReducer, profileSocReducer } from "./profileReducer";


export const rootReducer = combineReducers({
   eventCards: eventCardsReducer,
   userDetails: userReducer,
   calEvents: calEventReducer,
   profileDetails: profileDetailsReducer,
   profileInterests: profileInterestReducer,
   profileSocs: profileSocReducer
});

export type RootState = ReturnType<typeof rootReducer>;
