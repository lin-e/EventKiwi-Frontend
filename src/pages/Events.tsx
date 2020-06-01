import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Events.css';
import CalendarEventView from '../components/Calendar/CalendarEventView';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../data/actions/types';
import { startFetchCalEvents } from '../data/actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';

type Props = LinkDispatchProps & {
  isLoggedIn: boolean,
  isLoading: boolean
};

class Events extends Component<Props> {
  refresherRef: React.RefObject<HTMLIonRefresherElement>;

  constructor(props: Props) {
    super(props);
    this.refresherRef = createRef<HTMLIonRefresherElement>();
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.props.startFetchCalEvents();
  }

  render() {

    if (!this.props.isLoggedIn && !this.props.isLoading) {
      return <Redirect to="/auth" />
    }

    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <IonRefresher ref={this.refresherRef} slot="fixed" onIonRefresh={this.refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher> */}

       <CalendarEventView />
      </IonContent>
    </IonPage>
    );
  }
}

interface LinkDispatchProps {
  startFetchCalEvents: () => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.userDetails.isLoggedIn,
    isLoading: state.userDetails.loading
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  startFetchCalEvents: bindActionCreators(startFetchCalEvents, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Events);