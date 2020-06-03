import React, { Component, useEffect, useState } from 'react';
import './EventPostsList.css';
import EventPost, { EventPostProps } from './EventPost';
import { IonList, IonItem } from '@ionic/react';
import CentredTextContainer from '../CentredTextContainer';
import { RootState } from '../../data/reducers';
import { ConnectedProps, connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
   posts: state.eventPosts.posts,
   organiserName: state.viewEvent.event.organiser.name,
   userToken: state.userDetails.userToken
})

const connector = connect(mapStateToProps)

interface OwnProps {
   hide: boolean
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventPostsListProps = PropsFromRedux & OwnProps;

const EventPostsList: React.FC<EventPostsListProps> = (props) => {

   return (
      <div style={props.hide ? { display: "none" } : {}}>
         {props.posts.length === 0 && 
            <CentredTextContainer name={"No posts from " + props.organiserName} />
         }
         {/* {this.props.posts.length > 0 &&
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
         } */}
      </div>
   )
}

export default connector(EventPostsList);
