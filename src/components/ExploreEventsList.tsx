import React, { Component } from 'react';
import ExploreEventCard from './ExploreEventCard';
import {Container, Row, Col} from "react-grid-system";
import SkeletonTextEventCard from './SkeletonTextEventCard';
import { EventCardDetails } from '../constants/types';
import { IonButton } from '@ionic/react';
import { Society } from '../models/Profile';
import { getTime } from '../utils/DateTimeTools';

interface ExploreEventsListProps {
   filters: any[];
}

interface ExploreEventsListState {
   events: EventCardDetails[]
}

const aSociety: Society = {id:"100", name:"Some Society", colour:"#eb3434", imageSrc:"https://cgcu.net/images/cgcu_logo_small.jpg"}

const event: EventCardDetails = {id:"1", name:"test event", organiser: aSociety, image:"https://m.atcdn.co.uk/ect/media/w1024/brand-store/volkswagen/golf/hero.jpg", location:"somewhere in imperial", datetimeStart: new Date(2020, 4, 28, 12, 0), datetimeEnd: new Date(2020, 4, 29, 1, 0), tags:["test", "test1", "test2"]}

class ExploreEventsList extends Component<{}, ExploreEventsListState> {

   constructor(props: {}) {
      super(props)
      this.state = {events: []}
      this.addEvent = this.addEvent.bind(this)
   }

   componentDidMount() {
   }

   addEvent() {
      const a = this.state.events
      a.push(event)
      this.setState({events: a})

   }

   render() {
      return (

         <Container>
            <IonButton onClick={this.addEvent}>click</IonButton>
            <Row>
               {this.state.events.length == 0  && [1,2,3,4,5,6].map(x =>
                  <Col lg={4} md={6}>
                      <SkeletonTextEventCard />
                  </Col>
                  )
               }

               {this.state.events.length > 0  &&
                  this.state.events.map(event => 
                     <Col id={event.id} lg={4} md={6}>
                        <ExploreEventCard 
                           id={event.id} 
                           eventName={event.name}
                           eventTime={getTime(event.datetimeStart)}
                           eventLocation={event.location}
                           image={event.image}
                           tags={event.tags}
                           organiser={event.organiser.name}
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