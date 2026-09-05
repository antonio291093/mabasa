import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Gallery.css";

import slider1 from "./images/slider1.jpg";
import slider2 from "./images/slider2.jpg";
import slider3 from "./images/slider3.jpg";
import slider4 from "./images/slider4.jpg";
import slider5 from "./images/slider5.jpg";
import slider6 from "./images/slider6.jpg";
import slider7 from "./images/slider7.jpg";
import servicio7 from "./images/servicio7.jpg";
import servicio8 from "./images/servicio8.jpg";
import servicio9 from "./images/servicio9.jpg";
import servicio10 from "./images/servicio10.jpg";
import img4 from "./images/img4.jpg";
import img7 from "./images/img7.jpg";
import img11 from "./images/img11.jpg";

const IMAGES = [
  slider1, slider4, slider5, slider2, slider3, slider6,
  servicio7, servicio8, servicio9, servicio10,
  img4, img7, img11, slider7,
];

const TOTAL = IMAGES.length;

function Gallery() {
  const { t } = useTranslation();
  const [lbIndex, setLbIndex] = useState(null);
  const open = lbIndex !== null;

  const closeLB = () => setLbIndex(null);
  const stepLB = (dir) => setLbIndex((cur) => (cur + dir + TOTAL) % TOTAL);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") closeLB();
      else if (e.key === "ArrowLeft") stepLB(-1);
      else if (e.key === "ArrowRight") stepLB(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="gallery-page">
      <section className="gallery-section">
        <h1 className="gallery-title">{t("gallery.title")}</h1>
        <hr className="hr" />

        <div className="gallery-grid">
          {IMAGES.map((src, i) => (
            <button
              type="button"
              className="gallery-item"
              key={i}
              onClick={() => setLbIndex(i)}
              aria-label={`${t("gallery.imageLabel")} ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      <div
        className={`gallery-lb${open ? " gallery-lb-open" : ""}`}
        aria-hidden={open ? "false" : "true"}
        onClick={(e) => { if (e.target === e.currentTarget) closeLB(); }}
      >
        <button className="gallery-lb-close" type="button" aria-label={t("gallery.close")} onClick={closeLB}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <button className="gallery-lb-nav gallery-lb-prev" type="button" aria-label={t("gallery.prev")} onClick={() => stepLB(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        {open && <img className="gallery-lb-img" src={IMAGES[lbIndex]} alt="" />}
        <button className="gallery-lb-nav gallery-lb-next" type="button" aria-label={t("gallery.next")} onClick={() => stepLB(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}

export default Gallery;
