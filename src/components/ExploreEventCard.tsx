import React from 'react';
import './ExploreEventCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonChip, IonGrid, IonRow, IonCol } from '@ionic/react';
import { time, location, pricetags } from "ionicons/icons";

interface ExploreEventCardProps {
  eventName: string, 
  organiser: string, 
  image: string, 
  eventLocation: string, 
  eventTime: string,
  tags: string[],
  id: string;
}

const ExploreEventCard: React.FC<ExploreEventCardProps> = ({ eventName, organiser, image, eventLocation, eventTime, tags }) => {
  return (
    <IonCard>

      <img src={image} className="banner"/>

      <IonCardHeader>
        <IonCardSubtitle>By {organiser}</IonCardSubtitle>
        <IonCardTitle>{eventName}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        
        <IonGrid className="grid">

          <IonRow>
            <IonCol size="1">
              <IonIcon icon={location} size="small"/> 
            </IonCol>
            <IonCol size="11">
              {eventLocation}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="1">
              <IonIcon icon={time} size="small"/> 
            </IonCol>
            <IonCol size="11">
              {eventTime}
            </IonCol>
          </IonRow>

          <IonRow>
          <IonCol size="1">
          <IonIcon icon={pricetags} />
          </IonCol>
          {tags.map(tag => (
              <IonChip>{tag}</IonChip>
          ))}
          </IonRow>

        </IonGrid>
      </IonCardContent>

    </IonCard>
  );
};

export default ExploreEventCard;
