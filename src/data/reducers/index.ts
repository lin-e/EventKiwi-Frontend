import { combineReducers } from "redux";
import { eventCardsReducer } from "./eventCardsReducer";
import { calEventReducer } from "./calendarReducer";


export const rootReducer = combineReducers({
   eventCards: eventCardsReducer,
   calEvents: calEventReducer
});

export type RootState = ReturnType<typeof rootReducer>;
