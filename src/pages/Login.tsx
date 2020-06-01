import React, { Component, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Discover.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;



const mapStateToProps = (state: RootState) => ({
   loggedIn: state.userDetails.isLoggedIn
});

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type LoginProps = PropsFromRedux;

const Login: React.FC<LoginProps> = (props) => {
   const [token, setToken] = useState<string>("not clicked");


   // const oAuthClicked = () => {
   //    Plugins.OAuth2Client.authenticate(
   //       {
   //          appId: "2e0eaa17-56a7-48a7-9a41-1757cc5e120e",
   //          authorizationBaseUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
   //          responseType: "code",
   //          redirectUrl: "https://login.microsoftonline.com/common/oauth2/nativeclient",
   //          scope: "openid email profile",
   //          pkceEnabled: true,
   //          accessTokenEndpoint: "https://login.microsoftonline.com/pwcastro.onmicrosoft.com/oauth2/v2.0/token"
   //          // windowOptions: "height=600,left=0,top=0"
   //       }
   //    )
   //       .then((response: { [x: string]: any; }) => {
   //          console.log(response)
   //          let accessToken = response["access_token"];
   //          setToken(accessToken)
   //          // this.refreshToken = response["refresh_token"];

   //          // only if you include a resourceUrl protected user values are included in the response!
   //          let oauthUserId = response["id"];
   //          let name = response["name"];

   //          // go to backend
   //       }).catch((reason: any) => {
   //          console.error("OAuth rejected", reason);
   //       });
   // }

   const azureLogin = () => {
      Plugins.OAuth2Client.authenticate({
         appId: "2e0eaa17-56a7-48a7-9a41-1757cc5e120e",
         authorizationBaseUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
         accessTokenEndpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
         scope: "openid email profile",
         web: {
            accessTokenEndpoint: "",
            responseType: "token",
            redirectUrl: "http://localhost:8100/auth",
         },
         ios: {
            pkceEnabled: true,
            responseType: "code",
            redirectUrl: "msauth.social.drp.events://auth",
         }
      })
      .then((response: any) => {
         setToken(response["access_token"])
      })
      .catch((reason: any) => {
         console.error("OAuth rejected", reason);
      });
    }



   if (props.loggedIn) {
      return <Redirect to="/events" />
   }

   const open = async (url: string) => {
      await Browser.open({ url: url });
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

            <IonButton onClick={azureLogin}>auth</IonButton>
            <IonButton onClick={() => open('http://capacitor.ionicframework.com/')}>refresh</IonButton>
            <IonButton onClick={() => open('http://capacitor.ionicframework.com/')}>logout</IonButton>
            <h1>{token}</h1>

         </IonContent>
      </IonPage>
   );
}


export default connector(Login);