import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonAlert,
  IonModal,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea
} from "@ionic/react";

import "./Tab1.css";
import { fetchRepositories, deleteRepository, updateRepository } from "../services/GithunSevices";
import type { Repository } from "../interfaces/Repository";
import LoginSpinner from "../components/LoginSpinner";
import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Controladores de Alertas de Ionic
  const [presentAlert] = useIonAlert();

  // Estados para el Modal de Edición
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

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

  // --- Lógica para Eliminar ---
  const handleDeleteTrigger = (repo: Repository) => {
    presentAlert({
      header: '¿Eliminar repositorio?',
      message: `Esta acción eliminará de forma permanente ${repo.name}.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            setLoading(true);
            try {
              await deleteRepository(repo.owner.login, repo.name);
              // Filtrar el estado local para removerlo visualmente sin recargar todo de la API
              setRepositoryList(prev => prev.filter(r => r.id !== repo.id));
            } catch (err) {
              presentAlert({
                header: 'Error',
                message: (err as Error).message,
                buttons: ['OK']
              });
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    });
  };

  // --- Lógica para Abrir Modal de Edición ---
  const handleEditTrigger = (repo: Repository) => {
    setSelectedRepo(repo);
    setEditName(repo.name);
    setEditDescription(repo.description || "");
    setShowModal(true);
  };

  // --- Guardar Edición ---
  const handleSaveChanges = async () => {
    if (!selectedRepo || !editName.trim()) return;

    setLoading(true);
    setShowModal(false);
    try {
      const updatedData = await updateRepository(selectedRepo.owner.login, selectedRepo.name, {
        name: editName,
        description: editDescription
      });

      // Actualizar la lista en el estado local en vez de hacer otro fetch masivo
      setRepositoryList(prev => prev.map(r => r.id === selectedRepo.id ? { 
        ...r, 
        name: updatedData.name, 
        description: updatedData.description 
      } : r));

    } catch (err) {
      presentAlert({
        header: 'Error al actualizar',
        message: (err as Error).message,
        buttons: ['OK']
      });
    } finally {
      setLoading(false);
    }
  };

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
              <RepoItem 
                key={repo.id} 
                repo={repo} 
                onEdit={handleEditTrigger} 
                onDelete={handleDeleteTrigger} 
              />
            ))}
          </IonList>
        )}

        {/* MODAL DE EDICIÓN NATIVO DE IONIC */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Repositorio</IonTitle>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowModal(false)}>Cancelar</IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={handleSaveChanges}>Guardar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem fill="solid" className="ion-margin-bottom">
              <IonLabel position="stacked">Nombre del repositorio</IonLabel>
              <IonInput 
                value={editName} 
                onIonInput={(e) => setEditName(e.detail.value!)} 
                type="text" 
                placeholder="Nombre"
              />
            </IonItem>

            <IonItem fill="solid">
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea 
                value={editDescription} 
                onIonInput={(e) => setEditDescription(e.detail.value!)} 
                placeholder="Escribe una descripción..."
                rows={4}
              />
            </IonItem>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;