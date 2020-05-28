import React from 'react';
import { IonList, IonListHeader, IonItemGroup, IonItemDivider, IonLabel } from '@ionic/react'
import './CalendarEventView.css'
import { EventCardDetails } from '../constants/types';
import { sameDay, getLongDate } from '../utils/DateTimeTools';
import CalendarEventItem from './CalendarEventItem';

interface CalendarEventViewProps {
  futureEvents: EventGroupByDate[];
}

interface EventGroupByDate {
  date: Date,
  events: EventCardDetails[]
}
  
const CalendarEventView: React.FC<CalendarEventViewProps> = ({ futureEvents }) => {
  if (futureEvents.length === 0) {
    return (
      <IonList>
        <IonListHeader>
          No Events Found
          Find some events and societies in the Discover tab!
        </IonListHeader>
      </IonList>
    )
  }

  const currDate = new Date(Date.now())
  
  return (
    <IonList>
      {futureEvents.map((eventGroup) => (
        <IonItemGroup key={`date-${eventGroup.date.getDate()}-${eventGroup.date.getMonth() + 1}`}>
        <IonItemDivider sticky color="imperial">
          <IonLabel>
            {(sameDay(eventGroup.date, currDate) ? "Today - " : "") + getLongDate(eventGroup.date)}
          </IonLabel>
        </IonItemDivider>
        {eventGroup.events.map((eventOnDay) => (
          <CalendarEventItem event={eventOnDay} />
        ))}
      </IonItemGroup>
      ))}
    </IonList>
  )
}

export default CalendarEventView;