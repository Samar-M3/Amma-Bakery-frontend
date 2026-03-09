// pages/AboutPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Bakery story, founder, values — warm light-brown artisan theme.
// Fonts: DM Serif Display (headings) · Lora (body serif) · DM Sans (UI text)

import LOGO_SRC from "../data/logo.js";
import aboutEntrancePhoto from "../image/entance.webp";

const VALUES = [
  { icon: "🫙", title: "Open Kitchen",    desc: "Watch your food being made fresh — no shortcuts, no mystery." },
  { icon: "💰", title: "Budget Friendly", desc: "Starting from Rs 30 — quality bakes for everyone, always." },
  { icon: "🌿", title: "Fresh Daily",     desc: "Small batches baked every morning. If it's not fresh, it's not on the shelf." },
  { icon: "🤝", title: "Community Roots", desc: "Built by word-of-mouth, by neighbours telling neighbours." },
];

const TIMELINE = [
  { year: "2022", label: "Founded",   detail: "First outlet opened near Boudha Stupa, Kathmandu." },
  { year: "2023", label: "Swayambhu", detail: "Second branch opened — word spread fast." },
  { year: "2024", label: "Online",    detail: "Launched digital ordering for the whole city." },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

        /* ─────────────────────────────────
           Font guide
           --heading:  DM Serif Display  — beautiful italic serif, very legible at large sizes
           --body-serif: Lora            — warm, extremely readable paragraph serif
           --ui:       DM Sans           — clean, modern, great for labels & UI chrome
        ───────────────────────────────── */

        /* ── Page shell ── */
        .abp {
          padding-top: 72px;
          background: #faf4eb;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: #2c1a06;
          -webkit-font-smoothing: antialiased;
        }

        /* ══════════════════════════════
           HERO  (unchanged design)
        ══════════════════════════════ */
        .ab-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse 110% 80% at 50% 100%, rgba(201,168,76,0.18) 0%, transparent 65%),
            radial-gradient(ellipse 60% 100% at 0% 50%,   rgba(44,26,6,0.07)    0%, transparent 60%),
            #3a1e08;
          padding: 88px 28px 80px;
          text-align: center;
        }
        .ab-hero::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.05'/%3E%3C/svg%3E");
        }
        .ab-hero-scallop {
          position: absolute; bottom: -1px; left: 0; right: 0;
          height: 48px; pointer-events: none;
          background: #faf4eb;
          clip-path: ellipse(52% 100% at 50% 100%);
        }
        .ab-hero-rule {
          position: absolute; left: 0; right: 0; height: 1px; pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.4) 50%, rgba(201,168,76,0.25) 70%, transparent);
        }

        /* Logo halo */
        .ab-logo-wrap {
          position: relative; z-index: 2;
          display: inline-block; margin-bottom: 26px;
        }
        .ab-logo-halo {
          position: absolute; inset: -12px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.45);
          animation: haloSpin 20s linear infinite;
        }
        .ab-logo-halo::after {
          content: '';
          position: absolute; inset: -7px;
          border-radius: 50%;
          border: 1px dashed rgba(201,168,76,0.22);
        }
        @keyframes haloSpin { to { transform: rotate(360deg); } }
        .ab-logo {
          width: 100px; height: 100px;
          border-radius: 50%; object-fit: cover;
          display: block; position: relative; z-index: 1;
          box-shadow:
            0 0 0 4px rgba(201,168,76,0.55),
            0 0 0 8px rgba(201,168,76,0.15),
            0 20px 56px rgba(0,0,0,0.45);
        }

        /* Eyebrow tag */
        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.78);
          margin-bottom: 14px;
          position: relative; z-index: 2;
        }
        .ab-eyebrow-rule { width: 22px; height: 1px; background: rgba(201,168,76,0.6); }

        /* Hero headline — DM Serif Display: wide, warm, extremely legible */
        .ab-hero h1 {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: clamp(42px, 5.5vw, 74px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: #fff;
          position: relative; z-index: 2;
          margin-bottom: 16px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.25);
        }
        .ab-hero h1 em {
          font-style: italic;
          color: #e8c96a;
          text-shadow: 0 0 50px rgba(201,168,76,0.45);
        }

        /* Hero sub — Lora italic: reads beautifully at small sizes */
        .ab-hero-sub {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 17px; line-height: 1.7;
          color: rgba(255,255,255,0.62);
          max-width: 460px; margin: 0 auto;
          position: relative; z-index: 2;
        }

        /* ══════════════════════════════
           BODY
        ══════════════════════════════ */
        .ab-body {
          max-width: 1140px;
          margin: 0 auto;
          padding: 76px 32px 96px;
        }

        /* Section label */
        .ab-lbl {
          display: flex; align-items: center; gap: 11px;
          margin-bottom: 12px;
        }
        .ab-lbl-rule { width: 26px; height: 1.5px; background: #C9A84C; border-radius: 99px; }
        .ab-lbl-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: #b8882a;
        }

        /* Section heading — DM Serif Display italic at body level */
        .ab-sh {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 400;
          line-height: 1.2;
          color: #2c1a06;
          margin-bottom: 20px;
        }
        .ab-sh em { font-style: italic; color: #8a520e; }

        /* ══════════════════════════════
           STORY
        ══════════════════════════════ */
        .ab-story {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 68px;
          align-items: center;
          margin-bottom: 80px;
        }
        @media (max-width: 820px) {
          .ab-story { grid-template-columns: 1fr; gap: 40px; }
        }

        .ab-story-visual {
          position: relative;
          opacity: 0; animation: fadeUp .65s .05s ease forwards;
        }
        .ab-story-plate {
          border-radius: 22px;
          aspect-ratio: 1;
          background: #d4a55e;
          border: 1px solid rgba(176,120,48,0.35);
          box-shadow: 0 8px 16px rgba(44,26,6,0.08), 0 28px 64px rgba(44,26,6,0.14), inset 0 1px 0 rgba(255,255,255,0.5);
          overflow: hidden;
          position: relative;
        }
        .ab-story-plate-emoji { display: none; }
        .ab-story-plate::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 28% 26%, rgba(255,255,255,0.28), transparent 55%);
          z-index: 1;
          pointer-events: none;
        }
        .ab-story-plate::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(44,26,6,0.28) 0%, transparent 55%);
          z-index: 1;
          pointer-events: none;
        }

        .ab-plate-corner { position: absolute; width: 38px; height: 38px; z-index: 2; }
        .ab-plate-corner.tl { top: 14px; left: 14px; }
        .ab-plate-corner.br { bottom: 14px; right: 14px; transform: rotate(180deg); }

        .ab-story-badge {
          position: absolute; bottom: -18px; right: -18px;
          background: linear-gradient(135deg, #d4a84c, #a07018);
          border-radius: 14px;
          padding: 14px 20px;
          box-shadow: 0 8px 28px rgba(176,120,48,0.4), 0 2px 8px rgba(44,26,6,0.2);
          border: 1px solid rgba(255,255,255,0.2);
        }
        /* Badge number — DM Serif Display: bold and clear */
        .ab-story-badge-num {
          font-family: 'DM Serif Display', serif;
          font-style: italic; font-size: 30px;
          font-weight: 400;
          color: #fff; line-height: 1;
        }
        .ab-story-badge-lbl {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(255,255,255,0.8);
          margin-top: 3px;
        }

        /* Story body text — Lora: warmly legible at 15px */
        .ab-story-text {
          opacity: 0; animation: fadeUp .65s .12s ease forwards;
        }
        .ab-story-text p {
          font-family: 'Lora', serif;
          font-size: 15.5px; line-height: 1.88;
          color: #5c3d1a;
          margin-bottom: 18px;
        }
        .ab-story-text strong {
          font-family: 'Lora', serif;
          color: #2c1a06; font-weight: 600;
        }

        /* Founder card */
        .founder-card {
          margin-top: 28px;
          display: flex; align-items: flex-start; gap: 16px;
          background: linear-gradient(135deg, #fdf6e8, #f7ead5);
          border: 1px solid rgba(176,120,48,0.28);
          border-left: 3px solid #C9A84C;
          border-radius: 14px;
          padding: 20px 22px;
          box-shadow: 0 4px 20px rgba(44,26,6,0.06);
        }
        .founder-av {
          width: 54px; height: 54px; flex-shrink: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #e8c06a, #b07830);
          display: flex; align-items: center; justify-content: center;
          font-size: 26px;
          box-shadow: 0 4px 14px rgba(176,120,48,0.35);
          border: 2px solid rgba(201,168,76,0.5);
        }
        .founder-name {
          font-family: 'DM Serif Display', serif;
          font-size: 19px; font-weight: 400;
          color: #2c1a06; letter-spacing: 0.01em;
          line-height: 1.25;
        }
        .founder-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #b8882a; margin-top: 5px;
        }
        .founder-quote {
          margin-top: 9px;
          font-family: 'Lora', serif;
          font-style: italic; font-size: 14px; line-height: 1.68;
          color: #7a5530;
        }

        /* ══════════════════════════════
           TIMELINE
        ══════════════════════════════ */
        .ab-tl-wrap {
          margin-bottom: 80px;
          opacity: 0; animation: fadeUp .65s .06s ease forwards;
        }
        .ab-timeline {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border-radius: 18px; overflow: hidden;
          border: 1px solid rgba(176,120,48,0.22);
          box-shadow: 0 4px 24px rgba(44,26,6,0.07);
          background: #fff;
        }
        @media (max-width: 600px) {
          .ab-timeline { grid-template-columns: 1fr; }
          .ab-tl-item + .ab-tl-item { border-top: 1px solid rgba(176,120,48,0.18); border-left: none; }
        }
        .ab-tl-item {
          padding: 30px 28px 28px;
          position: relative; background: #fff;
          transition: background .22s;
        }
        .ab-tl-item:hover { background: #fdf8f0; }
        .ab-tl-item + .ab-tl-item { border-left: 1px solid rgba(176,120,48,0.18); }
        .ab-tl-item::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.35));
        }
        /* Year — DM Serif Display italic: eye-catching & very readable */
        .ab-tl-year {
          font-family: 'DM Serif Display', serif;
          font-style: italic; font-size: 40px;
          font-weight: 400;
          color: #C9A84C; line-height: 1; margin-bottom: 8px;
        }
        .ab-tl-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #2c1a06; margin-bottom: 9px;
        }
        /* Timeline detail — Lora italic */
        .ab-tl-detail {
          font-family: 'Lora', serif;
          font-style: italic; font-size: 14.5px; line-height: 1.65;
          color: #7a5530;
        }
        .ab-tl-dot {
          position: absolute; top: 26px; right: 22px;
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(201,168,76,0.45);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.15);
        }

        /* ══════════════════════════════
           VALUES
        ══════════════════════════════ */
        .ab-vals-wrap {
          opacity: 0; animation: fadeUp .65s .08s ease forwards;
        }
        .ab-vals {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 18px;
          margin-top: 28px;
        }
        .ab-val {
          background: #fff;
          border: 1px solid rgba(176,120,48,0.18);
          border-top: 3px solid #C9A84C;
          border-radius: 16px;
          padding: 30px 26px 28px;
          box-shadow: 0 2px 12px rgba(44,26,6,0.05), 0 6px 28px rgba(44,26,6,0.04);
          position: relative; overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .ab-val::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 20% 10%, rgba(201,168,76,0.06), transparent 65%);
          pointer-events: none;
        }
        .ab-val:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(44,26,6,0.1), 0 20px 56px rgba(44,26,6,0.08);
        }
        .ab-val-icon { font-size: 32px; margin-bottom: 16px; display: block; }
        /* Value title — DM Serif Display: lovely at 20px, readable at a glance */
        .ab-val-title {
          font-family: 'DM Serif Display', serif;
          font-size: 21px; font-weight: 400;
          color: #2c1a06; margin-bottom: 10px;
          line-height: 1.2;
        }
        /* Value desc — DM Sans: easy paragraph reading */
        .ab-val-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; line-height: 1.72;
          color: #6b4a28;
        }
        .ab-val-num {
          position: absolute; bottom: 14px; right: 18px;
          font-family: 'DM Serif Display', serif;
          font-style: italic; font-size: 52px;
          color: rgba(201,168,76,0.1); line-height: 1;
          pointer-events: none; user-select: none;
        }

        /* ══════════════════════════════
           ORNAMENTAL DIVIDER
        ══════════════════════════════ */
        .ab-divider {
          display: flex; align-items: center; gap: 14px;
          margin: 64px 0;
          color: rgba(176,120,48,0.4);
        }
        .ab-divider-line { flex: 1; height: 1px; background: rgba(176,120,48,0.2); }
        .ab-divider-glyph { font-size: 14px; }

        /* ══════════════════════════════
           BOTTOM BANNER  (unchanged design)
        ══════════════════════════════ */
        .ab-bottom {
          margin-top: 80px;
          border-radius: 22px;
          background:
            radial-gradient(ellipse 90% 80% at 50% 0%, rgba(201,168,76,0.22) 0%, transparent 65%),
            #3a1e08;
          border: 1px solid rgba(201,168,76,0.25);
          padding: 64px 40px;
          text-align: center;
          position: relative; overflow: hidden;
          opacity: 0; animation: fadeUp .65s .12s ease forwards;
          box-shadow: 0 12px 48px rgba(44,26,6,0.16);
        }
        .ab-bottom::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
        }
        .ab-bottom::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
        }
        .ab-bottom-orn {
          display: flex; align-items: center; justify-content: center; gap: 14px;
          margin-bottom: 22px; position: relative; z-index: 1;
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase;
          color: rgba(201,168,76,0.6);
        }
        .ab-bottom-orn-rule { width: 44px; height: 1px; background: rgba(201,168,76,0.4); }

        /* Banner heading — DM Serif Display: large, warm, inviting */
        .ab-bottom h2 {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: clamp(26px, 3.5vw, 40px); line-height: 1.28;
          font-weight: 400;
          color: rgba(255,255,255,0.96);
          margin-bottom: 14px;
          position: relative; z-index: 1;
        }
        .ab-bottom h2 em { font-style: italic; color: #e8c96a; }

        /* Banner subtext — Lora italic */
        .ab-bottom p {
          font-family: 'Lora', serif;
          font-style: italic; font-size: 16px; line-height: 1.68;
          color: rgba(255,255,255,0.52);
          max-width: 400px; margin: 0 auto;
          position: relative; z-index: 1;
        }
        .ab-bottom-tag {
          display: inline-block; margin-top: 26px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.45);
          position: relative; z-index: 1;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="abp">

        {/* ═══ HERO ═══ */}
        <div className="ab-hero">
          <div className="ab-hero-rule" style={{ top: "22%" }} />
          <div className="ab-hero-rule" style={{ bottom: "18%" }} />

          <div className="ab-logo-wrap au">
            <div className="ab-logo-halo" />
            <img src={LOGO_SRC} alt="Ama Bakery" className="ab-logo" />
          </div>

          <div className="ab-eyebrow au" style={{ animationDelay: ".05s" }}>
            <div className="ab-eyebrow-rule" />
            Est. 2022 · Kathmandu
            <div className="ab-eyebrow-rule" />
          </div>

          <h1 className="au" style={{ animationDelay: ".09s" }}>
            Our <em>Story</em>
          </h1>
          <p className="ab-hero-sub au" style={{ animationDelay: ".14s" }}>
            Born near Boudha Stupa, grown by the warmth of a community.
          </p>

          <div className="ab-hero-scallop" />
        </div>

        {/* ═══ BODY ═══ */}
        <div className="ab-body">

          {/* ── Story ── */}
          <div className="ab-story">
            <div className="ab-story-visual">
              <div
                className="ab-story-plate"
                style={{
                  backgroundImage: `url(${aboutEntrancePhoto})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <svg className="ab-plate-corner tl" viewBox="0 0 38 38" fill="none">
                  <path d="M4 4L4 17" stroke="rgba(176,120,48,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M4 4L17 4" stroke="rgba(176,120,48,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="4" cy="4" r="2.5" fill="rgba(176,120,48,0.6)"/>
                </svg>
                <svg className="ab-plate-corner br" viewBox="0 0 38 38" fill="none">
                  <path d="M4 4L4 17" stroke="rgba(176,120,48,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M4 4L17 4" stroke="rgba(176,120,48,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="4" cy="4" r="2.5" fill="rgba(176,120,48,0.6)"/>
                </svg>
                <span className="ab-story-plate-emoji">🏠</span>
              </div>
              <div className="ab-story-badge">
                <div className="ab-story-badge-num">3+</div>
                <div className="ab-story-badge-lbl">Years of craft</div>
              </div>
            </div>

            <div className="ab-story-text">
              <div className="ab-lbl">
                <div className="ab-lbl-rule" />
                <span className="ab-lbl-text">Est. 2022</span>
              </div>
              <h2 className="ab-sh">
                A Mother's Kitchen,<br /><em>Open to All</em>
              </h2>
              <p>Ama Bakery started with a simple dream — to bring the warmth of a mother's kitchen to the streets of Kathmandu. <strong>Mangal Maya Bajracharya</strong> opened the first outlet near the sacred Boudha Stupa.</p>
              <p>With an <strong>open kitchen concept</strong>, every customer can see exactly how their food is made — with quality ingredients, clean hands, and genuine care. Word spread fast, and the Swayambhu branch followed.</p>
              <p>Today, Ama is more than a bakery. It's a community gathering spot — <strong>affordable for everyone</strong>, trusted by locals, loved by all.</p>

              <div className="founder-card">
                <div className="founder-av">👩</div>
                <div>
                  <div className="founder-name">Mangal Maya Bajracharya</div>
                  <div className="founder-role">Founder & Head Baker</div>
                  <div className="founder-quote">"Every item on the shelf is made the way I'd make it for my own family."</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ornamental divider */}
          <div className="ab-divider">
            <div className="ab-divider-line" />
            <span className="ab-divider-glyph">✦</span>
            <div className="ab-divider-line" />
          </div>

          {/* ── Timeline ── */}
          <div className="ab-tl-wrap">
            <div className="ab-lbl" style={{ marginBottom: 20 }}>
              <div className="ab-lbl-rule" />
              <span className="ab-lbl-text">Our journey</span>
            </div>
            <div className="ab-timeline">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="ab-tl-item au" style={{ animationDelay: `${i * 0.09}s` }}>
                  <div className="ab-tl-dot" />
                  <div className="ab-tl-year">{t.year}</div>
                  <div className="ab-tl-label">{t.label}</div>
                  <div className="ab-tl-detail">{t.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ornamental divider */}
          <div className="ab-divider">
            <div className="ab-divider-line" />
            <span className="ab-divider-glyph">✦</span>
            <div className="ab-divider-line" />
          </div>

          {/* ── Values ── */}
          <div className="ab-vals-wrap">
            <div className="ab-lbl">
              <div className="ab-lbl-rule" />
              <span className="ab-lbl-text">What we stand for</span>
            </div>
            <h2 className="ab-sh">Built on <em>principles</em></h2>
            <div className="ab-vals">
              {VALUES.map((v, i) => (
                <div key={v.title} className="ab-val au" style={{ animationDelay: `${i * 0.08}s` }}>
                  <span className="ab-val-icon">{v.icon}</span>
                  <div className="ab-val-title">{v.title}</div>
                  <div className="ab-val-desc">{v.desc}</div>
                  <div className="ab-val-num">{String(i + 1).padStart(2, "0")}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom CTA ── */}
          <div className="ab-bottom">
            <div className="ab-bottom-orn">
              <div className="ab-bottom-orn-rule" />
              <span>Ama Bakery</span>
              <div className="ab-bottom-orn-rule" />
            </div>
            <h2>
              Come visit us.<br /><em>We'll have something warm</em> for you.
            </h2>
            <p>
              Boudha Stupa & Swayambhu, Kathmandu — open every morning, fresh every day.
            </p>
            <span className="ab-bottom-tag">Handcrafted · Fresh Daily · Est. 2022</span>
          </div>

        </div>
      </div>
    </>
  );
}
