import React from 'react';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
import './OurClients.css'; // Cambia el nombre del archivo CSS

// Importa las imágenes
import image1 from './images/client1.png';
import image2 from './images/client2.png';
import image3 from './images/client3.png';
import image4 from './images/cliente4.png';

const OurClients = () => {
  const { t } = useTranslation(); // Usar el hook useTranslation

  return (
    <main className='clients-main'>
      <h2 className="clients-title">{t('ourClients.title')}</h2>
      <div className="card-client">
        <img src={image1} alt="Cliente 1" />                
      </div>

      <div className="card-client">
        <img src={image2} alt="Cliente 2" />                
      </div>

      <div className="card-client">
        <img src={image3} alt="Cliente 3" />                
      </div>

      <div className="card-client">
        <img src={image4} alt="Cliente 4" />                
      </div>
    </main>
  );
};

export default OurClients;