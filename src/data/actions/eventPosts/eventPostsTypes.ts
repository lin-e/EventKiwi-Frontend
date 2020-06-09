import { Post } from "../../../constants/types";

export const GET_EVENT_POSTS = "GET_EVENT_POSTS";
export const GET_DISCOVER_EVENT_POSTS = "GET_DISCOVER_EVENT_POSTS";
export const GET_EVENTS_EVENT_POSTS = "GET_EVENTS_EVENT_POSTS";
export const ADD_EVENT_POST = "ADD_EVENT_POST";

interface GetEventPostsAction {
   type: typeof GET_EVENT_POSTS,
   payload: Post[]
}

interface GetDiscoverEventPostsAction {
   type: typeof GET_DISCOVER_EVENT_POSTS,
   payload: Post[]
}

interface GetEventsEventPostsAction {
   type: typeof GET_EVENTS_EVENT_POSTS,
   payload: Post[]
}

interface AddEventPostsAction {
   type: typeof ADD_EVENT_POST,
   payload: {
      eventId: string,
      post: Post
   }
}

export type EventPostType = GetEventPostsAction | GetDiscoverEventPostsAction | GetEventsEventPostsAction | AddEventPostsAction;
