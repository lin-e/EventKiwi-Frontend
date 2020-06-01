import React, { Component, MouseEvent } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonChip, IonLabel, IonIcon } from '@ionic/react';
import './Profile.css';
import ItemSlider from '../components/ItemSlider';
import { Society } from '../constants/types';
import ProfileSocietyIcon from '../components/Profile/ProfileSocietyIcon';
import { Container } from 'react-grid-system';
import InterestChip from '../components/InterestChip';
import { closeCircle } from 'ionicons/icons';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../data/actions/types';
import { bindActionCreators } from 'redux';
import { startFetchProfileInterests, startRemoveProfileInterest, startFetchProfileSocs } from '../data/actions/actions';
import { RootState } from '../data/reducers';
import { connect } from 'react-redux';

type Props = LinkStateProps & LinkDispatchProps

class Profile extends Component<Props> {

  constructor(props: Props) {
    super(props);
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
    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container className="profileContainer">

          <IonGrid>
            <IonRow>
              <IonCol className="sectionHeader" size="8">
                <IonTitle className="profileTitle">My Societies</IonTitle>
              </IonCol>
              <IonCol size="4">
                <IonButton  className="profileBtn">Manage</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <div className="sectionContent">
                <ItemSlider width={130}>
                  {this.props.societies.map((soc) => (
                    <ProfileSocietyIcon name={soc.shortName} logo={soc.imageSrc} />
                  ))}
                </ItemSlider>
              </div>
            </IonRow>

            <IonRow>
              <IonCol className="sectionHeader" size="8">
                <IonTitle className="profileTitle">My Interests</IonTitle>
              </IonCol>
              <IonCol size="4">
                <IonButton  className="profileBtn">Manage</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <div className="sectionContent interests">
                {this.props.interests.map((interest) => (
                  <InterestChip interest={interest} removeBtn={true} />
                ))}
              </div>
            </IonRow>
          </IonGrid>

        </Container>
      </IonContent>
    </IonPage>
    );
  }
}

interface LinkStateProps {
  interests: string[],
  societies: Society[]
}

interface LinkDispatchProps {
  startFetchInterests: () => void;
  startFetchSocs: () => void;
}

const mapStateToProps = (state: RootState): LinkStateProps => {
  return {
    interests: state.profileInterests.interests,
    societies: state.profileSocs.societies
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): LinkDispatchProps => ({
  startFetchInterests: bindActionCreators(startFetchProfileInterests, dispatch),
  startFetchSocs: bindActionCreators(startFetchProfileSocs, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);