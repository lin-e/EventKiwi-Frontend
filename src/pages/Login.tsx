import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Discover.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect, RouteComponentProps } from 'react-router';
import { Plugins } from '@capacitor/core';
import MicrosoftLogin from "react-microsoft-login";
import { logIn } from "../data/actions/userActions";

const authEndpoint = "https://staging.drp.social/auth/new/";

const mapStateToProps = (state: RootState) => ({
   loggedIn: state.userDetails.isLoggedIn
});

const connector = connect(
   mapStateToProps,
   { logIn }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type LoginProps = PropsFromRedux & RouteComponentProps<any>;

const Login: React.FC<LoginProps> = (props, state) => {

   if (props.loggedIn) {
      return <Redirect to="/" />
   }


   const authHandler = (err: any, data: any) => {
      if (data) {
         let msToken = data.authResponseWithAccessToken.accessToken
         fetch(authEndpoint, {
            method: 'post',
            body: JSON.stringify({token: msToken}),
            headers: { 'Content-Type': 'application/json' }
          })
         .then(res => res.json())
         .then(data => props.logIn(data))

      }
   }

   return (
      <IonPage>
         <IonHeader>
            <IonToolbar>
               <IonTitle>Imperial Events</IonTitle>
            </IonToolbar>
         </IonHeader>
         <IonContent>
            <IonHeader collapse="condense">
               <IonToolbar>
                  <IonTitle size="large">Imperial Events</IonTitle>
               </IonToolbar>
            </IonHeader>
            <MicrosoftLogin clientId="2e0eaa17-56a7-48a7-9a41-1757cc5e120e" authCallback={authHandler} />

         </IonContent>
      </IonPage>
   );
}


export default connector(Login);