import React, { Component } from 'react';
import './EventResourcesList.css';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import EventResource from './EventResource';
import CentredTextContainer from '../CentredTextContainer';
import { Resource } from '../../constants/types';
import { resourceDownloadURL } from '../../constants/endpoints';

interface EventResourcesListProps {
  resources: Resource[],
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
                     <IonItem href={`${resourceDownloadURL}${resource.id}`} detail download={resource.name}>
                        <div className="restrictedWidth">
                           <EventResource name={resource.name} />
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
