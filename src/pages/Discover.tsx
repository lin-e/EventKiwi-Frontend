import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Discover.css';
import ExploreEventsList from '../components/ExploreEventsList';
import { EventCardDetails, convertResToEventCard } from '../constants/types';
import { resp_event_card_details } from '../constants/RequestInterfaces';
import { discoverEventCardURL } from '../constants/endpoints';
import { threadId } from 'worker_threads';


interface DiscoverState {
  events: EventCardDetails[],
  showEvents: boolean
}

class Discover extends Component<{}, DiscoverState> {
  refresherRef: React.RefObject<HTMLIonRefresherElement>;

  constructor(props: {}) {
    super(props);
    this.state = { 
      events: [],
      showEvents: false
    }
    this.refresherRef = createRef<HTMLIonRefresherElement>();
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }
  
  refresh() {
    fetch(discoverEventCardURL)
      .then(res => res.json())
      .then(data => {
         const events: EventCardDetails[] = [];
         (data as resp_event_card_details[]).forEach(resEvent => {
          events.push(convertResToEventCard(resEvent));
         });
         this.setState({
           events: events,
           showEvents: true
          })}
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
        <ExploreEventsList show={this.state.showEvents} events={this.state.events}/>
        
      </IonContent>
    </IonPage>
    );
  }
}

export default Discover;