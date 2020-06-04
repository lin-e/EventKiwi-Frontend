import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import React from "react";
import { Route, Redirect } from "react-router";
import Events from "./Events";
import Discover from "./Discover";
import ViewEvent from "./ViewEvent";
import Profile from "./Profile";
import { calendar, compass, person } from "ionicons/icons";
import EventsTabEventPage from "./EventsTabEventPage";

const Tabs: React.FC = () => (
   <IonTabs>
      <IonRouterOutlet>
         <Route path="/events" component={Events} exact={true} />
         <Route path="/discover" component={Discover} exact={true} />
         <Route path="/event/:id" component={ViewEvent} exact={true} />
         <Route path="/discover/event/:id" component={ViewEvent} exact={true} />
         <Route path="/events/event/:id" component={EventsTabEventPage} exact={true} />
         <Route path="/profile" component={Profile} />
         <Route path="/" render={() => <Redirect to="/events" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
         <IonTabButton tab="events" href="/events">
            <IonIcon icon={calendar} />
            <IonLabel>Events</IonLabel>
         </IonTabButton>
         <IonTabButton tab="discover" href="/discover">
            <IonIcon icon={compass} />
            <IonLabel>Discover</IonLabel>
         </IonTabButton>
         <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
         </IonTabButton>
      </IonTabBar>
   </IonTabs>
)


export default Tabs;
