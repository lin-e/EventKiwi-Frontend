import { combineReducers } from "redux";
import { eventCardsReducer } from "./eventCardsReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
   eventCards: eventCardsReducer,
   userDetails: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
