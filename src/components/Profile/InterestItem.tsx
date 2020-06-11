import React, { MouseEvent, useState, useEffect } from 'react';
import { IonGrid, IonCol, IonItem, IonRow, IonLabel, IonButton } from '@ionic/react';
import { InterestDetails } from '../../constants/types';
import { addProfileInterest, removeProfileInterest } from '../../data/actions/actions';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../data/reducers';
import './InterestItem.css'

interface OwnProps {
  interest: InterestDetails,
}

const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken,
    interestList: state.profileDetails.profileDetails.interests
  }
}

const connector = connect(mapStateToProps, { addProfileInterest, removeProfileInterest })

type PropsFromRedux = ConnectedProps<typeof connector>
type InterestItemProps = OwnProps & PropsFromRedux

const InterestItem: React.FC<InterestItemProps> = ({ interest, interestList, userToken, addProfileInterest, removeProfileInterest }) => {
  const [interested, setInterested] = useState(interestList.includes(interest.name));
  
  const toggleInterest = (e: MouseEvent) => {
    e.preventDefault();

    if (interested) {
      removeProfileInterest(interest.name, userToken)
      setInterested(false);
    } else {
      addProfileInterest(interest.name, userToken)
      setInterested(true)
    }
  }

  useEffect(() => {
    setInterested(interestList.includes(interest.name))
  }, [interest]);
  
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol size="8">
            <IonLabel>
              <div className="interestName">{interest.name}</div>
              <p>{`${interest.numInterested} ${(interest.numInterested == 1) ? "person" : "people"} interested`}</p>
            </IonLabel>
          </IonCol>
          <IonCol size="4">
            {interested ?
              <IonButton color="danger" fill="outline" className="interestBtn" onClick={toggleInterest}>Remove</IonButton> :
              <IonButton color="primary" fill="solid" className="interestBtn" onClick={toggleInterest}>Add</IonButton>
            }
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}

export default connector(InterestItem);
