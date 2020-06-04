import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonFab, IonFabButton, IonFabList, IonToast } from '@ionic/react'
import EventDescription from '../components/ViewEventComponents/EventDescription';
import "./ViewEvent.css";
import EventPostsList from '../components/ViewEventComponents/EventPostsList';
import EventResourcesList from '../components/ViewEventComponents/EventResourcesList';
import { shareOutline } from 'ionicons/icons';
import { connect, ConnectedProps } from 'react-redux';
import { loadEventDetails, loadingEvent, loadBlankEvent, goingToEvent, interestedInEvent, notGoingToEvent } from '../data/actions/viewEventActions';
import { loadEventPosts } from '../data/actions/eventPostsActions';
import { RootState } from '../data/reducers';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

interface OwnProps {
  eventId: string,
  activeTab: 'events' | 'discover' | '';
}

const mapStateToProps = (state: RootState) => ({
  userToken: state.userDetails.userToken,
  isLoading: state.viewEvent.loading,
  isLoggedIn: state.userDetails.isLoggedIn,
  goingStatus: state.viewEvent.event.goingStatus
})

const connector = connect(mapStateToProps, { loadEventDetails, loadBlankEvent, loadingEvent, goingToEvent, interestedInEvent, notGoingToEvent, loadEventPosts })
type PropsFromRedux = ConnectedProps<typeof connector>

type ViewEventProps = OwnProps & PropsFromRedux;


const ViewEvent: React.FC<ViewEventProps> = (props) => {
  const [segment, setSegment] = useState<'details' | 'posts' | 'resources'>('details');

  const [detailsY, setDetailsY] = useState<number>(0);
  const [postsY, setPostsY] = useState<number>(0);
  const [resourcesY, setResourcesY] = useState<number>(0);

  const details = segment === 'details';
  const posts = segment === 'posts';
  const resources = segment === 'resources';

  const [shareUrlToast, showShareUrlToast] = useState<boolean>(false);

  const shareUrlTextRef = useRef<HTMLTextAreaElement>(null);
  const shareUrl = `https://drp.social/event/${props.eventId}`;

  const contentRef = React.useRef<HTMLIonContentElement>(null);

  const resetView = () => {
    setDetailsY(0);
    setPostsY(0);
    setResourcesY(0);
    contentRef.current!.scrollToPoint(0, 0);
  }

  const changeTab = (e: { detail: { value: any; }; }) => {
    const nextSegment = e.detail.value as any;

    switch (nextSegment) {
      case 'details':
        contentRef.current!.scrollToPoint(0, detailsY);
        break;
      case 'posts':
        contentRef.current!.scrollToPoint(0, postsY);
        break;
      case 'resources':
        contentRef.current!.scrollToPoint(0, resourcesY);
        break;
    }
    setSegment(nextSegment);

  }

  const saveY = (y: number) => {
    switch (segment) {
      case 'details':
        setDetailsY(y);
        break;
      case 'posts':
        setPostsY(y);
        break;
      case 'resources':
        setResourcesY(y);
        break;
    }
  }

  const shareClicked = async () => {
    if (isPlatform("desktop")) {
      try {
        shareUrlTextRef.current!.hidden = false;
        shareUrlTextRef.current!.select();
        var successful = document.execCommand('copy');
        successful ? showShareUrlToast(true) : console.log("Unable to copy URL to clipboard");
      } catch (err) {
        console.error('Fallback: Unable to copy', err);
      } finally {
        shareUrlTextRef.current!.hidden = true;
      }

    } else {
      let shareRet = await Share.share({
        title: `Share event`,
        url: shareUrl,
        dialogTitle: 'Share event'
      });
    }
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons  slot="start">
            <IonBackButton text="" defaultHref={`/${props.activeTab}`} />
          </IonButtons>
          <IonSegment value={segment} onIonChange={changeTab}>
            <IonSegmentButton value="details">
              <IonLabel>Details</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="posts">
              <IonLabel>Posts</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="resources">
              <IonLabel>Resources</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} scrollEvents onIonScroll={(e) => saveY(e.detail.currentY)} className={!props.isLoading ? 'fadeIn' : 'fadeOut'}>

        <EventDescription tab={props.activeTab} hide={!details} />

        <EventPostsList tab={props.activeTab} hide={!posts} />

        <EventResourcesList tab={props.activeTab} hide={!resources} />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={shareClicked} color="primary">
            <IonIcon icon={shareOutline} />
          </IonFabButton>
        </IonFab>


        <IonToast
          isOpen={shareUrlToast}
          onDidDismiss={() => showShareUrlToast(false)}
          message="Event URL copied to clipboard."
          duration={3000} />

        {/* Text area used for copying share url to clipboard */}
        <textarea readOnly hidden={true} ref={shareUrlTextRef} id="shareUrl" value={shareUrl} />
      </IonContent>
    </IonPage>
  );
};

export default connector(ViewEvent);