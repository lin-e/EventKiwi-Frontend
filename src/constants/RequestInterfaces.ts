export interface resp_event_card_details {
  event_id: string,
  event_name: string,
  start_datetime: string,
  end_datetime: string,
  location: string,
  society: resp_society,
  event_image_src: string,
  tags: string[]
}

export interface resp_event_details {
  event_id: string,
  event_name: string,
  start_datetime: string,
  end_datetime: string,
  location: string,
  description: string,
  event_image_src: string,
  tags: string[],
  same_society_events: resp_event_card_details[],
  similar_events: resp_event_card_details[],
  society: resp_society,
  resources: resp_resource[],
  going_status: number
}

export interface resp_profile_details {
  firstname: string,
  lastname: string,
  email: string,
  societies: resp_society_basic[],
  interests: string[]
}

export interface resp_society {
  society_id: string,
  society_name: string,
  society_image_src: string,
  colour: string,
  short_name: string
}

export interface resp_society_basic {
  society_image_src: string,
  short_name: string,
  type: number
}

export interface resp_society_card {
  society_id: string,
  society_name: string,
  society_image_src: string,
  colour: string,
  short_name: string,
  following: number
}

export interface resp_resource {
  display_name: string,
  bucket_key: string
}

export interface resp_event_posts {
  posts: resp_post[],
  last: string
}

export interface resp_post {
  id: string,
  event: string,
  organiser: resp_event_post_organiser,
  time: string,
  body: string
}

export interface resp_event_post_organiser {
  id: string,
  image: string,
  name: string,
  short: string
}