import { Post } from "../../../constants/types";

export const GET_EVENT_POSTS = "GET_EVENT_POSTS";
export const GET_DISCOVER_EVENT_POSTS = "GET_DISCOVER_EVENT_POSTS";
export const GET_EVENTS_EVENT_POSTS = "GET_EVENTS_EVENT_POSTS";

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

export type EventPostType = GetEventPostsAction | GetDiscoverEventPostsAction | GetEventsEventPostsAction;
