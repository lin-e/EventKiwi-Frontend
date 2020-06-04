import React, { useState, MouseEvent } from 'react';
import { IonLabel, IonSearchbar, IonButton, IonToast, IonTitle, IonContent, IonList } from '@ionic/react';
import { RootState } from '../../data/reducers';
import { fetchSearchInterests, addProfileInterest } from '../../data/actions/actions'
import { ConnectedProps, connect } from 'react-redux';
import './AddInterestModal.css'
import InterestItem from './InterestItem';

const mapStateToProps = (state: RootState) => {
  return {
    searchResults: state.interestSearch.interests,
    interests: state.profileDetails.profileDetails.interests,
    userToken: state.userDetails.userToken
  }
}

const connector = connect(
  mapStateToProps,
  { fetchSearchInterests, addProfileInterest }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type AddInterestModalProps = PropsFromRedux

const AddInterestModal: React.FC<AddInterestModalProps> = ({ searchResults, interests, userToken, fetchSearchInterests, addProfileInterest }) => {
  const [searchTerm, setsearchTerm] = useState("");
  
  const searchBarUpdate = (e: CustomEvent) => {
    setsearchTerm(e.detail.value!.toLowerCase());
    fetchSearchInterests(searchTerm, userToken);
  }

  const addInterest = (e: MouseEvent) => {
    e.preventDefault();

    console.log("add func");
    addProfileInterest(searchTerm, userToken)
  }
  
  return (
    <IonContent>
      <div className="modalContainer">
        <h3 className="subtitle">Find an interest</h3>
        <IonSearchbar placeholder="e.g. hockey, finance, dance" onIonChange={searchBarUpdate} />
        <IonList>
          {searchTerm !== "" && searchResults.filter(intr => (intr.name === searchTerm)).length === 0 &&
            <InterestItem interest={{
                name: searchTerm,
                numInterested: 0,
                interested: interests.includes(searchTerm)
              }}
            />
          }
          {searchResults.map(interest => (
            <InterestItem interest={interest} key={interest.name} />
          ))}
        </IonList>
        <IonButton onClick={addInterest}>Add {searchTerm}</IonButton>
      </div>
    </IonContent>
  );
}

export default connector(AddInterestModal);
