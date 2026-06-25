import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Tab2.css';
import type { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository } from '../services/GithunSevices';
import LoginSpinner from '../components/LoginSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const saveRepository = async () => {
    if (repositoryData.name.trim() === '') {
      setErrorMsg('El nombre del repositorio es requerido');
      return;
    }
    setLoading(true);
    createRepository(repositoryData)
      .then(() => {
        history.push('/tab1');
      })
      .catch((error) => {
        setErrorMsg("Error creando repositorio: " + (error as Error).message);
        console.error("Error creando repositorio", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useIonViewWillEnter(() => {
    setRepositoryData({ name: '', description: '' });
    setErrorMsg('');
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            placeholder="Ingrese el nombre del repositorio"
            labelPlacement="floating"
            value={repositoryData.name}
            onIonChange={(e) => setRepositoryData({ ...repositoryData, name: e.detail.value! })}
          />
          <IonTextarea
            className="form-field"
            label="Descripción del repositorio"
            placeholder="Ingrese una descripción para el repositorio"
            labelPlacement="floating"
            value={repositoryData.description}
            onIonChange={(e) => setRepositoryData({ ...repositoryData, description: e.detail.value! })}
            rows={4}
          />
          {errorMsg && <IonText color="danger">{errorMsg}</IonText>}

          <IonButton
            className="submit-button"
            expand="block"
            fill="solid"
            onClick={saveRepository}
          >
            Guardar
          </IonButton>
        </div>

        {loading && <LoginSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;