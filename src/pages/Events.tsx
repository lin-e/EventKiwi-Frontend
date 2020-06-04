import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Events.css';
import CalendarEventView from '../components/Calendar/CalendarEventView';
import { fetchCalEvents } from '../data/actions/actions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.userDetails.isLoggedIn,
    isLoading: state.userDetails.loading,
    userToken: state.userDetails.userToken
  }
}

const connector = connect(mapStateToProps, { fetchCalEvents });

type PropsFromRedux = ConnectedProps<typeof connector>;
type EventsProps = PropsFromRedux

class Events extends Component<EventsProps> {
  refresherRef: React.RefObject<HTMLIonRefresherElement>;

  constructor(props: EventsProps) {
    super(props);
    this.refresherRef = createRef<HTMLIonRefresherElement>();
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    while(this.props.userToken !== "") {
      setTimeout(() => {}, 100)
    }
    this.refresh();
  }

  refresh() {
    this.props.fetchCalEvents(this.refresherRef.current!, this.props.userToken);
  }

  render() {

    if (!this.props.isLoggedIn && !this.props.isLoading) {
      return <Redirect to="/auth" />
    }

    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher ref={this.refresherRef} slot="fixed" onIonRefresh={this.refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

          <CalendarEventView />
      </IonContent>
    </IonPage>
    );
  }
}



export default connector(Events);