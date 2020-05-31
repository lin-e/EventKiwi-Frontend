import { ThunkAction } from "redux-thunk"
import { RootState } from "../reducers"
import { Action } from "redux"
import { FETCH_EVENTS_CARDS } from "./types"
import { discoverEventCardURL } from "../../constants/endpoints"
import { resp_event_card_details } from "../../constants/RequestInterfaces"
import { convertResToEventCard } from "../../constants/types"




export const fetchEventCards = (): ThunkAction<void, RootState, unknown, Action<{}>> => async dispatch => {
   fetch(discoverEventCardURL)
   .then(response => response.json())
   .then(cards => (dispatch({
      type: FETCH_EVENTS_CARDS,
      payload: (cards as resp_event_card_details[]).map(convertResToEventCard)
   })))
}




// export const fetchPosts = (): ThunkAction<void, RootState, unknown, Action<{}>> => async dispatch => {
//    fetch('https://jsonplaceholder.typicode.com/posts')
//    .then(response => response.json())
//    .then(posts => (dispatch({
//       type: FETCH_POSTS,
//       payload: posts
//    })))
// }