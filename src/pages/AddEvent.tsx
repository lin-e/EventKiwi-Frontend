import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonTextarea, IonInput, IonText, IonCard, IonDatetime, IonButtons, IonBackButton, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonItemDivider } from '@ionic/react';
import { Container, Row, Col } from 'react-grid-system';
import { getFullDate, getNumDate } from '../utils/DateTimeTools';
import { calendar, time } from 'ionicons/icons';
import { parseISO, format } from 'date-fns'

const AddEvent: React.FC = () => {
  const [startDatetime, setStartDatetime] = useState(new Date());
  const [endDatetime, setEndDatetime] = useState(new Date());

  const currDatetime = new Date();

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
        <IonButtons  slot="start">
          <IonBackButton text="Cancel" color="danger" defaultHref={`/events`} />
        </IonButtons>
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
                  <IonDatetime
                    value={startDatetime.toISOString()}
                    displayFormat="DDDD D MMMM YYYY h:mm A"
                    pickerFormat="D MMMM YYYY H mm"
                    min={format(currDatetime, "yyyy-MM-dd'T'HH:mm:ss")}
                    max={(currDatetime.getFullYear() + 3).toString()}
                    onIonChange={e => setStartDatetime(parseISO(e.detail.value!))}
                  />
                </IonItem>

                <IonItemDivider>
                  <IonLabel>End:</IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonIcon icon={calendar} slot="start" />
                  <IonDatetime 
                    value={endDatetime.toISOString()}
                    displayFormat="DDDD D MMMM YYYY h:mm A"
                    pickerFormat="D MMMM YYYY H mm"
                    min={format(startDatetime, "yyyy-MM-dd'T'HH:mm:ss")}
                    max={(currDatetime.getFullYear() + 3).toString()}
                    onIonChange={e => setEndDatetime(parseISO(e.detail.value!))}
                  />
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
        
        </Container>
      </IonContent>
    </IonPage>
  );
}

export default AddEvent;
