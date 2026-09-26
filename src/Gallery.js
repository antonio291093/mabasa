import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Lightbox from "./Lightbox";
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

  const closeLB = () => setLbIndex(null);
  const stepLB = (dir) => setLbIndex((cur) => (cur + dir + TOTAL) % TOTAL);

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

      <Lightbox images={IMAGES} index={lbIndex} onClose={closeLB} onStep={stepLB} />
    </div>
  );
}

export default Gallery;
