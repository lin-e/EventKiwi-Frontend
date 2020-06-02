import React, { Component } from 'react';
import { IonText, IonCard, IonCardSubtitle } from '@ionic/react';
import './EventDescription.css';
import { Container, Row, Col } from 'react-grid-system';
import ExpandTextView from '../ExpandTextView';
import ItemSlider from '../ItemSlider';
import EventMiniCard from '../EventMiniCard';
import { getDateRange } from '../../utils/DateTimeTools';
import { RootState } from '../../data/reducers';
import { ConnectedProps, connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
   event: state.viewEventReducer.event
})

const connector = connect(mapStateToProps)

interface OwnProps {
   hide: boolean
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventDescriptionProps = PropsFromRedux & OwnProps;

class EventDescription extends Component<EventDescriptionProps> {

   constructor(props: EventDescriptionProps) {
      super(props);
   }

   render() {
      return (
         <div style={this.props.hide ? { display: "none" } : {}}>
            <Container>
               <IonText><h1>{this.props.event.name}</h1></IonText>

               <Row>
                  <Col md={6} sm={12}>
                     <IonCard className="eventImageCard">
                        <img className="eventImage" src={this.props.event.images[0]} alt={this.props.event.name}></img>
                     </IonCard>
                  </Col>

                  <Col md={6} sm={12}>
                     <IonCardSubtitle>By {this.props.event.organiser.name},</IonCardSubtitle>
                     <IonCardSubtitle>{`${getDateRange(this.props.event.datetimeStart, this.props.event.datetimeEnd)},`}</IonCardSubtitle>
                     <IonCardSubtitle>{this.props.event.location}</IonCardSubtitle>
                     <ExpandTextView limit={450} text={this.props.event.description} />
                  </Col>
               </Row>

               {this.props.event.sameSocEvents.length > 0 &&
                  <div>
                     <IonText><h2>More from {this.props.event.organiser.name}</h2></IonText>
                     <div className="suggestedEvents">

                        <ItemSlider width={250}>
                           {this.props.event.sameSocEvents.map(event => {
                              return <EventMiniCard
                                 eventId={event.id}
                                 eventName={event.name}
                                 eventStart={event.datetimeStart}
                                 eventEnd={event.datetimeEnd}
                                 organiser={event.organiser.name}
                                 image={event.image} />
                           })}
                        </ItemSlider>
                     </div>
                  </div>}

               {this.props.event.similarEvents.length > 0 &&
                  <div>
                     <IonText><h2>Suggested events</h2></IonText>
                     <div className="suggestedEvents">
                        <ItemSlider width={250}>
                           {this.props.event.similarEvents.map(event => {
                              return <EventMiniCard
                                 eventId={event.id}
                                 eventName={event.name}
                                 eventStart={event.datetimeStart}
                                 eventEnd={event.datetimeEnd}
                                 organiser={event.organiser.name}
                                 image={event.image} />
                           })}
                        </ItemSlider>
                     </div>
                  </div>}
            </Container>
         </div>
      )
   }
}

export default connector(EventDescription);
