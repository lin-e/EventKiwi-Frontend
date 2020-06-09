import { AppThunk } from "../../types/dataInterfaces"
import { eventPostsEndpoint, addEventPostEndpoint } from "../../../constants/endpoints"
import { GET_EVENT_POSTS, GET_EVENTS_EVENT_POSTS, GET_DISCOVER_EVENT_POSTS, ADD_EVENT_POST } from "./eventPostsTypes"
import { convertResToEventPosts } from "../../../constants/types"



export const loadEventPosts = (id: string, tab: string, userToken: string): AppThunk => async dispatch => {
   fetch(eventPostsEndpoint(id, "0"), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => convertResToEventPosts(data))
      .then(posts => {
         const type = tab === "events" ? GET_EVENTS_EVENT_POSTS : (tab === "discover" ? GET_DISCOVER_EVENT_POSTS : GET_EVENT_POSTS);
         return dispatch({
            type: type,
            payload: posts.posts
         })
      })
}

export const addEventPosts = (eventId: string, content: string, userToken: string): AppThunk => async dispatch => {
   fetch(addEventPostEndpoint(eventId), {
      method: "post",
      body: JSON.stringify({ content: content }),
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
      .then(res => res.json())
      .then(data => data.body)
      .then(post => (dispatch({
         type: ADD_EVENT_POST,
         payload: {
            eventId: eventId,
            post: post
         }
      })
   ))
}