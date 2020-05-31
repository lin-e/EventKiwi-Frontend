import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Events.css';
import CalendarEventView from '../components/CalendarEventView';
import { Society } from '../models/Profile';
import { exampleSchedule } from '../data/dummy/calendarDummy'

class Events extends Component {
  render() {
    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
       <CalendarEventView futureEvents={exampleSchedule}/>
      </IonContent>
    </IonPage>
    );
  }
}

export default Events;