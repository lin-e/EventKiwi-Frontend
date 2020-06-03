import { SocietyCardState } from "../types/stateTypes";
import { FetchSocietyType, FETCH_SEARCH_SOCIETY_CARDS } from "../actions/types";

const initialState: SocietyCardState = {
  societies: []
}

export function societyCardsReducer(state = initialState, action: FetchSocietyType): SocietyCardState {
  switch(action.type) {
    case FETCH_SEARCH_SOCIETY_CARDS:
      return {
        ...state,
        societies: action.payload
      };
    default:
      return state;
  }
}