import React from 'react';
import { useTranslation } from 'react-i18next';
import './CompanyInfo.css';

function CompanyInfo() {
  const { t } = useTranslation();

  return (
    <section id="about" className="about-section">
      <span className="section-eyebrow">{t('companyInfo.eyebrow')}</span>
      <hr className="hr" />
      <div className="about-grid">

        <div className="blueprint about-card">
          <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="about-card-icon"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle><line x1="12" y1="2" x2="12" y2="4.5"></line><line x1="12" y1="19.5" x2="12" y2="22"></line><line x1="2" y1="12" x2="4.5" y2="12"></line><line x1="19.5" y1="12" x2="22" y2="12"></line></svg>
          <h3>{t('companyInfo.mission.title')}</h3>
          <p>{t('companyInfo.mission.description')}</p>
        </div>

        <div className="blueprint about-card">
          <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="about-card-icon"><circle cx="12" cy="12" r="3"></circle><path d="M6 12H3a9 9 0 0 0 9 9"></path><path d="M6 12H3a9 9 0 0 1 9-9"></path><path d="M12 21v-3"></path><path d="M18.364 17.364l-2.122-2.122"></path><path d="M21 12h-3"></path><path d="M18.364 6.636l-2.122 2.122"></path><path d="M12 3v3"></path><path d="M5.636 6.636l2.122 2.122"></path><path d="M3 12h3"></path><path d="M5.636 17.364l2.122-2.122"></path></svg>
          <h3>{t('companyInfo.vision.title')}</h3>
          <p>{t('companyInfo.vision.description')}</p>
        </div>

        <div className="blueprint about-card">
          <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="about-card-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
          <h3>{t('companyInfo.qualityPolicy.title')}</h3>
          <p>{t('companyInfo.qualityPolicy.description')}</p>
        </div>

      </div>
    </section>
  );
}

export default CompanyInfo;
