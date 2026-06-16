import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil del Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='card-container'>
          <IonCard className='card'>
            <img
            src="https://avatars.githubusercontent.com/u/216222375?s=96&v=4"
            alt="Foto de Perfil"
            />
            <IonCardHeader>
              <IonCardTitle>Jhoan Alvarez</IonCardTitle>
              <IonCardSubtitle>TortugaMalvada</IonCardSubtitle>
            </IonCardHeader>        
            <IonCardContent>
              <p>Desarrollador Web</p>
              <p>Estudiante</p>
            </IonCardContent>  
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
