import React, { Component } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { RouteComponentProps } from 'react-router';


// interface OwnProps extends RouteComponentProps {
//    event?: Event;
//  };
 
//  interface StateProps {};
 
//  interface DispatchProps {};
 
//  interface SpeakerDetailProps extends OwnProps, StateProps, DispatchProps {};

class ViewEvent extends Component {
   render() {
      return (
         <IonPage>
            <IonContent>

               <IonHeader>
               <IonToolbar>
                  <IonButtons slot="start">
                     <IonBackButton defaultHref="/discover" />
                  </IonButtons>

                  <IonSegment value={"details"}>
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
            </IonContent>


         </IonPage>
      );
   }
}

export default ViewEvent;