import { ThunkAction } from "redux-thunk"
import { RootState } from "../reducers"
import { Action } from "redux"
import { FETCH_EVENTS_CARDS, FETCH_SEARCH_EVENT_CARDS, FETCH_CAL_EVENTS, AppActions, FETCH_PROFILE_DETAILS, REMOVE_PROFILE_INTEREST, FETCH_PROFILE_DETAILS_FAILED, RESET_PROFILE_INVALID_RESPONSE, ADD_PROFILE_INTEREST } from "./types"
import { discoverEventCardURL, discoverSeachEventCardURL, profileDetailsURL, profileInterestDeleteURL, profileInterestAddURL } from "../../constants/endpoints"
import { resp_event_card_details, resp_profile_details } from "../../constants/RequestInterfaces"
import { convertResToEventCard, convertResToProfileDetails } from "../../constants/types"
import { eventList, exampleSchedule } from '../dummy/calendarDummy'
import { Dispatch } from "react"
import { exampleInterests, exampleSocs } from "../dummy/profileDummy"

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
      }))
   })
}

export const fetchSearchEventCards = (searchTerm: string, refresher: HTMLIonRefresherElement): AppThunk => async dispatch => {
   let url = new URL(discoverSeachEventCardURL);
   url.searchParams.append("q", searchTerm);
   fetch(url.toString())
   .then(response => response.json())
   .then(cards => {
      if (refresher !== null) {
         refresher.complete();
      }
      return (dispatch({
         type: FETCH_SEARCH_EVENT_CARDS,
         payload: (cards as resp_event_card_details[]).map(convertResToEventCard)
      }))
   })
}


export const fetchCalEvents = (): AppActions => ({
   type: FETCH_CAL_EVENTS,
   payload: eventList
})

export const startFetchCalEvents = () => {
   return(dispatch: Dispatch<AppActions>, getState: () => RootState) => {
      dispatch(fetchCalEvents())
   }
}

export const fetchProfileDetails = (token: string): AppThunk => async dispatch => {
   const options = {
      method: "GET",
      headers: {
         "Authorization": `Bearer ${token}`
      }
   }
   fetch(profileDetailsURL, options)
   .then(response => response.json())
   .then(details => {
      return (dispatch({
         type: FETCH_PROFILE_DETAILS,
         payload: convertResToProfileDetails(details as resp_profile_details)
      }))
   })
   .catch(() => {
      return(dispatch({
         type: FETCH_PROFILE_DETAILS_FAILED,
      }))
   })
}

export const resetInvalidProfileResponse = (): AppThunk => async dispatch => {
   return(dispatch({
      type: RESET_PROFILE_INVALID_RESPONSE
   }))
}

export const addProfileInterest = (toAdd: string, token: string): AppThunk => async dispatch => {
   const options = {
      method: "POST",
      headers: {
         "Authorization": `Bearer ${token}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ interest: toAdd }),
   }
   console.log(JSON.stringify({ interest: toAdd }))

   fetch(profileInterestAddURL, options)
   .then(status => {
      return (dispatch({
         type: ADD_PROFILE_INTEREST,
         status: status,
         payload: toAdd
      }))
   })
   // TODO: Add catch to invalid token, status code 403
   // .catch(() => {
   //    return(dispatch({
   //       type: FETCH_PROFILE_DETAILS_FAILED,
   //    }))
   // })
}

export const removeProfileInterest = (toRemove: string, token: string): AppThunk => async dispatch => {
   const options = {
      method: "POST",
      headers: {
         "Authorization": `Bearer ${token}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ interest: toRemove })
   }
   fetch(profileInterestDeleteURL, options)
   .then(status => {
      return (dispatch({
         type: REMOVE_PROFILE_INTEREST,
         status: status,
         payload: toRemove
      }))
   })
   // TODO: Add catch to invalid token, status code 403
   // .catch(() => {
   //    return(dispatch({
   //       type: FETCH_PROFILE_DETAILS_FAILED,
   //    }))
   // })
}
