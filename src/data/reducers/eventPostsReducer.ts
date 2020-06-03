import { GET_EVENT_POSTS, EventPostType, CREATE_EMPTY_POSTS } from "../actions/types";
import { EventPostsState } from "../types/stateTypes";

const initialState: EventPostsState = {
   events: []
}

export function eventPostReducer(state = initialState, action: EventPostType): EventPostsState {
   switch (action.type) {
      case CREATE_EMPTY_POSTS:
         if (state.events.filter(e => e.event_id === action.payload).length === 0) {
            const empty = state.events
            empty.push({
               event_id: action.payload,
               eventPosts: { last_id: "0", posts: [] }
            })
            return {
               ...state,
               events: empty
            }
         } else {
            return state
         }

      case GET_EVENT_POSTS:
         const newPosts = state.events.filter(e => e.event_id === action.payload.event_id)[0];
         action.payload.posts.posts.forEach(p => newPosts.eventPosts.posts.push(p))
         newPosts.eventPosts.last_id = action.payload.posts.last_id

         const newEvents = state.events.filter(e => e.event_id !== action.payload.event_id);
         newEvents.push({event_id: action.payload.event_id, eventPosts: newPosts.eventPosts})

         return {
            ...state,
            events: newEvents
         }

      default:
         return state;

   }

}