import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel, useIonViewWillEnter, IonButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import EventDescription from '../components/EventDescription';
import "./ViewEvent.css";
import { EventDetails } from '../constants/types';
import { resp_society, resp_event_card_details, resp_event_details } from '../constants/RequestInterfaces';



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

  const details = segment === 'details';
  const posts = segment === 'posts';
  const resources = segment === 'resources';

  const [visible, setVisible] = useState<boolean>(true);

  const convertResToEventDetails = (res: resp_event_details) => {
    return {
      id: res.id,
      name: res.event_name,
      organiser: convertResToSoc(res.society),
      images: [res.event_image_src],
      location: res.location,
      datetimeStart: new Date(res.start_datetime),
      datetimeEnd: new Date(res.end_datetime),
      tags: res.tags,
      description: res.description,
      sameSocEvents: res.same_society_events.map(convertResToEventCard),
      similarEvents: res.same_society_events.map(convertResToEventCard) // TODO: chamge this to similar events when it is implemented
    }
  }


  const convertResToEventCard = (res: resp_event_card_details) => {
    return {
      id: res.id,
      name: res.event_name,
      organiser: convertResToSoc(res.society),
      image: res.event_image_src, 
      location: res.location, 
      datetimeStart: new Date(res.start_datetime),
      datetimeEnd: new Date(res.end_datetime),
      tags: res.tags
    };

  }

  const convertResToSoc = (res: resp_society) => {
    return {
      id: res.id,
      name: res.society_name,
      imageSrc: res.society_image_src,
      colour: res.colour
    }
  }

  // useIonViewWillEnter(() => {
  //   fetch(`https://endpoint.drp.social/event-details/${match.params.id}`)
  //   .then(response => response.json())
  //   .then(resDetails => {
  //     setEventDetails(convertResToEventDetails(resDetails));
  //   })
  // });

   useEffect(() => {
    setVisible(false);
    fetch(`https://endpoint.drp.social/event-details/${match.params.id}`)
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
   }, [match.params.id]);


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
          <EventDescription 
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
          />
          </div>}
 
         {/* <EventPostsList posts={eventPosts} hide={!posts} />
 
         <EventResourcesList resources={eventResources} hide={!resources}/> */}
 
 
       </IonContent>
     </IonPage>
   );
 };
 
 export default ViewEvent;