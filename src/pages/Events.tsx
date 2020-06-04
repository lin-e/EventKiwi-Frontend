import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Events.css';
import CalendarEventView from '../components/Calendar/CalendarEventView';
import { ThunkDispatch } from 'redux-thunk';
import { fetchCalEvents } from '../data/actions/actions'
import { loadBlankEvent } from '../data/actions/viewEvent/viewEventActions';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.userDetails.isLoggedIn,
  isLoading: state.userDetails.loading,
  userToken: state.userDetails.userToken
})

const connector = connect(mapStateToProps, { fetchCalEvents, loadBlankEvent });

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
    // TODO: Change implementation to more correct way on waiting on user token to load in
    if(this.props.userToken === "") {
      setTimeout(this.refresh, 150)
    } else {
      this.refresh()
    }
  }

  refresh() {
    this.props.fetchCalEvents(this.refresherRef.current!, this.props.userToken);
  }

  ionViewWillEnter() {
    this.props.loadBlankEvent("events");
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

export default connector(withIonLifeCycle(Events));
