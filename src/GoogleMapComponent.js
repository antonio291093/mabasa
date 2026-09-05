import React from "react";
import { useTranslation } from "react-i18next";
import "./GoogleMapComponent.css";

const GoogleMapComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <section id="contact" className="contact-section">
        <span className="section-eyebrow">{t("googleMap.eyebrow")}</span>
        <hr className="hr" />
        <div className="contact-grid">
          <div>
            <h2 className="contact-title">{t("googleMap.heroTitle")}</h2>
            <p className="contact-description">{t("googleMap.heroDescription")}</p>
            <a
              className="btn btn-primary contact-cta"
              href="mailto:Ventas@grupo-maba.com?subject=Cotizaci%C3%B3n%20de%20proyecto"
            >
              {t("header.quote")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>

            <dl className="contact-details">
              <div className="contact-detail">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <div>
                  <dt>{t("googleMap.emailTitle")}</dt>
                  <dd><a href="mailto:Ventas@grupo-maba.com">Ventas@grupo-maba.com</a></dd>
                </div>
              </div>
              <div className="contact-detail">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <div>
                  <dt>{t("googleMap.hoursTitle")}</dt>
                  <dd>{t("googleMap.openingHours")}</dd>
                </div>
              </div>
              <div className="contact-detail">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <dt>{t("googleMap.addressTitle")}</dt>
                  <dd>{t("googleMap.address")}</dd>
                </div>
              </div>
            </dl>
          </div>

          <figure className="blueprint contact-map-card">
            <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
            <div className="duotone contact-map-frame">
              <iframe
                className="map"
                title="MABASA — Saltillo, Coahuila"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-100.9669%2C25.4106%2C-100.9469%2C25.4246&layer=mapnik&marker=25.4176%2C-100.9569"
                loading="lazy"
              />
            </div>
            <figcaption className="contact-map-caption">
              <span>Saltillo, Coahuila · MX</span>
              <span>25.4176 N · 100.9569 W</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 MABASA Group · Saltillo, Coahuila, México</span>
        <span>{t("googleMap.footerTagline")}</span>
      </footer>
    </>
  );
};

export default GoogleMapComponent;
