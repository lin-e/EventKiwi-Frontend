import React from 'react';
import './EventMiniCard.css';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonGrid, IonRow } from '@ionic/react';
import { getDateRange } from '../utils/DateTimeTools';

export interface EventMiniCardProps {
  eventId: string,
  eventName: string, 
  organiser: string, 
  image: string, 
  eventStart: Date,
  eventEnd: Date
}

const EventMiniCard: React.FC<EventMiniCardProps> = ({ eventName, organiser, image, eventStart, eventEnd, eventId }) => {
  const urlPrefix = () => {
    switch (window.location.pathname.split("/")[1]) {
      case "events":
        return "/events";
      case "discover":
        return "/discover";
      default:
        return "";
    }
  };

  return (
    <IonCard className="mini_card" routerLink={`${urlPrefix()}/event/${eventId}`}>

      <img src={image} className="mini_banner"/>

      <IonCardContent className="mini_description">
        <IonGrid>
          <IonRow>
            <IonCardSubtitle className="mini_organiser_name">By {organiser}</IonCardSubtitle>
          </IonRow>
          <IonRow>
            <IonCardTitle className="mini_header">
            {eventName}
            </IonCardTitle>
          </IonRow>
            <IonRow className="mini_time">
                {getDateRange(eventStart, eventEnd)}
            </IonRow>


        </IonGrid>
        
      </IonCardContent>

    </IonCard>
  );
};

export default EventMiniCard;
