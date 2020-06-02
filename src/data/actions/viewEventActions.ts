import { AppThunk } from "../types/dataInterfaces";
import { eventDetailsURL } from "../../constants/endpoints";
import { convertResToEventDetails } from "../../constants/types";
import { LOAD_EVENT_DETAILS, LOADING_EVENT } from "./types";

export const loadEventDetails = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(`${eventDetailsURL}${id}`, {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
   .then(res => res.json())
   .then(data => convertResToEventDetails(data))
   .then(details => dispatch({
      type: LOAD_EVENT_DETAILS,
      payload: details
   }))
}

export const loadingEvent = () => ({
   type: LOADING_EVENT
})