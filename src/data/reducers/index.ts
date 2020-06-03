import { combineReducers } from "redux";
import { eventCardsReducer } from "./eventCardsReducer";
import { userReducer } from "./userReducer";
import { calEventReducer } from "./calendarReducer";
import { profileDetailsReducer } from "./profileReducer";
import { viewEventReducer } from "./viewEventReducer";
import { societyCardsReducer } from "./societyCardsReducer";


export const rootReducer = combineReducers({
   societyCards: societyCardsReducer,
   eventCards: eventCardsReducer,
   userDetails: userReducer,
   calEvents: calEventReducer,
   profileDetails: profileDetailsReducer,
   viewEventReducer: viewEventReducer
});

export type RootState = ReturnType<typeof rootReducer>;
