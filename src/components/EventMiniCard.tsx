import React from 'react';
import './EventMiniCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonChip, IonGrid, IonRow, IonCol } from '@ionic/react';
import { time, location } from "ionicons/icons";

export interface EventMiniCardProps {
  eventId: string,
  eventName: string, 
  organiser: string, 
  image: string, 
  eventTime: string,
}

const EventMiniCard: React.FC<EventMiniCardProps> = ({ eventName, organiser, image, eventTime }) => {
  return (
    <IonCard className="mini_card">

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
                {eventTime}
            </IonRow>


        </IonGrid>
        
      </IonCardContent>

    </IonCard>
  );
};

export default EventMiniCard;
