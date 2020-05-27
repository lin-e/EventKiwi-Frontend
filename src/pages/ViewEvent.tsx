import React, { Component, useState, useEffect } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { EventDetails } from '../constants/types';
import EventDescription from '../components/EventDescription';
import "./ViewEvent.css";


type dummyJSON = {
   userId: string,
   id: string,
   title: string,
   body: string
}


interface OwnProps extends RouteComponentProps {
   event?: EventDetails;
 };
 
 interface StateProps {};
 
 interface DispatchProps {};
 
 interface ViewEventProps extends OwnProps, StateProps, DispatchProps {};


const ViewEvent: React.FC<ViewEventProps> = ({ event }) => {
   const [segment, setSegment] = useState<'details' | 'posts' | 'resources'>('details');
   
   const [detailsY, setDetailsY] = useState<number>(0);
   const [postsY, setPostsY] = useState<number>(0);
   const [resourcesY, setResourcesY] = useState<number>(0);
 
   const [dummy, setDummy] = useState<dummyJSON[]>([]);
 
   const details = segment === 'details';
   const posts = segment === 'posts';
   const resources = segment === 'resources';

   useEffect(() => {
      console.log("32")
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
         const dummyList: dummyJSON[] = [];
         (data as dummyJSON[]).forEach(element => {
            dummyList.push(element);
         });
         setDummy(dummyList)
      })
   }, []);



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
               <IonBackButton text="" defaultHref="/discover" />
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
          {dummy.length > 0 &&
 
         <EventDescription 
           title={dummy[0].title} 
           organiser={dummy[0].userId}
           location="location"
           time={dummy[0].id}
           description={dummy[0].body}
           hide={!details}
           image="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"
         //   suggestedEvents={suggestedEvents}
         //   moreFromOrganiser={suggestedEvents}
         />
          }
 
         {/* <EventPostsList posts={eventPosts} hide={!posts} />
 
         <EventResourcesList resources={eventResources} hide={!resources}/> */}
 
 
       </IonContent>
     </IonPage>
   );
 };
 
 export default ViewEvent;