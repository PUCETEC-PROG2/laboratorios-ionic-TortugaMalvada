import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';

import './Tab3.css';
import type { GithubUser } from '../interfaces/GithubUser';
import { fetchUserInfo } from '../services/GithunSevices';
import LoginSpinner from '../components/LoginSpinner';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useIonViewWillEnter(() => {
    setLoading(true);
    fetchUserInfo()
      .then((user) => {
        setUserInfo(user);
      })
      .catch((error) => {
        setErrorMsg("Error obteniendo información del usuario: " + (error as Error).message);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <LoginSpinner />
        ) : errorMsg ? (
          <p style={{ color: "red", padding: "1rem" }}>{errorMsg}</p>
        ) : (
          <div className="card-container">
            <IonCard className="card">
              <img src={userInfo?.avatar_url} alt={userInfo?.name} />
              <IonCardHeader>
                <IonCardTitle>{userInfo?.name}</IonCardTitle>
                <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{userInfo?.bio}</p>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;