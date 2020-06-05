import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, useIonViewDidEnter } from '@ionic/react';
import './Events.css';
import CalendarEventView from '../components/Calendar/CalendarEventView';
import { fetchCalEvents } from '../data/actions/actions'
import { loadBlankEvent } from '../data/actions/viewEvent/viewEventActions';
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
const Events: React.FC<EventsProps> = (props) => {

  const refresherRef = React.useRef<HTMLIonRefresherElement>(null);

  const refresh = () => {
    props.fetchCalEvents(refresherRef.current!, props.userToken);
  }

  useEffect(() => { refresh() }, [props.userToken])

  useIonViewDidEnter(() => {
    props.loadBlankEvent("events");
  });


  if (!props.isLoggedIn && !props.isLoading) {
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
        <IonRefresher ref={refresherRef} slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <CalendarEventView />
      </IonContent>
    </IonPage>
  );
}

export default connector(Events);
