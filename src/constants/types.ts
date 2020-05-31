import { Society } from "../models/Profile"
import { resp_event_details, resp_event_card_details, resp_society, resp_resource } from "./RequestInterfaces";

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


export interface Resource {
   name: string,
   id: string
}

export const convertResToResource = (res: resp_resource): Resource => {
   return {
      name: res.display_name,
      id: res.bucket_key
   }
}

export const convertResToEventDetails = (res: resp_event_details): EventDetails => {
   return {
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
     similarEvents: res.same_society_events.map(convertResToEventCard) // TODO: chamge this to similar events when it is implemented
   }
 }


 export const convertResToEventCard = (res: resp_event_card_details): EventCardDetails => {
   return {
     id: res.event_id,
     name: res.event_name,
     organiser: convertResToSoc(res.society),
     image: res.event_image_src, 
     location: res.location, 
     datetimeStart: new Date(res.start_datetime),
     datetimeEnd: new Date(res.end_datetime),
     tags: res.tags
   };

 }

 export const convertResToSoc = (res: resp_society): Society => {
   return {
     id: res.society_id,
     name: res.society_name,
     colour: res.colour,
     shortName: res.short_name,
     imageSrc: res.society_image_src
   }
 }