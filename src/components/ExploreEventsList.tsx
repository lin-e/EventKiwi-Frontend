import React, { Component } from 'react';
import ExploreEventCard from './ExploreEventCard';
import {Container, Row, Col} from "react-grid-system";
import SkeletonTextEventCard from './SkeletonTextEventCard';
import { EventCardDetails } from '../constants/types';
import { IonButton } from '@ionic/react';
import { Society } from '../models/Profile';

interface ExploreEventsListProps {
   filters: any[];
}

interface ExploreEventsListState {
   events: EventCardDetails[]
}

const aSociety: Society = {id:"100", name:"Some Society", colour:"#eb3434", imageSrc:"https://cgcu.net/images/cgcu_logo_small.jpg"}

// const event: EventCardDetails = {event_id:"1", name:"test event", organiser: aSociety, image:"https://m.atcdn.co.uk/ect/media/w1024/brand-store/volkswagen/golf/hero.jpg", location:"somewhere in imperial", datetimeStart: new Date(2020, 4, 28, 12, 0), datetimeEnd: new Date(2020, 4, 29, 1, 0), tags:["test", "test1", "test2"]}

class ExploreEventsList extends Component<{}, ExploreEventsListState> {

   constructor(props: {}) {
      super(props)
      this.state = {events: []}
   }

   componentDidMount() {
      fetch("https://endpoint.drp.social/event-card-details")
      .then(res => res.json())
      .then(data => {
         console.log(data)
         const events: EventCardDetails[] = [];
         (data as EventCardDetails[]).forEach(event => {
            console.log(typeof event.end_datetime)
            events.push(event);
         });
         this.setState({events: events})}
      )

   }

   render() {
      return (

         <Container>
            <Row>
               {this.state.events.length == 0  && [1,2,3,4,5,6].map(x =>
                  <Col lg={4} md={6} key={x.toString()}>
                      <SkeletonTextEventCard />
                  </Col>
                  )
               }

               {this.state.events.length > 0  &&
                  this.state.events.map(event => 
                     <Col id={event.event_id} lg={4} md={6}>
                        <ExploreEventCard 
                           id={event.event_id} 
                           eventName={event.name}
                           startTime={new Date(event.start_datetime)}
                           endTime={new Date(event.end_datetime)}
                           eventLocation={event.location}
                           image={event.image_src}
                           tags={event.tags}
                           organiser={event.society_id} //change to actual organiser 
                        />
                     </Col>
                  )
               }
            </Row>
         </Container>
      );
   }
}

export default ExploreEventsList;