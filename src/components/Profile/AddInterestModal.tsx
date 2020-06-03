import React, { useState, MouseEvent } from 'react';
import { IonLabel, IonSearchbar, IonButton, IonToast } from '@ionic/react';
import { RootState } from '../../data/reducers';
import { addProfileInterest } from '../../data/actions/actions'
import { ConnectedProps, connect } from 'react-redux';

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
    <div>
      <IonLabel position="stacked">Find an interest</IonLabel>
      <IonSearchbar placeholder="e.g. hockey, finance, dance" onIonChange={searchBarUpdate} />
      <IonButton onClick={addInterest}>Add {searchTerm}</IonButton>
    </div>
  );
}

export default connector(AddInterestModal);
