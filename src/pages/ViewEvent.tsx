import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel, IonButton, IonFooter, IonIcon } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import EventDescription from '../components/EventDescription';
import "./ViewEvent.css";
import { EventDetails, convertResToEventDetails, Resource, convertResToResource } from '../constants/types';
import EventPostsList from '../components/EventPostsList';
import { EventPostProps } from '../components/EventPost';
import EventResourcesList from '../components/EventResourcesList';
import { checkmarkCircleOutline, helpCircleOutline, checkmarkCircle, helpCircle } from 'ionicons/icons';
import { eventDetailsURL, eventResourcesURL } from '../constants/endpoints';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit justo vel dolor consectetur efficitur. Donec nec sollicitudin augue, non sollicitudin eros. Pellentesque tincidunt dolor quam, in porttitor neque rhoncus a. In hac habitasse platea dictumst. Cras at tortor ex. Aliquam urna leo, convallis eget vehicula et, egestas nec eros. Donec ipsum leo, faucibus non nulla non, accumsan fermentum ligula. Mauris sit amet diam eu purus tincidunt vulputate. Aliquam in nisl id augue consequat aliquet. Phasellus porttitor sed risus quis ultrices. Ut ut risus orci. Sed facilisis erat sed vestibulum bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In consequat ipsum eros, at malesuada libero ullamcorper vel. Quisque bibendum nulla augue, eu tincidunt tellus malesuada in. Phasellus sed est lorem.
Vestibulum a justo ligula. Integer euismod nibh vitae nulla commodo rhoncus. Phasellus purus leo, interdum et tellus ut, condimentum varius eros. Sed vulputate nulla in sem faucibus, ut mattis odio fermentum. Morbi maximus faucibus justo ac iaculis. Quisque luctus, sapien vel auctor varius, ipsum lacus venenatis elit, a laoreet augue velit volutpat nisi. Suspendisse vitae augue eros. Nunc sit amet semper massa, eget eleifend nisl. Quisque pretium pulvinar justo id suscipit. Integer ullamcorper dolor ut ipsum faucibus, rutrum commodo mauris aliquet. Aliquam scelerisque metus pretium sem pellentesque interdum. Cras rutrum accumsan nunc et consectetur.
Duis pretium, turpis ac commodo mollis, nunc nulla feugiat nulla, sit amet imperdiet elit mauris eget ligula. Ut ornare dignissim nisi, et vestibulum massa posuere sit amet. Vivamus maximus eros quis leo fermentum, sed suscipit tortor accumsan. Nam eget enim a metus blandit convallis. Fusce sit amet erat vitae augue commodo congue. In non quam ullamcorper, gravida turpis at, posuere neque. Aenean pulvinar et metus eget pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet tincidunt auctor. Ut quis accumsan tellus.
Quisque maximus, tortor mollis rutrum faucibus, lorem nisl consequat leo, in pretium nulla mi vel neque. Donec malesuada mattis luctus. Curabitur lorem purus, volutpat vestibulum elit vulputate, mollis tempor erat. Nulla facilisi. Maecenas sollicitudin pellentesque ligula eget eleifend. In est quam, dignissim non risus a, laoreet hendrerit neque. Aliquam dolor quam, lobortis sit amet interdum in, ultrices eu sem. Aliquam sagittis odio nec dapibus bibendum. Proin urna massa, sodales at mollis id, finibus id dui. Donec faucibus fringilla volutpat. Sed lobortis ante in magna feugiat luctus. Praesent orci sem, lobortis id ipsum rhoncus, eleifend facilisis odio.
Proin in volutpat leo, non pretium ligula. Nam in scelerisque ex, non congue tellus. Nulla sed elementum nunc. Nunc auctor commodo sapien, eget imperdiet augue dignissim nec. Duis fermentum tincidunt leo, sit amet sollicitudin arcu gravida in. Donec eu nibh in risus congue tristique sed sed quam. Mauris ullamcorper, urna eget pharetra aliquam, velit sapien finibus tellus, non egestas nisi lacus eget diam. Curabitur placerat rutrum risus, a eleifend elit interdum malesuada. Integer ac enim leo. Nunc pretium justo at vehicula tempor. Duis venenatis arcu urna, sit amet pharetra diam interdum et. Suspendisse nec blandit metus. Sed quis nibh ex. Phasellus quis diam arcu.`

const eventPosts: EventPostProps[] = [{postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
  {postContent: loremIpsum, postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
  {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
  {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
  {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
  {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
  {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"}]

interface OwnProps extends RouteComponentProps<{ id: string }> {
   event?: string;
 };
 
 interface StateProps {};
 
 interface DispatchProps {};
 
 interface ViewEventProps extends OwnProps, StateProps, DispatchProps {};


const ViewEvent: React.FC<ViewEventProps> = ({ match, event }) => {
  const [segment, setSegment] = useState<'details' | 'posts' | 'resources'>('details');
  
  const [detailsY, setDetailsY] = useState<number>(0);
  const [postsY, setPostsY] = useState<number>(0);
  const [resourcesY, setResourcesY] = useState<number>(0);

  const [eventDetails, setEventDetails] = useState<EventDetails>({} as EventDetails);
  const [eventResources, setEventResources] = useState<Resource[]>([]);

  const [going, setGoing] = useState<boolean>(false);
  const [interested, setInterested] = useState<boolean>(false);

  const details = segment === 'details';
  const posts = segment === 'posts';
  const resources = segment === 'resources';

  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    setVisible(false);
    fetch(`${eventDetailsURL}${match.params.id}`)
    .then(response => response.json())
    .then(res => {
      setEventDetails({} as EventDetails); 
      return res
    })
    .then(resDetails => {
      setEventDetails(convertResToEventDetails(resDetails));
      contentRef.current!.scrollToPoint(0, 0);
      setTimeout(() => {
        setVisible(true);
      }, 0.5);

    })

    fetch(`${eventResourcesURL}${match.params.id}`)
    .then(response => response.json())
    .then(data => setEventResources(data.map(convertResToResource)))
    }, [match.params.id]
  );


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

   const goingIcon = going ? checkmarkCircle : checkmarkCircleOutline;
   const goingColour = going ? "success" : "medium";

   const interestedIcon = interested ? helpCircle : helpCircleOutline;
   const interestedColour = interested ? "warning" : "medium";

   const goingClicked = () => {
     if (!going) {
      setInterested(false);
     }
     setGoing(!going)
   }

   const interestedClicked = () => {
    if (!interested) {
      setGoing(false);
    }
    setInterested(!interested)
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
 
       <IonContent ref={contentRef} scrollEvents={true} onIonScroll={(e) => saveY(e.detail.currentY)}>
        {eventDetails.name !== undefined &&
        <div className={visible ? 'fadeIn' : 'fadeOut'}>
          {/* <EventDescription 
            id={eventDetails.id}
            name={eventDetails.name} 
            organiser={eventDetails.organiser}
            location={eventDetails.location}
            datetimeStart={eventDetails.datetimeStart}
            datetimeEnd={eventDetails.datetimeEnd}
            description={eventDetails.description}
            hide={!details}
            images={eventDetails.images}
            tags={eventDetails.tags}
            sameSocEvents={eventDetails.sameSocEvents}
            similarEvents={eventDetails.similarEvents} 
          /> */}
          </div>}
 
        {eventDetails.organiser !== undefined &&
         <EventPostsList posts={[]} societyName={eventDetails.organiser.name} hide={!posts} />
        }

        {eventDetails.organiser !== undefined &&
         <EventResourcesList resources={eventResources} societyName={eventDetails.organiser.name} hide={!resources}/>
        }
 
       </IonContent>
        <IonFooter className="footer"> {/* This class is a temporary fix for the toolbar appearing too tall on an iphone display */}
          <IonToolbar>
            <IonButtons className="buttons">
              <IonButton color={goingColour} onClick={goingClicked}>
                Going <IonIcon icon={goingIcon} />
              </IonButton>
              <IonButton color={interestedColour} onClick={interestedClicked}>
                Interested <IonIcon icon={interestedIcon} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
     </IonPage>
   );
 };
 
 export default ViewEvent;