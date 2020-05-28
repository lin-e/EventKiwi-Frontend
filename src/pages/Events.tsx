import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Events.css';
import CalendarEventView from '../components/CalendarEventView';
import { Society } from '../models/Profile';

const docsoc: Society = {
  id: "400",
  name: "Department of Computing Society",
  colour: "#343deb",
  shortName: "DoCSoc",
  imageSrc: "https://d33wubrfki0l68.cloudfront.net/ae969c99f655993c0c12a272626abba129e3b112/adbf3/img/imperial-docsoc-logo.png"
}

const cgcu: Society = {
  id: "401",
  name: "City and Guilds Constituent Union",
  colour: "#eb3434",
  shortName: "CGCU",
  imageSrc: "https://cgcu.net/images/cgcu_logo_small.jpg"
}

const exampleSchedule = [
  {
    date: new Date(2020, 4, 27),
    events: [
      {
        id: "1",
        datetimeStart: new Date(2020, 4, 27, 10, 0),
        datetimeEnd: new Date(2020, 4, 27, 11, 30),
        name: "DoCSoc introduction to Vim",
        location: "Huxley 301",
        tags: ["DoCSoc", "Vim"],
        image: "https://images.unsplash.com/flagged/photo-1587096703738-43a53653e6a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        organiser: docsoc
      },
      {
        id: "2",
        datetimeStart: new Date(2020, 4, 27, 12, 0),
        datetimeEnd: new Date(2020, 4, 27, 15, 0),
        name: "CGCU Meet the candidates",
        location: "City and Guilds Building - 461",
        tags: ["CGCU", "elections"],
        image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80",
        organiser: cgcu
      }
    ]
  },
  {
    date: new Date(2020, 5, 28),
    events: [
      {
        id: "3",
        datetimeStart: new Date(2020, 5, 28, 17, 0),
        datetimeEnd: new Date(2020, 5, 28, 19, 30),
        name: "DoCSoc Board and Card game night",
        location: "Huxley 211",
        tags: ["DocSoc", "Board games", "social"],
        image: "https://images.unsplash.com/photo-1549056572-75914d5d5fd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        organiser: docsoc
      },
      {
        id: "4",
        datetimeStart: new Date(2020, 5, 28, 20, 0),
        datetimeEnd: new Date(2020, 5, 29, 1, 0),
        name: "CGCU Pub Crawl",
        location: "Five Six Eight",
        tags: ["CGCU", "Social", "Pubs"],
        image: "https://images.unsplash.com/photo-1546622891-02c72c1537b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
        organiser: cgcu
      }
    ]
  }
]

class Events extends Component {
  render() {
    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
       <CalendarEventView futureEvents={exampleSchedule}/>
      </IonContent>
    </IonPage>
    );
  }
}

export default Events;