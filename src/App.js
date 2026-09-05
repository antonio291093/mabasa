import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Header from "./Header";
import Hero from "./Hero";
import CompanyInfo from "./CompanyInfo";
import Services from "./Services";
import OurClients from "./OurClients";
import GoogleMapComponent from "./GoogleMapComponent";
import Gallery from "./Gallery";
import "./i18n/i18n"; // Importar la configuración de i18next

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <main>
                <Hero />
                <CompanyInfo />
                <Services />
                <OurClients />
                <GoogleMapComponent />
              </main>
            }
          />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
