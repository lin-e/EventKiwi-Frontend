import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonModal, IonToast } from '@ionic/react';
import './Profile.css';
import ItemSlider from '../components/ItemSlider';
import { SocietyBasic } from '../constants/types';
import ProfileSocietyIcon from '../components/Profile/ProfileSocietyIcon';
import { Container } from 'react-grid-system';
import InterestChip from '../components/Profile/InterestChip';
import { fetchProfileDetails, resetInvalidProfileResponse } from '../data/actions/actions';
import { logOut } from '../data/actions/userActions';
import { RootState } from '../data/reducers';
import { connect } from 'react-redux';
import EmptySectionText from '../components/EmptySectionText';
import { Redirect } from 'react-router';
import { UserProfile } from '../data/types/dataInterfaces';
import { Plugins } from '@capacitor/core';
import AddInterestModal from '../components/Profile/AddInterestModal';

const { Browser } = Plugins;


interface LinkStateProps {
  interests: string[],
  societies: SocietyBasic[],
  invalidResponse: boolean,
  profile: UserProfile,
  isLoggedIn: boolean,
  isLoading: boolean,
  userToken: string
}

interface LinkDispatchProps {
  resetInvalidProfileResponse: () => void;
  fetchProfileDetails: (token: string) => void
  logOut: (token: string) => void;
}

type ProfileProps = LinkStateProps & LinkDispatchProps

interface ProfileState {
  showInterestModal: boolean,
  showErrorToast: boolean
}

class Profile extends Component<ProfileProps, ProfileState> {

  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      showInterestModal: false,
      showErrorToast: false
    }
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    if (this.props.userToken !== "") {
      this.refresh();
    }
  }

  componentDidUpdate(prevProps: ProfileProps) {
    if(this.props.userToken !== prevProps.userToken) {
      this.refresh()
    }
  }

  refresh() {
    this.props.fetchProfileDetails(this.props.userToken)
  }


  async openUnionWebsite() {
    await Browser.open({ url: "https://www.imperialcollegeunion.org/" });
  }

  render() {

    if (!this.props.isLoggedIn && !this.props.isLoading) {
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
              </IonRow>
              <IonRow>
                <div className="sectionContent">
                  {this.props.societies.length !== 0 ?
                    <ItemSlider width={130}>
                      {this.props.societies.map((soc) => (
                        <ProfileSocietyIcon name={soc.shortName} logo={soc.imgSrc} />
                      ))}
                    </ItemSlider> :
                    <EmptySectionText mainText="No followed societies" subText="Try following or joining some societies to see what is on!"/>

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
                <div className="sectionContent">
                  {this.props.interests.length !== 0 ?
                    <div className="interests">
                      {this.props.interests.map((interest) => (
                      <InterestChip interest={interest} />
                    ))}
                    </div> :
                    <EmptySectionText mainText="No followed interests" subText="Try adding some interests to find more of what you like!"/>
                  }
                </div>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" color="danger" onClick={() => this.props.logOut(this.props.userToken)}>Log out</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" onClick={this.openUnionWebsite}>My Union</IonButton>
                </IonCol>

              </IonRow>
            </IonGrid>

          </Container>

          <IonModal isOpen={this.state.showInterestModal} onDidDismiss={() => this.setState({ showInterestModal: false })}>
            <AddInterestModal />
            <IonButton onClick={() => this.setState({ showInterestModal: false })}>Done</IonButton>
          </IonModal>

          <IonToast
            isOpen={this.props.invalidResponse}
            onDidDismiss={this.props.resetInvalidProfileResponse}
            message="Could not retrieve profile right now, please try again later."
            duration={2000}
            cssClass="ion-text-center"
          />
        </IonContent>
      </IonPage>
    );
  }
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  return {
    interests: state.profileDetails.profileDetails.interests,
    societies: state.profileDetails.profileDetails.societies,
    invalidResponse: state.profileDetails.invalidResponse,
    profile: state.userDetails.profile,
    isLoggedIn: state.userDetails.isLoggedIn,
    isLoading: state.userDetails.loading,
    userToken: state.userDetails.userToken
  }
}


export default connect(
  mapStateToProps,
  { fetchProfileDetails, resetInvalidProfileResponse, logOut }
)(Profile);