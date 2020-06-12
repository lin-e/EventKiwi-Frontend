import React, { useState, useEffect } from 'react';
import { IonContent, IonCheckbox, IonList, IonItem, IonLabel, IonItemDivider, IonIcon, IonDatetime } from '@ionic/react';
import { calendar } from 'ionicons/icons';
import { format, parseISO, isPast } from 'date-fns';
import { UNIX_EPOCH } from '../constants/constants';

const SearchFilterModal = () => {
  const currDatetime = new Date(Date.now())
  const [pastEvents, setPastEvents] = useState(false);
  const [startDatetime, setStartDatetime] = useState(currDatetime);
  const [endDatetime, setEndDatetime] = useState(currDatetime);

  useEffect(() => {
    if (isPast(endDatetime)) {
      setPastEvents(true);
    }
  }, [endDatetime]);

  return (
    <IonContent>
      <div className="modalContainer">
        <h3>Search Filters</h3>
        <IonList>
          <IonItem>
            <IonLabel>Include Past Events</IonLabel>
            <IonCheckbox slot="end" checked={pastEvents} onIonChange={e => setPastEvents(e.detail.checked)} />
          </IonItem>
          <IonItemDivider>
            <IonLabel>Date range start:</IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonIcon icon={calendar} slot="start" />
            <IonDatetime
              value={startDatetime.toISOString()}
              displayFormat="DDDD D MMM YYYY h:mm A"
              pickerFormat="D MMMM YYYY H mm"
              min={format(UNIX_EPOCH, "yyyy-MM-dd'T'HH:mm:ss")}
              max={(currDatetime.getFullYear() + 3).toString()}
              onIonChange={e => setStartDatetime(parseISO(e.detail.value!))}
            />
          </IonItem>
        </IonList>

        <IonItemDivider>
          <IonLabel>End:</IonLabel>
        </IonItemDivider>
        <IonItem>
          <IonIcon icon={calendar} slot="start" />
          <IonDatetime 
            value={endDatetime.toISOString()}
            displayFormat="DDDD D MMM YYYY h:mm A"
            pickerFormat="D MMMM YYYY H mm"
            min={format(startDatetime, "yyyy-MM-dd'T'HH:mm:ss")}
            max={(currDatetime.getFullYear() + 3).toString()}
            onIonChange={e => setEndDatetime(parseISO(e.detail.value!))}
          />
        </IonItem>
      </div>
    </IonContent>
  );
}

export default SearchFilterModal;
