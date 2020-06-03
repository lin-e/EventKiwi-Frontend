import React, { useState } from 'react';
import { IonCardHeader, IonCard, IonGrid, IonCol, IonThumbnail, IonIcon, IonRow, IonLabel, IonItem, IonButton } from '@ionic/react';
import { Row, Col } from 'react-grid-system';
import "./ExploreSocietyCard.css"

interface ExploreSocietyCardProps {
  societyName: string,
  numFollowers: number,
  imgSrc: string,
  following: boolean
}

const ExploreSocietyCard: React.FC<ExploreSocietyCardProps> = ({societyName, numFollowers, imgSrc, following}) => {

  const [isFollowing, setisFollowing] = useState(following);

  return (
    <IonItem className="socItem">
      <IonGrid>
        <IonRow>
          <IonCol size="3">
            <img src={imgSrc} className="socLogo"/>
          </IonCol>
          <IonCol size="9">
            <IonLabel className="ion-text-wrap">
              <h2>{societyName}</h2>
            </IonLabel>
            <Row>
              <Col xs={6} className="followerText">
                <IonLabel>
                  <p>{`${numFollowers} followers`}</p>
                </IonLabel>
              </Col>
              <Col xs={6}>
                {isFollowing ? 
                  <IonButton className="followBtn" fill="outline" onClick={() => setisFollowing(false)}>Following</IonButton> :
                  <IonButton className="followBtn" fill="solid" onClick={() => setisFollowing(true)}>Follow</IonButton>
                }
              </Col>
            </Row>             
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}

export default ExploreSocietyCard;
