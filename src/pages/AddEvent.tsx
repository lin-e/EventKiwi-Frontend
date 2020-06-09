import React, { useState, MouseEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonTextarea, IonInput, IonText, IonCard, IonDatetime, IonButtons, IonBackButton, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonItemDivider, IonButton, IonChip, IonModal } from '@ionic/react';
import { Container, Row, Col } from 'react-grid-system';
import { calendar, closeCircle } from 'ionicons/icons';
import { parseISO, format } from 'date-fns'

import './AddEvent.css'
import EmptySectionText from '../components/EmptySectionText';
import AddTagSearch from '../components/EditEvent/AddTagSearch';

const AddEvent: React.FC = () => {
  const [startDatetime, setStartDatetime] = useState(new Date());
  const [endDatetime, setEndDatetime] = useState(new Date());
  const [tagList, setTagList] = useState<string[]>([]);
  const [showTagSearch, setShowTagSearch] = useState(false);

  const currDatetime = new Date();

  const addTag = (toAdd: string) => {
    setTagList(tagList.concat([toAdd]))
  }

  const removeTag = (toRemove: string) => {
    setTagList(tagList.filter(tag => tag !== toRemove));
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons  slot="start">
            <IonBackButton color="danger" defaultHref={`/events`} />
          </IonButtons>
          <IonTitle>Create new Event</IonTitle>
          <IonButtons  slot="end">
            <IonButton color="primary">Save</IonButton>
          </IonButtons>
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
          <IonList>
            <IonItem lines="none">
              <IonLabel position="stacked">Title:</IonLabel>
              <IonTextarea 
                spellCheck
                wrap="soft"
                required
                rows={2}
                maxlength={64}
              />
            </IonItem>
          </IonList>

          <Row className="coreDetailsRow">
            <Col md={6} sm={12}>
              <IonCard className="uploadImageCard">
                <img className="uploadImage" src="https://picsum.photos/800/400" alt="event banner image" />
              </IonCard>
            </Col>

            <Col md={6} sm={12}>
              <IonList className="detailsList">
                <IonItem lines="none">
                  <IonLabel position="stacked">Location:</IonLabel>
                  <IonInput
                    maxlength={128}
                  />
                </IonItem>

                <IonItemDivider>
                  <IonLabel>Start:</IonLabel>
                </IonItemDivider>
                <IonItem>
                  <IonIcon icon={calendar} slot="start" />
                  <IonDatetime
                    value={startDatetime.toISOString()}
                    displayFormat="DDDD D MMM YYYY h:mm A"
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
                    displayFormat="DDDD D MMM YYYY h:mm A"
                    pickerFormat="D MMMM YYYY H mm"
                    min={format(startDatetime, "yyyy-MM-dd'T'HH:mm:ss")}
                    max={(currDatetime.getFullYear() + 3).toString()}
                    onIonChange={e => setEndDatetime(parseISO(e.detail.value!))}
                  />
                </IonItem>

                <IonItem lines="none">
                  <IonLabel>Privacy:</IonLabel>
                  <IonSelect interface="popover">
                    <IonSelectOption>Private</IonSelectOption>
                    <IonSelectOption>Societies Only</IonSelectOption>
                    <IonSelectOption>Members</IonSelectOption>
                    <IonSelectOption>Public</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
            </Col>
          </Row>

          <Row>
            <Col xs={8}>
              <IonLabel>Tags:</IonLabel>
            </Col>
            <Col xs={4}>
              <IonButton className="tagEditBtn" fill="clear" onClick={() => setShowTagSearch(true)}>Edit</IonButton>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="tagContainer">
                {tagList.length !== 0 ?
                  <div className="tag">
                    {tagList.map((tag) => (
                      <IonChip>
                        <IonLabel>{tag}</IonLabel>
                        <IonIcon icon={closeCircle} onClick={() => removeTag(tag)}/>
                      </IonChip>
                    ))}
                  </div> :
                  <EmptySectionText
                    className="noTagText"
                    mainText="No Added tags"
                    subText="Try adding some tags to better categorise and advertise the event!"
                  />
                }
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <IonList>
                <IonItem lines="none">
                  <IonLabel position="stacked">Description:</IonLabel>
                  <IonTextarea 
                    rows={8}
                    spellCheck
                    wrap="soft"
                    />
                </IonItem>
              </IonList>
            </Col>
          </Row>
        
        </Container>

        <IonModal isOpen={showTagSearch} onDidDismiss={() => setShowTagSearch(false)}>
          <AddTagSearch currentTags={tagList} addTag={addTag} removeTag={removeTag} />
          <IonButton onClick={() => setShowTagSearch(false)} className="dismissBtn">Done</IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default AddEvent;
