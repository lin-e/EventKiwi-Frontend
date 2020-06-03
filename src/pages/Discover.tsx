import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent, IonList, IonCol, IonRow, IonGrid, IonButton, IonIcon, IonButtons } from '@ionic/react';
import { add } from 'ionicons/icons'
import './Discover.css';
import ExploreEventsList from '../components/ExploreEventsList';
import { connect, ConnectedProps } from 'react-redux';
import { fetchEventCards, fetchSearchEventCards, fetchSearchSocietyCards } from "../data/actions/actions";
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';
import { Container, Row, Col } from 'react-grid-system';
import SkeletonTextEventCard from '../components/SkeletonTextEventCard';
import ExploreEventCard from '../components/ExploreEventCard';
import EmptySectionText from '../components/EmptySectionText';
import ExploreSocietyCard from '../components/ExploreSocietyCard';
import { SocietyCard } from '../constants/types';

const mapStateToProps = (state: RootState) => {
  return {
    societies: state.societyCards.societies,
    events: state.eventCards.events,
    isLoggedIn: state.userDetails.isLoggedIn,
    isLoading: state.userDetails.loading,
    userToken: state.userDetails.userToken
  }
}

const connector = connect(
  mapStateToProps,
  { fetchSearchSocietyCards, fetchEventCards, fetchSearchEventCards }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type DiscoverProps = PropsFromRedux;

interface DiscoverState {
  searchTerm: string,
  socExpanded: boolean
}

const MAX_SOCS = 3;

class Discover extends Component<DiscoverProps, DiscoverState> {
  refresherRef: React.RefObject<HTMLIonRefresherElement>;
  searchBar: React.RefObject<HTMLIonSearchbarElement>;

  constructor(props: DiscoverProps) {
    super(props);
    this.state = {
      searchTerm: "",
      socExpanded: false
    }
    this.searchBar = createRef<HTMLIonSearchbarElement>();
    this.refresherRef = createRef<HTMLIonRefresherElement>();
    this.search = this.search.bind(this);
    this.searchBarUpdate = this.searchBarUpdate.bind(this);
    this.renderSocCard = this.renderSocCard.bind(this);
  }

  componentDidMount() {
    this.search("");
  }

  searchBarUpdate(e: CustomEvent) {
    this.setState({
      searchTerm: (e.detail.value == undefined) ? "" : e.detail.value!.trim(),
      socExpanded: false
    });
    this.search(this.state.searchTerm)

  }

  search(searchTerm: string) {
    if (searchTerm == "") {
      this.props.fetchEventCards(this.refresherRef.current!);
    } else {
      this.props.fetchSearchSocietyCards(searchTerm, this.refresherRef.current!, this.props.userToken)
      this.props.fetchSearchEventCards(searchTerm, this.refresherRef.current!, this.props.userToken);
    }
  }

  renderSocCard(society: SocietyCard) {
    return (
      <IonCol sizeXl="4" sizeMd="6" sizeXs="12" key={"societyCardCol-" + society.id}>
        <ExploreSocietyCard soc={society}/>
      </IonCol>
    )
  }

  render() {

    if (!this.props.isLoggedIn && !this.props.isLoading) {
      return <Redirect to="/auth" />
    }

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
        
        <Container>
          {(this.state.searchTerm !== "" && this.props.societies.length !== 0) &&
              <IonGrid>
                <IonRow>
                  {(this.props.societies.length > MAX_SOCS) && (!this.state.socExpanded) &&
                        this.props.societies.slice(0, MAX_SOCS).map(this.renderSocCard)
                  }
                  {(this.props.societies.length > MAX_SOCS) && (!this.state.socExpanded) &&
                    <IonCol sizeXl="4" sizeMd="6" sizeXs="12">
                      <IonButtons>
                        <IonButton onClick={() => this.setState({socExpanded: true})}>
                          <IonIcon icon={add} />
                          Show more
                        </IonButton>

                      </IonButtons>
                    </IonCol>
                  }
                  {(this.props.societies.length < MAX_SOCS || this.state.socExpanded) &&
                    this.props.societies.map(this.renderSocCard)}
                </IonRow>
              </IonGrid>
          }
          <Row>
              {this.props.events.length === 0 && 
                ((this.state.searchTerm === "") ?
                  [1,2,3,4,5,6].map(x =>
                    <Col key={"skeleton" + x.toString()} lg={4} md={6}>
                        <SkeletonTextEventCard />
                    </Col>
                  ) :
                  <Col>
                    <EmptySectionText 
                      mainText={`No events found for '${this.state.searchTerm.trim()}'`}
                      subText="Try searching for something else, or suggest the topic to a society!" />
                  </Col>
                )
              }

              {this.props.events.length > 0  &&
                this.props.events.map(event => 
                    <Col key={"eventCardCol-" + event.id} lg={4} md={6}>
                      <ExploreEventCard key={"eventCard" + event.id}
                          id={event.id} 
                          name={event.name}
                          datetimeStart={event.datetimeStart}
                          datetimeEnd={event.datetimeEnd}
                          location={event.location}
                          image={event.image}
                          tags={event.tags}
                          organiser={event.organiser}
                      />
                    </Col>
                )
              }
          </Row>
        </Container>
        
      </IonContent>
    </IonPage>
    );
  }
}

export default connector(Discover);