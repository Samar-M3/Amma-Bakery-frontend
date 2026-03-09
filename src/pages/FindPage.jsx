// pages/FindPage.jsx — pixel-matched to Ama Bakery brand

import { useState } from "react";
import { BRANCHES } from "../data/products.js";
import { IC } from "../data/icons.jsx";
import LOGO_SRC from "../data/logo.js";

export default function FindPage() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(null);
  const branch = BRANCHES[active];

  const copy = (p) => {
    navigator.clipboard?.writeText(p);
    setCopied(p);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

        /* ── EXACT BRAND TOKENS ── */
        :root {
          --choc:        #3b1f0a;   /* hero bg — from screenshot */
          --choc-dark:   #2a1506;
          --gold:        #c49140;   /* logo gold */
          --gold-lt:     #d4a855;
          --ivory:       #f0ead4;   /* exact body bg from img1 */
          --ivory-lt:    #f8f4e8;
          --white:       #ffffff;
          --text:        #2a1506;
          --text-mid:    rgba(42,21,6,0.65);
          --text-dim:    rgba(42,21,6,0.4);
          --border-card: rgba(196,145,64,0.45);   /* gold top border on cards */
          --border-light: rgba(42,21,6,0.1);
          --green:       #2a6b2a;
          --anim-ease:   cubic-bezier(0.16,1,0.3,1);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        .fp { padding-top: 72px; min-height: 100vh; background: var(--ivory); font-family: 'DM Sans', sans-serif; }

        /* ══════════════════════════════
           HERO — same layout treatment as About hero
        ══════════════════════════════ */
        .fp-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse 110% 80% at 50% 100%, rgba(201,168,76,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 60% 100% at 0% 50%,   rgba(44,26,6,0.07)    0%, transparent 60%),
            #3a1e08;
          padding: 88px 28px 80px;
          text-align: center;
        }
        .fp-hero::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.05'/%3E%3C/svg%3E");
        }
        .fp-hero-scallop {
          position: absolute; bottom: -1px; left: 0; right: 0;
          height: 48px; pointer-events: none;
          background: var(--ivory);
          clip-path: ellipse(52% 100% at 50% 100%);
        }
        .fp-hero-rule {
          position: absolute; left: 0; right: 0; height: 1px; pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.4) 50%, rgba(201,168,76,0.25) 70%, transparent);
        }

        .fp-logo-wrap {
          position: relative; z-index: 2;
          display: inline-block; margin-bottom: 26px;
          opacity: 0; animation: fadeUp .65s .0s var(--anim-ease) both;
        }
        .fp-logo-halo {
          position: absolute; inset: -12px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.45);
          animation: haloSpin 20s linear infinite;
        }
        .fp-logo-halo::after {
          content: '';
          position: absolute; inset: -7px;
          border-radius: 50%;
          border: 1px dashed rgba(201,168,76,0.22);
        }
        @keyframes haloSpin { to { transform: rotate(360deg); } }
        .fp-logo {
          width: 100px; height: 100px;
          border-radius: 50%; object-fit: cover;
          display: block; position: relative; z-index: 1;
          box-shadow:
            0 0 0 4px rgba(201,168,76,0.55),
            0 0 0 8px rgba(201,168,76,0.15),
            0 20px 56px rgba(0,0,0,0.45);
        }

        .fp-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.78);
          margin-bottom: 14px;
          position: relative; z-index: 2;
          opacity: 0; animation: fadeUp .65s .05s var(--anim-ease) both;
        }
        .fp-eyebrow-rule { width: 22px; height: 1px; background: rgba(201,168,76,0.6); }

        .fp-title {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: clamp(42px, 5.5vw, 74px);
          font-weight: 400; line-height: 1.1;
          letter-spacing: -0.01em;
          color: #fff;
          position: relative; z-index: 2;
          margin-bottom: 16px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.25);
          opacity: 0; animation: fadeUp .65s .09s var(--anim-ease) both;
        }
        .fp-title em {
          font-style: italic;
          color: #e8c96a;
          text-shadow: 0 0 50px rgba(201,168,76,0.45);
        }

        .fp-subtitle {
          font-family: 'Lora', serif;
          font-size: 17px; font-weight: 400; font-style: italic;
          color: rgba(255,255,255,0.62);
          position: relative; z-index: 2; line-height: 1.7;
          max-width: 460px; margin: 0 auto;
          opacity: 0; animation: fadeUp .65s .14s var(--anim-ease) both;
        }

        /* ══════════════════════════════
           BODY
        ══════════════════════════════ */
        .fp-body {
          max-width: 1200px; margin: 0 auto;
          padding: 16px 48px 100px;
        }

        /* ── BRANCH SELECTOR ── */
        .fp-tabs {
          display: flex; gap: 14px; justify-content: center;
          margin-bottom: 52px; flex-wrap: wrap;
          opacity: 0; animation: fadeUp .65s .1s var(--anim-ease) both;
        }
        .fp-tab {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 28px; border-radius: 14px;
          border: 1.5px solid var(--border-light);
          background: var(--white);
          cursor: pointer; transition: all 0.28s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 2px 12px rgba(42,21,6,0.07);
          text-align: left;
        }
        .fp-tab:hover {
          border-color: var(--border-card);
          box-shadow: 0 8px 28px rgba(42,21,6,0.12);
          transform: translateY(-3px);
        }
        .fp-tab.on {
          background: var(--choc);
          border-color: var(--choc);
          box-shadow: 0 8px 32px rgba(42,21,6,0.3);
          transform: translateY(-3px);
        }
        .ft-icon {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(145deg, var(--gold-lt), var(--gold));
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          box-shadow: 0 2px 10px rgba(196,145,64,0.35);
        }
        .ft-name {
          font-family: 'DM Serif Display', serif;
          font-size: 19px; font-weight: 400;
          color: var(--text); line-height: 1.15;
        }
        .fp-tab.on .ft-name { color: var(--gold-lt); }
        .ft-area {
          font-size: 11.5px; color: var(--text-dim);
          margin-top: 2px; font-weight: 300;
        }
        .fp-tab.on .ft-area { color: rgba(232,201,122,0.5); }
        .ft-open {
          display: flex; align-items: center; gap: 5px;
          margin-top: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--green);
        }
        .fp-tab.on .ft-open { color: #86efac; }
        .ft-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: currentColor; flex-shrink: 0;
          animation: pulse 2s infinite;
        }

        /* ── MAIN GRID ── */
        .fp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px; align-items: start;
        }
        @media (max-width: 860px) { .fp-grid { grid-template-columns: 1fr; } }

        /* ── MAP ── */
        .fp-map {
          border-radius: 16px; overflow: hidden;
          border: 3px solid var(--white);
          box-shadow: 0 8px 40px rgba(42,21,6,0.14);
          height: 500px; position: relative;
          opacity: 0; animation: fadeUp .65s .28s var(--anim-ease) both;
        }
        .fp-map iframe {
          width: 100%; height: 100%; border: none; display: block;
          filter: sepia(0.15) saturate(0.9) brightness(0.97);
        }
        /* Corner ornaments — subtle editorial detail */
        .fp-map::before, .fp-map::after {
          content: ''; position: absolute; z-index: 2; pointer-events: none;
          width: 24px; height: 24px;
          border-color: var(--gold); border-style: solid; opacity: 0.4;
        }
        .fp-map::before { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
        .fp-map::after  { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }
        .fp-map-lbl {
          position: absolute; bottom: 14px; left: 14px; z-index: 3;
          background: var(--choc); color: var(--gold-lt);
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 6px;
          border: 1px solid rgba(196,145,64,0.25);
          box-shadow: 0 3px 12px rgba(42,21,6,0.4);
          pointer-events: none;
        }

        /* ── INFO CARDS — matching "Built on principles" card style ── */
        .fp-cards { display: flex; flex-direction: column; gap: 14px; }

        .fp-card {
          background: var(--white);
          border-radius: 14px;
          border: 1.5px solid var(--border-light);
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(42,21,6,0.06);
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s, border-color 0.2s;
          opacity: 0; animation: fadeUp .65s .0s var(--anim-ease) both;
        }
        .fp-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(42,21,6,0.11);
          border-color: var(--border-card);
        }

        /* Gold top border — exact from img1 cards */
        .fp-card-bar {
          height: 3px;
          background: linear-gradient(to right, var(--gold), var(--gold-lt), rgba(196,145,64,0.2));
        }

        .fp-card-in {
          padding: 20px 22px 22px;
          display: flex; gap: 14px;
        }
        .fp-icon {
          width: 42px; height: 42px; flex-shrink: 0;
          border-radius: 10px;
          background: rgba(196,145,64,0.1);
          border: 1px solid rgba(196,145,64,0.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); font-size: 18px;
        }
        .fp-icon svg { width: 17px; height: 17px; }

        .fp-card-content { flex: 1; min-width: 0; }

        /* "WHAT WE STAND FOR" eyebrow style */
        .fp-card-ey {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 5px;
        }
        .fp-card-ey-line { width: 22px; height: 1px; background: var(--gold); opacity: 0.7; }
        .fp-card-ey-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold);
        }

        /* Card title — "Budget Friendly" style from img1 */
        .fp-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 20px; font-weight: 400;
          color: var(--text); letter-spacing: -0.01em; line-height: 1.2;
          margin-bottom: 10px;
        }

        .fp-divider {
          border: none; border-top: 1px solid rgba(42,21,6,0.08);
          margin: 10px 0;
        }

        /* Card body text — matching img1 card text style */
        .fp-text {
          font-family: 'Lora', serif;
          font-size: 13px; color: var(--text-mid);
          line-height: 1.8; font-weight: 300;
        }
        .fp-text a {
          color: var(--text); font-weight: 500; text-decoration: none;
          border-bottom: 1px solid rgba(42,21,6,0.18);
          transition: color 0.2s, border-color 0.2s;
        }
        .fp-text a:hover { color: var(--gold); border-color: var(--gold); }

        /* Phone rows */
        .phone-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 9px 0; border-bottom: 1px solid rgba(42,21,6,0.07);
        }
        .phone-row:last-child { border-bottom: none; }
        .phone-num {
          font-family: 'DM Serif Display', serif;
          font-size: 20px; font-weight: 400; color: var(--text);
          letter-spacing: 0.01em;
        }
        .phone-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 5px 13px; border-radius: 6px;
          border: 1.5px solid rgba(196,145,64,0.35);
          background: transparent; color: var(--text-dim);
          cursor: pointer; transition: all 0.2s;
        }
        .phone-btn:hover { background: var(--choc); color: var(--gold-lt); border-color: var(--choc); }
        .phone-btn.ok { background: #1e3a18; color: #86efac; border-color: #1e3a18; }

        /* Hours */
        .hours-big {
          font-family: 'DM Serif Display', serif;
          font-size: 32px; font-weight: 400; color: var(--text);
          line-height: 1; margin-bottom: 10px;
        }
        .hours-open {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--green);
        }
        .h-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: currentColor; animation: pulse 2s infinite;
        }

        /* Service pills — matching brand pill style */
        .pill-row { display: flex; gap: 7px; flex-wrap: wrap; }
        .pill {
          font-size: 12px; font-weight: 400;
          padding: 5px 13px; border-radius: 8px;
          border: 1px solid rgba(196,145,64,0.3);
          background: rgba(196,145,64,0.08);
          color: var(--text-mid);
          transition: all 0.18s;
        }
        .pill:hover { background: rgba(196,145,64,0.16); border-color: var(--gold); color: var(--text); }

        /* Social */
        .social-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .social-a {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 14px; border-radius: 10px;
          border: 1.5px solid var(--border-light);
          background: var(--ivory-lt);
          text-decoration: none; color: var(--text);
          transition: all 0.22s;
        }
        .social-a:hover {
          background: var(--choc); color: var(--gold-lt);
          border-color: var(--choc);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(42,21,6,0.2);
        }
        .s-ico {
          width: 30px; height: 30px; border-radius: 7px;
          background: rgba(196,145,64,0.1);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .s-ico svg { width: 13px; height: 13px; }
        .s-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.12em;
        }
        .s-handle { font-size: 11px; color: var(--text-dim); margin-top: 1px; }
        .social-a:hover .s-handle { color: rgba(232,201,122,0.55); }

        .review-link {
          display: flex; align-items: center; gap: 9px;
          margin-top: 10px; padding: 10px 14px; border-radius: 10px;
          border: 1.5px dashed rgba(196,145,64,0.35);
          background: rgba(196,145,64,0.05);
          text-decoration: none; color: var(--text-mid);
          font-size: 12.5px; font-weight: 300; transition: all 0.2s;
        }
        .review-link:hover { background: rgba(196,145,64,0.12); border-color: var(--gold); color: var(--text); }
        .r-stars { color: var(--gold); font-size: 14px; letter-spacing: 1.5px; flex-shrink: 0; }

        /* SECTION HEAD — "WHAT WE STAND FOR / Built on principles" style */
        .fp-section-head { margin-bottom: 36px; }
        .fp-sh-ey {
          display: flex; align-items: center; gap: 12px; margin-bottom: 8px;
        }
        .fp-sh-line { width: 26px; height: 1px; background: var(--gold); }
        .fp-sh-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: var(--gold);
        }
        .fp-sh-title {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: clamp(28px, 3.5vw, 40px); font-weight: 400;
          color: var(--text); letter-spacing: -0.02em; line-height: 1.1;
        }
        .fp-sh-title em { font-style: italic; color: var(--gold); }

        /* Divider with diamond — matching img1 top separator */
        .fp-separator {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 44px;
        }
        .fp-sep-line {
          flex: 1; height: 1px;
          background: linear-gradient(to right, transparent, rgba(196,145,64,0.3));
        }
        .fp-sep-line.r { background: linear-gradient(to left, transparent, rgba(196,145,64,0.3)); }
        .fp-sep-diamond {
          width: 7px; height: 7px;
          background: var(--gold); opacity: 0.45;
          transform: rotate(45deg);
        }

        /* Complaints banner */
        .fp-warn {
          margin-top: 28px; padding: 16px 20px; border-radius: 12px;
          background: var(--white);
          border: 1.5px solid var(--border-light);
          border-left: 4px solid var(--gold);
          display: flex; align-items: center; gap: 14px;
          box-shadow: 0 2px 10px rgba(42,21,6,0.06);
          opacity: 0; animation: fadeUp .65s .6s var(--anim-ease) both;
        }
        .fp-warn-text { font-family: 'Lora', serif; font-size: 13px; color: var(--text-mid); }
        .fp-warn-text strong { color: var(--text); font-weight: 600; }
        .fp-warn-text a {
          color: var(--text); font-weight: 700; text-decoration: none;
          font-family: 'DM Serif Display', serif; font-size: 16px; font-style: italic;
          border-bottom: 1px solid rgba(42,21,6,0.2);
        }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .fp-body { padding: 16px 20px 60px; }
          .fp-map { height: 300px; }
          .social-grid { grid-template-columns: 1fr; }
          .fp-sh-title { font-size: 30px; }
        }
      `}</style>

      <div className="fp">

        {/* ── HERO ── */}
        <div className="fp-hero">
          <div className="fp-hero-rule" style={{ top: "22%" }} />
          <div className="fp-hero-rule" style={{ bottom: "18%" }} />

          <div className="fp-logo-wrap">
            <div className="fp-logo-halo" />
            <img src={LOGO_SRC} alt="Ama Bakery" className="fp-logo" />
          </div>

          <div className="fp-eyebrow">
            <div className="fp-eyebrow-rule" />
            Est. 2022 · Kathmandu
            <div className="fp-eyebrow-rule" />
          </div>

          <h1 className="fp-title">
            Find <em>Us</em>
          </h1>

          <p className="fp-subtitle">
            Born near Boudha Stupa, grown by the warmth of a community.
          </p>

          <div className="fp-hero-scallop" />
        </div>

        {/* ── BODY ── */}
        <div className="fp-body">

          {/* Diamond separator — like img1 top */}
          <div className="fp-separator">
            <div className="fp-sep-line" />
            <div className="fp-sep-diamond" />
            <div className="fp-sep-line r" />
          </div>

          {/* Section head — "WHAT WE STAND FOR / Built on principles" */}
          <div className="fp-section-head">
            <div className="fp-sh-ey">
              <div className="fp-sh-line" />
              <span className="fp-sh-label">Where to Find Us</span>
            </div>
            <div className="fp-sh-title">
              Two branches, <em>one family</em>
            </div>
          </div>

          {/* Branch tabs */}
          <div className="fp-tabs">
            {BRANCHES.map((b, i) => (
              <button
                key={i}
                className={`fp-tab${active === i ? " on" : ""}`}
                onClick={() => setActive(i)}
              >
                <div className="ft-icon">{b.emoji || "📍"}</div>
                <div>
                  <div className="ft-name">{b.name}</div>
                  <div className="ft-area">{b.area || b.address?.split("\n")[0]}</div>
                  <div className="ft-open">
                    <span className="ft-dot" />
                    Open Now
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Map + Cards */}
          <div className="fp-grid">

            {/* Map */}
            <div className="fp-map">
              <iframe key={branch.mapSrc} src={branch.mapSrc} title={branch.name} loading="lazy" />
              <div className="fp-map-lbl">📍 {branch.name}</div>
            </div>

            {/* Cards */}
            <div className="fp-cards">

              {/* Address */}
              <div className="fp-card" style={{ animationDelay: "0.3s" }}>
                <div className="fp-card-bar" />
                <div className="fp-card-in">
                  <div className="fp-icon">{IC.pin}</div>
                  <div className="fp-card-content">
                    <div className="fp-card-ey">
                      <div className="fp-card-ey-line" />
                      <span className="fp-card-ey-label">Location</span>
                    </div>
                    <div className="fp-card-title">{branch.name}</div>
                    <hr className="fp-divider" />
                    <div className="fp-text" style={{ whiteSpace: "pre-line" }}>{branch.address}</div>
                    {branch.note && (
                      <div style={{
                        marginTop: 10, padding: "8px 12px", borderRadius: 8,
                        background: "rgba(196,145,64,0.08)", border: "1px solid rgba(196,145,64,0.2)",
                        fontSize: 12, color: "var(--gold)", display: "flex", alignItems: "center", gap: 6
                      }}>
                        <span>📍</span> {branch.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="fp-card" style={{ animationDelay: "0.37s" }}>
                <div className="fp-card-bar" />
                <div className="fp-card-in">
                  <div className="fp-icon">{IC.phone}</div>
                  <div className="fp-card-content">
                    <div className="fp-card-ey">
                      <div className="fp-card-ey-line" />
                      <span className="fp-card-ey-label">Contact</span>
                    </div>
                    <div className="fp-card-title">Call Us</div>
                    <hr className="fp-divider" />
                    {branch.phone.map(p => (
                      <div className="phone-row" key={p}>
                        <span className="phone-num">{p}</span>
                        <button
                          className={`phone-btn${copied === p ? " ok" : ""}`}
                          onClick={() => copy(p)}
                        >
                          {copied === p ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="fp-card" style={{ animationDelay: "0.44s" }}>
                <div className="fp-card-bar" />
                <div className="fp-card-in">
                  <div className="fp-icon">{IC.clock}</div>
                  <div className="fp-card-content">
                    <div className="fp-card-ey">
                      <div className="fp-card-ey-line" />
                      <span className="fp-card-ey-label">Hours</span>
                    </div>
                    <div className="fp-card-title">Every Day</div>
                    <hr className="fp-divider" />
                    <div className="hours-big">6 AM – 9 PM</div>
                    <div className="hours-open">
                      <span className="h-dot" /> Currently Open
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="fp-card" style={{ animationDelay: "0.51s" }}>
                <div className="fp-card-bar" />
                <div className="fp-card-in">
                  <div className="fp-icon">{IC.pkg}</div>
                  <div className="fp-card-content">
                    <div className="fp-card-ey">
                      <div className="fp-card-ey-line" />
                      <span className="fp-card-ey-label">Services</span>
                    </div>
                    <div className="fp-card-title">What We Offer</div>
                    <hr className="fp-divider" />
                    <div className="pill-row" style={{ marginBottom: 12 }}>
                      {["Dine-in","Takeaway","Delivery","Charging Ports",branch.hasHookah?"Hookah":null]
                        .filter(Boolean).map(s => <span key={s} className="pill">{s}</span>)}
                    </div>
                    <hr className="fp-divider" />
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:"var(--text-dim)", marginBottom:8 }}>
                      Payment Accepted
                    </div>
                    <div className="pill-row">
                      <span className="pill">💵 Cash</span>
                      <span className="pill">📱 eSewa</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="fp-card" style={{ animationDelay: "0.58s" }}>
                <div className="fp-card-bar" />
                <div className="fp-card-in">
                  <div className="fp-icon">{IC.trend}</div>
                  <div className="fp-card-content">
                    <div className="fp-card-ey">
                      <div className="fp-card-ey-line" />
                      <span className="fp-card-ey-label">Follow Us</span>
                    </div>
                    <div className="fp-card-title">Stay Connected</div>
                    <hr className="fp-divider" />
                    <div className="social-grid">
                      <a href="https://facebook.com/amabakerycoffee" target="_blank" rel="noreferrer" className="social-a">
                        <div className="s-ico">{IC.fb}</div>
                        <div>
                          <div className="s-name">Facebook</div>
                          <div className="s-handle">amabakerycoffee</div>
                        </div>
                      </a>
                      <a href="https://instagram.com/amabakeryhouse" target="_blank" rel="noreferrer" className="social-a">
                        <div className="s-ico">{IC.ig}</div>
                        <div>
                          <div className="s-name">Instagram</div>
                          <div className="s-handle">amabakeryhouse</div>
                        </div>
                      </a>
                    </div>
                    <a href="https://bit.ly/4dDt3Ub" target="_blank" rel="noreferrer" className="review-link">
                      <span className="r-stars">★★★★★</span>
                      <span>Leave us a Google Review — we read every one</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Complaints */}
          <div className="fp-warn">
            <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
            <div className="fp-warn-text">
              <strong>Complaints &amp; Feedback?</strong> We take every concern seriously.
              Dedicated line: <a href="tel:9866310000">986-631-0000</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
