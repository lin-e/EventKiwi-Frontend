import { combineReducers } from "redux";
import { eventCardsReducer } from "./eventCardsReducer";
import { calEventReducer } from "./calendarReducer";
import { profileInterestReducer, profileSocReducer } from "./profileReducer";


export const rootReducer = combineReducers({
   eventCards: eventCardsReducer,
   calEvents: calEventReducer,
   profileInterests: profileInterestReducer,
   profileSocs: profileSocReducer
});

export type RootState = ReturnType<typeof rootReducer>;
