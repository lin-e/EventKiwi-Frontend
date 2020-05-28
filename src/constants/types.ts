import { Society } from "../models/Profile"

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
   similarEvents: EventCardDetails[]
}