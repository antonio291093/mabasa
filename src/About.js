import React from 'react';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
import './About.css';

function About() {
  const { t } = useTranslation(); // Usar el hook useTranslation

  return (
    <div className="About" id="home">      
      <h2>{t('about.title')}</h2>
      <p>
        {t('about.description')}
      </p>      
    </div>
  );
}

export default About;