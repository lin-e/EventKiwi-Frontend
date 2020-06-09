import React, { useState } from 'react';
import { IonText, IonCard, IonCardSubtitle, IonCol, IonGrid, IonRow, IonButton, IonIcon, IonToast, IonSkeletonText, IonChip } from '@ionic/react';
import './EventDescription.css';
import { Container, Row, Col } from 'react-grid-system';
import ExpandTextView from '../ExpandTextView';
import EventMiniCard from '../EventMiniCard';
import { getDateRange } from '../../utils/DateTimeTools';
import { RootState } from '../../data/reducers';
import { ConnectedProps, connect } from 'react-redux';
import { checkmarkCircleOutline, starOutline, time, location as locationIcon } from 'ionicons/icons';
import { INTERESTED, GOING } from '../../constants/constants';
import { goingToEvent, interestedInEvent, notGoingToEvent } from '../../data/actions/viewEvent/viewEventActions';
import { EventDetails } from '../../constants/types';

const mapStateToProps = (state: RootState) => ({
   userToken: state.userDetails.userToken,
   isLoggedIn: state.userDetails.isLoggedIn
})

const connector = connect(mapStateToProps, { goingToEvent, interestedInEvent, notGoingToEvent })

interface OwnProps {
   hide: boolean,
   eventDescription: EventDetails,
   tab: string,
   eventId: string,
   goingStatus: number
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventDescriptionProps = PropsFromRedux & OwnProps;

const EventDescription: React.FC<EventDescriptionProps> = (props) => {
   const [goingToast, showGoingToast] = useState<boolean>(false);
   const [notGoingToast, showNotGoingToast] = useState<boolean>(false);
   const [interestedToast, showInterestedToast] = useState<boolean>(false);

   const interestedClicked = () => {
      if (props.eventDescription.goingStatus !== INTERESTED) {
         props.interestedInEvent(props.eventDescription.id, props.userToken);
         showInterestedToast(true);
      } else {
         props.notGoingToEvent(props.eventDescription.id, props.userToken);
         showNotGoingToast(true);
      }
   }

   const goingClicked = () => {
      if (props.eventDescription.goingStatus !== GOING) {
         props.goingToEvent(props.eventDescription.id, props.userToken);
         showGoingToast(true)
      } else {
         props.notGoingToEvent(props.eventDescription.id, props.userToken);
         showNotGoingToast(true);
      }
   }

   return (
      <div style={props.hide ? { display: "none" } : {}}>
         <Container>
            <IonText>
               {props.eventDescription.name === "" && <>
                  <h1><IonSkeletonText style={{ width: '40%', height: '30px' }} animated /></h1>
                  <IonSkeletonText animated />  </>
               }
               {props.eventDescription.name !== "" && <>
                  <h1>{props.eventDescription.name}</h1>
                  <IonCardSubtitle>By {props.eventDescription.organiser.name}</IonCardSubtitle> </>
               }
            </IonText>

            <Row>
               <Col md={6} sm={12}>
                  <IonCard className="eventImageCard">
                     <img className="eventImage" src={props.eventDescription.images[0]} alt={props.eventDescription.name}></img>
                  </IonCard>
               </Col>

               <Col md={6} sm={12}>
                  <Row>
                     <Col lg={5} sm={12}>
                        {props.eventDescription.description === "" && <div>
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                        </div>}
                        {props.eventDescription.description !== "" && <div>
                           <IonCardSubtitle className="detailsText">
                              <IonGrid className="timeLocationGrid">
                                 <IonRow className="timeLocationRow">
                                    <IonCol className="timeLocationCol" size="auto">
                                       <IonIcon icon={time} />
                                    </IonCol>
                                    <IonCol>
                                       {`${getDateRange(props.eventDescription.datetimeStart, props.eventDescription.datetimeEnd)}`}
                                    </IonCol>
                                 </IonRow>
                                 <IonRow className="timeLocationRow">
                                    <IonCol className="timeLocationCol" size="auto">
                                       <IonIcon icon={locationIcon} />
                                    </IonCol>
                                    <IonCol>
                                       {props.eventDescription.location}
                                    </IonCol>
                                 </IonRow>
                              </IonGrid>
                           </IonCardSubtitle>
                        </div>}
                     </Col>
                     {props.isLoggedIn &&
                        <Col lg={7}>
                           {/* <br /> */}
                           <IonButton onClick={goingClicked} color={props.goingStatus === GOING ? "success" : "medium"}>
                              Going&nbsp; <IonIcon icon={checkmarkCircleOutline} />
                           </IonButton>
                           <IonButton onClick={interestedClicked} color={props.goingStatus === INTERESTED ? "warning" : "medium"}>
                              Interested&nbsp; <IonIcon icon={starOutline} />
                           </IonButton>
                        </Col>}
                  </Row>
                  <Row>
                     <Col>
                        {props.eventDescription.tags.map(tag => <IonChip key={`tag-${tag}=${props.eventDescription.id}`}>{tag}</IonChip>)}
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        {props.eventDescription.description === "" && <div>
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                           <IonSkeletonText animated />
                        </div>}
                        {props.eventDescription.description !== "" &&
                           <ExpandTextView limit={455} text={props.eventDescription.description} />
                        }
                     </Col>
                  </Row>

               </Col>
            </Row>

            {props.eventDescription.sameSocEvents.length > 0 &&
               <div>
                  <IonText><h2>More from {props.eventDescription.organiser.shortName}</h2></IonText>
                  <div className="suggestedEvents">
                     <IonGrid>
                        <IonRow>
                           {props.eventDescription.sameSocEvents.map(event => {
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

            {props.eventDescription.similarEvents.length > 0 &&
               <div>
                  <IonText><h2>Suggested events</h2></IonText>
                  <div className="suggestedEvents">
                     <IonGrid>
                        <IonRow>
                           {props.eventDescription.similarEvents.map(event => {
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
