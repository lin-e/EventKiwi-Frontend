import React, { useEffect, useState, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonLabel, IonTextarea } from '@ionic/react';
import { loadSocResources, uploadFile } from '../data/actions/resourceManagement/resourceManagementActions';
import "./ResourceManagement.css";
import EventResource from '../components/ViewEventComponents/EventResource';
import EmptySectionText from '../components/EmptySectionText';
import { add } from 'ionicons/icons';
import { Container, Row, Col } from 'react-grid-system';

interface OwnProps { }

const mapStateToProps = (state: RootState) => ({
  userToken: state.userDetails.userToken,
  isLoading: state.viewEvent.loading,
  isLoggedIn: state.userDetails.isLoggedIn,
  isSoc: state.userDetails.isSoc,
  resources: state.resourceManagement.resources
})

const connector = connect(mapStateToProps, { loadSocResources, uploadFile })
type PropsFromRedux = ConnectedProps<typeof connector>

type ResourceManagementProps = OwnProps & PropsFromRedux;

const ResourceManagement: React.FC<ResourceManagementProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.userToken !== "") {
      props.loadSocResources(props.userToken);
    }
  }, [props.userToken])

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/profile" />
          </IonButtons>
          <IonTitle>My Resources</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {props.resources.length > 0 ?
          <Container>
            <Row>
              {props.resources.map(r =>
                <Col key={`soc-resource-${r.bucket_key}`} lg={6} md={12} sm={12}>
                  <IonItem detail className="socResource">
                    <EventResource name={r.display_name} />
                  </IonItem>
                </Col>)}
            </Row>
          </Container>
          : <EmptySectionText mainText="No resources" subText="Add some resources to use for your events" />}
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => fileInputRef.current!.click()}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <input 
        ref={fileInputRef}
        hidden
        type="file"
        onChange={e => props.uploadFile((e.nativeEvent.target as HTMLInputElement).files?.item(0) || ({} as File), props.userToken)}>
      </input>
    </IonPage>
  );
};
export default connector(ResourceManagement);