import React, { Component } from 'react';
import './EventResourcesList.css';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import EventResource from './EventResource';
import CentredTextContainer from '../CentredTextContainer';
import { resourceDownloadURL } from '../../constants/endpoints';
import { RootState } from '../../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Resource } from '../../constants/types';

// const mapStateToProps = (state: RootState) => ({
//    resources: state.viewEvent.event.resources,
//    eResources: state.viewEvent.eventsEvent.resources,
//    dResources: state.viewEvent.discoverEvent.resources,
//    organiserName: state.viewEvent.event.organiser.name
// })

// const connector = connect(mapStateToProps)

interface OwnProps {
   hide: boolean,
   tab: string,
   resources: Resource[]
}

// type PropsFromRedux = ConnectedProps<typeof connector>
type EventResourcesListProps = OwnProps;
const EventResourcesList: React.FC<EventResourcesListProps> = (props) => {
   return (
      <div style={props.hide ? { display: "none" } : {}}>
         {props.resources.length === 0 &&
            <CentredTextContainer name={"No resources for this event"} />
         }

         {props.resources.length > 0 &&
            <IonList>
               {props.resources.map(resource => {
                  return (
                     <IonItemSliding key={`event-resource-${resource.id}`}>
                        <IonItem href={resourceDownloadURL(resource.id)} detail download={resource.name}>
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

export default EventResourcesList;
