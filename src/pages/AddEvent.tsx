import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonTextarea, IonInput, IonText, IonCard, IonDatetime } from '@ionic/react';
import { Container, Row, Col } from 'react-grid-system';

const AddEvent: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create new Event</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create new Event</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Container>
          <IonInput 
            autocorrect="on"
            required
            size={16}
            spellCheck
          />

          <Row>
            <Col md={6} sm={12}>
              <IonCard className="eventImageCard">
                <img className="eventImage" src="https://picsum.photos/800/600" alt="event banner image" />
              </IonCard>
            </Col>

            <Col md={6} sm={12}>
              <Row>
                <Col lg={5} sm={12}>
                  <IonLabel position="stacked">Location</IonLabel>
                  <IonInput />
                  <IonLabel>Start Date</IonLabel>
                  <IonDatetime displayFormat="DDD D MMM YY" pickerFormat="DDDD D MMM YYYY" />
                  <IonLabel>Start Time</IonLabel>
                  <IonDatetime displayFormat="h:m A" pickerFormat="H m" />
                </Col>
                <Col lg={7}>
                  <IonText>Privacy Picker</IonText>
                </Col>
              </Row>
            </Col>
          </Row>
        
        </Container>
      </IonContent>
    </IonPage>
  );
}

export default AddEvent;
