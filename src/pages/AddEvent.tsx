import React, { useState, MouseEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonTextarea, IonInput, IonText, IonCard, IonDatetime, IonButtons, IonBackButton, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonItemDivider, IonButton, IonChip, IonModal } from '@ionic/react';
import { Container, Row, Col } from 'react-grid-system';
import { calendar, closeCircle } from 'ionicons/icons';
import { parseISO, format, isBefore } from 'date-fns'

import './AddEvent.css'
import EmptySectionText from '../components/EmptySectionText';
import AddTagSearch from '../components/EditEvent/AddTagSearch';
import { UNIX_EPOCH, PRIVATE, SOCIETIES, MEMBERS, PUBLIC } from '../constants/constants';
import { createNewEvent } from '../data/actions/editEventActions';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../data/reducers';


const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken
  }
}

const connector = connect(mapStateToProps, { createNewEvent });

type PropsFromRedux = ConnectedProps<typeof connector>
type AddEventProps = PropsFromRedux

const AddEvent: React.FC<AddEventProps> = ({userToken, createNewEvent}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDatetime, setStartDatetime] = useState(new Date());
  const [endDatetime, setEndDatetime] = useState(new Date());
  const [privacy, setPrivacy] = useState(PRIVATE);
  const [tagList, setTagList] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  
  const [showTagSearch, setShowTagSearch] = useState(false);
  
  const [endBeforeStartToast, setEndBeforeStartToast] = useState(false);
  const [noTitleToast, setNoTitleToast] = useState(false);
  const [noLocationToast, setNoLocationToast] = useState(false);
  const [noDescriptionToast, setNoDescriptionToast] = useState(false);
  const [noTagsToast, setNoTagsToast] = useState(false);
  const [tooManyTagsToast, setTooManyTagsToast] = useState(false);

  const currDatetime = new Date();

  const mapPrivacy = (privacyLevel: string) => {
    switch(privacyLevel) {
      case "Private":
        return PRIVATE
      case "Societies Only":
        return SOCIETIES;
      case "Members":
        return MEMBERS;
      case "Public":
        return PUBLIC;
      default:
        return PRIVATE;
    }
  }

  const unmapPrivacy = (privacyLevel: number) => {
    switch(privacyLevel) {
      case PRIVATE:
        return "Private"
      case SOCIETIES:
        return "Societies Only"
      case MEMBERS:
        return "Members"
      case PUBLIC:
        return "Public"
      default:
        return "Unknown"
    }
  }

  const updateTitle = (e: CustomEvent) => {
    setTitle((e.detail.value == undefined) ? "" : e.detail.value!.trim())
  }

  const updateLocation = (e: CustomEvent) => {
    setLocation((e.detail.value == undefined) ? "" : e.detail.value!.trim())
  }

  const updatePrivacy = (e: CustomEvent) => {
    console.log(e.detail.value);
    setPrivacy(mapPrivacy(e.detail.value));
  }

  const updateDescription = (e: CustomEvent) => {
    setDescription((e.detail.value == undefined) ? "" : e.detail.value!.trim())
  }

  const addTag = (toAdd: string) => {
    setTagList(tagList.concat([toAdd]))
  }

  const removeTag = (toRemove: string) => {
    setTagList(tagList.filter(tag => tag !== toRemove));
  }

  const validEvent = () => {
    if (!isBefore(startDatetime, endDatetime)) {
      setEndBeforeStartToast(true);
    } else if (title === "") {
      setNoTitleToast(true);
    } else if (location === "") {
      setNoLocationToast(true);
    } else if (description === "") {
      setNoDescriptionToast(true);
    } else if (tagList.length === 0) {
      setNoTagsToast(true);
    } else if (tagList.length > 8) {
      setTooManyTagsToast(true);
    } else {
      return true;
    }

    return false;
  }

  const saveEvent = (e: MouseEvent) => {
    e.preventDefault();

    if (validEvent()) {
      createNewEvent({
        name: title,
        location: location,
        desc: description,
        privacy: privacy,
        tags: tagList,
        start: startDatetime.toISOString(),
        end: endDatetime.toISOString(),
        img: "https://picsum.photos/600/400"
      }, userToken);
    }
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
            <IonButton onClick={saveEvent} color="primary">Save</IonButton>
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
                onIonChange={updateTitle}
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
                    onIonChange={updateLocation}
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
                    min={format(UNIX_EPOCH, "yyyy-MM-dd'T'HH:mm:ss")}
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
                  <IonSelect interface="popover" value={unmapPrivacy(privacy)} defaultChecked onIonChange={updatePrivacy}>
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
                    onIonChange={updateDescription}
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

export default connector(AddEvent);
