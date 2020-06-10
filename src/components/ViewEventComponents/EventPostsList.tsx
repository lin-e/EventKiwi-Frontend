import React from 'react';
import './EventPostsList.css';
import EventPost from './EventPost';
import { IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import CentredTextContainer from '../CentredTextContainer';
import { RootState } from '../../data/reducers';
import { ConnectedProps, connect } from 'react-redux';
import { getLongDate, getTime } from '../../utils/DateTimeTools';
import { Post } from '../../constants/types';
import { deleteEventPost } from '../../data/actions/eventPosts/eventPostsActions';

const mapStateToProps = (state: RootState) => ({
   userToken: state.userDetails.userToken
})

const connector = connect(mapStateToProps, { deleteEventPost })

interface OwnProps {
   hide: boolean,
   posts: Post[],
   numPosts: number,
   isPoster: boolean
}

type PropsFromRedux = ConnectedProps<typeof connector>
type EventPostsListProps = PropsFromRedux & OwnProps;

const EventPostsList: React.FC<EventPostsListProps> = (props) => {
   return (
      <div style={props.hide ? { display: "none" } : {}}>
         {props.posts.length === 0 &&
            <CentredTextContainer name={"No posts for this event"} />
         }
         {props.posts.length > 0 &&
            <IonList>
               {props.posts.map(post => {
                  return (
                     <IonItemSliding  key={`event-post-${post.id}`} disabled={!props.isPoster}>
                        <IonItem>
                           <div className="restrictedWidth">
                              <EventPost
                                 postContent={post.body}
                                 postTime={`${getLongDate(post.time)}, ${getTime(post.time)}`}
                                 organiserName={post.organiser.name}
                                 organiserLogo={post.organiser.image}
                              />
                           </div>
                        </IonItem>

                        <IonItemOptions side="end">
                           <IonItemOption color="danger" onClick={() => props.deleteEventPost(post.id, post.eventId, props.userToken)}>Delete</IonItemOption>
                        </IonItemOptions>
                     </IonItemSliding>
                  )
               })}
            </IonList>
         }
      </div>
   )
}

export default connector(EventPostsList);
