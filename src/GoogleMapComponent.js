import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'; // Importar useTranslation
import { Loader } from "@googlemaps/js-api-loader";
import "./GoogleMapComponent.css";

import image1 from './images/whatsapp.png';
import image2 from './images/email.png';
import image3 from './images/ubicacion.png';

const GoogleMapComponent = () => {
  const { t } = useTranslation(); // Usar el hook useTranslation
  const mapRef = useRef(null);

  useEffect(() => {
    const additionalOptions = {};
    const loader = new Loader({
      apiKey: "AIzaSyBiNtks7ib7j8JJ6kbfJssL26h8-9vj0N0",
      version: "weekly",
      ...additionalOptions,
    });

    loader.load().then(() => {
      if (window.google) {
        const { Map, Marker } = window.google.maps;

        const map = new Map(mapRef.current, {
            center: { lat: 25.4176025390625, lng: -100.95687103271484 },
            zoom: 15,
          });

        new Marker({
            position: { lat: 25.4176025390625, lng: -100.95687103271484 },
            map: map,
            title: "MABASA",
          });
      }
    });
  }, []);

  return (    
    <div className="map-container" id="contact">
      <h2 className="map-title">{t('googleMap.contactTitle')}</h2>
      <p className="map-text">{t('googleMap.openingHours')}</p>

      <div className="map-details">      
        <div className="card-details">
          <img src={image3} alt="Ubicacion" className='Icon' />
          <h3>{t('googleMap.addressTitle')}</h3>
          <p>{t('googleMap.address')}</p>
        </div>

        <div className="card-details">
          <img src={image2} alt="Correo" className='Icon'/>
          <h3>{t('googleMap.emailTitle')}</h3>
          <p><a href="mailto:Ventas@grupo-maba.com">Ventas@grupo-maba.com</a></p>
        </div>

        <div className="card-details">
          <img src={image1} alt="Whatsapp" className='Icon'/>
          <h3>{t('googleMap.phoneTitle')}</h3>
          <p><a href="https://wa.me/528441897740" target="_blank" rel="noopener noreferrer">+52 844-189-7740</a></p>
        </div>
      </div>

      <div ref={mapRef} className="map" />
    </div>
  );
}

export default GoogleMapComponent;