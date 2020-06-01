import React, { useState } from 'react';
import { IonCardHeader, IonCard, IonGrid, IonCol, IonThumbnail, IonIcon, IonRow, IonLabel, IonItem, IonButton } from '@ionic/react';
import { Row, Col } from 'react-grid-system';
import "./ExploreSocietyItem.css"

const societyName = "Imperial College Department of Computing Society"

const numFollowers = 1024

interface ExploreSocietyItemProps {
  societyName: string,
  numFollowers: number,
  imgSrc: string,
  following: boolean
}

const ExploreSocietyItem: React.FC<ExploreSocietyItemProps> = ({societyName, numFollowers, imgSrc, following}) => {

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
                  <IonButton className="followBtn" fill="outline">Unfollow</IonButton> :
                  <IonButton className="followBtn">Follow</IonButton>
                }
              </Col>
            </Row>             
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}

export default ExploreSocietyItem;
