import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent } from '@ionic/react';
import './Discover.css';
import { connect, ConnectedProps } from 'react-redux';



const connector = connect(
  null
)

type PropsFromRedux = ConnectedProps<typeof connector>
type LoginProps = PropsFromRedux;


class Login extends Component<LoginProps> {

  render() {
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