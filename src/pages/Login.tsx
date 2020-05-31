import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Discover.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';



const mapStateToProps = (state: RootState) => ({
   loggedIn: state.userDetails.isLoggedIn
});

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type LoginProps = PropsFromRedux;


class Login extends Component<LoginProps> {

   constructor(props: LoginProps) {
      super(props)
   }

  render() {

   if (this.props.loggedIn) {
      return <Redirect to="/events" />
   }


   return (
      <IonPage>
         <IonHeader>
            <IonToolbar>
               <IonTitle>Login</IonTitle>
            </IonToolbar>
         </IonHeader>
         <IonContent>
            <IonHeader collapse="condense">
               <IonToolbar>
                  <IonTitle size="large">Login</IonTitle>
               </IonToolbar>
            </IonHeader>  
         </IonContent>
      </IonPage>
    );
  }
}

export default connector(Login);