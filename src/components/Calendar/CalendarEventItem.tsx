import React, { useState, useRef, MouseEvent } from 'react';
import { CalendarEvent } from '../../constants/types'
import { IonItemSliding, IonGrid, IonCol, IonRow, IonItem, IonText, IonItemOptions, IonItemOption } from '@ionic/react';
import { getDateRangeNoStartDate } from '../../utils/DateTimeTools'
import './CalendarEventItem.css'

interface CalendarEventItemProps {
  event: CalendarEvent
  isFavourite: boolean
}

const CalendarEventItem: React.FC<CalendarEventItemProps> = ({ event, isFavourite }) => {
  const barCol = {"--socCol" : event.organiser.colour}

  const [fav, setfav] = useState(isFavourite);

  const favouriteSlider = useRef<HTMLIonItemSlidingElement>(null)

  const toggleFavourite = (e: MouseEvent) => {
    e.preventDefault();
    favouriteSlider.current!.close();
    setfav(!fav)
  }

  return (
    <IonItemSliding ref={favouriteSlider}>
      <IonItem routerLink={`/events/event/${event.id}`}>
        <IonGrid className="eventItem" style={barCol}>
          <IonRow className="eventName">
            <div>
              {event.name}
            </div>
          </IonRow>
          <IonRow>
            <IonCol size="5" className="detailCol">
              <IonText color="medium">
                <p className="eventDateTime">
                  {getDateRangeNoStartDate(event.datetimeStart, event.datetimeEnd)}
                </p>
              </IonText>
            </IonCol>
            <IonCol size="7" className="detailCol">
              <IonText color="medium">
                <p className="eventLocation">{event.location}</p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItemOptions side="start">
        <IonItemOption color="favourite" onClick={toggleFavourite}>
          {fav ? "Fav" : "Not-Fav"}
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
}

export default CalendarEventItem