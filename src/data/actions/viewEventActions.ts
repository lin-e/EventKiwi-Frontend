import { AppThunk } from "../types/dataInterfaces";
import { eventDetailsURL, goingToEventEndpoint, interestedInEventEndpoint, notGoingToEventEndpoint } from "../../constants/endpoints";
import { convertResToEventDetails } from "../../constants/types";
import { LOAD_EVENT_DETAILS, LOADING_EVENT, EVENT_GOING, USER_LOGOUT, EVENT_INTERESTED, EVENT_NOT_GOING, LOAD_BLANK_EVENT_DETAILS, EVENTS_LOAD_EVENT_DETAILS, DISCOVER_LOAD_EVENT_DETAILS, EVENTS_EVENT_GOING, DISCOVER_EVENT_GOING, EVENTS_EVENT_NOT_GOING, DISCOVER_EVENT_NOT_GOING, EVENTS_EVENT_INTERESTED, DISCOVER_EVENT_INTERESTED } from "./types";

export const loadEventDetails = (id: string, tab: string, userToken: string): AppThunk => async dispatch => {
   fetch(eventDetailsURL(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => convertResToEventDetails(data))
      .then(details => {
         const type = tab === "events" ? EVENTS_LOAD_EVENT_DETAILS : (tab === "discover" ? DISCOVER_LOAD_EVENT_DETAILS : LOAD_EVENT_DETAILS);
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


export const goingToEvent = (id: string, tab: string, userToken: string): AppThunk => async dispatch => {
   fetch(goingToEventEndpoint(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(() => {
         const type = tab === "events" ? EVENTS_EVENT_GOING : (tab === "discover" ? DISCOVER_EVENT_GOING : EVENT_GOING);
         return dispatch({
            type: type
         })
      })
      .catch(err => console.log(err))
}

export const interestedInEvent = (id: string, tab: string, userToken: string): AppThunk => async dispatch => {
   fetch(interestedInEventEndpoint(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
   .then(() => {
      const type = tab === "events" ? EVENTS_EVENT_INTERESTED : (tab === "discover" ? DISCOVER_EVENT_INTERESTED : EVENT_INTERESTED);
      return dispatch({
         type: type
      })
   })
      .catch(err => console.log(err))
}

export const notGoingToEvent = (id: string, tab: string, userToken: string): AppThunk => async dispatch => {
   fetch(notGoingToEventEndpoint(id), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
   .then(() => {
      const type = tab === "events" ? EVENTS_EVENT_NOT_GOING : (tab === "discover" ? DISCOVER_EVENT_NOT_GOING : EVENT_NOT_GOING);
      return dispatch({
         type: type
      })
   })
      .catch(err => console.log(err))
}
