import React from 'react';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
import './Services.css';

// Importa las imágenes
import image1 from './images/servicio1.png';
import image2 from './images/servicio2.png';
import image3 from './images/servicio3.png';
import image4 from './images/servicio4.png';
import image5 from './images/servicio5.png';
import image6 from './images/servicio6.png';
import image7 from './images/servicio7.jpg';
import image8 from './images/servicio8.jpg';
import image9 from './images/servicio9.jpg';

function Services() {
  const { t } = useTranslation(); // Usar el hook useTranslation

  return (    
    <div className='services-main' id="services">
        <h2 className="services-title">{t('services.title')}</h2>
        
        <div className="card">
            <img src={image7} alt="Servicio Siete" />
            <div className="card-content">
                <h3>{t('services.service1.title')}</h3>
                <ul>
                    <li>{t('services.service1.item1')}</li>                    
                    <li>{t('services.service1.item2')}</li>                    
                </ul>           
            </div>
        </div>

        <div className="card">
            <img src={image9} alt="Servicio Nueve" />
            <div className="card-content">
                <h3>{t('services.service2.title')}</h3>
                <ul>
                    <li>{t('services.service2.item1')}</li>                    
                </ul>           
            </div>
        </div>

        <div className="card">
            <img src={image8} alt="Servicio Ocho" />
            <div className="card-content">
                <h3>{t('services.service3.title')}</h3>     
                <ul>
                    <li>{t('services.service3.item1')}</li>                    
                </ul>             
            </div>
        </div>

        <div className="card">
            <img src={image1} alt="Servicio Uno" />
            <div className="card-content">
                <h3>{t('services.service4.title')}</h3>
                <ul>
                    <li>{t('services.service4.item1')}</li>                    
                </ul>           
            </div>
        </div>

        <div className="card">
            <img src={image2} alt="Servicio Dos" />
            <div className="card-content">
                <h3>{t('services.service5.title')}</h3>
                <ul>
                    <li>{t('services.service5.item1')}</li>
                    <li>{t('services.service5.item2')}</li>
                    <li>{t('services.service5.item3')}</li>                    
                </ul>           
            </div>
        </div>

        <div className="card">
            <img src={image3} alt="Servicio Tres" />
            <div className="card-content">
                <h3>{t('services.service6.title')}</h3>
                <ul>
                    <li>{t('services.service6.item1')}</li>
                    <li>{t('services.service6.item2')}</li>
                    <li>{t('services.service6.item3')}</li>                    
                </ul>           
            </div>
        </div>

        <div className="card">
            <img src={image4} alt="Servicio Cuatro" />
            <div className="card-content">
                <h3>{t('services.service7.title')}</h3>
                <ul>
                    <li>{t('services.service7.item1')}</li>                
                </ul>            
            </div>
        </div>

        <div className="card">
            <img src={image5} alt="Servicio Cinco" />
            <div className="card-content">
                <h3>{t('services.service8.title')}</h3>
                <ul>
                    <li>{t('services.service8.item1')}</li>
                    <li>{t('services.service8.item2')}</li>                
                </ul>            
            </div>
        </div>

        <div className="card">
            <img src={image6} alt="Servicio Seis" />
            <div className="card-content">
                <h3>{t('services.service9.title')}</h3>
                <ul>
                    <li>{t('services.service9.item1')}</li>                
                    <li>{t('services.service9.item2')}</li>                
                </ul>            
            </div>
        </div>
    </div>
  );
}

export default Services;