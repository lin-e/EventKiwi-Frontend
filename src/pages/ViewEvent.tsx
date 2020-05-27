import React, { Component, useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { EventDetails } from '../constants/types';
import EventDescription from '../components/EventDescription';


const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit justo vel dolor consectetur efficitur. Donec nec sollicitudin augue, non sollicitudin eros. Pellentesque tincidunt dolor quam, in porttitor neque rhoncus a. In hac habitasse platea dictumst. Cras at tortor ex. Aliquam urna leo, convallis eget vehicula et, egestas nec eros. Donec ipsum leo, faucibus non nulla non, accumsan fermentum ligula. Mauris sit amet diam eu purus tincidunt vulputate. Aliquam in nisl id augue consequat aliquet. Phasellus porttitor sed risus quis ultrices. Ut ut risus orci. Sed facilisis erat sed vestibulum bibendum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In consequat ipsum eros, at malesuada libero ullamcorper vel. Quisque bibendum nulla augue, eu tincidunt tellus malesuada in. Phasellus sed est lorem.
Vestibulum a justo ligula. Integer euismod nibh vitae nulla commodo rhoncus. Phasellus purus leo, interdum et tellus ut, condimentum varius eros. Sed vulputate nulla in sem faucibus, ut mattis odio fermentum. Morbi maximus faucibus justo ac iaculis. Quisque luctus, sapien vel auctor varius, ipsum lacus venenatis elit, a laoreet augue velit volutpat nisi. Suspendisse vitae augue eros. Nunc sit amet semper massa, eget eleifend nisl. Quisque pretium pulvinar justo id suscipit. Integer ullamcorper dolor ut ipsum faucibus, rutrum commodo mauris aliquet. Aliquam scelerisque metus pretium sem pellentesque interdum. Cras rutrum accumsan nunc et consectetur.
Duis pretium, turpis ac commodo mollis, nunc nulla feugiat nulla, sit amet imperdiet elit mauris eget ligula. Ut ornare dignissim nisi, et vestibulum massa posuere sit amet. Vivamus maximus eros quis leo fermentum, sed suscipit tortor accumsan. Nam eget enim a metus blandit convallis. Fusce sit amet erat vitae augue commodo congue. In non quam ullamcorper, gravida turpis at, posuere neque. Aenean pulvinar et metus eget pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet tincidunt auctor. Ut quis accumsan tellus.
Quisque maximus, tortor mollis rutrum faucibus, lorem nisl consequat leo, in pretium nulla mi vel neque. Donec malesuada mattis luctus. Curabitur lorem purus, volutpat vestibulum elit vulputate, mollis tempor erat. Nulla facilisi. Maecenas sollicitudin pellentesque ligula eget eleifend. In est quam, dignissim non risus a, laoreet hendrerit neque. Aliquam dolor quam, lobortis sit amet interdum in, ultrices eu sem. Aliquam sagittis odio nec dapibus bibendum. Proin urna massa, sodales at mollis id, finibus id dui. Donec faucibus fringilla volutpat. Sed lobortis ante in magna feugiat luctus. Praesent orci sem, lobortis id ipsum rhoncus, eleifend facilisis odio.
Proin in volutpat leo, non pretium ligula. Nam in scelerisque ex, non congue tellus. Nulla sed elementum nunc. Nunc auctor commodo sapien, eget imperdiet augue dignissim nec. Duis fermentum tincidunt leo, sit amet sollicitudin arcu gravida in. Donec eu nibh in risus congue tristique sed sed quam. Mauris ullamcorper, urna eget pharetra aliquam, velit sapien finibus tellus, non egestas nisi lacus eget diam. Curabitur placerat rutrum risus, a eleifend elit interdum malesuada. Integer ac enim leo. Nunc pretium justo at vehicula tempor. Duis venenatis arcu urna, sit amet pharetra diam interdum et. Suspendisse nec blandit metus. Sed quis nibh ex. Phasellus quis diam arcu.`


interface OwnProps extends RouteComponentProps {
   event?: EventDetails;
 };
 
 interface StateProps {};
 
 interface DispatchProps {};
 
 interface ViewEventProps extends OwnProps, StateProps, DispatchProps {};

 interface ViewEventState {
   segment: 'details' | 'posts' | 'resources',
   detailsY: number,
   postsY: number,
   resourcesY: number

 };

// class ViewEvent extends Component<ViewEventProps, ViewEventState> {
//    contentRef: React.RefObject<HTMLIonContentElement>;


//    constructor(props: ViewEventProps) {
//       super(props)
//       this.state = {
//          segment: 'details',
//          detailsY: 0,
//          postsY: 0,
//          resourcesY: 0
//       }
//       this.changeSegment = this.changeSegment.bind(this)
//       this.saveY = this.saveY.bind(this)
//       this.contentRef = React.createRef<HTMLIonContentElement>();
//    }

//    details = this.state.segment === 'details';
//    posts = this.state.segment === 'posts';
//    resources = this.state.segment === 'resources';

//    changeSegment = (nextSegment: any) => {
  
//       switch (nextSegment) {
//         case 'details':
//           this.contentRef.current!.scrollToPoint(0, this.state.detailsY);
//           break;
//         case 'posts':
//          this.contentRef.current!.scrollToPoint(0, this.state.postsY);
//           break;
//         case 'resources':
//           this.contentRef.current!.scrollToPoint(0, this.state.resourcesY);
//           break;
//       }
//       this.setState({...this.state, segment: nextSegment})
      
//    }

//    saveY = (y: number) => {
//       switch (this.state.segment) {
//         case 'details':
//          this.setState({...this.state, detailsY: y})
//           break;
//         case 'posts':
//          this.setState({...this.state, postsY: y})
//           break;
//         case 'resources':
//          this.setState({...this.state, resourcesY: y})
//           break;
//       }
//     }


//    render() {
//       return (
//          <IonPage>
//             <IonHeader>
//                <IonToolbar>
//                   <IonButtons slot="start">
//                      <IonBackButton defaultHref="/discover" />
//                   </IonButtons>

//                   <IonSegment value={this.state.segment}>
//                      <IonSegmentButton value="details">
//                         <IonLabel>Details</IonLabel>
//                      </IonSegmentButton>
//                      <IonSegmentButton value="posts">
//                         <IonLabel>Posts</IonLabel>
//                      </IonSegmentButton>
//                      <IonSegmentButton value="resources">
//                         <IonLabel>Resources</IonLabel>
//                      </IonSegmentButton>
//                   </IonSegment>

//                </IonToolbar>
//             </IonHeader>               

//             <IonContent ref={this.contentRef} scrollEvents={true} onIonScroll={(e) => this.saveY(e.detail.currentY)}>
//                <EventDescription 
//                   title="Event name" 
//                   organiser="some society"
//                   location="location"
//                   time="time"
//                   description={loremIpsum}
//                   hide={!this.details}
//                   image="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"
//                   // suggestedEvents={[]}
//                   // moreFromOrganiser={[]}
//                />
//             </IonContent>


//          </IonPage>
//       );
//    }
// }

// export default ViewEvent;


const ViewEvent: React.FC = () => {
   const [segment, setSegment] = useState<'details' | 'posts' | 'resources'>('details');
   
   const [detailsY, setDetailsY] = useState<number>(0);
   const [postsY, setPostsY] = useState<number>(0);
   const [resourcesY, setResourcesY] = useState<number>(0);
 
 
   const details = segment === 'details';
   const posts = segment === 'posts';
   const resources = segment === 'resources';
 
   // const suggestedEvents: EventMiniCardProps[] = [
   //   {
   //     eventName: "DoCSoc Goes to Book of Mormon and goes to chinese afterwards",
   //     organiser: "RandomSoc",
   //     image: "https://m.atcdn.co.uk/ect/media/w1024/brand-store/volkswagen/golf/hero.jpg",
   //     eventTime: "Some day"
   //   },
   //   {
   //     eventName: "DoCSoc Goes to Book of Mormon and goes to chinese afterwards",
   //     organiser: "RandomSoc",
   //     image: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
   //     eventTime: "Some day"
   //   },
   //   {
   //     eventName: "DoCSoc Goes to Book of Mormon and goes to chinese afterwards",
   //     organiser: "RandomSoc",
   //     image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg",
   //     eventTime: "Some day"
   //   },
   //   {
   //     eventName: "DoCSoc Goes to Book of Mormon and goes to chinese afterwards",
   //     organiser: "RandomSoc",
   //     image: "https://m.atcdn.co.uk/ect/media/w1024/brand-store/volkswagen/golf/hero.jpg",
   //     eventTime: "Some day"
   //   },
   //   {
   //     eventName: "DoCSoc Goes to Book of Mormon and goes to chinese afterwards",
   //     organiser: "RandomSoc",
   //     image: "https://hackernoon.com/hn-images/1*jFyawcsqoYctkTuZg6wQ1A.jpeg",
   //     eventTime: "Some day"
   //   }
 
   // ]
 
   // const eventPosts: EventPostProps[] = [{postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
   // {postContent: loremIpsum, postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
   // {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
   // {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
   // {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
   // {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"},
   // {postContent: "hello", postTime: "time", organiserName: "generic society", organiserLogo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"}]
 
   // const eventResources: EventResourceProps[] = [{name:"pdf1.pdf", type:"pdf", url:"https://github.com/lin-e/cv/raw/master/main.pdf"},
   // {name:"test.zip", type:"zip", url:"http://dev.eugenel.in/pika.zip"},
   // {name:"test.pdf", type:"pdf", url:"https://github.com/lin-e/cv/raw/master/main.pdf"},
   // {name:"test.pdf", type:"pdf", url:"https://github.com/lin-e/cv/raw/master/main.pdf"}];
 
 
   const contentRef = React.useRef<HTMLIonContentElement>(null);
 
   const changeTab = (e: { detail: { value: any; }; }) => {
     const nextSegment = e.detail.value as any;
 
     switch (nextSegment) {
       case 'details':
         contentRef.current!.scrollToPoint(0, detailsY);
         break;
       case 'posts':
         contentRef.current!.scrollToPoint(0, postsY);
         break;
       case 'resources':
         contentRef.current!.scrollToPoint(0, resourcesY);
         break;
     }
     setSegment(nextSegment);
     
   } 
 
   const saveY = (y: number) => {
     switch (segment) {
       case 'details':
         setDetailsY(y);
         break;
       case 'posts':
         setPostsY(y);
         break;
       case 'resources':
         setResourcesY(y);
         break;
     }
   }
 
 
   return (
     <IonPage>
 
       <IonHeader>
         <IonToolbar>
            <IonButtons slot="start">
               <IonBackButton defaultHref="/discover" />
            </IonButtons>
 
           <IonSegment value={segment} onIonChange={changeTab}>
             <IonSegmentButton value="details">
               <IonLabel>Details</IonLabel>
             </IonSegmentButton>
             <IonSegmentButton value="posts">
               <IonLabel>Posts</IonLabel>
             </IonSegmentButton>
             <IonSegmentButton value="resources">
               <IonLabel>Resources</IonLabel>
             </IonSegmentButton>
           </IonSegment>
         </IonToolbar>
       </IonHeader>
 
       <IonContent ref={contentRef} scrollEvents={true} onIonScroll={(e) => saveY(e.detail.currentY)}>
 
         <EventDescription 
           title="Event name" 
           organiser="some society"
           location="location"
           time="time"
           description={loremIpsum}
           hide={!details}
           image="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"
         //   suggestedEvents={suggestedEvents}
         //   moreFromOrganiser={suggestedEvents}
         />
 
         {/* <EventPostsList posts={eventPosts} hide={!posts} />
 
         <EventResourcesList resources={eventResources} hide={!resources}/> */}
 
 
       </IonContent>
     </IonPage>
   );
 };
 
 export default ViewEvent;