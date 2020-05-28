import React, { useState, useRef } from 'react';
import { EventCardDetails } from '../constants/types'
import { IonItemSliding, IonGrid, IonCol, IonRow, IonItem, IonLabel, IonCardTitle, IonCardHeader, IonText, IonItemOptions, IonItemOption } from '@ionic/react';
import { getTime, getShortDate, sameDay } from '../utils/DateTimeTools'
import './CalendarEventItem.css'

interface CalendarEventItemProps {
  event: EventCardDetails
  isFavourite: boolean
}

const CalendarEventItem: React.FC<CalendarEventItemProps> = ({ event, isFavourite }) => {
  const barCol = {"--socCol" : event.organiser.colour}

  const [fav, setfav] = useState(isFavourite);

  const favouriteSlider = useRef(null)

  return (
    <IonItemSliding ref={favouriteSlider}>
      <IonItem detail={true} routerLink={`/event/${event.id}`}>
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
      <IonItemOptions side="start">
        <IonItemOption color="favourite">
          {fav ? "Unfavourite" : "Favourite"}
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
}

export default CalendarEventItem