import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
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

/* Theme variables */
import './theme/variables.css';
import { connect, ConnectedProps } from 'react-redux';
import { loadUserData } from "./data/actions/userActions";
import Tabs from './pages/Tabs';

const connector = connect(
  null,
  { loadUserData }
);

type PropsFromRedux = ConnectedProps<typeof connector>
type AppProps = PropsFromRedux;


const App: React.FC<AppProps> = (props) => {
  useEffect(() => {
    props.loadUserData()
  }, []);
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/auth" component={Login} exact />
          <Route path="/" render={() => <Tabs />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )  
};

export default connector(App);
