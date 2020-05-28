import React, { useState } from 'react';
import './ExploreEventCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonChip, IonGrid, IonRow, IonCol, useIonViewDidEnter } from '@ionic/react';
import { time, location as locationIcon, pricetags } from "ionicons/icons";
import { getTime, sameDay, getShortDate, getDateRange } from '../utils/DateTimeTools';
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

  const [visible, setVisible] = useState<boolean>(false);

  useIonViewDidEnter(() => {setVisible(true)});
  return (
    <IonCard routerLink={`/discover/event/${id}`}>

      <img src={image} className="banner" alt={name}/>

      <IonCardHeader>
        <IonCardSubtitle>By {organiser.name}</IonCardSubtitle>
        <IonCardTitle>{name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        
        <IonGrid className={"grid" + (visible ? 'fadeIn' : 'fadeOut')}>

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
              {getDateRange(datetimeStart, datetimeEnd)}
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
