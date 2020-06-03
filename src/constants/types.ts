import { resp_event_details, resp_event_card_details, resp_society, resp_resource, resp_post, resp_event_posts, resp_event_post_organiser } from "./RequestInterfaces";

export interface Profile {
  id: string;
  name: string;
  imageSrc: string;
  shortName: string;
}

export interface Society extends Profile {
  colour: string;
}

export const blankSociety = {
  id: "",
  name: "",
  imageSrc: "",
  shortName: "",
  colour: ""
}

export interface EventCardDetails {
   id: string;
   name: string, 
   organiser: Society, 
   image: string, 
   location: string, 
   datetimeStart: Date,
   datetimeEnd: Date,
   tags: string[]
}

export interface EventDetails {
   id: string,
   name: string,
   organiser: Society,
   images: string[],
   location: string,
   datetimeStart: Date,
   datetimeEnd: Date,
   tags: string[],
   description: string,
   sameSocEvents: EventCardDetails[],
   similarEvents: EventCardDetails[],
   resources: Resource[],
   goingStatus: number
}

export const blankEventDetails = {
  id: "",
  name: "",
  organiser: blankSociety,
  images: [],
  location: "",
  datetimeStart: new Date(),
  datetimeEnd: new Date(),
  tags: [],
  description: "",
  sameSocEvents: [],
  similarEvents: [],
  resources: [],
  posts: [],
  goingStatus: -1
}


export interface Resource {
   name: string,
   id: string
}

export interface Post {
  id: string,
  eventId: string,
  organiser: PostOrganiser,
  time: Date,
  body: string
}

export interface PostOrganiser {
  id: string,
  image: string,
  name: string,
  short: string
}

export interface EventPosts {
  posts: Post[],
  last_id: string
}

export const convertResToPostOrganiser = (res: resp_event_post_organiser): PostOrganiser => ({
  id: res.id,
  image: res.image,
  name: res.name,
  short: res.short
 })

export const convertResToEventPosts = (res: resp_event_posts): EventPosts => ({
  last_id: res.last,
  posts: res.posts.map(convertResToPost)
})


export const convertResToPost = (res: resp_post): Post => ({
  id: res.id,
  eventId: res.event,
  organiser: convertResToPostOrganiser(res.organiser),
  time:  new Date(res.time),
  body: res.body
})

export const convertResToResource = (res: resp_resource): Resource => ({
  name: res.display_name,
  id: res.bucket_key
})

export const convertResToEventDetails = (res: resp_event_details): EventDetails => ({
  id: res.event_id,
  name: res.event_name,
  organiser: convertResToSoc(res.society),
  images: [res.event_image_src],
  location: res.location,
  datetimeStart: new Date(res.start_datetime),
  datetimeEnd: new Date(res.end_datetime),
  tags: res.tags,
  description: res.description,
  sameSocEvents: res.same_society_events.map(convertResToEventCard),
  similarEvents: res.similar_events.map(convertResToEventCard),
  goingStatus: res.going_status,
  resources: res.resources.map(convertResToResource)
 })


 export const convertResToEventCard = (res: resp_event_card_details): EventCardDetails => ({
  id: res.event_id,
  name: res.event_name,
  organiser: convertResToSoc(res.society),
  image: res.event_image_src, 
  location: res.location, 
  datetimeStart: new Date(res.start_datetime),
  datetimeEnd: new Date(res.end_datetime),
  tags: res.tags
 })

 export const convertResToSoc = (res: resp_society): Society => ({
  id: res.society_id,
  name: res.society_name,
  colour: res.colour,
  shortName: res.short_name,
  imageSrc: res.society_image_src
 })