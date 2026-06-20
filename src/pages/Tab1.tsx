import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';

import './Tab1.css';
import RepoItem from '../components/RepoItem';

import { Repository } from '../interfaces/Repository';
import { fetchRepositories } from '../services/GithunSevices';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);

  const fetchRepos = async () => {
    try {
      const repos = await fetchRepositories();
      setRepositoryList(repos);
    } catch (error) {
      console.error('Error obteniendo repositorios:', error);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repositoryList.map((repo) => (
            <RepoItem key={repo.name} {...repo} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;