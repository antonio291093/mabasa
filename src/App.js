import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import About from './About';
import Header from './Header';
import SliderHead from './SliderHead';
import CompanyInfo from './CompanyInfo';
import Services from './Services';
import OurClients from './OurClients';
import GoogleMapComponent from './GoogleMapComponent';
import Gallery from './ImageGallery'; // Importa tu componente de galería
import './i18n/i18n'; // Importar la configuración de i18next

function App() {
  return (
    <Router basename="/mabasa">
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={
            <main>
              <About />
              <SliderHead />
              <CompanyInfo />
              <Services />
              <OurClients />
              <GoogleMapComponent />
            </main>
          } />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;