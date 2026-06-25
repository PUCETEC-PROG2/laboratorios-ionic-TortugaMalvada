import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import "./Tab1.css";
import { pencil, trash } from "ionicons/icons";
import { fetchRepositories } from "../services/GithunSevices";
import type { Repository } from "../interfaces/Repository";
import LoginSpinner from "../components/LoginSpinner";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchRepos = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const repos = await fetchRepositories();
      setRepositoryList(repos);
    } catch (error) {
      console.error("Error obteniendo repositorios", error);
      setErrorMsg("Error obteniendo repositorios: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className='ion-padding'>
        {loading ? (
          <LoginSpinner />
        ) : errorMsg ? (
          <p style={{ color: "red", padding: "1rem" }}>{errorMsg}</p>
        ) : (
          <IonList>
            {repositoryList.map((repo) => (
              <IonItemSliding key={repo.id}>
                <IonItem>
                  <IonThumbnail slot="start">
                    <img src={repo.owner.avatar_url} alt="Avatar" />
                  </IonThumbnail>

                  <IonLabel>
                    <h2>{repo.name}</h2>
                    <p>{repo.description}</p>
                    <p>
                      <strong>Lenguaje:</strong> {repo.language}
                    </p>
                  </IonLabel>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption>
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonItemOption>

                  <IonItemOption color="danger">
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;