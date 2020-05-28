import React, { Component } from 'react';
import './EventResourcesList.css';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { Container } from 'react-grid-system';
import EventResource, { EventResourceProps } from './EventResource';

interface EventResourcesListProps {
  resources: EventResourceProps[],
  hide: boolean
}

class EventResourcesList extends Component<EventResourcesListProps> {

   constructor(props: EventResourcesListProps) {
      super(props);
   }

   render() {   
      return (
      <div style={this.props.hide ? {display: "none"} : {}}>
         <Container>
            <IonList>
               {this.props.resources.map(resource => {
                  return (
                  <IonItemSliding>
                     <IonItem href={resource.url} detail download={resource.name}>
                        <EventResource name={resource.name} type={resource.type} url={resource.url}/>
                     </IonItem>
                 
                     <IonItemOptions side="end">
                        <IonItemOption onClick={() => console.log('favorite clicked')}>Favorite</IonItemOption>
                     </IonItemOptions>
                  </IonItemSliding>

                  )
               })}
            </IonList>
         </Container>
      </div>
      )
   }
}

export default EventResourcesList;
