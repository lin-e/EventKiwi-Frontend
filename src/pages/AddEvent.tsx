import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonTextarea, IonInput, IonText, IonCard, IonDatetime, IonButtons, IonBackButton, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonItemDivider } from '@ionic/react';
import { Container, Row, Col } from 'react-grid-system';
import { getFullDate } from '../utils/DateTimeTools';
import { calendar, time } from 'ionicons/icons';

const AddEvent: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonButtons  slot="start">
          <IonBackButton text="Cancel" color="danger" defaultHref={`/events`} />
        </IonButtons>
        <IonToolbar>
          <IonTitle>Create new Event</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle  size="large">Create new Event</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container>
          <IonItem>
            <IonLabel position="stacked">Title:</IonLabel>
            <IonTextarea 
              autoGrow
              spellCheck
              wrap="soft"
              required
            />
          </IonItem>

          <Row>
            <Col md={6} sm={12}>
              <IonCard className="eventImageCard">
                <img className="eventImage" src="https://picsum.photos/800/600" alt="event banner image" />
              </IonCard>
            </Col>

            <Col md={6} sm={12}>
              <IonList className="detailsList">
                <IonItem lines="none">
                  <IonLabel position="stacked">Location:</IonLabel>
                  <IonInput />
                </IonItem>

                <IonItemDivider>
                  <IonLabel>Start:</IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonIcon icon={calendar} slot="start" />
                  <IonDatetime displayFormat="DDDD D MMMM YYYY" pickerFormat="D MMMM YYYY" />
                </IonItem>
                <IonItem lines="none">
                  <IonIcon icon={time} slot="start" />
                  <IonDatetime displayFormat="h:m A" pickerFormat="H m" />
                </IonItem>

                <IonItemDivider>
                  <IonLabel>End:</IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonIcon icon={calendar} slot="start" />
                  <IonDatetime 
                    displayFormat="DDDD D MMMM YYYY"
                    pickerFormat="D MMMM YYYY"
                    min={new Date().getFullYear().toString()}
                    max={(new Date().getFullYear() + 3).toString()}
                  />
                </IonItem>
                <IonItem>
                  <IonIcon icon={time} slot="start" />
                  <IonDatetime displayFormat="h:m A" pickerFormat="H m" />
                </IonItem>
                <IonItem>
                  <IonLabel>Privacy:</IonLabel>
                  <IonSelect interface="popover">
                    <IonSelectOption>Private</IonSelectOption>
                    <IonSelectOption>Societies Only</IonSelectOption>
                    <IonSelectOption>Members</IonSelectOption>
                    <IonSelectOption>Public</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel position="stacked">Description:</IonLabel>
                  <IonTextarea 
                    autoGrow
                    spellCheck
                    wrap="soft"
                  />
                </IonItem>
              </IonList>
            </Col>
          </Row>
          <p></p>
        
        </Container>
      </IonContent>
    </IonPage>
  );
}

export default AddEvent;
