import { GET_EVENT_POSTS, EventPostType } from "../actions/types";
import { EventPostsState } from "../types/stateTypes";

const initialState: EventPostsState = {
   posts: []
}

export function eventPostReducer(state = initialState, action: EventPostType): EventPostsState {
   switch (action.type) {
      case GET_EVENT_POSTS:
         return {
            ...state,
            posts: action.payload
         }

      default:
         return state;

   }

}