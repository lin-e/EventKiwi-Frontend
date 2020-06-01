import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonModal } from '@ionic/react';
import './Profile.css';
import ItemSlider from '../components/ItemSlider';
import { Society } from '../constants/types';
import ProfileSocietyIcon from '../components/Profile/ProfileSocietyIcon';
import { Container } from 'react-grid-system';
import InterestChip from '../components/InterestChip';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../data/actions/types';
import { bindActionCreators } from 'redux';
import { startFetchProfileInterests, startFetchProfileSocs } from '../data/actions/actions';
import { RootState } from '../data/reducers';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { UserProfile } from '../data/types/dataInterfaces';

interface LinkStateProps {
  interests: string[],
  societies: Society[],
  profile: UserProfile,
  isLoggedIn: boolean
}

interface LinkDispatchProps {
  startFetchInterests: () => void;
  startFetchSocs: () => void;
}

type ProfileProps = LinkStateProps & LinkDispatchProps

interface ProfileState {
  showSocietyModal: boolean,
  showInterestModal: boolean
}

class Profile extends Component<ProfileProps, ProfileState> {

  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      showSocietyModal: false,
      showInterestModal: false
    }
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.props.startFetchInterests();
    this.props.startFetchSocs();
  }

  render() {

    if (!this.props.isLoggedIn) {
      return <Redirect to="/auth" />
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{this.props.profile ? this.props.profile.firstname : "Profile"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{this.props.profile ? this.props.profile.firstname : "Profile"}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <Container className="profileContainer">

            <IonGrid>
              <IonRow>
                <IonCol className="sectionHeader" size="8">
                  <IonTitle className="profileTitle">My Societies</IonTitle>
                </IonCol>
                <IonCol size="4">
                  <IonButton className="profileBtn" color="transparent" onClick={() => this.setState({ showSocietyModal: true })}>Manage</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <div className="sectionContent">
                  {this.props.societies.length !== 0 ?
                    (<ItemSlider width={130}>
                      {this.props.societies.map((soc) => (
                        <ProfileSocietyIcon name={soc.shortName} logo={soc.imageSrc} />
                      ))}
                    </ItemSlider>) :
                    <p className="emptyText">Try following or joining some societies to see what is on!</p>
                  }
                </div>
              </IonRow>

              <IonRow>
                <IonCol className="sectionHeader" size="8">
                  <IonTitle className="profileTitle">My Interests</IonTitle>
                </IonCol>
                <IonCol size="4">
                  <IonButton className="profileBtn" color="transparent" onClick={() => this.setState({ showInterestModal: true })}>Manage</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <div className="sectionContent interests">
                  {this.props.interests.length !== 0 ?
                    (this.props.interests.map((interest) => (
                      <InterestChip interest={interest} removeBtn={true} />
                    ))) :
                    <p className="emptyText">Try adding some interests to find more of what you like!</p>
                  }
                </div>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" color="danger">Log out</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block">My Union</IonButton>
                </IonCol>

              </IonRow>
            </IonGrid>

          </Container>

          <IonModal isOpen={this.state.showSocietyModal}>
            <p>This is the society modal</p>
            <IonButton onClick={() => this.setState({ showSocietyModal: false })}>Close modal</IonButton>
          </IonModal>
          <IonModal isOpen={this.state.showInterestModal}>
            <p>This is the interest modal</p>
            <IonButton onClick={() => this.setState({ showInterestModal: false })}>Close modal</IonButton>
          </IonModal>
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  return {
    interests: state.profileInterests.interests,
    societies: state.profileSocs.societies,
    profile: state.userDetails.profile,
    isLoggedIn: state.userDetails.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  startFetchInterests: bindActionCreators(startFetchProfileInterests, dispatch),
  startFetchSocs: bindActionCreators(startFetchProfileSocs, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);