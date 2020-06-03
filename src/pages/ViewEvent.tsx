import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonFab, IonFabButton, IonFabList, IonToast, IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import EventDescription from '../components/ViewEventComponents/EventDescription';
import "./ViewEvent.css";
import EventPostsList from '../components/ViewEventComponents/EventPostsList';
import { EventPostProps } from '../components/ViewEventComponents/EventPost';
import EventResourcesList from '../components/ViewEventComponents/EventResourcesList';
import { checkmarkCircleOutline, caretUp, bulbOutline, shareOutline } from 'ionicons/icons';
import { connect, ConnectedProps } from 'react-redux';
import { loadEventDetails, loadingEvent, goingToEvent, interestedInEvent, notGoingToEvent } from '../data/actions/viewEventActions';
import { RootState } from '../data/reducers';
import { NOT_GOING, GOING, INTERESTED } from '../constants/constants';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;



const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit justo vel dolor consectetur efficitur. Donec nec sollicitudin augue, non sollicitudin eros. Pellentesque tincidunt dolor quam, in porttitor neque rhoncus a. In hac habitasse platea dictumst. Cras at tortor ex. Aliquam urna leo, convallis eget vehicula et, egestas nec eros. Donec ipsum leo, faucibus non nulla non, accumsan fermentum ligula. Mauris sit amet diam eu purus tincidunt vulputate. Aliquam in nisl id augue consequat aliquet. Phasellus porttitor sed risus quis ultrices. Ut ut risus orci. Sed facilisis erat sed vestibulum bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In consequat ipsum eros, at malesuada libero ullamcorper vel. Quisque bibendum nulla augue, eu tincidunt tellus malesuada in. Phasellus sed est lorem.
Vestibulum a justo ligula. Integer euismod nibh vitae nulla commodo rhoncus. Phasellus purus leo, interdum et tellus ut, condimentum varius eros. Sed vulputate nulla in sem faucibus, ut mattis odio fermentum. Morbi maximus faucibus justo ac iaculis. Quisque luctus, sapien vel auctor varius, ipsum lacus venenatis elit, a laoreet augue velit volutpat nisi. Suspendisse vitae augue eros. Nunc sit amet semper massa, eget eleifend nisl. Quisque pretium pulvinar justo id suscipit. Integer ullamcorper dolor ut ipsum faucibus, rutrum commodo mauris aliquet. Aliquam scelerisque metus pretium sem pellentesque interdum. Cras rutrum accumsan nunc et consectetur.
Duis pretium, turpis ac commodo mollis, nunc nulla feugiat nulla, sit amet imperdiet elit mauris eget ligula. Ut ornare dignissim nisi, et vestibulum massa posuere sit amet. Vivamus maximus eros quis leo fermentum, sed suscipit tortor accumsan. Nam eget enim a metus blandit convallis. Fusce sit amet erat vitae augue commodo congue. In non quam ullamcorper, gravida turpis at, posuere neque. Aenean pulvinar et metus eget pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet tincidunt auctor. Ut quis accumsan tellus.
Quisque maximus, tortor mollis rutrum faucibus, lorem nisl consequat leo, in pretium nulla mi vel neque. Donec malesuada mattis luctus. Curabitur lorem purus, volutpat vestibulum elit vulputate, mollis tempor erat. Nulla facilisi. Maecenas sollicitudin pellentesque ligula eget eleifend. In est quam, dignissim non risus a, laoreet hendrerit neque. Aliquam dolor quam, lobortis sit amet interdum in, ultrices eu sem. Aliquam sagittis odio nec dapibus bibendum. Proin urna massa, sodales at mollis id, finibus id dui. Donec faucibus fringilla volutpat. Sed lobortis ante in magna feugiat luctus. Praesent orci sem, lobortis id ipsum rhoncus, eleifend facilisis odio.
Proin in volutpat leo, non pretium ligula. Nam in scelerisque ex, non congue tellus. Nulla sed elementum nunc. Nunc auctor commodo sapien, eget imperdiet augue dignissim nec. Duis fermentum tincidunt leo, sit amet sollicitudin arcu gravida in. Donec eu nibh in risus congue tristique sed sed quam. Mauris ullamcorper, urna eget pharetra aliquam, velit sapien finibus tellus, non egestas nisi lacus eget diam. Curabitur placerat rutrum risus, a eleifend elit interdum malesuada. Integer ac enim leo. Nunc pretium justo at vehicula tempor. Duis venenatis arcu urna, sit amet pharetra diam interdum et. Suspendisse nec blandit metus. Sed quis nibh ex. Phasellus quis diam arcu.`

const eventPosts: EventPostProps[] = [{ postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" },
{ postContent: loremIpsum, postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" },
{ postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" },
{ postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" },
{ postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" },
{ postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" },
{ postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" }]

interface OwnProps extends RouteComponentProps<{ id: string }> {
  event?: string;
};


const mapStateToProps = (state: RootState) => ({
  userToken: state.userDetails.userToken,
  isLoading: state.viewEventReducer.loading,
  isLoggedIn: state.userDetails.isLoggedIn,
  goingStatus: state.viewEventReducer.event.goingStatus
})

const connector = connect(mapStateToProps, { loadEventDetails, loadingEvent, goingToEvent, interestedInEvent, notGoingToEvent })
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

  const fabColour = props.goingStatus > NOT_GOING ? (props.goingStatus !== GOING - 1 ? "success" : "warning") : "primary";
  const fabIcon = props.goingStatus > NOT_GOING ? (props.goingStatus !== GOING - 1 ? checkmarkCircleOutline : bulbOutline) : caretUp;

  const [goingToast, showGoingToast] = useState<boolean>(false);
  const [notGoingToast, showNotGoingToast] = useState<boolean>(false);
  const [interestedToast, showInterestedToast] = useState<boolean>(false);
  const [shareUrlToast, showShareUrlToast] = useState<boolean>(false);

  const shareUrlTextRef = useRef<HTMLTextAreaElement>(null);
  const shareUrl = `https://drp.social/event/${props.match.params.id}`;

  // useEffect(() => {
  //   setVisible(false);
  //   fetch(`${eventDetailsURL}${match.params.id}`)
  //   .then(response => response.json())
  //   .then(res => {
  //     setEventDetails({} as EventDetails); 
  //     return res
  //   })
  //   .then(resDetails => {
  //     setEventDetails(convertResToEventDetails(resDetails));
  //     contentRef.current!.scrollToPoint(0, 0);
  //     setTimeout(() => {
  //       setVisible(true);
  //     }, 0.5);

  //   })

  //   fetch(`${eventResourcesURL}${match.params.id}`)
  //   .then(response => response.json())
  //   .then(data => setEventResources(data.map(convertResToResource)))
  //   }, [match.params.id]
  // );

  useEffect(() => {
    props.loadingEvent(); // move this to when an event is clicked
    props.loadEventDetails(props.match.params.id, props.userToken);
  }, [props.match.params.id, props.userToken]);


  const contentRef = React.useRef<HTMLIonContentElement>(null);

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

  const interestedClicked = () => {
    if (props.goingStatus !== INTERESTED) {
      props.interestedInEvent(props.match.params.id, props.userToken);
      showInterestedToast(true);
    } else {
      props.notGoingToEvent(props.match.params.id, props.userToken);
      showNotGoingToast(true);
    }
  }

  const goingClicked = () => {
    if (props.goingStatus !== GOING) {
      props.goingToEvent(props.match.params.id, props.userToken);
      showGoingToast(true)
    } else {
      props.notGoingToEvent(props.match.params.id, props.userToken);
      showNotGoingToast(true);
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
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/events" />
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
        <div >
          <EventDescription hide={!details} />
        </div>

        <EventPostsList hide={!posts} />

        <EventResourcesList hide={!resources} />

        {props.isLoggedIn &&
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton color={fabColour}>
              <IonIcon icon={fabIcon} />
            </IonFabButton>

            <IonFabList side="top">
              <IonFabButton onClick={shareClicked} color="primary">
                <IonIcon icon={shareOutline} />
              </IonFabButton>

              <IonFabButton onClick={interestedClicked} color={props.goingStatus === INTERESTED ? "warning" : ""}>
                <IonIcon icon={bulbOutline} />
              </IonFabButton>

              <IonFabButton onClick={goingClicked} color={props.goingStatus === GOING ? "success" : ""}>
                <IonIcon icon={checkmarkCircleOutline} />
              </IonFabButton>
            </IonFabList>
          </IonFab>}

        {!props.isLoggedIn &&
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={shareClicked} color="primary">
              <IonIcon icon={shareOutline} />
            </IonFabButton>
          </IonFab>}



        <IonToast
          isOpen={interestedToast || goingToast}
          onDidDismiss={() => { showInterestedToast(false); showGoingToast(false) }}
          message="Added event to calendar."
          duration={3000}
        />

        <IonToast
          isOpen={notGoingToast}
          onDidDismiss={() => showNotGoingToast(false)}
          message="Removed event from calendar."
          duration={3000}
        />

        <IonToast
          isOpen={shareUrlToast}
          onDidDismiss={() => showShareUrlToast(false)}
          message="Event URL copied to clipboard."
          duration={3000}
        />

        {/* Text area used for copying share url to clipboard */}
        <textarea readOnly hidden={true} ref={shareUrlTextRef} id="shareUrl" value={shareUrl} />
      </IonContent>
    </IonPage>
  );
};

export default connector(ViewEvent);