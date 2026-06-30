import './RepoItem.css';
import React, { useRef } from 'react';
import {
  IonItemSliding,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonIcon
} from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import { Repository } from '../interfaces/Repository';

interface RepoItemProps {
  repo: Repository;
  onEdit: (repo: Repository) => void;
  onDelete: (repo: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onEdit, onDelete }) => {
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const handleEdit = () => {
    slidingRef.current?.close();
    onEdit(repo);
  };

  const handleDelete = () => {
    slidingRef.current?.close();
    onDelete(repo);
  };

  return (
    <IonItemSliding ref={slidingRef}>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={repo.owner.avatar_url} alt="Avatar" />
        </IonThumbnail>

        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description || "Sin descripción"}</p>
          {repo.language && <p><strong>Lenguaje:</strong> {repo.language}</p>}
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption onClick={handleEdit} color="primary">
          <IonIcon icon={pencil} slot="icon-only" />
        </IonItemOption>

        <IonItemOption color="danger" onClick={handleDelete}>
          <IonIcon icon={trash} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;