import React, { Component } from 'react';
import './EventResourcesList.css';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import EventResource from './EventResource';
import CentredTextContainer from '../CentredTextContainer';
import { resourceDownloadURL } from '../../constants/endpoints';
import { RootState } from '../../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { Resource } from '../../constants/types';
import { removeResourceFromEvent } from '../../data/actions/resourceManagement/resourceManagementActions';

const mapStateToProps = (state: RootState) => ({
   userToken: state.userDetails.userToken
})

const connector = connect(mapStateToProps, { removeResourceFromEvent })

interface OwnProps {
   hide: boolean,
   tab: string,
   resources: Resource[],
   isOwner: boolean,
   eventId: string
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventResourcesListProps = OwnProps & PropsFromRedux;
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
                     <IonItemSliding disabled={!props.isOwner} key={`event-resource-${resource.id}`}>
                        <IonItem href={resourceDownloadURL(resource.id)} detail download={resource.name}>
                           <div className="restrictedWidth">
                              <EventResource name={resource.name} />
                           </div>
                        </IonItem>

                        <IonItemOptions side="end">
                           <IonItemOption
                              color="danger"
                              onClick={() => props.removeResourceFromEvent(props.eventId, resource.id, props.userToken)}>
                              Remove
                        </IonItemOption>
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
