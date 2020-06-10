import React, { useState, useRef, useEffect, Component } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { RootState } from '../data/reducers';
import { Plugins } from '@capacitor/core';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/react';
import { Redirect } from 'react-router';

interface OwnProps { }

const mapStateToProps = (state: RootState) => ({
  userToken: state.userDetails.userToken,
  isLoading: state.viewEvent.loading,
  isLoggedIn: state.userDetails.isLoggedIn,
  isSoc: state.userDetails.isSoc,
  events: state.viewEvent.events
})

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type ResourceManagementProps = OwnProps & PropsFromRedux;


class ResourceManagement extends Component<ResourceManagementProps> {

  constructor(props: ResourceManagementProps) {
    super(props)
  }


  render() {
    return (
      <IonPage>

        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton text="" defaultHref="/profile" />
            </IonButtons>
            <IonTitle>Resources</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
        </IonContent>
      </IonPage>
    );
  };
}
export default connector(ResourceManagement);