import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Discover.css';
import ExploreEventsList from '../components/ExploreEventsList';
import { connect, ConnectedProps } from 'react-redux';
import { fetchEventCards, fetchSearchEventCards } from "../data/actions/actions";


const connector = connect(
  null,
  { fetchEventCards, fetchSearchEventCards }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type DiscoverProps = PropsFromRedux;

interface DiscoverState {
  searchTerm: string
}

class Discover extends Component<DiscoverProps, DiscoverState> {
  refresherRef: React.RefObject<HTMLIonRefresherElement>;
  searchBar: React.RefObject<HTMLIonSearchbarElement>;

  constructor(props: DiscoverProps) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.searchBar = createRef<HTMLIonSearchbarElement>();
    this.refresherRef = createRef<HTMLIonRefresherElement>();
    this.search = this.search.bind(this);
    this.searchBarUpdate = this.searchBarUpdate.bind(this);
  }

  componentDidMount() {
    this.search("");
  }

  searchBarUpdate(e: CustomEvent) {
    this.setState({searchTerm: e.detail.value!});
    this.search(this.state.searchTerm)

  }

  search(searchTerm: string) {
    if (searchTerm === "") {
      this.props.fetchEventCards(this.refresherRef.current!);
    } else {
      this.props.fetchSearchEventCards(searchTerm, this.refresherRef.current!);
    }
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

        <IonRefresher ref={this.refresherRef} slot="fixed" onIonRefresh={this.searchBarUpdate}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonSearchbar ref={this.searchBar} onIonChange={this.searchBarUpdate} debounce={500} enterkeyhint="search" type="search"/>
        
        <ExploreEventsList />
        
      </IonContent>
    </IonPage>
    );
  }
}

export default connector(Discover);