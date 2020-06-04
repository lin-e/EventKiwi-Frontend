import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle } from '@ionic/react';
import './Events.css';
import CalendarEventView from '../components/Calendar/CalendarEventView';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../data/actions/types';
import { startFetchCalEvents } from '../data/actions/actions';
import { loadBlankEvent } from '../data/actions/viewEvent/viewEventActions';
import { bindActionCreators } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.userDetails.isLoggedIn,
  isLoading: state.userDetails.loading
})

const connector = connect(
  mapStateToProps,
  { startFetchCalEvents, loadBlankEvent }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type EventsProps = PropsFromRedux;

class Events extends Component<EventsProps> {
  refresherRef: React.RefObject<HTMLIonRefresherElement>;

  constructor(props: EventsProps) {
    super(props);
    this.refresherRef = createRef<HTMLIonRefresherElement>();
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.props.startFetchCalEvents();
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
        {/* <IonRefresher ref={this.refresherRef} slot="fixed" onIonRefresh={this.refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher> */}

          <CalendarEventView />
      </IonContent>
    </IonPage>
    );
  }
}

interface LinkDispatchProps {
  startFetchCalEvents: () => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  startFetchCalEvents: bindActionCreators(startFetchCalEvents, dispatch)
})

export default connector(withIonLifeCycle(Events));