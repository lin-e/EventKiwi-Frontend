import React, { Component } from 'react';
import './EventResourcesList.css';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { Container } from 'react-grid-system';
import EventResource, { EventResourceProps } from './EventResource';
import CentredTextContainer from './CentredTextContainer';

interface EventResourcesListProps {
  resources: EventResourceProps[],
  hide: boolean,
  societyName: string
}

class EventResourcesList extends Component<EventResourcesListProps> {
   render() {   
      return (
      <div style={this.props.hide ? {display: "none"} : {}}>
         {this.props.resources.length === 0 && 
            <CentredTextContainer name={"No resources from " + this.props.societyName} />
         }
         
         {this.props.resources.length > 0 && 
            <IonList>
               {this.props.resources.map(resource => {
                  return (
                  <IonItemSliding>
                     <IonItem href={resource.url} detail download={resource.name}>
                        <div className="restrictedWidth">
                           <EventResource name={resource.name} type={resource.type} url={resource.url}/>
                        </div>
                     </IonItem>
                 
                     <IonItemOptions side="end">
                        <IonItemOption onClick={() => console.log('favorite clicked')}>Favorite</IonItemOption>
                     </IonItemOptions>
                  </IonItemSliding>

                  )
               })}
            </IonList>
         }
      </div>
      )
   }
}

export default EventResourcesList;
