import React, { MouseEvent } from 'react';
import { IonGrid, IonCol, IonItem, IonRow, IonLabel, IonButton } from '@ionic/react';

interface InterestItemProps {
  interest: string,
  numInterested: number,
  interested: boolean
}

const InterestItem: React.FC<InterestItemProps> = ({interest, numInterested, interested}) => {
  const toggleInterest = (e: MouseEvent) => {
    e.preventDefault();
  }
  
  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol size="8">
            <IonLabel>
              <h5>{interest}</h5>
              <p>{`${numInterested} other ${numInterested === 1 ? "person" : "people"} interested`}</p>
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

export default InterestItem;
