import { ThunkAction } from "redux-thunk"
import { RootState } from "../reducers"
import { Action } from "redux"
import { FETCH_EVENTS_CARDS, UserType, USER_LOGIN, AuthResponse } from "./types"
import { discoverEventCardURL } from "../../constants/endpoints"
import { resp_event_card_details } from "../../constants/RequestInterfaces"
import { convertResToEventCard } from "../../constants/types"

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const fetchEventCards = (refresher: HTMLIonRefresherElement)
   : AppThunk => async dispatch => {
   fetch(discoverEventCardURL)
   .then(response => response.json())
   .then(cards => {
      if (refresher !== null) {
         refresher.complete();
      }
      return (dispatch({
         type: FETCH_EVENTS_CARDS,
         payload: (cards as resp_event_card_details[]).map(convertResToEventCard)
      })
   )})
}

export const logIn = (user: AuthResponse): UserType => ({
   type: USER_LOGIN,
   payload: user
})
