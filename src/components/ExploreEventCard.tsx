import React from 'react';
import './ExploreEventCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonChip, IonGrid, IonRow, IonCol } from '@ionic/react';
import { time, location as locationIcon, pricetags } from "ionicons/icons";
import { getTime, sameDay, getShortDate } from '../utils/DateTimeTools';
import { EventCardDetails } from '../constants/types';

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

const ExploreEventCard: React.FC<EventCardDetails> = ({ name, organiser, image, location, datetimeStart, datetimeEnd, tags, id }) => {
  return (
    <IonCard routerLink={`/event/${id}`}>

      <img src={image} className="banner" alt={name}/>

      <IonCardHeader>
        <IonCardSubtitle>By {organiser.name}</IonCardSubtitle>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        
        <IonGrid className="grid">

          <IonRow>
            <IonCol size="1">
              <IonIcon icon={locationIcon} size="small"/> 
            </IonCol>
            <IonCol size="11">
              {location}
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="1">
              <IonIcon icon={time} size="small"/> 
            </IonCol>
            <IonCol size="11">
              {`${getShortDate(datetimeStart)}, ${getTime(datetimeEnd)}`}
              &nbsp;&mdash;&nbsp;
              {(!sameDay(datetimeStart, datetimeEnd) ? getShortDate(datetimeEnd) + ", " : "") + getTime(datetimeEnd)}
            </IonCol>
          </IonRow>

          <IonRow>
          <IonCol size="1">
          <IonIcon icon={pricetags} />
          </IonCol>
          {tags.map((tag, index) => (
              <IonChip key={"tag chip " + index.toString()}>{tag}</IonChip>
          ))}
          </IonRow>

        </IonGrid>
      </IonCardContent>

    </IonCard>
  );
};

export default ExploreEventCard;
