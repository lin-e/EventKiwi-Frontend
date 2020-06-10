import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonLabel, IonTextarea } from '@ionic/react';
import { loadSocResources } from '../data/actions/resourceManagement/resourceManagementActions';
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

const connector = connect(mapStateToProps, { loadSocResources })
type PropsFromRedux = ConnectedProps<typeof connector>

type ResourceManagementProps = OwnProps & PropsFromRedux;

const ResourceManagement: React.FC<ResourceManagementProps> = (props) => {
  const [selectedFile, setSelectedFile] = useState<File>({} as File);
  const [addFileModal, showAddFileModal] = useState<boolean>(false);

  useEffect(() => {
    if (props.userToken !== "") {
      props.loadSocResources(props.userToken);
    }
  }, [props.userToken])

  const uploadFile = async () => {
    // const data = await selectedFile.arrayBuffer();

    const form = new FormData();
    form.append("upload", selectedFile)

    fetch("https://staging.drp.social/file/upload", {
      method: 'post',
      body: form,
      headers: { 'Authorization': `Bearer ${props.userToken}` }
   })
   .then(res => console.log(res))
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
                  <IonItem  detail className="socResource">
                    <EventResource name={r.display_name} />
                  </IonItem>
                </Col>)}
            </Row>
          </Container>
          : <EmptySectionText mainText="No resources" subText="Add some resources to use for your events" />}
      </IonContent>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => showAddFileModal(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>



      <IonModal
        isOpen={addFileModal}
        swipeToClose={true}
        onDidDismiss={() => showAddFileModal(false)}>

        <IonHeader>

          <IonToolbar>
            <IonButtons slot="start">
              <IonButton color="danger" onClick={() => showAddFileModal(false)}>Cancel</IonButton>
            </IonButtons>
            {/* <IonButtons slot="end">
                <IonButton color="primary" onClick={addPost} disabled={postBody === ""}>Add file</IonButton>
              </IonButtons> */}
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <input required type="file"
            onChange={e => setSelectedFile((e.nativeEvent.target as HTMLInputElement).files?.item(0) || ({} as File))}>
          </input>
          <br />
          <IonButton onClick={uploadFile} disabled={selectedFile === ({} as File)}>Add file</IonButton>
        </IonContent>
      </IonModal>


    </IonPage>
  );
};
export default connector(ResourceManagement);