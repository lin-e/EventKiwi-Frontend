import React from 'react';
import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomeOrLogin from './components/HomeOrLogin';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import {registerWebPlugin} from "@capacitor/core";
import {OAuth2Client} from '@byteowls/capacitor-oauth2';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  registerWebPlugin(OAuth2Client);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/auth" component={Login} exact={true} />
          <Route path="/" render={(props) => <HomeOrLogin {...props} redirect={window.location.pathname}/>} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )  
};

export default App;
