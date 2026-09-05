import React from "react";
import { useTranslation } from "react-i18next";
import "./OurClients.css";

import image1 from "./images/client1.png";
import image2 from "./images/client2.png";
import image3 from "./images/client3.png";
import image4 from "./images/cliente4.png";
import image5 from "./images/cliente5.png";

const CLIENTS = [image1, image2, image3, image4, image5];

const OurClients = () => {
  const { t } = useTranslation();

  return (
    <section id="clients" className="clients-section">
      <span className="section-eyebrow">{t("ourClients.eyebrow")}</span>
      <hr className="hr" />
      <p className="clients-description">{t("ourClients.description")}</p>
      <div className="clients-grid">
        {CLIENTS.map((src, i) => (
          <div className="client-logo" key={i}>
            <img src={src} alt="Cliente" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurClients;
