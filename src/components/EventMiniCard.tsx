import React from 'react';
import './EventMiniCard.css';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonGrid, IonRow } from '@ionic/react';
import { getDateRange } from '../utils/DateTimeTools';
import { loadingEvent } from '../data/actions/viewEventActions';
import { connect, ConnectedProps } from 'react-redux';


const connector = connect(null, {loadingEvent})

type PropsFromRedux = ConnectedProps<typeof connector>
type EventMiniCardProps = PropsFromRedux & {
  eventId: string,
  eventName: string, 
  organiser: string, 
  image: string, 
  eventStart: Date,
  eventEnd: Date,
  tab: string
};

const EventMiniCard: React.FC<EventMiniCardProps> = ({ eventName, organiser, image, eventStart, eventEnd, eventId, loadingEvent, tab}) => {
  return (
    <IonCard onClick={loadingEvent} className="mini_card" routerLink={`/${tab}/event/${eventId}`}>

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

export default connector(EventMiniCard);
