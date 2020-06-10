import React, { useEffect, useState, MouseEvent } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, useIonViewDidEnter, IonFab, IonFabButton, IonIcon, IonFabList, IonSegment, IonSegmentButton, IonLabel, IonToast } from '@ionic/react';
import { chevronUp, options, calendar, add } from 'ionicons/icons'
import './Events.css';
import CalendarEventView from '../components/Calendar/CalendarEventView';
import { fetchCalEvents } from '../data/actions/actions'
import { loadBlankEvent } from '../data/actions/viewEvent/viewEventActions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect, useHistory } from 'react-router';
import { blankEventDetails, EventDetails } from '../constants/types';
import { editEventLoad } from '../data/actions/editEventActions';

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.userDetails.isLoggedIn,
  isLoading: state.userDetails.loading,
  userToken: state.userDetails.userToken
})

const connector = connect(mapStateToProps, { fetchCalEvents, loadBlankEvent, editEventLoad });

type PropsFromRedux = ConnectedProps<typeof connector>;
type EventsProps = PropsFromRedux

const Events: React.FC<EventsProps> = (props) => {
  const [segment, setSegment] = useState<'upcoming' | 'past'>('upcoming');
  const [upcomingY, setUpcomingY] = useState(0);
  const [pastY, setPastY] = useState(0);

  const upcoming = segment === 'upcoming';
  const past = segment === 'past';

  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [gridViewToast, setGridViewToast] = useState(false);

  const isSociety: boolean = true;

  const contentRef = React.useRef<HTMLIonContentElement>(null);
  const refresherRef = React.useRef<HTMLIonRefresherElement>(null);

  const history = useHistory();

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

  const showGridView = (e: MouseEvent) => {
    e.preventDefault();

    // To be implemented
    // setViewType('grid');
    setGridViewToast(true);
  }

  const newEvent = (e: MouseEvent) => {
    e.preventDefault();
    history.push("/events/add");
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

        <CalendarEventView hide={!upcoming}/>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={chevronUp} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={options}/>
            </IonFabButton>
            <IonFabButton onClick={showGridView}>
              <IonIcon icon={calendar}/>
            </IonFabButton>
            {isSociety &&
              <IonFabButton routerLink="/events/add">
                <IonIcon icon={add} />
              </IonFabButton>
            }
          </IonFabList>
        </IonFab>

        <IonToast 
          isOpen={gridViewToast}
          onDidDismiss={() => setGridViewToast(false)}
          message="Grid view coming soon!"
          position="bottom"
          duration={2000}
          cssClass="ion-text-center"
          animated
        />
      </IonContent>
    </IonPage>
  );
}

export default connector(Events);
