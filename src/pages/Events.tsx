import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, useIonViewDidEnter, IonFab, IonFabButton, IonIcon, IonFabList, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { chevronUp, options, calendar, add } from 'ionicons/icons'
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
  const [segment, setSegment] = useState<'upcoming' | 'past'>('upcoming');
  const [upcomingY, setUpcomingY] = useState(0);
  const [pastY, setPastY] = useState(0);

  const upcoming = segment === 'upcoming';
  const past = segment === 'past';

  const isSociety: boolean = true;

  const contentRef = React.useRef<HTMLIonContentElement>(null);
  const refresherRef = React.useRef<HTMLIonRefresherElement>(null);

  const refresh = () => {
    props.fetchCalEvents(refresherRef.current!, props.userToken);
    resetView();
  }

  useEffect(() => { refresh() }, [props.userToken])

  useIonViewDidEnter(() => {
    props.loadBlankEvent("events");
  });

  const changeTab = (e: { detail: { value: any; }; }) => {
    const nextSegment = e.detail.value as any;

    switch (nextSegment) {
      case 'upcoming':
        contentRef.current!.scrollToPoint(0, upcomingY);
        break;
      case 'past':
        contentRef.current!.scrollToPoint(0, pastY);
        break;
    }
    setSegment(nextSegment);

  }

  const resetView = () => {
    setUpcomingY(0);
    setPastY(0);
    try {
      contentRef.current!.scrollToTop();
    } catch { /* contentRef has not yet loaded */ }
    setSegment('upcoming');
  }

  const saveY = (y: number) => {
    switch (segment) {
      case 'upcoming':
        setUpcomingY(y);
        break;
      case 'past':
        setPastY(y);
        break;
    }
  }


  if (!props.isLoggedIn && !props.isLoading) {
    return <Redirect to="/auth" />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Events</IonTitle>
        </IonToolbar>
        <IonToolbar>
        <IonSegment value={segment} onIonChange={changeTab}>
            <IonSegmentButton value="upcoming">
              <IonLabel>Upcoming</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="past">
              <IonLabel>Past</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      {/* Change isLoading state to be custom isLoading prop for calendar */}
      <IonContent ref={contentRef} scrollEvents onIonScroll={(e) => saveY(e.detail.currentY)} className={!props.isLoading ? 'fadeIn' : 'fadeOut'}>
        
        <IonRefresher ref={refresherRef} slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <CalendarEventView />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={chevronUp} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={options}/>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={calendar}/>
            </IonFabButton>
            {isSociety &&
              <IonFabButton>
                <IonIcon icon={add} />
              </IonFabButton>
            }
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

export default connector(Events);
