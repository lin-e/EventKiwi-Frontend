import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';

const Licences: React.FC = () => {
   return (
      <IonPage>
         <IonHeader>
            <IonToolbar>
               <IonButtons slot="start">
                  <IonBackButton text="" defaultHref="/profile" />
               </IonButtons>
               <IonTitle>Licences</IonTitle>
            </IonToolbar>
         </IonHeader>
         <IonContent>


         </IonContent>
      </IonPage>
   )
}

export default Licences;