// pages/HomePage.jsx — Ama Bakery · Improved UI
// Brand: #3b1f0a choc · #c49140 gold · #f0ead4 ivory
// Fonts: Playfair Display + Cinzel + DM Sans

import { useState } from "react";
import { IC } from "../data/icons.jsx";
import { PRODUCTS, Rs } from "../data/products.js";
import Badge from "../components/Badge.jsx";
import homeFallbackPhoto from "../image/space.webp";
import homePastriesPhoto from "../image/pastery.webp";
import homeCakesPhoto from "../image/cake.webp";
import homeCookiesPhoto from "../image/cake.png";
import homeBreadsPhoto from "../image/ama.jpg";
import homeSnacksPhoto from "../image/ball.webp";

const FEATURED_FALLBACK_PHOTOS = {
  Muffins: homePastriesPhoto,
  Snacks: homeSnacksPhoto,
  Cakes: homeCakesPhoto,
  Breads: homeBreadsPhoto,
  Cookies: homeCookiesPhoto,
  Pastries: homePastriesPhoto,
  Savory: homeSnacksPhoto,
};

/* ─────────────────────────────────────────────────
   SHARED STYLES (injected once at top)
───────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Cinzel:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --choc:        #3b1f0a;
  --choc-dark:   #1e0e04;
  --choc-mid:    #2c1608;
  --gold:        #c49140;
  --gold-lt:     #d4a855;
  --gold-bright: #e8c97a;
  --ivory:       #f0ead4;
  --ivory-lt:    #f8f4e8;
  --white:       #ffffff;
  --text:        #2a1506;
  --text-mid:    rgba(42,21,6,0.65);
  --text-dim:    rgba(42,21,6,0.38);
  --border:      rgba(42,21,6,0.1);
  --border-g:    rgba(196,145,64,0.3);
  --green:       #2a6b2a;
}

@keyframes fadeUp {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes shimmer {
  0%   { background-position:0% center; }
  100% { background-position:200% center; }
}
@keyframes floatA {
  0%,100% { transform:translateY(0) rotate(-.4deg); }
  50%     { transform:translateY(-10px) rotate(.4deg); }
}
@keyframes floatB {
  0%,100% { transform:translateY(0) rotate(.4deg); }
  50%     { transform:translateY(-13px) rotate(-.4deg); }
}
@keyframes subtleZoom {
  from { transform:scale(1); }
  to   { transform:scale(1.07); }
}
@keyframes slowDrift {
  from { transform:translateY(-50%) translateX(0) rotate(-1deg); }
  to   { transform:translateY(-50%) translateX(-24px) rotate(1deg); }
}
@keyframes pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%     { opacity:.5; transform:scale(.75); }
}

/* Section label — "— WHAT WE STAND FOR" style */
.sec-ey {
  display:flex; align-items:center; gap:12px; margin-bottom:10px;
}
.sec-ey-line { width:26px; height:1px; background:var(--gold); opacity:.7; }
.sec-ey-text {
  font-family:'Cinzel',serif; font-size:10px; font-weight:700;
  letter-spacing:.26em; text-transform:uppercase; color:var(--gold);
}
/* Section titles */
.sec-title {
  font-family:'Playfair Display',serif;
  font-size:clamp(32px,4vw,50px); font-weight:900;
  color:var(--choc); letter-spacing:-.02em; line-height:1.1;
}
.sec-title em { font-style:italic; color:var(--gold); }
.sec-title-white { color:#fff; }
.sec-sub {
  font-family:'DM Sans',sans-serif;
  font-size:15px; font-weight:300; color:var(--text-mid);
  line-height:1.8; margin-top:12px; max-width:520px;
}
.sec-sub-white { color:rgba(255,255,255,.5); }
`;

/* ─────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────── */
function AmaHero({ setPage }) {
  return (
    <section className="hero">
      <style>{`
        .hero {
          position:relative;
          min-height:calc(100svh - 72px);
          display:grid; grid-template-columns:1fr 1fr;
          overflow:hidden;
          background:var(--choc-dark);
          background-image:
            radial-gradient(ellipse 90% 80% at 100% 0%, rgba(100,52,14,.6) 0%, transparent 55%),
            radial-gradient(ellipse 70% 70% at 0% 100%, rgba(50,24,6,.7) 0%, transparent 55%);
        }
        /* dot texture */
        .hero::before {
          content:''; position:absolute; inset:0; pointer-events:none; z-index:1;
          background-image:radial-gradient(circle,rgba(196,145,64,.055) 1px,transparent 1px);
          background-size:28px 28px;
        }
        /* ghost Devanagari */
        .hero-deva {
          position:absolute; right:-2%; top:50%; transform:translateY(-50%);
          font-family:'Playfair Display',serif;
          font-size:clamp(380px,42vw,660px); font-weight:900;
          color:rgba(196,145,64,.025); line-height:1;
          pointer-events:none; z-index:1; user-select:none;
          animation:slowDrift 22s ease-in-out infinite alternate;
        }
        /* gold horizontal rules */
        .hero-rule {
          position:absolute; left:0; right:0; height:1px; z-index:2; pointer-events:none;
          background:linear-gradient(to right,transparent,rgba(196,145,64,.14) 20%,rgba(196,145,64,.14) 80%,transparent);
        }
        .hr-top { top:0; }
        .hr-bot { bottom:0; }
        /* vertical divider */
        .hero-vline {
          position:absolute; top:0; bottom:0; left:50%; width:1px; z-index:2; pointer-events:none;
          background:linear-gradient(to bottom,transparent,rgba(196,145,64,.13) 20%,rgba(196,145,64,.13) 80%,transparent);
        }

        /* ── LEFT ── */
        .hero-left {
          position:relative; z-index:10;
          display:flex; flex-direction:column; justify-content:center;
          padding:80px 52px 60px 96px;
          gap:0;
        }

        /* Eyebrow */
        .hero-ey {
          display:flex; align-items:center; gap:14px; margin-bottom:22px;
          opacity:0; animation:fadeUp .6s .1s ease forwards;
        }
        .hero-ey-line { width:36px; height:1px; background:linear-gradient(to right,transparent,rgba(196,145,64,.6)); }
        .hero-ey-line.r { background:linear-gradient(to left,transparent,rgba(196,145,64,.6)); }
        .hero-ey-text {
          font-family:'Cinzel',serif; font-size:10px; font-weight:700;
          letter-spacing:.26em; text-transform:uppercase; color:rgba(196,145,64,.75);
        }

        /* Title */
        .hero-title {
          margin-bottom:28px;
          opacity:0; animation:fadeUp .75s .18s cubic-bezier(.22,1,.36,1) forwards;
        }
        .ht-small {
          font-family:'Playfair Display',serif; font-style:italic;
          font-size:clamp(16px,1.5vw,22px); font-weight:400;
          color:rgba(255,255,255,.38); letter-spacing:.06em; display:block; margin-bottom:4px;
        }
        .ht-main {
          font-family:'Playfair Display',serif;
          font-size:clamp(72px,9vw,130px); font-weight:900; line-height:.88;
          letter-spacing:-.04em; color:#fff; display:block;
        }
        .ht-gold {
          font-family:'Playfair Display',serif; font-style:italic;
          font-size:clamp(72px,9vw,130px); font-weight:900; line-height:.92;
          letter-spacing:-.03em; display:block;
          background:linear-gradient(135deg,var(--gold) 0%,var(--gold-bright) 50%,var(--gold) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text; background-size:200% auto;
          animation:shimmer 4s linear infinite;
        }
        .ht-nepali {
          font-family:'DM Sans',sans-serif; font-style:italic;
          font-size:clamp(11px,.85vw,14px); font-weight:300;
          color:rgba(196,145,64,.4); letter-spacing:.12em; display:block; margin-top:16px;
        }

        /* Description */
        .hero-desc {
          position:relative; max-width:380px;
          font-family:'DM Sans',sans-serif; font-size:14.5px; font-weight:300;
          line-height:1.9; color:rgba(255,255,255,.45);
          padding-left:22px; margin-bottom:40px;
          opacity:0; animation:fadeUp .65s .3s ease forwards;
        }
        .hero-desc::before {
          content:''; position:absolute; left:0; top:4px; bottom:4px; width:2px; border-radius:2px;
          background:linear-gradient(to bottom,transparent,var(--gold),transparent);
        }

        /* CTAs */
        .hero-ctas {
          display:flex; align-items:center; gap:14px; flex-wrap:wrap;
          margin-bottom:44px;
          opacity:0; animation:fadeUp .65s .38s ease forwards;
        }
        .cta-primary {
          position:relative; overflow:hidden;
          display:inline-flex; align-items:center; gap:12px;
          background:var(--gold); color:var(--choc-dark);
          font-family:'Cinzel',serif; font-size:11px; font-weight:700;
          letter-spacing:.18em; text-transform:uppercase;
          padding:16px 32px; border-radius:4px; border:none; cursor:pointer;
          transition:all .3s;
          box-shadow:0 8px 32px rgba(196,145,64,.32),inset 0 1px 0 rgba(255,255,255,.2);
        }
        .cta-primary::before {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
          transition:left .5s;
        }
        .cta-primary:hover::before { left:150%; }
        .cta-primary:hover {
          background:var(--gold-lt);
          box-shadow:0 12px 44px rgba(196,145,64,.45);
          transform:translateY(-2px);
        }
        .cta-arr { width:16px; height:16px; transition:transform .3s; flex-shrink:0; }
        .cta-primary:hover .cta-arr { transform:translateX(4px); }
        .cta-ghost {
          display:inline-flex; align-items:center; gap:10px;
          background:transparent; color:rgba(255,255,255,.55);
          font-family:'DM Sans',sans-serif; font-size:13px; font-weight:400;
          letter-spacing:.06em; padding:15px 24px; border-radius:4px;
          border:1px solid rgba(255,255,255,.12); cursor:pointer; transition:all .25s;
        }
        .cta-ghost:hover { color:#fff; border-color:rgba(255,255,255,.28); background:rgba(255,255,255,.04); }

        /* Proof bar */
        .proof {
          display:flex; align-items:center; gap:22px; flex-wrap:wrap;
          opacity:0; animation:fadeUp .65s .46s ease forwards;
        }
        .proof-sep { width:1px; height:36px; background:rgba(255,255,255,.1); }
        .proof-num {
          font-family:'Playfair Display',serif; font-size:28px; font-weight:900;
          color:var(--gold-lt); line-height:1;
        }
        .proof-label {
          font-family:'Cinzel',serif; font-size:9px; font-weight:600;
          letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.3); margin-top:3px;
        }
        .proof-rating { display:flex; align-items:center; gap:10px; }
        .proof-avs { display:flex; }
        .proof-av {
          width:26px; height:26px; border-radius:50%; margin-left:-7px;
          border:2px solid var(--choc-dark);
          background:linear-gradient(135deg,var(--gold),var(--gold-lt));
          display:flex; align-items:center; justify-content:center;
          font-family:'Cinzel',serif; font-size:9px; font-weight:700; color:var(--choc-dark);
        }
        .proof-av:first-child { margin-left:0; }
        .proof-stars { color:var(--gold); font-size:12px; letter-spacing:1.5px; }
        .proof-rnum  { font-family:'Playfair Display',serif; font-size:22px; font-weight:900; color:#fff; }
        .proof-rsub  { font-family:'Cinzel',serif; font-size:9px; letter-spacing:.12em; color:rgba(255,255,255,.3); }

        /* ── RIGHT ── */
        .hero-right {
          position:relative; z-index:10;
          display:flex; align-items:center; justify-content:center;
          padding:72px 72px 60px 28px;
        }
        .frame-wrap {
          position:relative;
          width:100%; max-width:min(420px,34vw);
          max-height:calc(100svh - 200px);
        }

        /* Main photo */
        .photo-card {
          position:relative; width:100%; aspect-ratio:2/3;
          max-height:calc(100svh - 230px);
          border-radius:3px; overflow:hidden;
          opacity:0; animation:fadeUp 1s .5s cubic-bezier(.22,1,.36,1) forwards;
        }
        /* corner ornaments */
        .photo-card::before,.photo-card::after {
          content:''; position:absolute; z-index:4;
          width:28px; height:28px; border-color:var(--gold); border-style:solid; opacity:.55;
        }
        .photo-card::before { top:14px; left:14px; border-width:1.5px 0 0 1.5px; }
        .photo-card::after  { bottom:14px; right:14px; border-width:0 1.5px 1.5px 0; }
        .photo-card img {
          width:100%; height:100%; object-fit:cover; object-position:center 30%;
          display:block; filter:saturate(.9) brightness(.9);
          animation:subtleZoom 14s ease-in-out infinite alternate;
        }
        .photo-overlay {
          position:absolute; inset:0; z-index:2; pointer-events:none;
          background:
            linear-gradient(to top,rgba(16,8,2,.92) 0%,rgba(16,8,2,.3) 40%,transparent 70%),
            linear-gradient(to right,rgba(16,8,2,.2) 0%,transparent 40%);
        }

        /* panel at bottom */
        .photo-panel {
          position:absolute; bottom:0; left:0; right:0; z-index:5; padding:20px;
        }
        .photo-panel-in {
          background:rgba(10,5,1,.7); backdrop-filter:blur(20px);
          border:1px solid rgba(196,145,64,.18); border-radius:4px;
          padding:14px 18px; display:flex; align-items:center; justify-content:space-between; gap:12px;
        }
        .panel-name { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:#fff; }
        .panel-note { font-family:'DM Sans',sans-serif; font-size:10px; color:rgba(255,255,255,.38); letter-spacing:.08em; text-transform:uppercase; margin-top:3px; }
        .panel-price {
          font-family:'Playfair Display',serif; font-size:24px; font-weight:900;
          background:linear-gradient(135deg,var(--gold),var(--gold-bright));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          white-space:nowrap;
        }
        .panel-btn {
          width:36px; height:36px; border-radius:50%; flex-shrink:0;
          background:var(--gold); color:var(--choc-dark); border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          font-size:20px; font-weight:700; transition:all .2s;
          box-shadow:0 4px 16px rgba(196,145,64,.4);
        }
        .panel-btn:hover { background:var(--gold-lt); transform:scale(1.1); }

        /* floating cards */
        .fcard {
          position:absolute; z-index:20;
          background:rgba(16,8,2,.88); backdrop-filter:blur(28px);
          border:1px solid rgba(196,145,64,.2); border-radius:4px;
          box-shadow:0 16px 48px rgba(0,0,0,.5);
          padding:13px 17px; opacity:0;
        }
        .fc1 { top:36px; left:-60px; animation:fadeUp .7s 1s ease forwards, floatA 5s 1.7s ease-in-out infinite; }
        .fc2 { top:38%; right:-56px; animation:fadeUp .7s 1.1s ease forwards, floatB 6s 1.9s ease-in-out infinite; }
        .fc3 { bottom:128px; left:-50px; animation:fadeUp .7s 1.2s ease forwards, floatA 7s 2.1s ease-in-out infinite; }
        .fcard-ico   { font-size:22px; margin-bottom:6px; }
        .fcard-label { font-family:'Cinzel',serif; font-size:8.5px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:rgba(196,145,64,.7); }
        .fcard-val   { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:#fff; margin-top:3px; line-height:1.2; }
        .fcard-sub   { font-family:'DM Sans',sans-serif; font-size:10px; color:rgba(255,255,255,.35); margin-top:2px; font-weight:300; }

        /* seal */
        .seal {
          position:absolute; bottom:-22px; right:-22px; z-index:20;
          width:74px; height:74px; border-radius:50%;
          background:linear-gradient(135deg,#b8860b,var(--gold),var(--gold-bright),var(--gold));
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 8px 36px rgba(196,145,64,.5),0 0 0 1px rgba(196,145,64,.3);
          opacity:0; animation:fadeUp .5s 1.4s ease forwards;
        }
        .seal-in {
          width:60px; height:60px; border-radius:50%;
          background:var(--choc-dark);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
        }
        .seal-est  { font-family:'Cinzel',serif; font-size:7px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); }
        .seal-year { font-family:'Playfair Display',serif; font-size:14px; font-weight:900; color:var(--gold-lt); }

        /* RESPONSIVE */
        @media(max-width:960px) {
          .hero { grid-template-columns:1fr; }
          .hero-right { display:none; }
          .hero-vline { display:none; }
          .hero-left { padding:72px 32px 52px 32px; }
        }
        @media(max-width:480px) {
          .hero-left { padding:64px 20px 48px 20px; }
          .ht-main,.ht-gold { font-size:clamp(60px,18vw,80px) !important; }
        }
      `}</style>

      <div className="hero-grain" style={{ position:'absolute',inset:0,zIndex:1,pointerEvents:'none',opacity:.055,
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23f)'/%3E%3C/svg%3E")`,
        backgroundSize:'350px 350px' }} />
      <div className="hero-deva">अ</div>
      <div className="hero-rule hr-top" />
      <div className="hero-rule hr-bot" />
      <div className="hero-vline" />

      {/* LEFT */}
      <div className="hero-left">
        <div className="hero-ey">
          <div className="hero-ey-line" />
          <span className="hero-ey-text">Est. 2022 · Kathmandu</span>
          <div className="hero-ey-line r" />
        </div>

        <div className="hero-title">
          <span className="ht-small">A mother's kitchen,</span>
          <span className="ht-main">Ama</span>
          <span className="ht-gold">Bakery</span>
          <span className="ht-nepali">आमाको माया, हरेक बाइटमा</span>
        </div>

        <p className="hero-desc">
          Founded near the sacred Boudha Stupa, Ama brings the warmth of a mother's kitchen to Kathmandu — fresh bakes, open kitchen, honest prices from Rs&nbsp;30.
        </p>

        <div className="hero-ctas">
          <button className="cta-primary" onClick={() => setPage?.("menu")}>
            Order Now
            <svg className="cta-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className="cta-ghost" onClick={() => setPage?.("about")}>
            Our Story
          </button>
        </div>

        <div className="proof">
          <div>
            <div className="proof-num">2</div>
            <div className="proof-label">Branches</div>
          </div>
          <div className="proof-sep" />
          <div>
            <div className="proof-num">Rs 30</div>
            <div className="proof-label">Starts From</div>
          </div>
          <div className="proof-sep" />
          <div className="proof-rating">
            <div className="proof-avs">
              {["S","R","P","A"].map(l => <div key={l} className="proof-av">{l}</div>)}
            </div>
            <div>
              <div style={{ display:"flex",alignItems:"baseline",gap:6 }}>
                <span className="proof-stars">★★★★★</span>
                <span className="proof-rnum">4.9</span>
              </div>
              <div className="proof-rsub">400+ happy customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-right">
        <div className="frame-wrap">
          {/* float 1 */}
          <div className="fcard fc1">
            <div className="fcard-ico">🌿</div>
            <div className="fcard-label">Baked</div>
            <div className="fcard-val">Fresh Daily</div>
            <div className="fcard-sub">Small batches, every morning</div>
          </div>

          {/* main photo */}
          <div className="photo-card">
            <img
              src={homeCakesPhoto}
              alt="Fresh baked pastries at Ama Bakery"
            />
            <div className="photo-overlay" />
            <div className="photo-panel">
              <div className="photo-panel-in">
                <div>
                  <div className="panel-name">Chocolate Oreo Cake</div>
                  <div className="panel-note">Freshly decorated today · Open kitchen</div>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div className="panel-price">Rs 150</div>
                  <button className="panel-btn">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* float 2 */}
          <div className="fcard fc2">
            <div className="fcard-ico">📍</div>
            <div className="fcard-label">Find us at</div>
            <div className="fcard-val" style={{whiteSpace:"pre-line"}}>{"Boudha &\nSwayambhu"}</div>
          </div>

          {/* float 3 */}
          <div className="fcard fc3">
            <div className="fcard-ico">🫙</div>
            <div className="fcard-label">Always</div>
            <div className="fcard-val">Open Kitchen</div>
            <div className="fcard-sub">Watch us bake</div>
          </div>

          {/* seal */}
          <div className="seal">
            <div className="seal-in">
              <span className="seal-est">Est.</span>
              <span className="seal-year">2022</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   FEATURED CARD
───────────────────────────────────────────────── */
function FeaturedCard({ product, onAdd, delay = 0 }) {
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const imgSrc =
    product.photo || FEATURED_FALLBACK_PHOTOS[product.category] || homeFallbackPhoto;

  const handle = () => { onAdd(product); setAdded(true); setTimeout(() => setAdded(false), 1500); };

  return (
    <div className="fcard-wrap" style={{ animationDelay:`${delay}s` }}>
      {/* Photo area */}
      <div className="fcard-photo">
        {!imgErr
          ? <img src={imgSrc} alt={product.name} onError={() => setImgErr(true)} />
          : <div className="fcard-emoji">{product.emoji}</div>
        }
        <div className="fcard-photo-overlay" />
        {product.badge && (
          <div className="fcard-badge-wrap">
            <span className="fcard-badge">{product.badge}</span>
          </div>
        )}
        <div className="fcard-cat-tag">{product.category}</div>
      </div>

      {/* Body */}
      <div className="fcard-body">
        <div className="fcard-name">{product.name}</div>
        {product.description && <div className="fcard-desc">{product.description}</div>}
        <div className="fcard-foot">
          <div className="fcard-price">
            <span className="fcard-rs">Rs </span>{product.price}
          </div>
          <button className={`fcard-btn${added ? " fcard-added" : ""}`} onClick={handle}>
            {added
              ? <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:12,height:12}}><polyline points="20 6 9 17 4 12"/></svg>Added</>
              : <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{width:11,height:11}}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   FEATURED STRIP
───────────────────────────────────────────────── */
function FeaturedStrip({ onAdd, setPage }) {
  const featured = PRODUCTS.filter(p => p.featured);
  return (
    <section className="fs-section">
      <style>{`
        .fs-section {
          background:var(--ivory);
          padding:96px 48px;
          position:relative; overflow:hidden;
        }
        /* Subtle warm radial glow */
        .fs-section::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse 70% 50% at 50% 0%,rgba(196,145,64,.07) 0%,transparent 65%);
        }
        /* Diamond separator */
        .fs-sep {
          display:flex; align-items:center; gap:16px; margin-bottom:60px;
        }
        .fs-sep-line { flex:1; height:1px; background:linear-gradient(to right,transparent,rgba(196,145,64,.3)); }
        .fs-sep-line.r { background:linear-gradient(to left,transparent,rgba(196,145,64,.3)); }
        .fs-sep-diamond { width:7px; height:7px; background:var(--gold); opacity:.5; transform:rotate(45deg); flex-shrink:0; }

        .fs-inner { max-width:1280px; margin:0 auto; position:relative; }
        .fs-head {
          display:grid; grid-template-columns:1fr auto;
          align-items:flex-end; gap:24px; margin-bottom:52px; flex-wrap:wrap;
        }
        @media(max-width:640px){ .fs-head { grid-template-columns:1fr; } }
        .btn-all {
          display:inline-flex; align-items:center; gap:9px;
          background:var(--white); color:var(--text);
          font-family:'Cinzel',serif; font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
          padding:12px 24px; border-radius:4px; border:1.5px solid var(--border-g);
          cursor:pointer; transition:all .22s; white-space:nowrap;
          box-shadow:0 2px 10px rgba(42,21,6,.06);
        }
        .btn-all:hover { background:var(--choc); color:var(--gold-lt); border-color:var(--choc); box-shadow:0 6px 22px rgba(42,21,6,.2); transform:translateY(-2px); }
        .btn-all svg { width:14px; height:14px; transition:transform .25s; }
        .btn-all:hover svg { transform:translateX(3px); }

        /* GRID */
        .fs-grid {
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(270px,1fr));
          gap:24px;
        }
        @media(max-width:600px){ .fs-grid { grid-template-columns:1fr 1fr; gap:14px; } }
        @media(max-width:400px){ .fs-grid { grid-template-columns:1fr; } }

        /* FEATURED CARD */
        .fcard-wrap {
          background:var(--white);
          border:1px solid var(--border);
          border-radius:4px; overflow:hidden;
          display:flex; flex-direction:column;
          box-shadow:0 2px 12px rgba(42,21,6,.06);
          transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .2s;
          opacity:0; animation:fadeUp .55s ease forwards;
          cursor:default;
        }
        .fcard-wrap:hover {
          transform:translateY(-8px);
          box-shadow:0 20px 56px rgba(42,21,6,.14);
          border-color:var(--border-g);
        }

        /* photo */
        .fcard-photo {
          position:relative; height:220px; overflow:hidden;
          background:var(--ivory);
          flex-shrink:0;
        }
        .fcard-photo img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition:transform .65s cubic-bezier(.22,1,.36,1);
          filter:brightness(.95)saturate(.9);
        }
        .fcard-wrap:hover .fcard-photo img { transform:scale(1.07); filter:brightness(.98)saturate(1); }
        .fcard-photo-overlay {
          position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(to top,rgba(30,14,4,.5) 0%,transparent 50%);
        }
        .fcard-emoji {
          width:100%; height:100%; display:flex; align-items:center; justify-content:center;
          font-size:72px; background:var(--ivory);
        }
        .fcard-badge-wrap { position:absolute; top:12px; left:12px; z-index:2; }
        .fcard-badge {
          font-family:'Cinzel',serif; font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
          padding:3px 10px; border-radius:20px;
          background:rgba(196,145,64,.18); color:var(--gold); border:1px solid rgba(196,145,64,.4);
        }
        .fcard-cat-tag {
          position:absolute; bottom:10px; right:10px; z-index:2;
          font-family:'Cinzel',serif; font-size:8px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
          color:rgba(255,255,255,.7); background:rgba(30,14,4,.55); backdrop-filter:blur(8px);
          border:1px solid rgba(255,255,255,.1); padding:3px 9px; border-radius:20px;
        }

        /* body */
        .fcard-body { padding:20px 22px 22px; flex:1; display:flex; flex-direction:column; }
        .fcard-name {
          font-family:'Playfair Display',serif;
          font-size:20px; font-weight:700; color:var(--choc);
          line-height:1.2; margin-bottom:7px; letter-spacing:-.01em;
        }
        .fcard-desc {
          font-family:'DM Sans',sans-serif;
          font-size:13px; color:var(--text-mid); line-height:1.78;
          flex:1; margin-bottom:18px; font-weight:300;
        }
        .fcard-foot {
          display:flex; align-items:center; justify-content:space-between;
          padding-top:14px; border-top:1px solid var(--border);
        }
        .fcard-price {
          font-family:'Playfair Display',serif;
          font-size:26px; font-weight:900; color:var(--choc); line-height:1;
        }
        .fcard-rs { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:500; color:var(--text-dim); }

        .fcard-btn {
          display:inline-flex; align-items:center; gap:6px;
          background:var(--choc); color:var(--gold-lt);
          font-family:'Cinzel',serif; font-size:9.5px; font-weight:700; letter-spacing:.13em; text-transform:uppercase;
          padding:9px 18px; border-radius:3px; border:none; cursor:pointer;
          transition:all .22s; box-shadow:0 2px 10px rgba(42,21,6,.22);
          position:relative; overflow:hidden;
        }
        .fcard-btn::before {
          content:''; position:absolute; top:-50%; left:-60%; width:40%; height:200%;
          background:linear-gradient(to right,transparent,rgba(232,201,122,.18),transparent);
          transform:skewX(-20deg); transition:left .5s;
        }
        .fcard-btn:hover::before { left:130%; }
        .fcard-btn:hover { background:var(--choc-mid); box-shadow:0 5px 20px rgba(42,21,6,.3); transform:translateY(-1px); }
        .fcard-added { background:#1e3a18 !important; color:#86efac !important; box-shadow:none !important; transform:none !important; }
        .fcard-added::before { display:none; }
      `}</style>

      <div className="fs-inner">
        {/* Separator */}
        <div className="fs-sep">
          <div className="fs-sep-line" />
          <div className="fs-sep-diamond" />
          <div className="fs-sep-line r" />
        </div>

        {/* Head */}
        <div className="fs-head">
          <div>
            <div className="sec-ey">
              <div className="sec-ey-line" />
              <span className="sec-ey-text">Hand-Picked</span>
            </div>
            <h2 className="sec-title">Featured <em>Treats</em></h2>
            <p className="sec-sub">Our most-loved bakes, made fresh every morning at both branches.</p>
          </div>
          <button className="btn-all" onClick={() => setPage("menu")}>
            Full Menu
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div className="fs-grid">
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} product={p} onAdd={onAdd} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   WHY AMA — deep choc section
───────────────────────────────────────────────── */
function WhyAma() {
  const pillars = [
    { icon:"🫙", title:"Open Kitchen",   desc:"Watch your food being made fresh — no shortcuts, no hidden processes." },
    { icon:"💰", title:"From Rs 30",      desc:"Quality bakes shouldn't be a luxury. Ama keeps prices honest for everyone." },
    { icon:"🌿", title:"Fresh Daily",     desc:"Everything baked in small batches each morning. Nothing goes stale." },
    { icon:"📍", title:"2 Branches",      desc:"Boudha & Swayambhu — both near iconic Kathmandu landmarks." },
  ];
  return (
    <section className="wa-section">
      <style>{`
        .wa-section {
          background:var(--choc);
          padding:100px 48px;
          position:relative; overflow:hidden;
          background-image:radial-gradient(ellipse 70% 60% at 20% 50%,rgba(196,145,64,.07) 0%,transparent 65%);
        }
        /* dot texture */
        .wa-section::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image:radial-gradient(circle,rgba(196,145,64,.045) 1px,transparent 1px);
          background-size:30px 30px;
        }
        .wa-inner { max-width:1280px; margin:0 auto; position:relative; }
        .wa-grid {
          display:grid; grid-template-columns:1fr 1fr;
          gap:80px; align-items:center;
        }
        @media(max-width:860px) { .wa-grid { grid-template-columns:1fr; gap:52px; } }

        /* left prose */
        .wa-desc {
          font-family:'DM Sans',sans-serif; font-size:15px; font-weight:300;
          line-height:1.88; color:rgba(255,255,255,.5); margin-top:18px; max-width:460px;
        }
        /* founder card */
        .wa-founder {
          display:flex; align-items:center; gap:16px; margin-top:36px;
          background:rgba(196,145,64,.09); border:1px solid rgba(196,145,64,.22);
          border-radius:12px; padding:18px 22px;
        }
        .wa-founder-av {
          width:52px; height:52px; border-radius:50%; flex-shrink:0;
          background:linear-gradient(135deg,var(--gold),var(--gold-lt));
          display:flex; align-items:center; justify-content:center; font-size:24px;
          box-shadow:0 4px 16px rgba(196,145,64,.3);
        }
        .wa-founder-name { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#fff; }
        .wa-founder-role {
          font-family:'Cinzel',serif; font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
          color:var(--gold); margin-top:3px;
        }

        /* pillars grid */
        .wa-pillars { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media(max-width:480px) { .wa-pillars { grid-template-columns:1fr; } }

        .wa-pillar {
          background:rgba(255,255,255,.03); border:1px solid rgba(196,145,64,.14); border-radius:12px;
          padding:24px; transition:all .28s; cursor:default;
          opacity:0; animation:fadeUp .5s ease forwards;
        }
        .wa-pillar:hover {
          background:rgba(196,145,64,.07);
          border-color:rgba(196,145,64,.32);
          transform:translateY(-4px);
          box-shadow:0 12px 36px rgba(0,0,0,.2);
        }
        /* gold top bar on hover */
        .wa-pillar { position:relative; overflow:hidden; }
        .wa-pillar::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(to right,var(--gold),var(--gold-lt),transparent);
          opacity:0; transition:opacity .25s;
        }
        .wa-pillar:hover::before { opacity:1; }

        .wa-pillar-ico   { font-size:28px; margin-bottom:14px; }
        .wa-pillar-num   {
          position:absolute; bottom:16px; right:18px;
          font-family:'Playfair Display',serif; font-size:42px; font-weight:900;
          color:rgba(196,145,64,.07); line-height:1; pointer-events:none;
        }
        .wa-pillar-title { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#fff; margin-bottom:8px; }
        .wa-pillar-desc  { font-family:'DM Sans',sans-serif; font-size:12.5px; color:rgba(255,255,255,.45); line-height:1.75; font-weight:300; }
      `}</style>
      <div className="wa-inner">
        <div className="wa-grid">
          {/* Left */}
          <div>
            <div className="sec-ey">
              <div className="sec-ey-line" />
              <span className="sec-ey-text">Why Ama?</span>
            </div>
            <h2 className="sec-title sec-title-white">Baked with <em>Honesty</em>,<br/>Served with Love</h2>
            <p className="wa-desc">
              Every item is made in an open kitchen — you can watch your food being prepared. No shortcuts, no mystery ingredients. Just quality, care, and the warmth of a mother's touch.
            </p>
            <div className="wa-founder">
              <div className="wa-founder-av">👩</div>
              <div>
                <div className="wa-founder-name">Mangal Maya Bajracharya</div>
                <div className="wa-founder-role">Founder &amp; Head Baker</div>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="wa-pillars">
            {pillars.map((p, i) => (
              <div key={p.title} className="wa-pillar" style={{ animationDelay:`${.1+i*.08}s` }}>
                <div className="wa-pillar-num">0{i+1}</div>
                <div className="wa-pillar-ico">{p.icon}</div>
                <div className="wa-pillar-title">{p.title}</div>
                <div className="wa-pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   REVIEWS
───────────────────────────────────────────────── */
function ReviewsStrip() {
  const reviews = [
    { t:"The pumpkin bites are absolutely unique — I've never had anything like them anywhere in Kathmandu. Totally addictive.", a:"Priya S.", loc:"Boudha" },
    { t:"The open kitchen is what sold me. You can see everything being made fresh — so clean and trustworthy.", a:"Rohan T.", loc:"Lalitpur" },
    { t:"Dora cake + morning tea = perfect day. Budget-friendly and genuinely delicious. My daily ritual.", a:"Sita M.", loc:"Kathmandu" },
    { t:"The coconut cake is heavenly! Moist, not too sweet, and perfectly sized. Will definitely be back.", a:"Arjun K.", loc:"Swayambhu" },
  ];
  return (
    <section className="rv-section">
      <style>{`
        .rv-section {
          background:var(--ivory-lt);
          padding:100px 48px;
          border-top:1px solid var(--border);
          position:relative; overflow:hidden;
        }
        .rv-section::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:radial-gradient(ellipse 60% 40% at 50% 100%,rgba(196,145,64,.06) 0%,transparent 70%);
        }
        .rv-inner { max-width:1280px; margin:0 auto; position:relative; }
        .rv-head { text-align:center; margin-bottom:56px; }
        .rv-head .sec-ey { justify-content:center; }
        .rv-head .sec-sub { margin:10px auto 0; text-align:center; }

        .rv-grid {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
          gap:20px;
        }
        @media(max-width:560px){ .rv-grid { grid-template-columns:1fr; } }

        .rv-card {
          background:var(--white); border-radius:4px;
          border:1px solid var(--border);
          box-shadow:0 2px 12px rgba(42,21,6,.06);
          padding:28px; transition:all .3s;
          opacity:0; animation:fadeUp .5s ease forwards;
          position:relative; overflow:hidden;
        }
        .rv-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:3px;
          background:linear-gradient(to right,var(--gold),var(--gold-lt),transparent);
          opacity:0; transition:opacity .25s;
        }
        .rv-card:hover { transform:translateY(-5px); box-shadow:0 14px 40px rgba(42,21,6,.12); border-color:var(--border-g); }
        .rv-card:hover::before { opacity:1; }

        .rv-stars { color:var(--gold); font-size:13px; letter-spacing:2px; margin-bottom:16px; }
        .rv-quote {
          font-family:'Playfair Display',serif; font-style:italic;
          font-size:14px; color:var(--text-mid); line-height:1.8;
          margin-bottom:20px;
        }
        .rv-divider { height:1px; background:var(--border); margin-bottom:14px; }
        .rv-author { font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:var(--choc); }
        .rv-loc {
          font-family:'Cinzel',serif; font-size:9px; font-weight:600; letter-spacing:.14em;
          text-transform:uppercase; color:var(--text-dim); margin-top:4px;
        }
      `}</style>
      <div className="rv-inner">
        <div className="rv-head">
          <div className="sec-ey">
            <div className="sec-ey-line" />
            <span className="sec-ey-text">Customer Love</span>
            <div className="sec-ey-line" style={{ background:"linear-gradient(to right,rgba(196,145,64,.7),transparent)" }} />
          </div>
          <h2 className="sec-title" style={{ marginTop:10 }}>What <em>Kathmandu</em> Says</h2>
          <p className="sec-sub">Real words from real customers who walk through our doors every day.</p>
        </div>
        <div className="rv-grid">
          {reviews.map((r,i) => (
            <div key={i} className="rv-card" style={{ animationDelay:`${i*.08}s` }}>
              <div className="rv-stars">★★★★★</div>
              <div className="rv-quote">"{r.t}"</div>
              <div className="rv-divider" />
              <div className="rv-author">{r.a}</div>
              <div className="rv-loc">📍 {r.loc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────────────── */
export default function HomePage({ onAdd, setPage }) {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <AmaHero setPage={setPage} />
      <FeaturedStrip onAdd={onAdd} setPage={setPage} />
      <WhyAma />
      <ReviewsStrip />
    </>
  );
}
