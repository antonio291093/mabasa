# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Servidor de desarrollo en localhost:3000
npm run build      # Genera el build de producción en /build
npm test           # Ejecuta los tests con Jest (modo watch)
npm test -- --watchAll=false   # Ejecuta los tests una sola vez
npm run deploy     # Build + publica en GitHub Pages (rama gh-pages)
```

## Architecture

Sitio corporativo de MABASA Group (empresa de automatización industrial en Saltillo, México), desplegado en GitHub Pages (`http://www.mabasagroup.com`). Es una SPA creada con Create React App.

**Rutas:**
- `/` — Landing page: secciones About → SliderHead → CompanyInfo → Services → OurClients → GoogleMapComponent (en ese orden dentro de `<main>`)
- `/gallery` — Galería de imágenes paginada (2 páginas de 7-8 imágenes)

La navegación del Header mezcla rutas (`<Link to="/">`, `<Link to="/gallery">`) con anclas de scroll (`#about`, `#services`, `#contact`). Las secciones deben mantener sus IDs: `id="home"`, `id="about"`, `id="services"`, `id="contact"`.

**Internacionalización (i18n):**

Toda cadena de texto visible usa el hook `useTranslation()` de react-i18next. El idioma por defecto es español. Las traducciones están en:
- `src/i18n/locales/es/translation.json`
- `src/i18n/locales/en/translation.json`

Al agregar texto nuevo, siempre añadir la clave en **ambos** archivos de traducción y usar `t('clave')` en el componente. La detección de idioma del navegador está activa; el usuario también puede cambiar manualmente con el `<select>` del Header.

**Responsive en SliderHead:**

`SliderHead.js` renderiza dos versiones del hero:
- Desktop: grid CSS con 6 imágenes y overlays de letras "M-A-B-A-S-A" (oculto en pantallas ≤1024px con clase `.hidden-1024`)
- Mobile: carrusel `react-slick` (visible con clase `.visible-xs`)

**Agregar o quitar servicios:**

Cada servicio en `Services.js` es un `<div className="card">` con imagen importada y texto via `t()`. Las claves siguen el patrón `services.serviceN.{title, item1, item2, ...}`. Al agregar un servicio nuevo se deben importar la imagen, añadir el card en el JSX, y registrar las claves en ambos JSONs de traducción.

**Google Maps:**

`GoogleMapComponent.js` carga el mapa con `@googlemaps/js-api-loader`. La API key está hardcodeada en el componente. El marcador apunta a `{ lat: 25.4176025390625, lng: -100.95687103271484 }`.

**Imágenes:**

Todas las imágenes están en `src/images/`. Se importan directamente en los componentes (no hay rutas públicas). Las imágenes del slider usan el prefijo `slider`, los servicios `servicio`, la galería `img`, y los clientes `client`/`cliente`.
