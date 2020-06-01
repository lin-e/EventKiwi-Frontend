import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonModal } from '@ionic/react';
import './Profile.css';
import ItemSlider from '../components/ItemSlider';
import { Society } from '../constants/types';
import ProfileSocietyIcon from '../components/Profile/ProfileSocietyIcon';
import { Container } from 'react-grid-system';
import InterestChip from '../components/InterestChip';
import { startFetchProfileInterests, startFetchProfileSocs } from '../data/actions/actions';
import { logOut } from '../data/actions/userActions';
import { RootState } from '../data/reducers';
import { connect } from 'react-redux';
import EmptySectionText from '../components/EmptySectionText';
import { Redirect } from 'react-router';
import { UserProfile } from '../data/types/dataInterfaces';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;


interface LinkStateProps {
  interests: string[],
  societies: Society[],
  profile: UserProfile,
  isLoggedIn: boolean,
  isLoading: boolean,
  userToken: string
}

interface LinkDispatchProps {
  startFetchProfileInterests: () => void;
  startFetchProfileSocs: () => void;
  logOut: (token: string) => void;
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
    this.props.startFetchProfileSocs();
    this.props.startFetchProfileInterests();
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
                <IonCol size="4">
                  <IonButton className="profileBtn" color="transparent" onClick={() => this.setState({ showSocietyModal: true })}>Manage</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <div className="sectionContent">
                  {this.props.societies.length !== 0 ?
                    <ItemSlider width={130}>
                      {this.props.societies.map((soc) => (
                        <ProfileSocietyIcon name={soc.shortName} logo={soc.imageSrc} />
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
                <div className="sectionContent interests">
                  {this.props.interests.length !== 0 ?
                    (this.props.interests.map((interest) => (
                      <InterestChip interest={interest} removeBtn={true} />
                    ))) :
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
    isLoggedIn: state.userDetails.isLoggedIn,
    isLoading: state.userDetails.loading,
    userToken: state.userDetails.userToken
  }
}



export default connect(
  mapStateToProps,
  { startFetchProfileInterests, startFetchProfileSocs, logOut }
)(Profile);