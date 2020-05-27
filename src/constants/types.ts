import { Society } from "../models/Profile"

export interface EventCardDetails {
   id: string;
   eventName: string, 
   organiser: string, 
   image: string, 
   eventLocation: string, 
   eventTime: string,
   tags: string[],
}

export interface EventDetails {
   id: number,
   eventName: string,
   organiser: Society,
   images: string[],
   eventLocation: string,
   datetimeStart: Date,
   datetimeEnd: Date,
   tags: string[],
   description: string,
   sameSocEvents: EventCardDetails[],
   similarEvents: EventCardDetails[]
}