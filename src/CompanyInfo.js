import React from 'react';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
import './CompanyInfo.css';

// Importa las imágenes
import image1 from './images/mano.png';
import image2 from './images/vision.png';
import image3 from './images/liderazgo.png';

function CompanyInfo() {
  const { t } = useTranslation(); // Usar el hook useTranslation

  return (
    <div className="company-info" id="about">
      <div className="column">
        <img src={image1} alt="mano" className='Icon' />
        <h3>{t('companyInfo.mission.title')}</h3>
        <p>{t('companyInfo.mission.description')}</p>
      </div>
      <div className="column">
        <img src={image2} alt="vision" className='Icon' />
        <h3>{t('companyInfo.vision.title')}</h3>
        <p>{t('companyInfo.vision.description')}</p>
      </div>
      <div className="column">
        <img src={image3} alt="liderazgo" className='Icon' />
        <h3>{t('companyInfo.qualityPolicy.title')}</h3>
        <p>{t('companyInfo.qualityPolicy.description')}</p>
      </div>
    </div>
  );
}

export default CompanyInfo;