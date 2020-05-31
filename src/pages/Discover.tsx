import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Discover.css';
import ExploreEventsList from '../components/ExploreEventsList';
import { EventCardDetails, convertResToEventCard } from '../constants/types';
import { resp_event_card_details } from '../constants/RequestInterfaces';
import { discoverEventCardURL } from '../constants/endpoints';
import { connect, ConnectedProps } from 'react-redux';
import { fetchEventCards } from "../data/actions/actions";


const connector = connect(
  null,
  { fetchEventCards }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type DiscoverProps = PropsFromRedux;



class Discover extends Component<DiscoverProps> {
  refresherRef: React.RefObject<HTMLIonRefresherElement>;

  constructor(props: DiscoverProps) {
    super(props);
    this.refresherRef = createRef<HTMLIonRefresherElement>();
    this.refresh = this.refresh.bind(this);
  }


  refresh() {
    this.props.fetchEventCards();
    this.refresherRef.current!.complete();
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
        
        <ExploreEventsList />
        
      </IonContent>
    </IonPage>
    );
  }
}

export default connector(Discover);