import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Discover.css';
import ExploreEventsList from '../components/ExploreEventsList';
import { EventCardDetails } from '../constants/types';


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

  refresh() {
    fetch("https://staging.drp.social/event-card-details")
      .then(res => res.json())
      .then(data => {
         const events: EventCardDetails[] = [];
         (data as EventCardDetails[]).forEach(event => {
            events.push(event);
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