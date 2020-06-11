import React, { useEffect, useState, MouseEvent } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, useIonViewDidEnter, IonFab, IonFabButton, IonIcon, IonFabList, IonSegment, IonSegmentButton, IonLabel, IonToast, IonButtons, IonButton, IonPopover, IonList } from '@ionic/react';
import { chevronUp, options, calendar, add, informationCircleOutline } from 'ionicons/icons'
import { isFuture } from 'date-fns'
import './Events.css';
import CalendarEventView from '../components/Calendar/CalendarEventView';
import { fetchCalEvents } from '../data/actions/actions'
import { loadBlankEvent } from '../data/actions/viewEvent/viewEventActions';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect, useHistory } from 'react-router';
import { editEventLoad } from '../data/actions/editEventActions';
import { groupByDate, myEvent, getSocs } from '../utils/EventFilterTootls';
import { CalendarEvent } from '../constants/types';
import SocBasicInfo from '../components/Calendar/SocBasicInfo';

const mapStateToProps = (state: RootState) => ({
  events: state.calEvents.events,
  isLoggedIn: state.userDetails.isLoggedIn,
  isLoading: state.userDetails.loading,
  isSociety: state.userDetails.isSoc,
  socId: state.userDetails.profile.society,
  userToken: state.userDetails.userToken
})

const connector = connect(mapStateToProps, { fetchCalEvents, loadBlankEvent, editEventLoad });

type PropsFromRedux = ConnectedProps<typeof connector>;
type EventsProps = PropsFromRedux

const Events: React.FC<EventsProps> = (props) => {
  const [segment, setSegment] = useState<'my events' | 'upcoming' | 'past'>('upcoming');
  const [myEventsY, setMyEventsY] = useState(0);
  const [upcomingY, setUpcomingY] = useState(0);
  const [pastY, setPastY] = useState(0);

  const [showInfo, setShowInfo] = useState<{open: boolean, event: Event | undefined}>({
    open: false,
    event: undefined
  });

  const [socEvents, futureEvents, pastEvents]:CalendarEvent[][] = props.events.reduce(([s, f, p]: CalendarEvent[][], e) => (
    myEvent(e, props.socId) ?
      [[...s, e], f, p] :
      (isFuture(e.datetimeEnd) ?
        [s, [...f, e], p] :
        [s, f, [...p, e]]
      )
  ), [[], [], []]);

  const myEvents = segment === 'my events'
  const upcoming = segment === 'upcoming';
  const past = segment === 'past';

  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [gridViewToast, setGridViewToast] = useState(false);

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
      case 'my events':
        contentRef.current!.scrollToPoint(0, myEventsY);
        break;
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
    setMyEventsY(0);
    setUpcomingY(0);
    setPastY(0);
    try {
      contentRef.current!.scrollToTop();
    } catch { /* contentRef has not yet loaded */ }
    setSegment('upcoming');
  }

  const saveY = (y: number) => {
    switch (segment) {
      case 'my events':
        setMyEventsY(y);
        break;
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

  if (!props.isLoggedIn && !props.isLoading) {
    return <Redirect to="/auth" />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonSegment value={segment} onIonChange={changeTab}>
            {props.isSociety &&
              <IonSegmentButton value="my events">
                <IonLabel>My Events</IonLabel>
              </IonSegmentButton>
            }
            <IonSegmentButton value="upcoming">
              <IonLabel>Upcoming</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="past">
              <IonLabel>Past</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonButtons slot="end">
            <IonButton onClick={(e) => setShowInfo({
                open: true,
                event: e.nativeEvent
              })}
            >
              <IonIcon icon={informationCircleOutline}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Change isLoading state to be custom isLoading prop for calendar */}
      <IonContent ref={contentRef} scrollEvents onIonScroll={(e) => saveY(e.detail.currentY)} className={!props.isLoading ? 'fadeIn' : 'fadeOut'}>
        
        <IonRefresher ref={refresherRef} slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {props.isSociety &&
          <CalendarEventView hide={!myEvents} groupedEvents={groupByDate(socEvents)} />
        }
        <CalendarEventView hide={!upcoming} groupedEvents={groupByDate(futureEvents)}/>
        <CalendarEventView hide={!past} groupedEvents={groupByDate(pastEvents).reverse()}/>

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
            {props.isSociety &&
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
        <IonPopover
          isOpen={showInfo.open}
          event={showInfo.event}
          onDidDismiss={() => setShowInfo({open: false, event: undefined})}
        >
          <IonList>
            {getSocs(props.events).map(org => (
              <SocBasicInfo society={org} key={org.id}/>
            ))}
          </IonList>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
}

export default connector(Events);
