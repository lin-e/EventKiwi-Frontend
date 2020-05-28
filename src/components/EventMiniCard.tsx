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
            <IonCardSubtitle>By {organiser}</IonCardSubtitle>
          </IonRow>
          <IonRow>
            <IonCardTitle className="mini_header">
            {eventName}
            </IonCardTitle>
          </IonRow>
          <IonRow>
            <IonCol size="1">
              <IonIcon icon={time} size="small" className="icon_item"/>
            </IonCol>
            <IonCol size="10" push="1" className="testts">
                {eventTime}
            </IonCol>
          </IonRow>

        </IonGrid>
        
      </IonCardContent>

    </IonCard>
  );
};

export default EventMiniCard;
