import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
import logo from './logo.ico'; // Asegúrate de que la ruta sea correcta
import './Header.css';

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { t, i18n } = useTranslation(); // Usar el hook useTranslation

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Función para cambiar el idioma
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <header className="App-header">
      <button className="menu-toggle" onClick={toggleMenu}><i className="fas fa-bars"></i></button>
      <img src={logo} className="Header-logo" alt="logo" />      
      <nav className={`menu ${menuVisible ? 'visible' : ''}`}>
        <ul className='list'>
          <li><Link to="/">{t('header.home')}</Link></li>          
          <li><a href="#about">{t('header.about')}</a></li>
          <li><a href="#services">{t('header.services')}</a></li>
          <li><a href="#contact">{t('header.contact')}</a></li>
          <li><Link to="/gallery">{t('header.gallery')}</Link></li>
        </ul>
      </nav>

      {/* Combobox para cambiar el idioma */}
      <div style={{ marginLeft: 'auto', padding: '0 20px' }}>
        <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
    </header>
  );
}

export default Header;