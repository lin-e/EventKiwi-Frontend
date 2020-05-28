import React, { Component } from 'react';
import { IonText, IonCard, IonCardSubtitle } from '@ionic/react';
import './EventDescription.css';
import { Container, Row, Col } from 'react-grid-system';
import ExpandTextView from './ExpandTextView';
// import ItemSlider from './ItemSlider';
// import EventMiniCard, { EventMiniCardProps } from './EventMiniCard';

interface EventDescriptionProps {
  title: string,
  organiser: string,
  location: string,
  time: string,
  description: string,
  hide: boolean,
  image: string,
//   moreFromOrganiser: EventMiniCardProps[],
//   suggestedEvents: EventMiniCardProps[]
}

class EventDescription extends Component<EventDescriptionProps> {

   render() {   
      return (
      <div style={this.props.hide ? {display: "none"} : {}}>
         <Container>
            <IonText><h1>{this.props.title}</h1></IonText>

            <Row>
               <Col md={6} sm={12}>
                  <IonCard className="eventImageCard">
                     <img className="eventImage" src={this.props.image} alt={this.props.title}></img>
                  </IonCard>
               </Col>
               
               <Col md={6} sm={12}>
                  <IonCardSubtitle>By {this.props.organiser}</IonCardSubtitle>
                  <IonCardSubtitle>{this.props.time}, {this.props.location}</IonCardSubtitle>
                  <ExpandTextView limit={450} text={this.props.description} />
               </Col>
            </Row>

            <IonText><h2>More from {this.props.organiser}</h2></IonText>
            <div className="suggestedEvents">
            {/* <ItemSlider width={250}>
               {this.props.moreFromOrganiser.map(event => {
                  return <EventMiniCard eventName={event.eventName}
                                        eventTime={event.eventTime}
                                        organiser={event.organiser}
                                        image={event.image} />})}
            </ItemSlider> */}
            </div>

            <IonText><h2>Suggested Events</h2></IonText>
            <div className="suggestedEvents">
            {/* <ItemSlider width={250}>
               {this.props.suggestedEvents.map(event => {
                  return <EventMiniCard eventName={event.eventName}
                                        eventTime={event.eventTime}
                                        organiser={event.organiser}
                                        image={event.image} />})}
            </ItemSlider> */}
            </div>

         </Container>
      </div>
      )
   }
}

export default EventDescription;
