import React, { useState, MouseEvent } from 'react';
import { IonLabel, IonSearchbar, IonButton, IonToast, IonTitle, IonContent, IonList } from '@ionic/react';
import { RootState } from '../../data/reducers';
import { addProfileInterest } from '../../data/actions/actions'
import { ConnectedProps, connect } from 'react-redux';
import './AddInterestModal.css'
import InterestItem from './InterestItem';

const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken
  }
}

const connector = connect(
  mapStateToProps,
  { addProfileInterest }
)

type PropsFromRedux = ConnectedProps<typeof connector>
type AddInterestModalProps = PropsFromRedux

const AddInterestModal: React.FC<AddInterestModalProps> = ({ userToken, addProfileInterest }) => {
  const [searchTerm, setsearchTerm] = useState("");
  
  const searchBarUpdate = (e: CustomEvent) => {
    setsearchTerm(e.detail.value!);
    // Eventually add ability to see existing interests and number of other people interested
    // search(searchTerm);
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
          <InterestItem interest={searchTerm} numInterested={0} interested={false}/>
        </IonList>
        <IonButton onClick={addInterest}>Add {searchTerm}</IonButton>
      </div>
    </IonContent>
  );
}

export default connector(AddInterestModal);
