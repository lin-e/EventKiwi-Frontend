import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';
import './Discover.css';
import ExploreEventsList from '../components/ExploreEventsList';
import { EventCardDetails } from '../constants/types';


interface DiscoverState {
  events: EventCardDetails[];
}

class Discover extends Component<{}, DiscoverState> {

  constructor(props: {}) {
    super(props);
    this.state = { events: [] }
  }

  componentDidMount() {
    fetch("https://endpoint.drp.social/event-card-details")
      .then(res => res.json())
      .then(data => {
         console.log(data)
         const events: EventCardDetails[] = [];
         (data as EventCardDetails[]).forEach(event => {
            console.log(typeof event.end_datetime)
            events.push(event);
         });
         this.setState({events: events})}
      )
  }

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
        <ExploreEventsList events={this.state.events}/>
        
      </IonContent>
    </IonPage>
    );
  }
}

export default Discover;