import React, { MouseEvent } from 'react';
import { EventDetails, EventCardDetails } from '../constants/types'
import { IonItemSliding, IonGrid, IonCol, IonRow, IonItem, IonLabel, IonCardTitle, IonCardHeader, IonText, IonItemOptions } from '@ionic/react';
import { getTime, getShortDate, sameDay } from '../utils/DateTimeTools'
import './CalendarEventItem.css'

interface CalendarEventItemProps {
  event: EventCardDetails
}

const CalendarEventItem: React.FC<CalendarEventItemProps> = ({ event: event }) => {
  const barCol = {"--socCol" : event.organiser.colour}

  return (
    <IonItemSliding>
      <IonItem detail={true}>
        <IonGrid className="eventItem" style={barCol}>
          <IonRow className="eventName">
            <div>
              {event.name}
            </div>
          </IonRow>
          <IonRow>
            <IonCol size="6" className="detailCol">
              <IonText color="medium">
                <p className="eventDateTime">
                  {getTime(event.datetimeStart)}
                  &nbsp;&mdash;&nbsp;
                  {(!sameDay(event.datetimeStart, event.datetimeEnd) ? getShortDate(event.datetimeEnd) + ", " : "") + getTime(event.datetimeEnd)}
                </p>
              </IonText>
            </IonCol>
            <IonCol size="6" className="detailCol">
              <IonText color="medium">
                <p className="eventLocation">{event.location}</p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </IonItemSliding>
  )
}

export default CalendarEventItem