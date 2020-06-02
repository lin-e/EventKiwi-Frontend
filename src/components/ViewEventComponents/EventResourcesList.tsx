import React, { Component } from 'react';
import './EventResourcesList.css';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import EventResource from './EventResource';
import CentredTextContainer from '../CentredTextContainer';
import { resourceDownloadURL } from '../../constants/endpoints';
import { RootState } from '../../data/reducers';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
   resources: state.viewEventReducer.event.resources,
   organiserName: state.viewEventReducer.event.organiser.name
})

const connector = connect(mapStateToProps)

interface OwnProps {
   hide: boolean
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventResourcesListProps = PropsFromRedux & OwnProps;

class EventResourcesList extends Component<EventResourcesListProps> {
   render() {   
      return (
      <div style={this.props.hide ? {display: "none"} : {}}>
         {this.props.resources.length === 0 && 
            <CentredTextContainer name={"No resources from " + this.props.organiserName} />
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

export default connector(EventResourcesList);
