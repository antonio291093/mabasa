import React from "react";
import { useTranslation } from "react-i18next";
import "./Services.css";

import image1 from "./images/servicio1.png";
import image2 from "./images/servicio2.png";
import image3 from "./images/servicio3.png";
import image4 from "./images/servicio4.png";
import image5 from "./images/servicio5.png";
import image6 from "./images/servicio6.png";
import image7 from "./images/servicio7.jpg";
import image8 from "./images/servicio8.jpg";
import image9 from "./images/servicio9.jpg";
import image10 from "./images/servicio10.jpg";

const SERVICES = [
  { key: "service1", image: image7 },
  { key: "service2", image: image9 },
  { key: "service3", image: image8 },
  { key: "service4", image: image1 },
  { key: "service5", image: image2 },
  { key: "service6", image: image3 },
  { key: "service7", image: image4 },
  { key: "service8", image: image5 },
  { key: "service9", image: image6 },
  { key: "service10", image: image10 },
];

function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="services-section">
      <span className="section-eyebrow">{t("services.eyebrow")}</span>
      <hr className="hr" />

      <div className="blueprint services-sheet">
        <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>

        <header className="services-sheet-header">
          <span className="services-sheet-name">MABASA — {t("services.title")}</span>
          <span className="services-sheet-meta">MB-10</span>
          <span className="services-sheet-meta">Rev 2026</span>
        </header>

        {SERVICES.map((svc, i) => (
          <div className="svc-row" key={svc.key}>
            <span className="svc-index">{String(i + 1).padStart(2, "0")}</span>
            <figure className="duotone svc-thumb">
              <img src={svc.image} alt="" />
            </figure>
            <div className="svc-body">
              <h3>{t(`services.${svc.key}.title`)}</h3>
              <p>{t(`services.${svc.key}.description`)}</p>
            </div>
            <span className="tag tag-accent svc-tag">{t(`services.${svc.key}.tag`)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
