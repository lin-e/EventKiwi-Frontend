import { GET_EVENT_POSTS, EventPostType, GET_DISCOVER_EVENT_POSTS, GET_EVENTS_EVENT_POSTS } from "../actions/eventPosts/eventPostsTypes";
import { EventPostsState } from "../types/stateTypes";

const initialState: EventPostsState = {
   eventPosts: [],
   posts: [],
   discoverPosts: [],
   eventsPost: []
}

export function eventPostReducer(state = initialState, action: EventPostType): EventPostsState {
   switch (action.type) {
      case GET_EVENT_POSTS:
         return {
            ...state,
            posts: action.payload
         }

      case GET_DISCOVER_EVENT_POSTS:
         return {
            ...state,
            discoverPosts: action.payload
         }

      case GET_EVENTS_EVENT_POSTS:
         return {
            ...state,
            eventsPost: action.payload
         }

      default:
         return state;

   }

}