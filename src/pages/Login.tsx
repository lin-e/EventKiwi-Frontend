import React, { Component, createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRefresher, IonRefresherContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput, IonButton, IonList, IonItem, IonLabel, IonRow, IonCol, IonGrid } from '@ionic/react';
import './Discover.css';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../data/reducers';
import { Redirect } from 'react-router';
import { Container } from 'react-grid-system';



const mapStateToProps = (state: RootState) => ({
   loggedIn: state.userDetails.isLoggedIn
});

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type LoginProps = PropsFromRedux;


class Login extends Component<LoginProps> {

   constructor(props: LoginProps) {
      super(props)
   }

   render() {

      if (this.props.loggedIn) {
         return <Redirect to="/events" />
      }


      return (
         <IonPage>
            <IonHeader>
               <IonToolbar>
                  <IonTitle>Imperial Events</IonTitle>
               </IonToolbar>
            </IonHeader>
            <IonContent>
               <IonHeader collapse="condense">
                  <IonToolbar>
                     <IonTitle size="large">Imperial Events</IonTitle>
                  </IonToolbar>
               </IonHeader>

               <IonGrid>
                  <IonRow>
                     <IonCol sizeSm="12" sizeMd="10" pushMd="1" sizeLg="8" pushLg="2">
                        <IonCard>
                           <IonCardContent>
                              <IonCardTitle>Login</IonCardTitle>
                              
                              <form noValidate >
                                 <IonList>
                                    <IonItem>
                                       <IonLabel position="floating" color="primary">Username</IonLabel>
                                       <IonInput name="username" type="text" spellCheck={false} autocapitalize="off" required>
                                       </IonInput>
                                    </IonItem>

                                    {/* {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>} */}

                                    <IonItem>
                                       <IonLabel position="floating" color="primary">Password</IonLabel>
                                       <IonInput name="password" type="password"  >
                                       </IonInput>
                                    </IonItem>

                                    {/* {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>} */}
                                 </IonList>
                                 <br />
                                 <IonRow>
                                    <IonCol>
                                       <IonButton type="submit" expand="block">Login</IonButton>
                                    </IonCol>
                                 </IonRow>
                              </form>
                           </IonCardContent>
                        </IonCard>
                     </IonCol>
                  </IonRow>
               </IonGrid>

            </IonContent>
         </IonPage>
      );
   }
}

export default connector(Login);