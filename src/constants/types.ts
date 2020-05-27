import { Society } from "../models/Profile"

export interface EventCardDetails {
   event_id: string;
   name: string, 
   // organiser: Society, 
   image_src: string, 
   location: string, 
   start_datetime: Date,
   end_datetime: Date,
   tags: string[],
   society_id: string
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
   similarEvents: EventCardDetails[]
}