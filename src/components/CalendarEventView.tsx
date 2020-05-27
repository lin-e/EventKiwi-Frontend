import React from 'react';
import { IonList, IonListHeader } from '@ionic/react'
import './CalendarEventView.css'
import { EventCardDetails } from '../constants/types';

interface CalendarEventViewProps {
  futureEvents: EventGroupByDate[];
}

interface EventGroupByDate {
  day: Date,
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
  
  return (
    <IonList>
      Empty
    </IonList>
  )
}

export default CalendarEventView;