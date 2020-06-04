import React, { Component } from 'react';
import './EventResourcesList.css';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import EventResource from './EventResource';
import CentredTextContainer from '../CentredTextContainer';
import { resourceDownloadURL } from '../../constants/endpoints';
import { RootState } from '../../data/reducers';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
   resources: state.viewEvent.event.resources,
   eResources: state.viewEvent.eventsEvent.resources,
   dResources: state.viewEvent.discoverEvent.resources,
   organiserName: state.viewEvent.event.organiser.name
})

const connector = connect(mapStateToProps)

interface OwnProps {
   hide: boolean,
   tab: string
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventResourcesListProps = PropsFromRedux & OwnProps;
const EventResourcesList: React.FC<EventResourcesListProps> = (props) => {

   const resources = props.tab === "events" ? props.eResources : (props.tab === "discover" ? props.dResources : props.resources);

   return (
      <div style={props.hide ? { display: "none" } : {}}>
         {resources.length === 0 &&
            <CentredTextContainer name={"No resources for this event"} />
         }

         {resources.length > 0 &&
            <IonList>
               {resources.map(resource => {
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

export default connector(EventResourcesList);
