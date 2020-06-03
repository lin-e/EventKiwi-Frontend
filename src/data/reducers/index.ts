import { combineReducers } from "redux";
import { eventCardsReducer } from "./eventCardsReducer";
import { userReducer } from "./userReducer";
import { calEventReducer } from "./calendarReducer";
import { profileInterestReducer, profileSocReducer } from "./profileReducer";
import { viewEventReducer } from "./viewEventReducer";
import { eventPostReducer } from "./eventPostsReducer";


export const rootReducer = combineReducers({
   eventCards: eventCardsReducer,
   userDetails: userReducer,
   calEvents: calEventReducer,
   profileInterests: profileInterestReducer,
   profileSocs: profileSocReducer,
   viewEvent: viewEventReducer,
   eventPosts: eventPostReducer
});

export type RootState = ReturnType<typeof rootReducer>;
