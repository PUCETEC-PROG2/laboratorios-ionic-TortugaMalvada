import './RepoItem.css';
import React from 'react';
import { IonItemSliding, IonItem, IonThumbnail, IonLabel, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';

const RepoItem: React.FC<any> = ({ ...repository }) => {
    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot="start">
                <img src={repository.avatarUrl} alt="Avatar"/>
                </IonThumbnail>
                <IonLabel>
                <h2>{repository.name}</h2>
                <p>{repository.description}</p>
                <p><strong>Lenguaje:</strong> {repository.language}</p>
                </IonLabel>
            </IonItem>
            <IonItemOptions>
                <IonItemOption>
                <IonIcon icon={pencil} slot="icon-only" />
                </IonItemOption>
                <IonItemOption color="danger">
                <IonIcon icon={trash} slot="icon-only" />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
}

export default RepoItem;