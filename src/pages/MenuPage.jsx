// pages/MenuPage.jsx
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Full product catalog - warm, earthy brown bakery theme for Ama Bakery.

import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "../data/products.js";
import { IC } from "../data/icons.jsx";
import menuAllPhoto from "../image/space.webp";
import menuMuffinsPhoto from "../image/pastery1.webp";
import menuSnacksPhoto from "../image/ball.webp";
import menuCakesPhoto from "../image/cake.webp";
import menuBreadsPhoto from "../image/ama.jpg";
import menuCookiesPhoto from "../image/cake.png";
import menuPastriesPhoto from "../image/pastery.webp";

// â”€â”€ Local photo map by category / keyword â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_PRODUCT_PHOTO = menuAllPhoto;

const CATEGORY_PHOTOS = {
  All: menuAllPhoto,
  Muffins: menuMuffinsPhoto,
  Snacks: menuSnacksPhoto,
  Cakes: menuCakesPhoto,
  Breads: menuBreadsPhoto,
  Cookies: menuCookiesPhoto,
  Pastries: menuPastriesPhoto,
  Savory: menuSnacksPhoto,
};

function getPhoto(product) {
  if (product.photo) return product.photo;
  return CATEGORY_PHOTOS[product.category] || DEFAULT_PRODUCT_PHOTO;
}

function getBannerPhoto(category) {
  return CATEGORY_PHOTOS[category] || CATEGORY_PHOTOS["All"];
}
function Chip({ label }) {
  if (!label) return null;
  const map = {
    "New":        { bg: "rgba(134,179,116,0.18)", color: "#a8d89a", border: "rgba(134,179,116,0.4)" },
    "Popular":    { bg: "rgba(205,158,75,0.18)",  color: "#ddb96e", border: "rgba(205,158,75,0.45)" },
    "Best Seller":{ bg: "rgba(192,90,60,0.16)",   color: "#e8a088", border: "rgba(192,90,60,0.35)" },
    "Seasonal":   { bg: "rgba(169,130,90,0.18)",  color: "#d4b48c", border: "rgba(169,130,90,0.4)" },
  };
  const s = map[label] || map["New"];
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
      padding: "3px 10px", borderRadius: 20,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>{label}</span>
  );
}

// â”€â”€ Product Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MenuCard({ product, onAdd, idx }) {
  const [added, setAdded] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const handle = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mc" style={{ animationDelay: `${idx * 0.055}s` }}>
      {/* Photo */}
      <div className="mc-img">
        {!imgErr ? (
          <img
            src={getPhoto(product)}
            alt={product.name}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="mc-img-fallback">{product.emoji}</div>
        )}
        <div className="mc-img-overlay" />
        {product.badge && (
          <div className="mc-badge-wrap"><Chip label={product.badge} /></div>
        )}
        <div className="mc-cat-tag">{product.category}</div>
      </div>

      {/* Body */}
      <div className="mc-body">
        <div className="mc-name">{product.name}</div>
        {product.description && (
          <div className="mc-desc">{product.description}</div>
        )}
        <div className="mc-foot">
          <div className="mc-price">
            <span className="mc-price-rs">Rs</span>
            {product.price}
          </div>
          <button
            className={`mc-btn${added ? " mc-btn-ok" : ""}`}
            onClick={handle}
          >
            {added ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Added
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function MenuPage({ onAdd }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const bannerSrc = getBannerPhoto(activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Cinzel:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        /* â”€â”€â”€ CSS VARIABLES â”€â”€â”€ */
        :root {
          --brown-ink:      #2a1506;
          --brown-deep:     #3d1c08;
          --brown-mid:      #6b3518;
          --brown-warm:     #8c4a22;
          --brown-light:    #b87242;
          --gold:           #c9914c;
          --gold-pale:      #ddb96e;
          --gold-bright:    #e8c97a;
          --cream-dark:     #e8d5b8;
          --cream-base:     #f0e0c4;
          --cream-light:    #f7ece0;
          --cream-pale:     #fdf6ed;
          --paper:          #f9f2e7;
          --text-body:      rgba(58,28,10,0.72);
          --text-muted:     rgba(80,42,18,0.45);
          --border-warm:    rgba(160,100,50,0.18);
          --border-gold:    rgba(201,145,76,0.28);
          --shadow-sm:      0 2px 12px rgba(42,21,6,0.08);
          --shadow-md:      0 6px 28px rgba(42,21,6,0.12);
          --shadow-lg:      0 20px 60px rgba(42,21,6,0.18);
        }

        /* â”€â”€ Page wrapper â”€â”€ */
        .mp {
          padding-top: 72px;
          min-height: 100vh;
          /* Layered warm paper background */
          background-color: var(--paper);
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E"),
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(160,90,40,0.07) 0%, transparent 70%),
            linear-gradient(180deg, var(--cream-light) 0%, var(--paper) 20%, var(--paper) 100%);
        }

        /* â”€â”€ HERO BANNER â”€â”€ */
        .mp-hero {
          position: relative; height: 400px; overflow: hidden;
          display: flex; align-items: flex-end;
        }
        .mp-hero-img {
          position: absolute; inset: 0; z-index: 0;
          width: 100%; height: 100%; object-fit: cover; object-position: center 40%;
          transition: opacity 0.7s ease;
          filter: brightness(0.45) saturate(0.7) sepia(0.25);
          animation: heroZoom 18s ease-in-out infinite alternate;
        }
        @keyframes heroZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.07); }
        }

        /* warm brown multi-layer gradient overlay */
        .mp-hero-grad {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background:
            linear-gradient(to top,    rgba(28,12,4,0.97) 0%, rgba(45,20,8,0.65) 35%, rgba(60,28,10,0.2) 70%, transparent 100%),
            linear-gradient(to right,  rgba(28,12,4,0.55) 0%, rgba(50,24,10,0.15) 50%, transparent 100%),
            linear-gradient(135deg,    rgba(100,48,18,0.15) 0%, transparent 60%);
        }

        /* warm grain overlay */
        .mp-hero-grain {
          position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0.055;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23f)'/%3E%3C/svg%3E");
          background-size: 260px 260px;
        }

        /* warm amber top rule */
        .mp-hero::before {
          content: ''; position: absolute; top: 72px; left: 0; right: 0; height: 1px; z-index: 3;
          background: linear-gradient(to right, transparent, rgba(201,145,76,0.25) 25%, rgba(201,145,76,0.25) 75%, transparent);
        }

        /* warm bottom fade into page */
        .mp-hero::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 80px; z-index: 3;
          background: linear-gradient(to top, var(--paper) 0%, transparent 100%);
          pointer-events: none;
        }

        .mp-hero-content {
          position: relative; z-index: 4;
          width: 100%; max-width: 1280px; margin: 0 auto;
          padding: 0 80px 56px;
        }
        .mp-hero-eyebrow {
          display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
          opacity: 0; animation: riseIn 0.6s 0.05s ease forwards;
        }
        .mp-hero-eyebrow-line {
          width: 36px; height: 1px;
          background: linear-gradient(to right, var(--gold), transparent);
        }
        .mp-hero-eyebrow-text {
          font-family: 'Cinzel', serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--gold-pale); opacity: 0.85;
        }
        .mp-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(54px, 7.5vw, 100px);
          font-weight: 700; line-height: 0.88; letter-spacing: -0.03em;
          color: var(--cream-pale); margin: 0;
          text-shadow: 0 4px 32px rgba(28,12,4,0.6);
          opacity: 0; animation: riseIn 0.7s 0.12s ease forwards;
        }
        .mp-hero h1 em {
          font-style: italic;
          color: var(--gold-bright);
          text-shadow: 0 2px 24px rgba(201,145,76,0.4);
        }
        .mp-hero-sub {
          font-size: 13.5px; color: rgba(240,224,196,0.5); margin-top: 16px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300; letter-spacing: 0.05em;
          opacity: 0; animation: riseIn 0.6s 0.22s ease forwards;
        }
        .mp-hero-sub strong { color: var(--gold-bright); font-weight: 500; }

        /* â”€â”€ STICKY CONTROLS BAR â”€â”€ */
        .mp-controls-bar {
          position: sticky; top: 72px; z-index: 50;
          background: rgba(249,242,231,0.94);
          backdrop-filter: blur(24px) saturate(1.4);
          border-bottom: 1px solid var(--border-gold);
          box-shadow: 0 2px 20px rgba(42,21,6,0.07);
          padding: 0 80px;
        }
        .mp-controls-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; gap: 16px;
          padding: 13px 0; flex-wrap: wrap;
        }

        /* Search */
        .mp-search-wrap { position: relative; flex-shrink: 0; }
        .mp-search-icon {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          width: 14px; height: 14px; color: var(--brown-mid); opacity: 0.55;
        }
        .mp-search {
          width: 220px;
          background: rgba(255,252,246,0.85);
          border: 1.5px solid var(--border-gold);
          border-radius: 6px;
          padding: 9px 14px 9px 38px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: var(--brown-ink); outline: none;
          transition: border 0.2s, background 0.2s, box-shadow 0.2s;
          box-shadow: var(--shadow-sm), inset 0 1px 3px rgba(42,21,6,0.04);
        }
        .mp-search::placeholder { color: var(--text-muted); }
        .mp-search:focus {
          border-color: var(--gold);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(201,145,76,0.12), var(--shadow-sm);
        }

        /* result count */
        .mp-count {
          font-family: 'Cinzel', serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--text-muted); white-space: nowrap;
        }

        /* divider */
        .mp-ctrl-sep {
          width: 1px; height: 22px;
          background: linear-gradient(to bottom, transparent, var(--border-gold), transparent);
          flex-shrink: 0;
        }

        /* Category pills */
        .cat-pills { display: flex; gap: 6px; flex-wrap: wrap; flex: 1; }
        .cat-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.03em;
          padding: 7px 16px; border-radius: 5px;
          border: 1.5px solid var(--border-warm);
          background: rgba(255,252,246,0.6);
          color: var(--brown-mid);
          cursor: pointer; transition: all 0.22s ease;
          white-space: nowrap;
        }
        .cat-pill:hover {
          background: rgba(201,145,76,0.1);
          border-color: var(--gold);
          color: var(--brown-deep);
          box-shadow: var(--shadow-sm);
        }
        .cat-pill.active {
          background: var(--brown-ink);
          border-color: var(--brown-ink);
          color: var(--gold-bright);
          font-weight: 600;
          box-shadow: 0 3px 14px rgba(42,21,6,0.25);
        }

        /* â”€â”€ CATALOG BODY â”€â”€ */
        .mp-body {
          max-width: 1280px; margin: 0 auto;
          padding: 52px 80px 100px;
        }

        /* Section heading */
        .mp-section-head {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 36px; flex-wrap: wrap; gap: 8px;
        }
        .mp-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px; font-weight: 700; font-style: italic;
          color: var(--brown-ink); letter-spacing: -0.02em;
        }
        .mp-section-rule {
          flex: 1; height: 1px; margin: 0 20px 5px;
          background: linear-gradient(to right, var(--gold) 0%, var(--border-warm) 50%, transparent 100%);
          opacity: 0.5;
        }

        /* â”€â”€ CARD GRID â”€â”€ */
        .mp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 26px;
        }

        /* â”€â”€ MENU CARD â”€â”€ */
        .mc {
          background: var(--cream-pale);
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid var(--border-warm);
          box-shadow: var(--shadow-sm);
          transition: transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s, border-color 0.25s;
          display: flex; flex-direction: column;
          opacity: 0; animation: riseIn 0.55s ease forwards;
        }
        .mc:hover {
          transform: translateY(-7px) rotate(0.2deg);
          box-shadow: var(--shadow-lg);
          border-color: var(--gold);
        }

        /* image area */
        .mc-img {
          position: relative; height: 210px; overflow: hidden;
          background: linear-gradient(135deg, var(--cream-dark), var(--brown-light));
        }
        .mc-img img {
          width: 100%; height: 100%; object-fit: cover; object-position: center;
          display: block;
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1);
          filter: brightness(0.94) saturate(0.92) sepia(0.06);
        }
        .mc:hover .mc-img img { transform: scale(1.07); filter: brightness(0.97) saturate(1) sepia(0.04); }
        .mc-img-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(to top, rgba(28,12,4,0.55) 0%, rgba(28,12,4,0.1) 45%, transparent 75%),
            linear-gradient(to bottom, rgba(28,12,4,0.12) 0%, transparent 25%);
        }
        .mc-img-fallback {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 72px;
          background: linear-gradient(135deg, var(--cream-dark), rgba(201,145,76,0.3));
        }
        .mc-badge-wrap {
          position: absolute; top: 12px; left: 12px; z-index: 2;
        }
        .mc-cat-tag {
          position: absolute; bottom: 12px; right: 12px; z-index: 2;
          font-family: 'Cinzel', serif;
          font-size: 8px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(240,220,190,0.75);
          background: rgba(28,12,4,0.55);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(201,145,76,0.2);
          padding: 3px 10px; border-radius: 20px;
        }

        /* body */
        .mc-body {
          padding: 20px 22px 22px; flex: 1; display: flex; flex-direction: column;
          background: var(--cream-pale);
          /* subtle warm paper texture on card body */
          background-image: linear-gradient(180deg, rgba(255,248,238,0.8) 0%, transparent 100%);
        }
        .mc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700; color: var(--brown-ink);
          line-height: 1.15; margin-bottom: 7px; letter-spacing: -0.01em;
        }
        .mc-desc {
          font-size: 12.5px; color: var(--text-body);
          line-height: 1.75; flex: 1; margin-bottom: 18px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
        }

        /* footer */
        .mc-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border-warm);
        }
        .mc-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700; color: var(--brown-ink);
          line-height: 1;
        }
        .mc-price-rs {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          color: var(--text-muted); margin-right: 2px;
        }
        .mc-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--brown-ink);
          color: var(--gold-bright);
          font-family: 'Cinzel', serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.13em; text-transform: uppercase;
          padding: 9px 18px; border-radius: 5px; border: none; cursor: pointer;
          transition: all 0.28s ease;
          box-shadow: 0 2px 12px rgba(42,21,6,0.22);
          position: relative; overflow: hidden;
        }
        /* shimmer on hover */
        .mc-btn::before {
          content: ''; position: absolute;
          top: -50%; left: -60%; width: 40%; height: 200%;
          background: linear-gradient(to right, transparent, rgba(232,201,122,0.18), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .mc-btn:hover::before { left: 130%; }
        .mc-btn svg { width: 12px; height: 12px; flex-shrink: 0; }
        .mc-btn:hover {
          background: var(--brown-deep);
          box-shadow: 0 5px 22px rgba(42,21,6,0.32);
          transform: translateY(-1px);
        }
        .mc-btn-ok {
          background: #1e3a18;
          color: #a7d99a;
          box-shadow: 0 2px 12px rgba(30,58,24,0.28);
        }
        .mc-btn-ok:hover { background: #1e3a18; transform: none; }
        .mc-btn-ok::before { display: none; }

        /* empty state */
        .mp-empty {
          text-align: center; padding: 80px 32px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-style: italic; color: var(--text-muted);
        }

        /* â”€â”€ KEYFRAMES â”€â”€ */
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* â”€â”€ RESPONSIVE â”€â”€ */
        @media (max-width: 768px) {
          .mp-hero { height: 340px; }
          .mp-hero-content { padding: 0 24px 40px; }
          .mp-controls-bar { padding: 0 20px; }
          .mp-body { padding: 32px 20px 64px; }
          .mp-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
          .mp-search { width: 100%; }
        }
      `}</style>

      <div className="mp">

        {/* â”€â”€ HERO BANNER â”€â”€ */}
        <div className="mp-hero">
          <img
            key={bannerSrc}
            className="mp-hero-img"
            src={bannerSrc}
            alt="Ama Bakery menu"
          />
          <div className="mp-hero-grad" />
          <div className="mp-hero-grain" />

          <div className="mp-hero-content">
            <div className="mp-hero-eyebrow">
              <div className="mp-hero-eyebrow-line" />
              <span className="mp-hero-eyebrow-text">Fresh Every Morning | Kathmandu</span>
            </div>
            <h1>Our <em>Menu</em></h1>
            <p className="mp-hero-sub">
              Prices start from <strong>Rs 30</strong> &nbsp;|&nbsp; Cash &amp; eSewa accepted &nbsp;|&nbsp; Open Kitchen
            </p>
          </div>
        </div>

        {/* â”€â”€ STICKY CONTROLS â”€â”€ */}
        <div className="mp-controls-bar">
          <div className="mp-controls-inner">
            <div className="mp-search-wrap">
              <span className="mp-search-icon">{IC.spark}</span>
              <input
                className="mp-search"
                placeholder="Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="mp-ctrl-sep" />

            <div className="cat-pills">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`cat-pill${activeCategory === c ? " active" : ""}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mp-ctrl-sep" />

            <span className="mp-count">{filtered.length} items</span>
          </div>
        </div>

        {/* â”€â”€ GRID â”€â”€ */}
        <div className="mp-body">
          <div className="mp-section-head">
            <div className="mp-section-title">
              {activeCategory === "All" ? "All Items" : activeCategory}
            </div>
            <div className="mp-section-rule" />
          </div>

          {filtered.length === 0 ? (
            <div className="mp-empty">No items found - try a different search.</div>
          ) : (
            <div className="mp-grid">
              {filtered.map((p, i) => (
                <MenuCard key={p.id} product={p} onAdd={onAdd} idx={i} />
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}

