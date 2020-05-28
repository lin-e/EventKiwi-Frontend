import React, { Component } from 'react';
import ExploreEventCard from './ExploreEventCard';
import {Container, Row, Col} from "react-grid-system";
import SkeletonTextEventCard from './SkeletonTextEventCard';
import { EventCardDetails } from '../constants/types';
import { Society } from '../models/Profile';

interface ExploreEventsListProps {
   events: EventCardDetails[];
}


// const aSociety: Society = {id:"100", name:"Some Society", colour:"#eb3434", imageSrc:"https://cgcu.net/images/cgcu_logo_small.jpg"}

// const event: EventCardDetails = {event_id:"1", name:"test event", organiser: aSociety, image:"https://m.atcdn.co.uk/ect/media/w1024/brand-store/volkswagen/golf/hero.jpg", location:"somewhere in imperial", datetimeStart: new Date(2020, 4, 28, 12, 0), datetimeEnd: new Date(2020, 4, 29, 1, 0), tags:["test", "test1", "test2"]}

class ExploreEventsList extends Component<ExploreEventsListProps> {

   constructor(props: ExploreEventsListProps) {
      super(props)
   }

   render() {
      return (
         <Container>
            <Row>
               {this.props.events.length === 0  && [1,2,3,4,5,6].map(x =>
                  <Col lg={4} md={6} key={"skeleton" + x.toString()}>
                      <SkeletonTextEventCard />
                  </Col>
                  )
               }

               {this.props.events.length > 0  &&
                  this.props.events.map(event => 
                     <Col key={"eventCardCol" + event.id.toString()} lg={4} md={6}>
                        <ExploreEventCard key={"eventCard" + event.id.toString()}
                           id={event.id} 
                           name={event.name}
                           datetimeStart={event.datetimeStart}
                           datetimeEnd={event.datetimeEnd}
                           location={event.location}
                           image={event.image}
                           tags={event.tags}
                           organiser={event.organiser}
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