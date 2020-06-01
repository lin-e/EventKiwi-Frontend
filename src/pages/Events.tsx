import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Events.css';
import CalendarEventView from '../components/Calendar/CalendarEventView';
import { exampleSchedule } from '../data/dummy/calendarDummy'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../data/actions/types';
import { startFetchCalEvents } from '../data/actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

type Props = LinkDispatchProps;

class Events extends Component<Props> {
  refresherRef: React.RefObject<HTMLIonRefresherElement>;

  constructor(props: Props) {
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

  render() {
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

export default connect(null, mapDispatchToProps)(Events);