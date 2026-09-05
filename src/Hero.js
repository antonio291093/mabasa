import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const CYCLE_SECONDS = 2.15;

function Hero() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return undefined;

    const ctx = cv.getContext('2d');
    const RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const BT = 648, BB = 668, FL = 742;
    const XA = 400, XB = 700, XC = 1000, P = 300;
    const PW = 46, PH = 32, BUS = 436;
    const CYC = Math.max(1.2, Math.min(4, CYCLE_SECONDS));
    const STEP = CYC * .535, HOLD = CYC * .465;

    const ink = (a) => 'rgba(29,31,32,' + a + ')';
    const ac = (a) => 'rgba(89,128,166,' + a + ')';
    const ACC = '#5980a6', BG = '#f2f2f3';
    const eio = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const slotX = (s) => XA + (s - 2) * P;

    let parts = [
      { slot: 0, st: 'raw' }, { slot: 1, st: 'raw' }, { slot: 2, st: 'raw' }, { slot: 3, st: 'st' },
    ];
    let rack = [], bin = [], made = 148, rej = 3;
    let phase = 'step', pt = 0, roll = 0, flash = 0, did = {};
    let verdict = 'ok', carry = null;
    let a1 = -2.2, a2 = -1.0;
    const BASE = { x: 1150, y: FL - 40 }, L1 = 190, L2 = 175;

    const ik = (tx, ty) => {
      let dx = tx - BASE.x, dy = ty - BASE.y;
      let d = Math.hypot(dx, dy);
      d = Math.max(Math.abs(L1 - L2) + 2, Math.min(d, L1 + L2 - 2));
      const a = Math.atan2(dy, dx);
      const c = Math.acos(Math.max(-1, Math.min(1, (d * d + L1 * L1 - L2 * L2) / (2 * d * L1))));
      const e = Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2))));
      const up = a + c, dn = a - c;
      return Math.sin(up) < Math.sin(dn)
        ? [up, up - (Math.PI - e)]
        : [dn, dn + (Math.PI - e)];
    };
    const rackPos = (i) => ({ x: 1268 + (i % 2) * 80, y: 700 - Math.floor(i / 2) * 88 });

    const advance = (dt) => {
      pt += dt;
      if (phase === 'step') {
        roll += dt * (P / STEP) / 9;
        if (pt >= STEP) {
          pt -= STEP; phase = 'hold'; did = {};
          if (carry) { rack.push(carry); carry = null; made++; if (rack.length >= 6) { rack = []; } }
          parts.forEach((p) => { p.slot++; });
          parts = parts.filter((p) => {
            if (p.slot === 4 && p.st === 'ng') { bin.push(p); rej++; if (bin.length > 3) bin.shift(); return false; }
            return p.slot <= 5;
          });
          parts.push({ slot: 0, st: 'raw' });
        }
      } else {
        const p = pt / HOLD;
        if (p > .5 && !did.press) { did.press = true; flash = 1; const t1 = parts.find((q) => q.slot === 2); if (t1) t1.st = 'st'; }
        if (p > .62 && !did.scan) { did.scan = true; verdict = Math.random() < .17 ? 'ng' : 'ok'; const t2 = parts.find((q) => q.slot === 3); if (t2) t2.st = verdict; }
        if (p > .5 && !did.pick) { did.pick = true; const t3 = parts.find((q) => q.slot === 4 && q.st === 'ok'); if (t3) { carry = t3; parts = parts.filter((q) => q !== t3); } }
        if (pt >= HOLD) { pt -= HOLD; phase = 'step'; did = {}; }
      }
      flash = Math.max(0, flash - dt * 3.4);
    };

    const partPos = (p) => {
      const sx = slotX(p.slot);
      if (phase === 'hold') return { x: sx, y: BT - PH, r: 0 };
      const e = eio(pt / STEP);
      if (p.slot === 3 && p.st === 'ng') {
        return { x: sx + e * 231, y: (BT - PH) + e * e * (FL - 26 - (BT - PH)), r: e * .8 };
      }
      return { x: sx + e * P, y: BT - PH, r: 0 };
    };

    const drawPart = (x, y, st, rot) => {
      ctx.save();
      ctx.translate(x, y + PH / 2); ctx.rotate(rot || 0);
      ctx.strokeStyle = st === 'ng' ? ink(.5) : ink(.72);
      ctx.lineWidth = 1.4;
      ctx.strokeRect(-PW / 2, -PH / 2, PW, PH);
      ctx.strokeStyle = ink(.3); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(-PW / 2 + 7, -PH / 2); ctx.lineTo(-PW / 2 + 7, PH / 2);
      ctx.moveTo(PW / 2 - 7, -PH / 2); ctx.lineTo(PW / 2 - 7, PH / 2); ctx.stroke();
      if (st !== 'raw') { ctx.fillStyle = ac(.85); ctx.fillRect(-5, -5, 10, 10); }
      if (st === 'ng') {
        ctx.strokeStyle = ink(.7); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(-9, -9); ctx.lineTo(9, 9); ctx.moveTo(9, -9); ctx.lineTo(-9, 9); ctx.stroke();
      }
      ctx.restore();
    };

    let showLabels = true;
    const label = (txt, x, y, size, col, align) => {
      if (!showLabels) return;
      ctx.save();
      ctx.font = '600 ' + (size || 14) + "px 'Barlow Condensed', system-ui, sans-serif";
      try { ctx.letterSpacing = '0.1em'; } catch (e) { /* not supported */ }
      ctx.fillStyle = col || ink(.5); ctx.textAlign = align || 'center'; ctx.textBaseline = 'alphabetic';
      ctx.fillText(txt, x, y);
      ctx.restore();
    };

    const draw = (cw, ch, dpr) => {
      const s = cw >= 760 ? cw / 1600 : cw / 1150;
      const tx = cw >= 760 ? 0 : -170 * s;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cw, ch);
      ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * tx, dpr * (ch - 46 - 820 * s));
      showLabels = s > .52;

      ctx.strokeStyle = ink(.06); ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x0 = 0; x0 <= 1600; x0 += 40) { ctx.moveTo(x0, 340); ctx.lineTo(x0, 830); }
      for (let y0 = 340; y0 <= 830; y0 += 40) { ctx.moveTo(0, y0); ctx.lineTo(1600, y0); }
      ctx.stroke();

      ctx.strokeStyle = ink(.55); ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(0, FL); ctx.lineTo(1600, FL); ctx.stroke();
      ctx.strokeStyle = ink(.2); ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x1 = 30; x1 < 1600; x1 += 26) { ctx.moveTo(x1, FL); ctx.lineTo(x1 - 11, FL + 11); }
      ctx.stroke();

      ctx.strokeStyle = ink(.34); ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, 782); ctx.lineTo(60, 802); ctx.moveTo(1180, 782); ctx.lineTo(1180, 802);
      ctx.moveTo(60, 792); ctx.lineTo(496, 792); ctx.moveTo(764, 792); ctx.lineTo(1180, 792);
      ctx.moveTo(60, 792); ctx.lineTo(74, 787); ctx.moveTo(60, 792); ctx.lineTo(74, 797);
      ctx.moveTo(1180, 792); ctx.lineTo(1166, 787); ctx.moveTo(1180, 792); ctx.lineTo(1166, 797);
      ctx.stroke();
      label(t('hero.canvasCellShort') + ' · 12 400 mm', 630, 797, 15, ink(.5));
      ctx.strokeStyle = ink(.4); ctx.lineWidth = 1;
      ctx.beginPath();
      [[40, 810], [1560, 810], [1560, 372]].forEach(([x, y]) => {
        ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8);
      });
      ctx.stroke();

      ctx.strokeStyle = ink(.46); ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(1236, 468); ctx.lineTo(1236, FL); ctx.moveTo(1396, 468); ctx.lineTo(1396, FL);
      ctx.moveTo(1236, 468); ctx.lineTo(1396, 468);
      for (let i0 = 0; i0 < 3; i0++) { const y1 = 700 - i0 * 88 + PH; ctx.moveTo(1236, y1); ctx.lineTo(1396, y1); }
      ctx.stroke();
      label('TOTE ' + String(rack.length).padStart(2, '0') + '/06', 1316, 456, 14, ink(.5));
      rack.forEach((p, i) => { const q = rackPos(i); drawPart(q.x, q.y, p.st, 0); });

      ctx.strokeStyle = ink(.66); ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(40, BT); ctx.lineTo(1180, BT); ctx.moveTo(40, BB); ctx.lineTo(1180, BB);
      ctx.moveTo(40, BT); ctx.lineTo(40, BB); ctx.moveTo(1180, BT); ctx.lineTo(1180, BB);
      ctx.stroke();
      ctx.strokeStyle = ink(.36); ctx.lineWidth = 1;
      for (let x2 = 62; x2 < 1180; x2 += 46) {
        ctx.beginPath(); ctx.arc(x2, (BT + BB) / 2, 8, 0, Math.PI * 2); ctx.stroke();
        ctx.save(); ctx.translate(x2, (BT + BB) / 2); ctx.rotate(roll);
        ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(8, 0); ctx.moveTo(0, -8); ctx.lineTo(0, 8); ctx.stroke();
        ctx.restore();
      }
      ctx.strokeStyle = ink(.48); ctx.lineWidth = 1.4;
      ctx.beginPath();
      [120, 400, 680, 960, 1140].forEach((x) => {
        ctx.moveTo(x, BB); ctx.lineTo(x, FL); ctx.moveTo(x - 18, FL - 2); ctx.lineTo(x + 18, FL - 2);
      });
      ctx.stroke();

      const march = (roll * 26) % 46;
      ctx.strokeStyle = ac(.55); ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i1 = 0; i1 < 4; i1++) {
        const x3 = 150 + i1 * 46 + march;
        ctx.moveTo(x3, BB + 14); ctx.lineTo(x3 + 9, BB + 21); ctx.lineTo(x3, BB + 28);
      }
      ctx.stroke();

      const holdP = phase === 'hold' ? pt / HOLD : -1;

      const ramUp = 540, ramDn = BT - PH - 10;
      const ramY = holdP >= 0 ? ramUp + Math.sin(Math.PI * Math.min(holdP / .9, 1)) * (ramDn - ramUp) : ramUp;
      ctx.strokeStyle = ink(.56); ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(XA - 56, 470); ctx.lineTo(XA - 56, FL); ctx.moveTo(XA + 56, 470); ctx.lineTo(XA + 56, FL);
      ctx.rect(XA - 68, 470, 136, 24);
      ctx.stroke();
      ctx.strokeStyle = ink(.28); ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(XA - 56, 508); ctx.lineTo(XA - 24, 494); ctx.moveTo(XA + 56, 508); ctx.lineTo(XA + 24, 494);
      ctx.stroke();
      ctx.strokeStyle = ink(.7); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(XA, 494); ctx.lineTo(XA, ramY); ctx.stroke();
      ctx.strokeRect(XA - 26, ramY, 52, 16);
      if (flash > 0) {
        ctx.fillStyle = ac(.28 * flash);
        ctx.beginPath(); ctx.arc(XA, BT - PH / 2, 34 + (1 - flash) * 26, 0, Math.PI * 2); ctx.fill();
      }
      const stn = t('hero.canvasStation');
      label(stn + '01', XA, 716, 14, ink(.44));

      ctx.strokeStyle = ink(.56); ctx.lineWidth = 1.6;
      ctx.strokeRect(XB - 32, 502, 64, 36);
      ctx.beginPath(); ctx.arc(XB, 538, 7, 0, Math.PI); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(XB - 8, 540); ctx.lineTo(XB - 36, BT); ctx.moveTo(XB + 8, 540); ctx.lineTo(XB + 36, BT);
      ctx.strokeStyle = ac(.5); ctx.lineWidth = 1; ctx.stroke();
      if (holdP >= 0 && holdP < .75) {
        ctx.fillStyle = ac(.12);
        ctx.beginPath(); ctx.moveTo(XB - 8, 540); ctx.lineTo(XB - 36, BT); ctx.lineTo(XB + 36, BT); ctx.lineTo(XB + 8, 540); ctx.closePath(); ctx.fill();
        const sy = 540 + Math.min(holdP / .62, 1) * (BT - 540);
        const w = 8 + (sy - 540) / (BT - 540) * 28;
        ctx.strokeStyle = ACC; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(XB - w, sy); ctx.lineTo(XB + w, sy); ctx.stroke();
      }
      ctx.strokeStyle = ink(.4); ctx.lineWidth = 1.2;
      ctx.strokeRect(XB + 74, 500, 22, 22);
      if (verdict === 'ok') {
        ctx.fillStyle = ac(.9); ctx.fillRect(XB + 74, 500, 22, 22);
        ctx.strokeStyle = BG; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(XB + 79, 511); ctx.lineTo(XB + 84, 516); ctx.lineTo(XB + 91, 506); ctx.stroke();
      } else {
        ctx.strokeStyle = ink(.65); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(XB + 79, 505); ctx.lineTo(XB + 91, 517); ctx.moveTo(XB + 91, 505); ctx.lineTo(XB + 79, 517); ctx.stroke();
      }
      label(verdict === 'ok' ? 'OK' : 'NG', XB + 104, 518, 15, verdict === 'ok' ? ACC : ink(.6), 'left');
      label(stn + '02', XB, 716, 14, ink(.44));

      ctx.strokeStyle = ink(.52); ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(XB + 118, BT); ctx.lineTo(XB + 186, FL - 56);
      ctx.moveTo(XB + 152, BT + 4); ctx.lineTo(XB + 226, FL - 56);
      ctx.moveTo(XB + 186, FL - 56); ctx.lineTo(XB + 186, FL); ctx.lineTo(XB + 276, FL); ctx.lineTo(XB + 276, FL - 56);
      ctx.moveTo(XB + 226, FL - 56); ctx.lineTo(XB + 226, FL - 40);
      ctx.stroke();
      label('NG', XB + 231, FL + 26, 14, ink(.42));
      bin.forEach((p, i) => drawPart(XB + 231, FL - 22 - i * 11, 'ng', .1 * (i + 1)));

      const tgt = carry ? (() => { const q = rackPos(rack.length); return [q.x, q.y - 6]; })()
        : (phase === 'hold' && parts.some((p) => p.slot === 4)) ? [XC, BT - PH - 8] : [1244, 546];
      const [g1, g2] = ik(tgt[0], tgt[1]);
      const k = 1 - Math.exp(-(RM ? 60 : 9) * (1 / 60));
      a1 += (g1 - a1) * k; a2 += (g2 - a2) * k;
      const ex = BASE.x + Math.cos(a1) * L1, ey = BASE.y + Math.sin(a1) * L1;
      const gx = ex + Math.cos(a2) * L2, gy = ey + Math.sin(a2) * L2;
      ctx.strokeStyle = ink(.56); ctx.lineWidth = 1.6;
      ctx.strokeRect(BASE.x - 30, BASE.y, 60, 40);
      ctx.beginPath(); ctx.moveTo(BASE.x - 46, FL); ctx.lineTo(BASE.x + 46, FL); ctx.stroke();
      ctx.strokeStyle = ink(.6); ctx.lineWidth = 3.6; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(BASE.x, BASE.y); ctx.lineTo(ex, ey); ctx.lineTo(gx, gy); ctx.stroke();
      ctx.lineCap = 'butt';
      ctx.fillStyle = BG; ctx.strokeStyle = ink(.6); ctx.lineWidth = 1.6;
      [[BASE.x, BASE.y], [ex, ey]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
      ctx.strokeStyle = ACC; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(gx - 11, gy); ctx.lineTo(gx + 11, gy);
      ctx.moveTo(gx - 9, gy); ctx.lineTo(gx - 9, gy + 10); ctx.moveTo(gx + 9, gy); ctx.lineTo(gx + 9, gy + 10);
      ctx.stroke();
      label(stn + '03', XC, 716, 14, ink(.44));

      ctx.strokeStyle = ink(.38); ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(330, BUS); ctx.lineTo(1466, BUS); ctx.stroke();
      ctx.strokeStyle = ink(.56); ctx.lineWidth = 1.6;
      ctx.strokeRect(1466, 396, 90, 80);
      ctx.strokeStyle = ink(.26); ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i2 = 0; i2 < 3; i2++) { ctx.rect(1476, 408 + i2 * 20, 70, 12); }
      ctx.stroke();
      label('PLC', 1511, 470, 15, ink(.5));
      const drops = [[XA, 470, holdP >= 0 && holdP < .9], [XB, 502, holdP >= 0 && holdP < .75], [1200, 556, true]];
      drops.forEach(([x, y, on]) => {
        ctx.strokeStyle = on ? ac(.85) : ink(.28); ctx.lineWidth = on ? 1.8 : 1.1;
        ctx.beginPath(); ctx.moveTo(x, BUS); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = on ? ACC : ink(.32);
        ctx.beginPath(); ctx.arc(x, BUS, 3.4, 0, Math.PI * 2); ctx.fill();
      });
      ctx.strokeStyle = ink(.4); ctx.lineWidth = 1.3;
      ctx.strokeRect(1178, 556, 44, 26);

      if (showLabels) {
        ctx.strokeStyle = ink(.4); ctx.lineWidth = 1.3;
        ctx.strokeRect(1252, 276, 308, 100);
        ctx.beginPath(); ctx.moveTo(1252, 304); ctx.lineTo(1560, 304); ctx.stroke();
        ctx.strokeStyle = ink(.4); ctx.lineWidth = 1;
        [[1246, 270], [1566, 270], [1246, 382], [1566, 382]].forEach(([x, y]) => {
          ctx.beginPath(); ctx.moveTo(x - 7, y); ctx.lineTo(x + 7, y); ctx.moveTo(x, y - 7); ctx.lineTo(x, y + 7); ctx.stroke();
        });
        label(t('hero.canvasOnLine'), 1264, 296, 15, ink(.6), 'left');
        const okPct = (made / Math.max(1, made + rej) * 100).toFixed(1);
        [[t('hero.canvasCycle'), CYC.toFixed(2) + ' s'], [t('hero.canvasParts'), String(made)], ['OK', okPct + ' %']].forEach((r, i) => {
          const y = 328 + i * 22;
          label(r[0], 1264, y, 14, ink(.5), 'left');
          label(r[1], 1548, y, 16, ACC, 'right');
        });
      }

      const cyc = (performance.now() / 1000) % 3.2;
      for (let i3 = 0; i3 < 3; i3++) {
        const u = ((cyc + i3 * 1.07) % 3.2) / 3.2;
        ctx.fillStyle = ac(.75);
        ctx.fillRect(1466 - u * 1136 - 3, BUS - 3, 6, 6);
      }

      const gB = ctx.createLinearGradient(0, 0, 940, 0);
      gB.addColorStop(0, 'rgba(242,242,243,.96)'); gB.addColorStop(.62, 'rgba(242,242,243,.8)'); gB.addColorStop(1, 'rgba(242,242,243,0)');
      ctx.fillStyle = gB; ctx.fillRect(0, 300, 940, 320);

      parts.forEach((p) => { const q = partPos(p); drawPart(q.x, q.y, p.st, q.r); });
      if (carry) drawPart(gx, gy + 6, carry.st, 0);
    };

    let last = performance.now();
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth, h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      return [w, h, dpr];
    };
    let dims = size();
    const ro = new ResizeObserver(() => { dims = size(); if (RM) draw(dims[0], dims[1], dims[2]); });
    ro.observe(cv);

    let raf;
    if (RM) {
      phase = 'hold'; pt = HOLD * .5;
      for (let i4 = 0; i4 < 40; i4++) {
        const gk = ik(XC, BT - PH - 8);
        a1 += (gk[0] - a1) * .3; a2 += (gk[1] - a2) * .3;
      }
      draw(dims[0], dims[1], dims[2]);
    } else {
      const frame = (now) => {
        const dt = Math.min((now - last) / 1000, .05); last = now;
        advance(dt);
        draw(dims[0], dims[1], dims[2]);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} aria-hidden="true" className="hero-canvas"></canvas>
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <i className="hero-eyebrow-line"></i>
            {t('hero.eyebrow')}
          </span>
          <h1 className="hero-title">
            <span>{t('hero.titleLine1')}</span>
            <span>{t('hero.titleLine2')}</span>
            <span>{t('hero.titleLine3')}</span>
          </h1>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="hero-actions">
            <a
              className="btn btn-primary hero-btn"
              href="mailto:Ventas@grupo-maba.com?subject=Cotizaci%C3%B3n%20de%20proyecto"
            >
              {t('header.quote')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
            <a className="btn btn-secondary hero-btn" href="mailto:Ventas@grupo-maba.com">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              Ventas@grupo-maba.com
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">15</span>
              <span className="hero-stat-label">{t('hero.statYears')}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">200+</span>
              <span className="hero-stat-label">{t('hero.statProjects')}</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">50+</span>
              <span className="hero-stat-label">{t('header.clients')}</span>
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="hero-scroll-cue">
        {t('hero.canvasScroll')}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
      </a>
    </section>
  );
}

export default Hero;
