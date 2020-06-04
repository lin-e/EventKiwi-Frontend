import React from 'react';
import { IonText, IonCard, IonCardSubtitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import './EventDescription.css';
import { Container, Row, Col } from 'react-grid-system';
import ExpandTextView from '../ExpandTextView';
import EventMiniCard from '../EventMiniCard';
import { getDateRange } from '../../utils/DateTimeTools';
import { RootState } from '../../data/reducers';
import { ConnectedProps, connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
   event: state.viewEvent.event,
   eventsEvent: state.viewEvent.eventsEvent,
   discoverEvent: state.viewEvent.discoverEvent
})

const connector = connect(mapStateToProps)

interface OwnProps {
   hide: boolean,
   tab: string
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventDescriptionProps = PropsFromRedux & OwnProps;

const EventDescription: React.FC<EventDescriptionProps> = (props) => {
   const eventDescription = props.tab === "events" ? props.eventsEvent : (props.tab === "discover" ? props.discoverEvent : props.event);
   return (
      <div style={props.hide ? { display: "none" } : {}}>
         <Container>
            <IonText><h1>{eventDescription.name}</h1></IonText>

            <Row>
               <Col md={6} sm={12}>
                  <IonCard className="eventImageCard">
                     <img className="eventImage" src={eventDescription.images[0]} alt={props.event.name}></img>
                  </IonCard>
               </Col>

               <Col md={6} sm={12}>
                  <Row>
                     <Col>
                        <IonCardSubtitle>By {eventDescription.organiser.name},</IonCardSubtitle>
                        <IonCardSubtitle>{`${getDateRange(props.event.datetimeStart, props.event.datetimeEnd)},`}</IonCardSubtitle>
                        <IonCardSubtitle>{eventDescription.location}</IonCardSubtitle>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <ExpandTextView limit={450} text={eventDescription.description} />
                     </Col>
                  </Row>

               </Col>
            </Row>

            {eventDescription.sameSocEvents.length > 0 &&
               <div>
                  <IonText><h2>More from {eventDescription.organiser.name}</h2></IonText>
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
      </div>
   )
}

export default connector(EventDescription);
