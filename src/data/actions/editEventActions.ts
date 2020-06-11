import { AppThunk } from "../types/dataInterfaces";
import { createNewEventURL, updateEventURL, eventDetailsURL, deleteEventURL } from "../../constants/endpoints";
import { CREATE_NEW_EVENT, LOAD_EDIT_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./types";
import { convertResToEventDetails, EventDetails, blankEventDetails } from "../../constants/types";
import { resp_event_details } from "../../constants/RequestInterfaces";

export interface NewEventDetails {
  name: string,
  location: string,
  desc: string,
  privacy: number,
  tags: string[],
  start: string,
  end: string,
  img: string
}

export const editEventLoad = (id: string, token: string): AppThunk => async dispatch => {
  if (id === "") {
    return (dispatch({
      type: LOAD_EDIT_EVENT,
      payload: blankEventDetails
    }))
  }

  const options = {
    method: "get",
    headers: { 'Authorization': `Bearer ${token}` }
  }

  fetch(eventDetailsURL(id), options)
  .then(res => res.json())
  .then(data => convertResToEventDetails(data))
  .then(details => {
    return (dispatch({
      type: LOAD_EDIT_EVENT,
      payload: details
    }))
  })
}

export const createNewEvent = (event: NewEventDetails, token: string, setCompleted: (completed: boolean) => void): AppThunk => async dispatch => {
  const options = {
    method: "POST",
    headers: {
       "Authorization": `Bearer ${token}`,
       'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }
  fetch(createNewEventURL, options)
  .then(response => {
    setCompleted(response.status === 1)
    return(response.json())
  })
  .then(details => {
    return (dispatch({
      type: CREATE_NEW_EVENT,
      payload: convertResToEventDetails(details.body as resp_event_details)
    }))
  })
}

export const updateEvent = (event: NewEventDetails, id: string, token: string, setCompleted: (completed: boolean) => void): AppThunk => 
    async dispatch => {
  const options = {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }
  fetch(updateEventURL(id), options)
  .then(response => response.json())
  .then(details => {
    setCompleted(details.status === 1)
    return (dispatch({
      type: UPDATE_EVENT,
      payload: convertResToEventDetails(details.body as resp_event_details)
    }))
  })
}

export const deleteEvent = (id: string, token: string, setCompleted: (complete: boolean) => void): AppThunk => async dispatch => {
  const options = {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
    },
  }
  fetch(deleteEventURL(id), options)
  .then(status => {
    setCompleted(true);
    return (dispatch({
      type: DELETE_EVENT,
      status: status
    }))
  })
}