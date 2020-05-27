import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';
import './Discover.css';
import ExploreEventsList from '../components/ExploreEventsList';


class Discover extends Component {
  render() {
    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Discover</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Discover</IonTitle>
          </IonToolbar>
        </IonHeader>  
        
        <IonSearchbar onIonChange={e => console.log(e.detail.value!)} />
        <ExploreEventsList />
        
      </IonContent>
    </IonPage>
    );
  }
}

export default Discover;