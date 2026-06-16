import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';

import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repsitorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container"> 
          <IonInput
            className='form-field'
            label='Nombre del repositorio'
            placeholder='Ingrese el nombre del repositorio'
            labelPlacement='floating'
          /> 

          <IonTextarea
            className='form-field'
            label='Descripcion'
            placeholder='Ingrese la descripcion del repositorio'
            labelPlacement='floating'
            rows={4}
          />
          <IonButton
            className='from_field'
            expand='block'
            fill='solid'
          >
            Guardar 
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
