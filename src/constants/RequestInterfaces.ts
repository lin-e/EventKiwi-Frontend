import { Society } from '../models/Profile'

interface resp_event_card_details {
  id: string,
  event_name: string,
  start_datetime: string,
  end_datetime: string,
  location: string,
  society: resp_society,
  event_image_src: string,
  tags: string[]
}

interface resp_event_details {
  id: string,
  event_name: string,
  start_datetime: string,
  end_datetime: string,
  location: string,
  description: string,
  event_image_src: string,
  tags: string[],
  same_society_events: resp_event_card_details[]
  society: resp_society
}

interface resp_society {
  id: string,
  society_name: string,
  society_image_src: string,
  colour: string
}