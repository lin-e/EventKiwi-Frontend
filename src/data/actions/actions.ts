import { ThunkAction } from "redux-thunk"
import { RootState } from "../reducers"
import { Action } from "redux"
import { FETCH_EVENTS_CARDS, FETCH_SEARCH_EVENT_CARDS, FETCH_CAL_EVENTS, AppActions, FETCH_PROFILE_DETAILS, FETCH_PROFILE_INTERESTS, FETCH_PROFILE_SOCS, REMOVE_PROFILE_INTEREST } from "./types"
import { discoverEventCardURL, discoverSeachEventCardURL, profileDetailsURL } from "../../constants/endpoints"
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
   console.log(url.toString())
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
         "Authorization": "Bearer " + token
      }
   }
   fetch(profileDetailsURL, options)
   .then(response => response.json())
   .then(details => {
      console.log(details)
      return (dispatch({
         type: FETCH_PROFILE_DETAILS,
         payload: convertResToProfileDetails(details as resp_profile_details)
      }))
   })
}

export const fetchProfileInterests = (): AppActions => ({
   type: FETCH_PROFILE_INTERESTS,
   payload: exampleInterests
})

export const removeProfileInterest = (toRemove: string): AppActions => ({
   type: REMOVE_PROFILE_INTEREST,
   payload: toRemove
})

export const fetchProfileSocs = (): AppActions => ({
   type: FETCH_PROFILE_SOCS,
   payload: exampleSocs
})

export const startFetchProfileInterests = () => {
   return(dispatch: Dispatch<AppActions>, getState: () => RootState) => {
      dispatch(fetchProfileInterests())
   }
}

export const startRemoveProfileInterest = (toRemove: string) => {
   return(dispatch: Dispatch<AppActions>, getState: () => RootState) => {
      dispatch(removeProfileInterest(toRemove))
   }
}

export const startFetchProfileSocs = () => {
   return(dispatch: Dispatch<AppActions>, getState: () => RootState) => {
      dispatch(fetchProfileSocs())
   }
}
