import React, { useState, MouseEvent, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonTextarea, IonInput, IonCard, IonDatetime, IonButtons, IonBackButton, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonItemDivider, IonButton, IonChip, IonModal, IonToast, IonAlert } from '@ionic/react';
import { Container, Row, Col } from 'react-grid-system';
import { ConnectedProps, connect } from 'react-redux';
import { calendar, closeCircle } from 'ionicons/icons';
import { parseISO, format, isBefore } from 'date-fns'
import AddTagSearch from '../components/EditEvent/AddTagSearch';
import EmptySectionText from '../components/EmptySectionText';
import { createNewEvent, updateEvent, editEventLoad, deleteEvent } from '../data/actions/editEventActions';
import { RootState } from '../data/reducers';
import { UNIX_EPOCH, PRIVATE, SOCIETIES, MEMBERS, PUBLIC, NO_ID } from '../constants/constants';
import './EditEvent.css'
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps<{ id?: string }> { };

const mapStateToProps = (state: RootState) => {
  return {
    event: state.editedEvent.event,
    userToken: state.userDetails.userToken
  }
}

const connector = connect(mapStateToProps, { createNewEvent, updateEvent, editEventLoad, deleteEvent });

type PropsFromRedux = ConnectedProps<typeof connector>
type EditEventProps =  OwnProps & PropsFromRedux

const EditEvent: React.FC<EditEventProps> = ({ match, event, userToken, createNewEvent, updateEvent, editEventLoad, deleteEvent }) => {
  
  const [eventId, setEventId] = useState(event.id);
  const [title, setTitle] = useState(event.name);
  const [location, setLocation] = useState(event.location);
  const [startDatetime, setStartDatetime] = useState(event.datetimeStart);
  const [endDatetime, setEndDatetime] = useState(event.datetimeEnd);
  const [privacy, setPrivacy] = useState(PRIVATE);
  const [tagList, setTagList] = useState<string[]>(event.tags);
  const [description, setDescription] = useState(event.description);
  
  const [exists, setExists] = useState(false);
  const [showTagSearch, setShowTagSearch] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  const [noTitleToast, setNoTitleToast] = useState(false);
  const [noLocationToast, setNoLocationToast] = useState(false);
  const [endBeforeStartToast, setEndBeforeStartToast] = useState(false);
  const [noTagsToast, setNoTagsToast] = useState(false);
  const [tooManyTagsToast, setTooManyTagsToast] = useState(false);
  const [noDescriptionToast, setNoDescriptionToast] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [deletedToast, setDeletedToast] = useState(false);
  
  const currDatetime = new Date();
  
  const updateState = () => {
    setEventId(event.id);
    setTitle(event.name);
    setLocation(event.location);
    setStartDatetime(event.datetimeStart);
    setEndDatetime(event.datetimeEnd);
    setPrivacy(PRIVATE);
    setTagList(event.tags);
    setDescription(event.description);

    setExists((event.id !== ""));
  }

  useEffect(() => {
    updateState()
  }, [event]);

  useEffect(() => {
    if (match.params.id === undefined) {
      editEventLoad(NO_ID, userToken);
    } else {
      editEventLoad(match.params.id, userToken);
    }
  }, []);

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
    if (title === "") {
      setNoTitleToast(true);
    } else if (location === "") {
      setNoLocationToast(true);
    } else if (!isBefore(startDatetime, endDatetime)) {
      setEndBeforeStartToast(true);
    } else if (tagList.length === 0) {
      setNoTagsToast(true);
    } else if (tagList.length > 8) {
      setTooManyTagsToast(true);
    } else if (description === "") {
      setNoDescriptionToast(true);
    } else {
      return true;
    }

    return false;
  }

  const eventCreated = (complete: boolean) => {
    setSavedToast(complete);
    if (complete) {
      setEventId(event.id);
    }
  }

  const saveEvent = (e: MouseEvent) => {
    e.preventDefault();

    if (validEvent()) {
      const updatedDetails = {
        name: title,
        location: location,
        desc: description,
        privacy: privacy,
        tags: tagList,
        start: startDatetime.toISOString(),
        end: endDatetime.toISOString(),
        img: "https://picsum.photos/600/400"
      }
      
      if (eventId === "") {
        createNewEvent(updatedDetails, userToken, eventCreated);
      } else {
        updateEvent(updatedDetails, eventId, userToken, setSavedToast)
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons  slot="start">
            <IonBackButton color="danger" />
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
                value={title}
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
                    value={location}
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

          <Row className="descriptionRow">
            <Col xs={12}>
              <IonList>
                <IonItem lines="none">
                  <IonLabel position="stacked">Description:</IonLabel>
                  <IonTextarea
                    value={description}
                    rows={8}
                    spellCheck
                    wrap="soft"
                    onIonChange={updateDescription}
                    />
                </IonItem>
              </IonList>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              {exists &&
                <IonButton onClick={() => setShowConfirmDelete(true)} expand="block" color="danger" fill="outline">Delete Event</IonButton>
              }
            </Col>
          </Row>
        
        </Container>

        <IonModal isOpen={showTagSearch} onDidDismiss={() => setShowTagSearch(false)}>
          <AddTagSearch currentTags={tagList} addTag={addTag} removeTag={removeTag} />
          <IonButton onClick={() => setShowTagSearch(false)} className="dismissBtn">Done</IonButton>
        </IonModal>

        <IonAlert 
          isOpen={showConfirmDelete}
          onDidDismiss={() => setShowConfirmDelete(false)}
          header="Delete event"
          message="Are you sure you want to delete this event?"
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
            },
            {
              text: "Delete",
              cssClass: "confirmDelete",
              handler: () => {
                deleteEvent(eventId, userToken, setDeletedToast);
              }
            }
          ]}
        />

        <IonToast
          isOpen={noTitleToast}
          onDidDismiss={() => setNoTitleToast(false)}
          message="Please enter a title."
          duration={2500}
        />
        <IonToast
          isOpen={noLocationToast}
          onDidDismiss={() => setNoLocationToast(false)}
          message="Please enter an event location."
          duration={2500}
        />
        <IonToast
          isOpen={endBeforeStartToast}
          onDidDismiss={() => setEndBeforeStartToast(false)}
          message="Please enter an end date/time that is after the start of the event."
          duration={2500}
        />
        <IonToast
          isOpen={noTagsToast}
          onDidDismiss={() => setNoTagsToast(false)}
          message="Please add at least one tag to the event (max 8)."
          duration={2500}
        />
        <IonToast
          isOpen={tooManyTagsToast}
          onDidDismiss={() => setTooManyTagsToast(false)}
          message="Please only choose a maximum of 8 tags."
          duration={2500}
        />
        <IonToast
          isOpen={noDescriptionToast}
          onDidDismiss={() => setNoDescriptionToast(false)}
          message="Please enter an event description."
          duration={2500}
        />
        <IonToast
          isOpen={savedToast}
          onDidDismiss={() => setSavedToast(false)}
          message="Event saved."
          duration={2000}
        />
        <IonToast
          isOpen={deletedToast}
          onDidDismiss={() => setDeletedToast(false)}
          message="Event deleted."
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
}

export default connector(EditEvent);
