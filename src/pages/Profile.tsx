import React, { Component } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Profile.css';
import ItemSlider from '../components/ItemSlider';
import { Society } from '../models/Profile';
import ProfileSocietyIcon from '../components/ProfileSocietyIcon';
import { Container } from 'react-grid-system';

const docsoc: Society = {
  id: "400",
  name: "Department of Computing Society",
  colour: "#343deb",
  imageSrc: "https://d33wubrfki0l68.cloudfront.net/ae969c99f655993c0c12a272626abba129e3b112/adbf3/img/imperial-docsoc-logo.png"
}

const cgcu: Society = {
  id: "401",
  name: "City and Guilds Constituent Union",
  colour: "#eb3434",
  imageSrc: "https://cgcu.net/images/cgcu_logo_small.jpg"
}

const kabaddiSoc: Society = {
  id: "402",
  name: "Imperial College Kabaddi Society",
  colour: "#ef991d",
  imageSrc: "https://scontent.flhr3-1.fna.fbcdn.net/v/t31.0-8/23826038_2005579992991845_4230395114385005101_o.jpg?_nc_cat=103&_nc_sid=09cbfe&_nc_ohc=0Q3mlL5XiWIAX_X7Ru9&_nc_ht=scontent.flhr3-1.fna&oh=2e2650f3651f65416975e77426e5a8d4&oe=5EF3C272"
}

const algoSoc: Society = {
  id: "403",
  name: "Algorithmic Trading Society",
  colour: "#453493",
  imageSrc: "http://2019.algosoc.com/img/logo-white.png"
}

const icEsports: Society = {
  id: "404",
  name: "Imperial College eSports Society",
  colour: "#e4e5e7",
  imageSrc: "https://www.imperialcollegeunion.org/sites/default/files/styles/zurb_no_scaling/https/www.imperialcollegeunion.org/dbfile/cspiocid/1006"
}

const droneSoc: Society = {
  id: "405",
  name: "Imperial College Drone Society",
  colour: "#1c80bd",
  imageSrc: "https://scontent.flhr3-2.fna.fbcdn.net/v/t1.0-9/15747472_1354431714607138_6898790675257493102_n.png?_nc_cat=106&_nc_sid=09cbfe&_nc_ohc=3mQWgj3x5E8AX_66GyY&_nc_ht=scontent.flhr3-2.fna&oh=3c85f84eaa660f391fb5b56dacee02f5&oe=5EF6B1F5"
}

const sikhSoc: Society = {
  id: "406",
  name: "Imperial College Sikh Society",
  colour: "#e3a525",
  imageSrc: "https://www.imperialcollegeunion.org/sites/default/files/styles/zurb_no_scaling/https/www.imperialcollegeunion.org/dbfile/cspiocid/119"
}

const abacus: Society = {
  id: "407",
  name: "Imperial College London ABACUS",
  colour: "#141332",
  imageSrc: "https://scontent.flhr3-1.fna.fbcdn.net/v/t1.0-9/70762100_2342572989292758_2295947795405733888_n.jpg?_nc_cat=101&_nc_sid=09cbfe&_nc_ohc=05FTnABoGV4AX_SxKNd&_nc_ht=scontent.flhr3-1.fna&oh=1eb3f224affea64d2fddfcc9e64d44cf&oe=5EF42DB7"
}

const mySocs = [docsoc, cgcu, kabaddiSoc, algoSoc, icEsports, droneSoc, sikhSoc, abacus, docsoc, cgcu, kabaddiSoc, algoSoc, icEsports, droneSoc, sikhSoc, abacus];

class Profile extends Component {
  render() {
    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>  
        <Container>
          <IonGrid>
            <IonRow>
              <IonCol size="8">
                <IonTitle className="profileTitle">My Societies</IonTitle>
              </IonCol>
              <IonCol size="4">
                <IonButton  className="profileBtn">Edit</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="slider">
            <ItemSlider width={150}>
              {mySocs.map((soc) => (
                <ProfileSocietyIcon name={soc.id} logo={soc.imageSrc} />
              ))}
            </ItemSlider>
          </div>
        </Container>
      </IonContent>
    </IonPage>
    );
  }
}

export default Profile;