import React, { useEffect, useState, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonLabel, IonTextarea, IonItemSliding, IonItemOptions, IonItemOption, IonText } from '@ionic/react';
import { loadSocResources, uploadFile, deleteFile } from '../data/actions/resourceManagement/resourceManagementActions';
import "./ResourceManagement.css";
import EventResource from '../components/ViewEventComponents/EventResource';
import EmptySectionText from '../components/EmptySectionText';
import { add } from 'ionicons/icons';
import { Container, Row, Col } from 'react-grid-system';
import { post } from 'fetch-mock';
import { resp_resource } from '../constants/RequestInterfaces';

interface OwnProps { }

const mapStateToProps = (state: RootState) => ({
  userToken: state.userDetails.userToken,
  isLoading: state.viewEvent.loading,
  isLoggedIn: state.userDetails.isLoggedIn,
  isSoc: state.userDetails.isSoc,
  resources: state.resourceManagement.resources
})

const connector = connect(mapStateToProps, { loadSocResources, uploadFile, deleteFile })
type PropsFromRedux = ConnectedProps<typeof connector>

type ResourceManagementProps = OwnProps & PropsFromRedux;

const ResourceManagement: React.FC<ResourceManagementProps> = (props) => {

  const fileInputRef = useRef<HTMLInputElement>(null);


  const [resourceModal, showResourceModal] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] = useState<resp_resource>({display_name:"", bucket_key:"", events:[]});

  useEffect(() => {
    if (props.userToken !== "") {
      props.loadSocResources(props.userToken);
    }
  }, [props.userToken])

  const resourceSelected = (resource: resp_resource) => {
    setSelectedResource(resource);
    showResourceModal(true);
  }

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
                  <IonItemSliding>
                    <IonItem detail button onClick={() => resourceSelected(r)}>
                      <EventResource name={r.display_name} />
                    </IonItem>

                    <IonItemOptions side="end">
                      <IonItemOption color="danger" onClick={() => props.deleteFile(r.bucket_key, props.userToken)}>Delete</IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
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


      <IonModal
        isOpen={resourceModal}
        swipeToClose={true}
        onDidDismiss={() => showResourceModal(false)}>

        <IonHeader>

          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="primary" onClick={() => showResourceModal(false)}>Done</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {/* <br />
          <IonTitle>{selectedResource.display_name}</IonTitle> */}

          <Container>
            <IonText>
              <h3>{selectedResource.display_name}</h3>
              {selectedResource.events.length > 0 ?
              <>
                 <h5>Used in:</h5>
                 {selectedResource.events.map(e => <h6 id={e.name}>- {e.name}</h6>)}
              </> 
               : <h5>Not used in any events</h5>}
              
            </IonText>
            <IonRow>
              <IonCol>
              <IonButton expand="block">Download</IonButton>

              </IonCol>
              <IonCol>
              <IonButton expand="block" color="danger">Delete</IonButton>
              </IonCol>

            </IonRow>

          </Container>

        </IonContent>
      </IonModal>
    </IonPage>
  );
};
export default connector(ResourceManagement);