import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logofinal from './logo.png';
import './Header.css';

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setMenuVisible(false);
  };

  return (
    <header className="site-nav">
      <Link to="/" className="site-nav-brand" onClick={() => setMenuVisible(false)}>
        <img src={logofinal} className="site-nav-logo" alt="MABASA Group" />
      </Link>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
        <i className="fas fa-bars"></i>
      </button>

      <nav className={`site-nav-menu ${menuVisible ? 'visible' : ''}`}>
        <a href="#about" onClick={() => setMenuVisible(false)}>{t('header.about')}</a>
        <a href="#services" onClick={() => setMenuVisible(false)}>{t('header.services')}</a>
        <a href="#clients" onClick={() => setMenuVisible(false)}>{t('header.clients')}</a>
        <a href="#contact" onClick={() => setMenuVisible(false)}>{t('header.contact')}</a>
        <Link to="/gallery" onClick={() => setMenuVisible(false)}>{t('header.gallery')}</Link>

        <div className="seg lang-seg">
          <button
            type="button"
            className={`seg-opt ${i18n.language.startsWith('es') ? 'active' : ''}`}
            onClick={() => changeLanguage('es')}
          >ES</button>
          <button
            type="button"
            className={`seg-opt ${i18n.language.startsWith('en') ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >EN</button>
        </div>

        <a
          className="btn btn-primary site-nav-cta"
          href="mailto:Ventas@grupo-maba.com?subject=Cotizaci%C3%B3n%20de%20proyecto"
        >
          {t('header.quote')}
        </a>
      </nav>
    </header>
  );
}

export default Header;
