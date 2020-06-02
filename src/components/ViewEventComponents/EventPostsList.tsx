import React, { Component } from 'react';
import './EventPostsList.css';
import EventPost, { EventPostProps } from './EventPost';
import { IonList, IonItem } from '@ionic/react';
import CentredTextContainer from '../CentredTextContainer';

interface EventPostsListProps {
  posts: EventPostProps[],
  hide: boolean,
  societyName: string
}


class EventPostsList extends Component<EventPostsListProps> {

   render() {   
      return (
      <div style={this.props.hide ? {display: "none"} : {}}>
         {this.props.posts.length === 0 && 
            <CentredTextContainer name={"No posts from " + this.props.societyName} />
         }
         {this.props.posts.length > 0 &&
            <IonList>
               {this.props.posts.map(post => {
                  return (<IonItem>
                           <div className="restrictedWidth">
                           <EventPost 
                              postContent={post.postContent} 
                              postTime={post.postTime} // use prabs datetime tool here 
                              organiserName={post.organiserName} 
                              organiserLogo={post.organiserLogo}/>
                           </div>
                        </IonItem>)
               })}
            </IonList>
         }
      </div>
      )
   }
}

export default EventPostsList;
