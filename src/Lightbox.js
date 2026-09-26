import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./Lightbox.css";

function Lightbox({ images, index, alt = "", onClose, onStep }) {
  const { t } = useTranslation();
  const open = index !== null && index !== undefined;
  const handlers = useRef({});
  handlers.current = { onClose, onStep };

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") handlers.current.onClose();
      else if (e.key === "ArrowLeft") handlers.current.onStep(-1);
      else if (e.key === "ArrowRight") handlers.current.onStep(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const multiple = images.length > 1;

  return (
    <div
      className={`lightbox${open ? " lightbox-open" : ""}`}
      aria-hidden={open ? "false" : "true"}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button className="lightbox-close" type="button" aria-label={t("gallery.close")} onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      {multiple && (
        <button className="lightbox-nav lightbox-prev" type="button" aria-label={t("gallery.prev")} onClick={() => onStep(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
      )}
      {open && <img className="lightbox-img" src={images[index]} alt={alt} />}
      {multiple && (
        <button className="lightbox-nav lightbox-next" type="button" aria-label={t("gallery.next")} onClick={() => onStep(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      )}
    </div>
  );
}

export default Lightbox;
