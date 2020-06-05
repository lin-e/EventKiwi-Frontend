import React, { useState, useEffect } from 'react';
import { IonText, IonCard, IonCardSubtitle, IonCol, IonGrid, IonRow, IonButton, IonIcon, IonToast, IonSkeletonText } from '@ionic/react';
import './EventDescription.css';
import { Container, Row, Col } from 'react-grid-system';
import ExpandTextView from '../ExpandTextView';
import EventMiniCard from '../EventMiniCard';
import { getDateRange } from '../../utils/DateTimeTools';
import { RootState } from '../../data/reducers';
import { ConnectedProps, connect } from 'react-redux';
import { checkmarkCircleOutline, starOutline } from 'ionicons/icons';
import { INTERESTED, GOING } from '../../constants/constants';
import { goingToEvent, interestedInEvent, notGoingToEvent } from '../../data/actions/viewEvent/viewEventActions';

const mapStateToProps = (state: RootState) => ({
   event: state.viewEvent.event,
   eventsEvent: state.viewEvent.eventsEvent,
   discoverEvent: state.viewEvent.discoverEvent,
   dGoingStatus: state.viewEvent.discoverEvent.goingStatus,
   eGoingStatus: state.viewEvent.eventsEvent.goingStatus,
   userToken: state.userDetails.userToken,
   isLoggedIn: state.userDetails.isLoggedIn
})

const connector = connect(mapStateToProps, { goingToEvent, interestedInEvent, notGoingToEvent })

interface OwnProps {
   hide: boolean,
   tab: string
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventDescriptionProps = PropsFromRedux & OwnProps;

const EventDescription: React.FC<EventDescriptionProps> = (props) => {
   const eventDescription = props.tab === "events" ? props.eventsEvent : (props.tab === "discover" ? props.discoverEvent : props.event);
   const goingStatus = props.tab === "events" ? props.eGoingStatus : (props.tab === "discover" ? props.dGoingStatus : props.goingToEvent);

   const [goingToast, showGoingToast] = useState<boolean>(false);
   const [notGoingToast, showNotGoingToast] = useState<boolean>(false);
   const [interestedToast, showInterestedToast] = useState<boolean>(false);

   const interestedClicked = () => {
      if (eventDescription.goingStatus !== INTERESTED) {
        props.interestedInEvent(eventDescription.id, props.tab, props.userToken);
        showInterestedToast(true);
      } else {
        props.notGoingToEvent(eventDescription.id, props.tab, props.userToken);
        showNotGoingToast(true);
      }
    }
  
    const goingClicked = () => {
      if (eventDescription.goingStatus !== GOING) {
        props.goingToEvent(eventDescription.id, props.tab, props.userToken);
        showGoingToast(true)
      } else {
        props.notGoingToEvent(eventDescription.id, props.tab, props.userToken);
        showNotGoingToast(true);
      }
    }

   return (
      <div style={props.hide ? { display: "none" } : {}}>
         <Container>
            <IonText>
            {eventDescription.name === "" && 
               <h1><IonSkeletonText style={{ width: '40%', height: '30px' }} animated /></h1>
            }
            {eventDescription.name !== "" && 
               <h1>{eventDescription.name}</h1>
            }
            </IonText>

            <Row>
               <Col md={6} sm={12}>
                  <IonCard className="eventImageCard">
                     <img className="eventImage" src={eventDescription.images[0]} alt={props.event.name}></img>
                  </IonCard>
               </Col>

               <Col md={6} sm={12}>
                  <Row>
                     <Col lg={5} sm={12}>
                        {eventDescription.description === "" && <div>
                           <IonSkeletonText animated />  
                           <IonSkeletonText animated />  
                           <IonSkeletonText animated />  
                        </div>}
                        {eventDescription.description !== "" && <div>
                           <IonCardSubtitle>By {eventDescription.organiser.name},</IonCardSubtitle>
                           <IonCardSubtitle>{`${getDateRange(props.event.datetimeStart, props.event.datetimeEnd)},`}</IonCardSubtitle>
                           <IonCardSubtitle>{eventDescription.location}</IonCardSubtitle>
                        </div>}
                     </Col>
                     {props.isLoggedIn && 
                     <Col lg={7}>
                        <br />
                        <IonButton onClick={goingClicked} color={goingStatus === GOING ? "success" : "medium"}>
                           Going&nbsp; <IonIcon icon={checkmarkCircleOutline} />
                        </IonButton>
                        <IonButton onClick={interestedClicked} color={goingStatus === INTERESTED ? "warning" : "medium"}>
                           Interested&nbsp; <IonIcon icon={starOutline} />
                        </IonButton>
                     </Col>}
                  </Row>
                  <Row>
                     <Col>
                        {eventDescription.description === "" && <div>
                           <IonSkeletonText animated />  
                           <IonSkeletonText animated />  
                           <IonSkeletonText animated />  
                           <IonSkeletonText animated />  
                           <IonSkeletonText animated />  
                           <IonSkeletonText animated />  
                           <IonSkeletonText animated />  
                        </div>}
                        {eventDescription.description !== "" && 
                           <ExpandTextView limit={520} text={eventDescription.description} />
                        }
                     </Col>
                  </Row>

               </Col>
            </Row>

            {eventDescription.sameSocEvents.length > 0 &&
               <div>
                  <IonText><h2>More from {eventDescription.organiser.shortName}</h2></IonText>
                  <div className="suggestedEvents">
                     <IonGrid>
                        <IonRow>
                           {eventDescription.sameSocEvents.map(event => {
                              return <IonCol size="auto" key={`sameSocMiniEventCardCol--${event.id}`}>

                                 <EventMiniCard
                                    key={`sameSocMiniEventCard--${event.id}`}
                                    tab={props.tab}
                                    eventId={event.id}
                                    eventName={event.name}
                                    eventStart={event.datetimeStart}
                                    eventEnd={event.datetimeEnd}
                                    organiser={event.organiser.name}
                                    image={event.image} />
                              </IonCol>
                           })}
                        </IonRow>
                     </IonGrid>

                  </div>
               </div>}

            {eventDescription.similarEvents.length > 0 &&
               <div>
                  <IonText><h2>Suggested events</h2></IonText>
                  <div className="suggestedEvents">
                     <IonGrid>
                        <IonRow>
                           {eventDescription.similarEvents.map(event => {
                              return <IonCol size="auto" key={`similarEventMiniEventCardCol--${event.id}`}>
                                 <EventMiniCard
                                    key={`similarEventMiniEventCard--${event.id}`}
                                    tab={props.tab}
                                    eventId={event.id}
                                    eventName={event.name}
                                    eventStart={event.datetimeStart}
                                    eventEnd={event.datetimeEnd}
                                    organiser={event.organiser.name}
                                    image={event.image} />
                              </IonCol>
                           })}
                        </IonRow>
                     </IonGrid>
                  </div>
               </div>}
         </Container>

         <IonToast
            isOpen={goingToast}
            onDidDismiss={() => { showGoingToast(false) }}
            message="Added event to calendar."
            duration={3000}
         />

         <IonToast
            isOpen={goingToast || interestedToast}
            onDidDismiss={() => { showInterestedToast(false) }}
            message="Added event to calendar."
            duration={3000}
         />

         <IonToast
            isOpen={notGoingToast}
            onDidDismiss={() => showNotGoingToast(false)}
            message="Removed event from calendar."
            duration={3000}
         />
      </div>
   )
}

export default connector(EventDescription);
