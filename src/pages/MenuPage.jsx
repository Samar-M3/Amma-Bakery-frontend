// pages/MenuPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Full product catalog — luxury editorial style matching Ama Bakery's brand.

import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "../data/products.js";
import { IC } from "../data/icons.jsx";

// ── Real Unsplash photo map by category / keyword ─────────────────────────────
const PHOTO_MAP = [
  { keys: ["croissant","butter","flaky"],   src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop" },
  { keys: ["cake","dora","coconut","slice"],$src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80&auto=format&fit=crop" },
  { keys: ["cookie","biscuit","chocolate"], src: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop" },
  { keys: ["bread","loaf","sourdough"],     src: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80&auto=format&fit=crop" },
  { keys: ["muffin","cupcake"],             src: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80&auto=format&fit=crop" },
  { keys: ["donut","doughnut"],             src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop" },
  { keys: ["tart","pastry","danish"],       src: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80&auto=format&fit=crop" },
  { keys: ["pumpkin","bite","snack"],       src: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=600&q=80&auto=format&fit=crop" },
  { keys: ["sandwich","savory"],            src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80&auto=format&fit=crop" },
  { keys: ["roll","bun","sweet"],           src: "https://images.unsplash.com/photo-1600626334041-e64e3369e69e?w=600&q=80&auto=format&fit=crop" },
];

const CATEGORY_PHOTOS = {
  "All":      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1400&q=85&auto=format&fit=crop",
  "Breads":   "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=1400&q=85&auto=format&fit=crop",
  "Cakes":    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1400&q=85&auto=format&fit=crop",
  "Pastries": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1400&q=85&auto=format&fit=crop",
  "Cookies":  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1400&q=85&auto=format&fit=crop",
  "Savory":   "https://images.unsplash.com/photo-1528735602780-2352fd46c7af?w=1400&q=85&auto=format&fit=crop",
};

function getPhoto(product) {
  if (product.photo) return product.photo;
  const text = `${product.name} ${product.description || ""} ${product.category || ""}`.toLowerCase();
  for (const entry of PHOTO_MAP) {
    if (entry.keys.some(k => text.includes(k))) return entry.src || entry.$src;
  }
  return "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80&auto=format&fit=crop";
}

function getBannerPhoto(category) {
  return CATEGORY_PHOTOS[category] || CATEGORY_PHOTOS["All"];
}

// ── Badge chip ────────────────────────────────────────────────────────────────
function Chip({ label }) {
  if (!label) return null;
  const map = {
    "New":       { bg: "rgba(110,231,183,0.12)", color: "#6ee7b7", border: "rgba(110,231,183,0.3)" },
    "Popular":   { bg: "rgba(201,168,76,0.12)",  color: "#e8c97a", border: "rgba(201,168,76,0.35)" },
    "Best Seller":{ bg:"rgba(239,68,68,0.1)",    color: "#fca5a5", border: "rgba(239,68,68,0.3)" },
    "Seasonal":  { bg: "rgba(167,139,250,0.12)", color: "#c4b5fd", border: "rgba(167,139,250,0.3)" },
  };
  const s = map[label] || map["New"];
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
      padding: "3px 9px", borderRadius: 20,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>{label}</span>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
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
        {/* top-left badge */}
        {product.badge && (
          <div className="mc-badge-wrap"><Chip label={product.badge} /></div>
        )}
        {/* category tag bottom-right */}
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

// ── Main Page ─────────────────────────────────────────────────────────────────
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600;1,700&family=Cinzel:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

        /* ── Page wrapper ── */
        .mp { padding-top: 72px; min-height: 100vh; background: #f5ede0; }

        /* ── HERO BANNER ── */
        .mp-hero {
          position: relative; height: 380px; overflow: hidden;
          display: flex; align-items: flex-end;
        }
        .mp-hero-img {
          position: absolute; inset: 0; z-index: 0;
          width: 100%; height: 100%; object-fit: cover; object-position: center 40%;
          transition: opacity 0.6s ease;
          filter: brightness(0.55) saturate(0.8);
          animation: heroZoom 16s ease-in-out infinite alternate;
        }
        @keyframes heroZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        /* layered overlays */
        .mp-hero-grad {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background:
            linear-gradient(to top,    rgba(22,14,5,0.95) 0%, rgba(22,14,5,0.5) 40%, transparent 100%),
            linear-gradient(to right,  rgba(22,14,5,0.5)  0%, transparent 60%);
        }
        /* grain */
        .mp-hero-grain {
          position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23f)'/%3E%3C/svg%3E");
          background-size: 280px 280px;
        }
        /* gold top rule */
        .mp-hero::before {
          content: ''; position: absolute; top: 72px; left: 0; right: 0; height: 1px; z-index: 3;
          background: linear-gradient(to right, transparent, rgba(201,168,76,0.2) 25%, rgba(201,168,76,0.2) 75%, transparent);
        }

        .mp-hero-content {
          position: relative; z-index: 4;
          width: 100%; max-width: 1280px; margin: 0 auto;
          padding: 0 80px 52px;
        }
        .mp-hero-eyebrow {
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
          opacity: 0; animation: riseIn 0.6s 0.05s ease forwards;
        }
        .mp-hero-eyebrow-line { width: 32px; height: 1px; background: rgba(201,168,76,0.5); }
        .mp-hero-eyebrow-text {
          font-family: 'Cinzel', serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase; color: rgba(201,168,76,0.8);
        }
        .mp-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 700; line-height: 0.9; letter-spacing: -0.03em;
          color: #fff; margin: 0;
          opacity: 0; animation: riseIn 0.7s 0.12s ease forwards;
        }
        .mp-hero h1 em {
          font-style: italic; color: #e8c97a;
        }
        .mp-hero-sub {
          font-size: 14px; color: rgba(255,255,255,0.5); margin-top: 14px;
          font-weight: 300; letter-spacing: 0.04em;
          opacity: 0; animation: riseIn 0.6s 0.2s ease forwards;
        }
        .mp-hero-sub strong { color: #e8c97a; font-weight: 600; }

        /* ── STICKY CONTROLS BAR ── */
        .mp-controls-bar {
          position: sticky; top: 72px; z-index: 50;
          background: rgba(245,237,224,0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201,168,76,0.15);
          padding: 0 80px;
        }
        .mp-controls-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; gap: 16px;
          padding: 14px 0; flex-wrap: wrap;
        }

        /* Search */
        .mp-search-wrap { position: relative; flex-shrink: 0; }
        .mp-search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          width: 14px; height: 14px; color: #8b6914; opacity: 0.6;
        }
        .mp-search {
          width: 220px;
          background: rgba(255,255,255,0.7);
          border: 1.5px solid rgba(201,168,76,0.25);
          border-radius: 8px;
          padding: 9px 14px 9px 40px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #2d1a0a; outline: none;
          transition: border 0.2s, background 0.2s;
          box-shadow: 0 1px 6px rgba(0,0,0,0.06);
        }
        .mp-search::placeholder { color: rgba(90,55,20,0.4); }
        .mp-search:focus { border-color: #c9a84c; background: #fff; }

        /* result count */
        .mp-count {
          font-family: 'Cinzel', serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(90,55,20,0.4); white-space: nowrap;
        }

        /* divider */
        .mp-ctrl-sep { width: 1px; height: 22px; background: rgba(201,168,76,0.25); flex-shrink: 0; }

        /* Category pills */
        .cat-pills { display: flex; gap: 6px; flex-wrap: wrap; flex: 1; }
        .cat-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.04em;
          padding: 7px 16px; border-radius: 6px;
          border: 1.5px solid rgba(201,168,76,0.2);
          background: rgba(255,255,255,0.5);
          color: rgba(58,32,15,0.6);
          cursor: pointer; transition: all 0.2s;
          white-space: nowrap;
        }
        .cat-pill:hover { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.4); color: #3a200f; }
        .cat-pill.active {
          background: #160e05; border-color: #160e05;
          color: #e8c97a; font-weight: 600;
          box-shadow: 0 2px 12px rgba(22,14,5,0.2);
        }

        /* ── CATALOG BODY ── */
        .mp-body {
          max-width: 1280px; margin: 0 auto;
          padding: 48px 80px 96px;
        }

        /* Section heading above grid */
        .mp-section-head {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 32px; flex-wrap: wrap; gap: 8px;
        }
        .mp-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 700; font-style: italic;
          color: #160e05; letter-spacing: -0.02em;
        }
        .mp-section-rule {
          flex: 1; height: 1px; margin: 0 20px 4px;
          background: linear-gradient(to right, rgba(201,168,76,0.4), transparent);
        }

        /* ── CARD GRID ── */
        .mp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        /* ── MENU CARD ── */
        .mc {
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid rgba(201,168,76,0.12);
          box-shadow: 0 2px 16px rgba(22,14,5,0.06);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s, border-color 0.2s;
          display: flex; flex-direction: column;
          opacity: 0; animation: riseIn 0.55s ease forwards;
        }
        .mc:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 56px rgba(22,14,5,0.14);
          border-color: rgba(201,168,76,0.35);
        }

        /* image area */
        .mc-img {
          position: relative; height: 200px; overflow: hidden;
          background: linear-gradient(135deg, #f5ede0, #e8d5b0);
        }
        .mc-img img {
          width: 100%; height: 100%; object-fit: cover; object-position: center;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
          filter: brightness(0.96) saturate(0.95);
        }
        .mc:hover .mc-img img { transform: scale(1.06); }
        .mc-img-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background:
            linear-gradient(to top, rgba(22,14,5,0.5) 0%, transparent 50%),
            linear-gradient(to bottom, rgba(22,14,5,0.1) 0%, transparent 30%);
        }
        .mc-img-fallback {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 72px;
          background: linear-gradient(135deg, #f5ede0, #e8c97a44);
        }
        .mc-badge-wrap {
          position: absolute; top: 12px; left: 12px; z-index: 2;
        }
        .mc-cat-tag {
          position: absolute; bottom: 12px; right: 12px; z-index: 2;
          font-family: 'Cinzel', serif;
          font-size: 8.5px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          background: rgba(22,14,5,0.45);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 3px 9px; border-radius: 20px;
        }

        /* body */
        .mc-body { padding: 20px 20px 22px; flex: 1; display: flex; flex-direction: column; }
        .mc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700; color: #160e05;
          line-height: 1.15; margin-bottom: 7px; letter-spacing: -0.01em;
        }
        .mc-desc {
          font-size: 12.5px; color: rgba(58,32,15,0.55);
          line-height: 1.7; flex: 1; margin-bottom: 18px;
          font-weight: 300;
        }

        /* footer */
        .mc-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(201,168,76,0.15);
        }
        .mc-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 700; color: #160e05;
          line-height: 1;
        }
        .mc-price-rs {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          color: rgba(58,32,15,0.45); margin-right: 2px;
        }
        .mc-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: #160e05; color: #e8c97a;
          font-family: 'Cinzel', serif; font-size: 10px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 9px 18px; border-radius: 4px; border: none; cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 2px 10px rgba(22,14,5,0.18);
        }
        .mc-btn svg { width: 12px; height: 12px; flex-shrink: 0; }
        .mc-btn:hover { background: #3a200f; box-shadow: 0 4px 20px rgba(22,14,5,0.28); transform: translateY(-1px); }
        .mc-btn-ok { background: #1a3a1a; color: #86efac; }
        .mc-btn-ok:hover { background: #1a3a1a; transform: none; }

        /* empty state */
        .mp-empty {
          text-align: center; padding: 80px 32px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-style: italic; color: rgba(58,32,15,0.35);
        }

        /* ── KEYFRAMES ── */
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .mp-hero-content { padding: 0 24px 40px; }
          .mp-controls-bar { padding: 0 20px; }
          .mp-body { padding: 32px 20px 64px; }
          .mp-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
          .mp-search { width: 100%; }
        }
      `}</style>

      <div className="mp">

        {/* ── HERO BANNER ── */}
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
              <span className="mp-hero-eyebrow-text">Fresh Every Morning · Kathmandu</span>
            </div>
            <h1>Our <em>Menu</em></h1>
            <p className="mp-hero-sub">
              Prices start from <strong>Rs 30</strong> &nbsp;·&nbsp; Cash &amp; eSewa accepted &nbsp;·&nbsp; Open Kitchen
            </p>
          </div>
        </div>

        {/* ── STICKY CONTROLS ── */}
        <div className="mp-controls-bar">
          <div className="mp-controls-inner">
            {/* Search */}
            <div className="mp-search-wrap">
              <span className="mp-search-icon">{IC.spark}</span>
              <input
                className="mp-search"
                placeholder="Search items…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="mp-ctrl-sep" />

            {/* Category pills */}
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

            {/* Result count */}
            <span className="mp-count">{filtered.length} items</span>
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="mp-body">
          <div className="mp-section-head">
            <div className="mp-section-title">
              {activeCategory === "All" ? "All Items" : activeCategory}
            </div>
            <div className="mp-section-rule" />
          </div>

          {filtered.length === 0 ? (
            <div className="mp-empty">No items found — try a different search 🍞</div>
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