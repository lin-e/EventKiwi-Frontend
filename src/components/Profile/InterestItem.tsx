import React, { MouseEvent } from 'react';
import { IonGrid, IonCol, IonItem, IonRow, IonLabel, IonButton } from '@ionic/react';
import { InterestDetails } from '../../constants/types';

interface InterestItemProps {
  interest: InterestDetails
}

const InterestItem: React.FC<InterestItemProps> = ({ interest }) => {
  const toggleInterest = (e: MouseEvent) => {
    e.preventDefault();

    // TODO: ADD OR REMOVE INTEREST
  }
  
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol size="8">
            <IonLabel>
              <h5>{interest.name}</h5>
              <p>{`${interest.numInterested} other ${interest.numInterested === 1 ? "person" : "people"} interested`}</p>
            </IonLabel>
          </IonCol>
          <IonCol size="4">
            {interest.interested ?
              <IonButton color="danger" fill="outline" className="interestBtn" onClick={toggleInterest}>Remove</IonButton> :
              <IonButton color="primary" fill="solid" className="interestBtn" onClick={toggleInterest}>Add</IonButton>
            }
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}

export default InterestItem;
