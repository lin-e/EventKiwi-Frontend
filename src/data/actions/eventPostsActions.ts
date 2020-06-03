import { AppThunk } from "../types/dataInterfaces"
import { eventPostsEndpoint } from "../../constants/endpoints"
import { GET_EVENT_POSTS } from "./types"
import { convertResToEventPosts } from "../../constants/types"



export const loadEventPosts = (id: string, userToken: string): AppThunk => async dispatch => {
   fetch(eventPostsEndpoint(id, "0"), {
      method: "get",
      headers: { 'Authorization': `Bearer ${userToken}` }
   })
   .then(res => res.json())
   .then(data => convertResToEventPosts(data))
   .then(posts => dispatch({
      type: GET_EVENT_POSTS,
      payload: posts.posts
   }))
}