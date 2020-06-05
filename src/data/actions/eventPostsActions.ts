import { AppThunk } from "../types/dataInterfaces"
import { eventPostsEndpoint } from "../../constants/endpoints"
import { GET_EVENT_POSTS, GET_EVENTS_EVENT_POSTS, GET_DISCOVER_EVENT_POSTS } from "./types"
import { convertResToEventPosts } from "../../constants/types"



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