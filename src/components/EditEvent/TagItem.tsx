import React, { MouseEvent, useState, useEffect } from 'react';
import { IonGrid, IonCol, IonItem, IonRow, IonLabel, IonButton } from '@ionic/react';
import { InterestDetails } from '../../constants/types';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../data/reducers';
import './TagItem.css'

interface OwnProps {
  tag: InterestDetails,
  currentTags: string[],
  addTag: (tag: string) => void,
  removeTag: (tag: string) => void 
}

const mapStateToProps = (state: RootState) => {
  return {
    userToken: state.userDetails.userToken,
    interestList: state.profileDetails.profileDetails.interests
  }
}

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type TagItemProps = OwnProps & PropsFromRedux

const TagItem: React.FC<TagItemProps> = ({ tag, currentTags,addTag, removeTag }) => {
  const [added, setAdded] = useState(currentTags.includes(tag.name));
  
  const toggleInterest = (e: MouseEvent) => {
    e.preventDefault();

    if (added) {
      removeTag(tag.name)
      setAdded(false);
    } else {
      addTag(tag.name)
      setAdded(true)
    }
  }
  
  useEffect(() => {
    setAdded(currentTags.includes(tag.name))
  }, [tag]);

  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonCol size="8">
            <IonLabel>
              <div className="tagName">{tag.name}</div>
              <p>{`${tag.numInterested} ${(tag.numInterested == 1) ? "person" : "people"} interested`}</p>
            </IonLabel>
          </IonCol>
          <IonCol size="4">
            {added ?
              <IonButton color="danger" fill="outline" className="interestBtn" onClick={toggleInterest}>Remove</IonButton> :
              <IonButton color="primary" fill="solid" className="interestBtn" onClick={toggleInterest}>Add</IonButton>
            }
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}

export default connector(TagItem);
