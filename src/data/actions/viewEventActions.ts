import { AppThunk } from "../types/dataInterfaces";
import { eventDetailsURL, goingToEventEndpoint, interestedInEventEndpoint, notGoingToEventEndpoint } from "../../constants/endpoints";
import { convertResToEventDetails } from "../../constants/types";
import { LOAD_EVENT_DETAILS, LOADING_EVENT, EVENT_GOING, USER_LOGOUT, EVENT_INTERESTED, EVENT_NOT_GOING, LOAD_BLANK_EVENT_DETAILS, EVENTS_LOAD_EVENT_DETAILS } from "./types";

export const loadEventDetails = (id: string, tab: string, userToken: string): AppThunk => async dispatch => {
   fetch(eventDetailsURL(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => convertResToEventDetails(data))
      .then(details => {
         const type = tab === "events" ? EVENTS_LOAD_EVENT_DETAILS : (tab === "discover" ? LOAD_EVENT_DETAILS : LOAD_EVENT_DETAILS);
         dispatch({
            type: type,
            payload: details
         })
      })
}

export const loadingEvent = () => ({
   type: LOADING_EVENT
})

export const loadBlankEvent = () => ({
   type: LOAD_BLANK_EVENT_DETAILS
})


export const goingToEvent = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(goingToEventEndpoint(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(() => dispatch({
         type: EVENT_GOING
      }))
      .catch(err => console.log(err))
}

export const interestedInEvent = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(interestedInEventEndpoint(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(() => dispatch({
         type: EVENT_INTERESTED
      }))
      .catch(err => console.log(err))
}

export const notGoingToEvent = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(notGoingToEventEndpoint(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(() => dispatch({
         type: EVENT_NOT_GOING
      }))
      .catch(err => console.log(err))
}
