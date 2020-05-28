import React, { Component } from 'react';
import { IonText, IonCard, IonCardSubtitle } from '@ionic/react';
import './EventDescription.css';
import { Container, Row, Col } from 'react-grid-system';
import ExpandTextView from './ExpandTextView';
import { EventDetails } from '../constants/types';
import ItemSlider from './ItemSlider';
import EventMiniCard from './EventMiniCard';
import { getDateRange } from '../utils/DateTimeTools';

interface EventDescriptionProps extends EventDetails {
   hide: boolean;
}

class EventDescription extends Component<EventDescriptionProps> {

   constructor(props: EventDescriptionProps) {
      super(props);
   }

   render() {   
      return (
      <div style={this.props.hide ? {display: "none"} : {}}>
         <Container>
            <IonText><h1>{this.props.name}</h1></IonText>

            <Row>
               <Col md={6} sm={12}>
                  <IonCard className="eventImageCard">
                     <img className="eventImage" src={this.props.images[0]} alt={this.props.name}></img>
                  </IonCard>
               </Col>
               
               <Col md={6} sm={12}>
                  <IonCardSubtitle>By {this.props.organiser.name},</IonCardSubtitle>
                  <IonCardSubtitle>{`${getDateRange(this.props.datetimeStart, this.props.datetimeEnd)},`}</IonCardSubtitle>
                  <IonCardSubtitle>{this.props.location}</IonCardSubtitle>
                  <ExpandTextView limit={450} text={this.props.description} />
               </Col>
            </Row>

            {this.props.sameSocEvents.length > 0 && 
            <div>
               <IonText><h2>More from {this.props.organiser.name}</h2></IonText>
               <div className="suggestedEvents">
                  
                  <ItemSlider width={250}>
                     {this.props.sameSocEvents.map(event => {
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

            {this.props.sameSocEvents.length > 0 && 
            <div>
               <IonText><h2>Suggested events</h2></IonText>
               <div className="suggestedEvents">
                  <ItemSlider width={250}>
                     {this.props.similarEvents.map(event => {
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

export default EventDescription;
