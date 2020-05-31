import { combineReducers } from "redux";
import { eventCardsReducer } from "./eventCardsReducer";


export const rootReducer = combineReducers({
   eventCards: eventCardsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
