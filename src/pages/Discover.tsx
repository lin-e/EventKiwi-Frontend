import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Discover.css';
import ExploreEventsList from '../components/ExploreEventsList';
import { EventCardDetails, convertResToEventCard } from '../constants/types';
import { resp_event_card_details } from '../constants/RequestInterfaces';
import { Society } from '../models/Profile';
import { discoverEventCardURL } from '../constants/endpoints';


interface DiscoverState {
  events: EventCardDetails[];
}

class Discover extends Component<{}, DiscoverState> {
  refresherRef: React.RefObject<HTMLIonRefresherElement>;

  constructor(props: {}) {
    super(props);
    this.state = { events: [] }
    this.refresherRef = createRef<HTMLIonRefresherElement>();
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

//   export interface EventCardDetails {
//     id: string;
//     name: string, 
//     organiser: Society, 
//     image: string, 
//     location: string, 
//     datetimeStart: Date,
//     datetimeEnd: Date,
//     tags: string[]
//  }

  refresh() {
    fetch(discoverEventCardURL)
      .then(res => res.json())
      .then(data => {
         const events: EventCardDetails[] = [];
         (data as resp_event_card_details[]).forEach(resEvent => {
          events.push(convertResToEventCard(resEvent));
         });
         this.setState({events: events})}
      )
      .then(() => this.refresherRef.current!.complete())
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

        <IonRefresher ref={this.refresherRef} slot="fixed" onIonRefresh={this.refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        <IonSearchbar onIonChange={e => console.log(e.detail.value!)} />
        <ExploreEventsList events={this.state.events}/>
        
      </IonContent>
    </IonPage>
    );
  }
}

export default Discover;