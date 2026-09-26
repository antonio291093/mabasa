import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Lightbox from "./Lightbox";
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
import print3d1 from "./images/impresion3d-1.jpg";
import print3d2 from "./images/impresion3d-2.jpg";
import print3d3 from "./images/impresion3d-3.jpg";
import hidraulica1 from "./images/estacion-hidraulica.jpg";
import neumatica1 from "./images/estaciones-neumaticas-1.jpg";
import neumatica2 from "./images/estaciones-neumaticas-2.jpg";
import maquinados2 from "./images/maquinados-2.jpg";
import racks1 from "./images/racks-1.jpg";
import retrofit1 from "./images/retrofit-estaciones.jpg";

/* `extras`: fotos adicionales que aparecen al expandir el servicio. */
const SERVICES = [
  { key: "service1", image: image7, extras: [hidraulica1] },
  { key: "service2", image: image9, extras: [] },
  { key: "service3", image: image8, extras: [neumatica1, neumatica2] },
  { key: "service4", image: image1, extras: [] },
  { key: "service5", image: image2, extras: [racks1] },
  { key: "service6", image: image3, extras: [maquinados2] },
  { key: "service7", image: image4, extras: [] },
  { key: "service8", image: image5, extras: [] },
  { key: "service9", image: image6, extras: [] },
  { key: "service10", image: image10, extras: [print3d1, print3d2, print3d3] },
  { key: "service11", image: retrofit1, extras: [] },
];

function Services() {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = useState(null);
  const [lb, setLb] = useState(null); // { key, index }

  const lbService = lb ? SERVICES.find((s) => s.key === lb.key) : null;
  const lbImages = lbService ? [lbService.image, ...lbService.extras] : [];

  const stepLB = (dir) =>
    setLb((cur) => {
      const len = 1 + SERVICES.find((s) => s.key === cur.key).extras.length;
      return { ...cur, index: (cur.index + dir + len) % len };
    });

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

        {SERVICES.map((svc, i) => {
          const title = t(`services.${svc.key}.title`);
          const expandable = svc.extras.length > 0;
          const isOpen = openKey === svc.key;
          return (
            <div className="svc-row" key={svc.key}>
              <span className="svc-index">{String(i + 1).padStart(2, "0")}</span>
              <button
                type="button"
                className="duotone svc-thumb"
                onClick={() => setLb({ key: svc.key, index: 0 })}
                aria-label={`${t("services.viewLarge")}: ${title}`}
              >
                <img src={svc.image} alt={title} loading="lazy" />
              </button>
              <div className="svc-body">
                <h3>{title}</h3>
                <p>{t(`services.${svc.key}.description`)}</p>
                {expandable && (
                  <button
                    type="button"
                    className="svc-toggle"
                    aria-expanded={isOpen}
                    onClick={() => setOpenKey(isOpen ? null : svc.key)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                    {isOpen ? t("services.hidePhotos") : t("services.viewPhotos")}
                  </button>
                )}
              </div>
              <span className="tag tag-accent svc-tag">{t(`services.${svc.key}.tag`)}</span>

              {expandable && isOpen && (
                <div className="svc-gallery">
                  {svc.extras.map((src, n) => (
                    <button
                      type="button"
                      className="svc-photo"
                      key={src}
                      onClick={() => setLb({ key: svc.key, index: n + 1 })}
                      aria-label={`${t("services.viewLarge")}: ${title} ${n + 1}`}
                    >
                      <img src={src} alt={`${title} ${n + 1}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Lightbox
        images={lbImages}
        index={lb ? lb.index : null}
        alt={lbService ? t(`services.${lbService.key}.title`) : ""}
        onClose={() => setLb(null)}
        onStep={stepLB}
      />
    </section>
  );
}

export default Services;
