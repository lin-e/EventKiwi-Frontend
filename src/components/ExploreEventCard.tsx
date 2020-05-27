import React from 'react';
import './ExploreEventCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonChip, IonGrid, IonRow, IonCol } from '@ionic/react';
import { time, location, pricetags } from "ionicons/icons";
import { getTime, sameDay, getShortDate } from '../utils/DateTimeTools';

interface ExploreEventCardProps {
  eventName: string, 
  organiser: string, 
  image: string, 
  eventLocation: string, 
  startTime: Date,
  endTime: Date,
  tags: string[],
  id: string;
}

const ExploreEventCard: React.FC<ExploreEventCardProps> = ({ eventName, organiser, image, eventLocation, startTime, endTime, tags }) => {
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
              {`${getShortDate(startTime)}, ${getTime(startTime)}`}
              &nbsp;&mdash;&nbsp;
              {(!sameDay(startTime, endTime) ? getShortDate(endTime) + ", " : "") + getTime(endTime)}
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
