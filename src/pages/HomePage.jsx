// pages/HomePage.jsx
// Hero + Featured Products + Why Ama + Customer Reviews

import { useState } from "react";
import { IC } from "../data/icons.jsx";
import { PRODUCTS, Rs } from "../data/products.js";
import Badge from "../components/Badge.jsx";
// AmaHero.jsx — Hero section only (no navbar, no custom cursor)

/* ─── FLOATING CARD ───────────────────────────────────────────── */
function FloatCard({ icon, title, val, sub, style, animClass }) {
  return (
    <div className={`float-card ${animClass}`} style={style}>
      <div className="fc-icon">{icon}</div>
      <div className="fc-title">{title}</div>
      <div className="fc-val">{val}</div>
      {sub && <div className="fc-sub">{sub}</div>}
    </div>
  );
}

/* ─── PROOF BAR ───────────────────────────────────────────────── */
function ProofBar() {
  return (
    <div className="proof-bar">
      <div className="proof-block">
        <div className="proof-num">2</div>
        <div className="proof-label">Branches</div>
      </div>
      <div className="proof-sep" />
      <div className="proof-block">
        <div className="proof-num">Rs 30</div>
        <div className="proof-label">Starts From</div>
      </div>
      <div className="proof-sep" />
      <div className="proof-rating">
        <div className="proof-avs">
          {["S","R","P","A"].map(l => (
            <div key={l} className="proof-av">{l}</div>
          ))}
        </div>
        <div>
          <div style={{ display:"flex", alignItems:"baseline", gap:7 }}>
            <span className="proof-stars">★★★★★</span>
            <span className="proof-rnum">4.9</span>
          </div>
          <div className="proof-rsub">400+ customers</div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN HERO ───────────────────────────────────────────────── */
function AmaHero({ setPage }) {
  return (
    <>
      {/* ── ALL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600;1,700&family=Cinzel:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --br:   #160e05;
          --br2:  #231508;
          --br3:  #3a200f;
          --g:    #c9a84c;
          --g2:   #e8c97a;
          --g3:   #f5dfa0;
          --cr:   #fdf6e8;
        }



        /* ── HERO SHELL ── */
        .ama-hero {
          position: relative;
          min-height: calc(100svh - 72px);
          display: grid; grid-template-columns: 1fr 1fr;
          overflow: hidden;
          background:
            radial-gradient(ellipse 100% 100% at 100% 0%,  rgba(90,50,12,.55) 0%, transparent 55%),
            radial-gradient(ellipse 80%  80%  at 0%  100%, rgba(50,28,8,.6)   0%, transparent 60%),
            #160e05;
        }

        /* grain */
        .hero-grain {
          position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: .055;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23f)'/%3E%3C/svg%3E");
          background-size: 350px 350px;
        }

        /* giant devanagari ghost */
        .hero-deva {
          position: absolute; right: -2%; top: 50%;
          transform: translateY(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(400px, 45vw, 700px); font-weight: 700;
          color: rgba(201,168,76,.028); line-height: 1;
          pointer-events: none; z-index: 1; user-select: none;
          animation: slowDrift 20s ease-in-out infinite alternate;
        }

        /* rules */
        .hero-rule {
          position: absolute; left: 0; right: 0; height: 1px; pointer-events: none; z-index: 2;
          background: linear-gradient(to right, transparent, rgba(201,168,76,.12) 20%, rgba(201,168,76,.12) 80%, transparent);
        }
        .hr-top { top: 72px; }
        .hr-bot { bottom: 0; }

        /* vertical thread */
        .hero-vthread {
          position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; z-index: 2; pointer-events: none;
          background: linear-gradient(to bottom, transparent 0%, rgba(201,168,76,.15) 20%, rgba(201,168,76,.15) 80%, transparent 100%);
        }

        /* ── LEFT ── */
        .hero-left {
          position: relative; z-index: 10;
          display: flex; flex-direction: column; justify-content: center;
          padding: 82px 56px 52px 102px;
        }

        .headline-block {
          margin-bottom: 32px;
          opacity: 0; animation: riseIn .9s .2s cubic-bezier(.22,1,.36,1) forwards;
        }
        .hl-small {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(16px,1.4vw,22px); font-weight: 300; font-style: italic;
          color: rgba(255,255,255,.4); letter-spacing: .08em;
          display: block; margin-bottom: 4px;
        }
        .hl-main {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px,9vw,138px); font-weight: 700; line-height: .85;
          letter-spacing: -.04em; color: #fff; display: block;
        }
        .hl-gold {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px,9vw,138px); font-weight: 600; line-height: .92;
          letter-spacing: -.03em; font-style: italic;
          background: linear-gradient(135deg, var(--g) 0%, var(--g3) 50%, var(--g) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; display: block;
          background-size: 200% auto; animation: shimmer 4s linear infinite;
        }
        .hl-nepali {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(12px,.9vw,16px); font-weight: 300; font-style: italic;
          color: rgba(201,168,76,.45); letter-spacing: .1em;
          display: block; margin-top: 14px;
        }

        .hero-desc {
          position: relative; font-size: 14.5px; line-height: 1.9;
          font-weight: 300; color: rgba(255,255,255,.5);
          max-width: 360px; margin-bottom: 40px; padding-left: 20px;
          opacity: 0; animation: riseIn .7s .35s cubic-bezier(.22,1,.36,1) forwards;
        }
        .hero-desc::before {
          content: ''; position: absolute; left: 0; top: 4px; bottom: 4px; width: 2px;
          background: linear-gradient(to bottom, transparent, var(--g), transparent);
          border-radius: 2px;
        }

        .cta-row {
          display: flex; align-items: center; gap: 16px; margin-bottom: 38px; flex-wrap: wrap;
          opacity: 0; animation: riseIn .7s .44s cubic-bezier(.22,1,.36,1) forwards;
        }
        .cta-primary {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 12px;
          background: var(--g); color: var(--br);
          font-family: 'Cinzel', serif; font-size: 11px; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase;
          padding: 16px 32px; border-radius: 4px; border: none; cursor: none;
          transition: all .3s;
          box-shadow: 0 8px 32px rgba(201,168,76,.3), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .cta-primary::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent);
          transition: left .5s ease;
        }
        .cta-primary:hover::before { left: 150%; }
        .cta-primary:hover {
          background: var(--g2);
          box-shadow: 0 12px 48px rgba(201,168,76,.45), inset 0 1px 0 rgba(255,255,255,.25);
          transform: translateY(-2px);
        }
        .cta-arrow { width: 16px; height: 16px; transition: transform .3s; flex-shrink: 0; }
        .cta-primary:hover .cta-arrow { transform: translateX(4px); }
        .cta-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: rgba(255,255,255,.6);
          font-size: 12px; font-weight: 500; letter-spacing: .08em;
          padding: 15px 24px; border-radius: 4px;
          border: 1px solid rgba(255,255,255,.12); cursor: none;
          transition: all .25s;
        }
        .cta-ghost:hover { color: #fff; border-color: rgba(255,255,255,.3); background: rgba(255,255,255,.04); }

        /* proof */
        .proof-bar {
          display: flex; align-items: center; gap: 20px;
          opacity: 0; animation: riseIn .7s .52s cubic-bezier(.22,1,.36,1) forwards;
          flex-wrap: wrap;
        }
        .proof-sep   { width: 1px; height: 36px; background: rgba(255,255,255,.08); }
        .proof-num   { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: var(--g2); line-height: 1; }
        .proof-label { font-size: 10px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.3); margin-top: 3px; }
        .proof-rating { display: flex; align-items: center; gap: 10px; }
        .proof-avs   { display: flex; }
        .proof-av    {
          width: 26px; height: 26px; border-radius: 50%;
          border: 2px solid rgba(22,14,5,.9); margin-left: -6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700; color: var(--br);
          background: linear-gradient(135deg, var(--g), var(--g2));
        }
        .proof-av:first-child { margin-left: 0; }
        .proof-stars { color: var(--g); font-size: 12px; letter-spacing: 1px; }
        .proof-rnum  { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #fff; }
        .proof-rsub  { font-size: 9.5px; color: rgba(255,255,255,.3); letter-spacing: .1em; }

        /* ── RIGHT ── */
        .hero-right {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          padding: 64px 56px 52px 28px;
        }
        .frame-wrap {
          position: relative;
          width: 100%;
          max-width: min(420px, 34vw);
          max-height: calc(100svh - 188px);
        }

        /* photo */
        .photo-card {
          position: relative; width: 100%; aspect-ratio: 2/3;
          max-height: calc(100svh - 220px);
          border-radius: 2px; overflow: hidden;
          opacity: 0; animation: photoReveal 1.2s .55s cubic-bezier(.22,1,.36,1) forwards;
        }
        .photo-card::before, .photo-card::after {
          content: ''; position: absolute; z-index: 4;
          width: 28px; height: 28px; border-color: var(--g); border-style: solid; opacity: .6;
        }
        .photo-card::before { top: 16px; left: 16px; border-width: 1.5px 0 0 1.5px; }
        .photo-card::after  { bottom: 16px; right: 16px; border-width: 0 1.5px 1.5px 0; }
        .photo-card img {
          width: 100%; height: 100%; object-fit: cover; object-position: center 30%;
          display: block; filter: saturate(.9) brightness(.92);
          animation: subtleZoom 12s ease-in-out infinite alternate;
        }
        .photo-overlay {
          position: absolute; inset: 0; z-index: 2;
          background:
            linear-gradient(to top,  rgba(16,8,2,.9) 0%, rgba(16,8,2,.3) 40%, rgba(16,8,2,.1) 65%, transparent 100%),
            linear-gradient(to right, rgba(16,8,2,.25) 0%, transparent 40%);
        }
        .photo-leak {
          position: absolute; top: 0; right: 0; z-index: 3;
          width: 200px; height: 200px; pointer-events: none;
          background: radial-gradient(circle at 100% 0%, rgba(201,168,76,.18) 0%, transparent 65%);
        }

        /* photo panel */
        .photo-panel { position: absolute; bottom: 0; left: 0; right: 0; z-index: 4; padding: 24px; }
        .photo-panel-inner {
          background: rgba(12,7,2,.6); backdrop-filter: blur(24px);
          border: 1px solid rgba(201,168,76,.15); border-radius: 3px;
          padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;
        }
        .panel-name { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; color: #fff; letter-spacing: .03em; }
        .panel-note { font-size: 10px; color: rgba(255,255,255,.4); letter-spacing: .1em; text-transform: uppercase; margin-top: 2px; }
        .panel-right { display: flex; align-items: center; gap: 12px; }
        .panel-price {
          font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700;
          background: linear-gradient(135deg, var(--g), var(--g3));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .panel-btn {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--g); color: var(--br); border: none; cursor: none;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 700; transition: all .2s;
          box-shadow: 0 4px 16px rgba(201,168,76,.35);
        }
        .panel-btn:hover { background: var(--g2); transform: scale(1.1); }

        /* floating cards */
        .float-card {
          position: absolute; z-index: 20;
          background: rgba(18,10,3,.88); backdrop-filter: blur(28px);
          border: 1px solid rgba(201,168,76,.18); border-radius: 3px;
          box-shadow: 0 20px 60px rgba(0,0,0,.5);
          padding: 13px 17px;
          opacity: 0;
        }
        .fc1 { top: 40px; left: -56px; animation: riseIn .7s 1.0s ease forwards, floatA 5s 1.7s ease-in-out infinite; }
        .fc2 { top: 38%; right: -52px; animation: riseIn .7s 1.1s ease forwards, floatB 6s 1.8s ease-in-out infinite; }
        .fc3 { bottom: 130px; left: -44px; animation: riseIn .7s 1.2s ease forwards, floatA 7s 2.0s ease-in-out infinite; }
        .fc-icon  { font-size: 22px; margin-bottom: 6px; }
        .fc-title { font-size: 9px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: rgba(201,168,76,.7); }
        .fc-val   { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600; color: #fff; margin-top: 2px; line-height: 1.2; }
        .fc-sub   { font-size: 9.5px; color: rgba(255,255,255,.35); margin-top: 2px; }

        /* seal */
        .golden-seal {
          position: absolute; bottom: -24px; right: -24px; z-index: 20;
          width: 74px; height: 74px; border-radius: 50%;
          background: linear-gradient(135deg, #b8860b, var(--g), var(--g3), var(--g));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 36px rgba(201,168,76,.5), 0 0 0 1px rgba(201,168,76,.3);
          opacity: 0; animation: riseIn .5s 1.3s ease forwards;
        }
        .seal-inner {
          width: 60px; height: 60px; border-radius: 50%;
          background: var(--br);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .seal-text { font-family: 'Cinzel', serif; font-size: 7px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--g); }
        .seal-year { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 700; color: var(--g2); }

        /* ── KEYFRAMES ── */
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes photoReveal {
          from { opacity: 0; transform: scale(.97) translateY(16px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatA {
          0%,100% { transform: translateY(0px)  rotate(-.5deg); }
          50%      { transform: translateY(-10px) rotate(.5deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px)  rotate(.5deg); }
          50%      { transform: translateY(-12px) rotate(-.5deg); }
        }
        @keyframes slowDrift {
          from { transform: translateY(-50%) translateX(0px)   rotate(-1deg); }
          to   { transform: translateY(-50%) translateX(-20px) rotate(1deg); }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%     { opacity: .35; }
        }
        @keyframes subtleZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.06); }
        }
        /* responsive */
        @media (max-width: 900px) {
          .ama-hero  { grid-template-columns: 1fr; min-height: calc(100svh - 72px); }
          .hero-right { display: none; }
          .hero-left  { padding: 74px 32px 48px; }
          .hero-vthread { display: none; }

        }
      `}</style>

      {/* Hero */}
      <section className="ama-hero">
        <div className="hero-grain" />
        <div className="hero-deva">अ</div>
        <div className="hero-rule hr-top" />
        <div className="hero-rule hr-bot" />
        <div className="hero-vthread" />

        {/* ── LEFT ── */}
        <div className="hero-left">
          <div className="headline-block">
            <span className="hl-small">A mother's kitchen,</span>
            <span className="hl-main">Ama</span>
            <span className="hl-gold">Bakery</span>
            <span className="hl-nepali">आमाको माया, हरेक बाइटमा</span>
          </div>

          <p className="hero-desc">
            Founded near the sacred Boudha Stupa, Ama brings the warmth of a mother's kitchen to Kathmandu — fresh bakes, open kitchen, honest prices from Rs&nbsp;30.
          </p>

          <div className="cta-row">
            <button className="cta-primary"
              onClick={() => setPage?.("menu")}>
              Order Now
              <svg className="cta-arrow" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="cta-ghost"
              onClick={() => setPage?.("about")}>
              Our Story
            </button>
          </div>

          <ProofBar />
        </div>

        {/* ── RIGHT ── */}
        <div className="hero-right">
          <div className="frame-wrap">

            {/* floating card 1 */}
            <FloatCard
              icon="🌿" title="Baked" val="Fresh Daily" sub="Small batches, every morning"
              animClass="fc1"
            />

            {/* main photo */}
            <div className="photo-card">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=90&auto=format&fit=crop&crop=center"
                alt="Fresh baked pastries at Ama Bakery"
              />
              <div className="photo-overlay" />
              <div className="photo-leak" />
              <div className="photo-panel">
                <div className="photo-panel-inner">
                  <div>
                    <div className="panel-name">Butter Croissant</div>
                    <div className="panel-note">Baked this morning · Open kitchen</div>
                  </div>
                  <div className="panel-right">
                    <div className="panel-price">Rs 80</div>
                    <button className="panel-btn">+</button>
                  </div>
                </div>
              </div>
            </div>

            {/* floating card 2 */}
            <FloatCard
              icon="📍" title="Find us at" val={"Boudha &\nSwayambhu"}
              animClass="fc2"
            />

            {/* floating card 3 */}
            <FloatCard
              icon="🫙" title="Always" val="Open Kitchen" sub="Watch us bake"
              animClass="fc3"
            />

            {/* golden seal */}
            <div className="golden-seal">
              <div className="seal-inner">
                <span className="seal-text">Est.</span>
                <span className="seal-year">2022</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedCard({ product, onAdd, delay = 0 }) {
  const [added, setAdded] = useState(false);
  const handle = () => { onAdd(product); setAdded(true); setTimeout(() => setAdded(false), 1500); };
  return (
    <>
      <style>{`
        .fc { background:var(--white); border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-sm); transition:all 0.35s cubic-bezier(0.16,1,0.3,1); display:flex; flex-direction:column; border:1px solid var(--border); animation:fadeUp 0.6s ease both; }
        .fc:hover { transform:translateY(-8px); box-shadow:var(--shadow-lg); border-color:rgba(201,168,76,0.4); }
        .fc-img { background:linear-gradient(135deg,var(--gold-wash) 0%,#EDD9A3 100%); padding:44px 20px; display:flex; align-items:center; justify-content:center; font-size:76px; position:relative; transition:background 0.3s; }
        .fc:hover .fc-img { background:linear-gradient(135deg,#EDD9A3 0%,#E8C97A 100%); }
        .fc-shine { position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,0.2) 0%,transparent 50%); pointer-events:none; }
        .fc-body { padding:22px 22px 26px; flex:1; display:flex; flex-direction:column; }
        .fc-cat  { font-size:10px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:var(--gold-dark); margin-bottom:8px; }
        .fc-name { font-family:'Playfair Display',serif; font-size:21px; font-weight:700; color:var(--brown); margin-bottom:9px; line-height:1.2; }
        .fc-desc { font-size:13px; color:var(--text-light); line-height:1.7; flex:1; }
        .fc-foot { display:flex; align-items:center; justify-content:space-between; margin-top:20px; padding-top:16px; border-top:1px solid var(--border); }
        .fc-price{ font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--brown); }
      `}</style>
      <div className="fc" style={{ animationDelay: `${delay}s` }}>
        <div className="fc-img">
          {product.badge && <Badge label={product.badge} />}
          <div className="fc-shine" />
          <span>{product.emoji}</span>
        </div>
        <div className="fc-body">
          <div className="fc-cat">{product.category}</div>
          <div className="fc-name">{product.name}</div>
          <div className="fc-desc">{product.description}</div>
          <div className="fc-foot">
            <div className="fc-price">{Rs(product.price)}</div>
            <button className={`btn-add${added ? " ok" : ""}`} onClick={handle}>
              {added ? IC.check : IC.plus}{added ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function FeaturedStrip({ onAdd, setPage }) {
  const featured = PRODUCTS.filter(p => p.featured);
  return (
    <>
      <style>{`
        .fs { background:var(--cream); padding:80px 28px; }
        .fs-inner { max-width:1280px; margin:0 auto; }
        .fs-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:48px; flex-wrap:wrap; gap:20px; }
        .btn-view-all { background:var(--gold-wash); border:1.5px solid var(--border); color:var(--brown-mid); border-radius:12px; padding:10px 22px; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:8px; }
        .btn-view-all:hover { background:var(--gold); color:var(--brown); border-color:var(--gold); }
        .btn-view-all svg { width:14px; height:14px; }
        .fs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:24px; }
      `}</style>
      <section className="fs">
        <div className="fs-inner">
          <div className="fs-header">
            <div>
              <div className="section-label au"><div className="section-label-line" /><span className="section-label-text">Hand-picked</span></div>
              <h2 className="section-title au" style={{ animationDelay: "0.05s" }}>Featured Treats</h2>
              <p className="section-sub au" style={{ animationDelay: "0.1s" }}>Our most-loved bakes, made fresh every morning at both branches.</p>
            </div>
            <button className="btn-view-all au" style={{ animationDelay: "0.15s" }} onClick={() => setPage("menu")}>
              Full Menu {IC.arrow}
            </button>
          </div>
          <div className="fs-grid">
            {featured.map((p, i) => <FeaturedCard key={p.id} product={p} onAdd={onAdd} delay={i * 0.08} />)}
          </div>
        </div>
      </section>
    </>
  );
}

// ── Why Ama section ───────────────────────────────────────────────────────────
function WhyAma() {
  return (
    <>
      <style>{`
        .wa { background:var(--brown); padding:80px 28px; position:relative; overflow:hidden; }
        .wa::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 20% 50%,rgba(201,168,76,0.08),transparent 70%); pointer-events:none; }
        .wa-inner { max-width:1280px; margin:0 auto; position:relative; }
        .wa-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; }
        @media(max-width:768px) { .wa-grid { grid-template-columns:1fr; gap:48px; } }
        .wa-left p { color:rgba(255,255,255,0.6); font-size:15px; line-height:1.85; margin-top:16px; }
        .wa-founder { display:flex; align-items:center; gap:16px; margin-top:32px; background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.2); border-radius:16px; padding:18px 22px; }
        .wa-founder-av { width:52px; height:52px; background:var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; }
        .wa-founder-name { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#fff; }
        .wa-founder-role { font-size:11px; color:var(--gold); font-weight:600; letter-spacing:0.08em; text-transform:uppercase; margin-top:2px; }
        .wa-features { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .waf { background:rgba(255,255,255,0.04); border:1px solid rgba(201,168,76,0.15); border-radius:18px; padding:24px; transition:all 0.25s; }
        .waf:hover { background:rgba(201,168,76,0.07); border-color:rgba(201,168,76,0.3); transform:translateY(-3px); }
        .waf-icon  { font-size:28px; margin-bottom:14px; }
        .waf-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#fff; margin-bottom:8px; }
        .waf-desc  { font-size:12px; color:rgba(255,255,255,0.5); line-height:1.7; }
      `}</style>
      <section className="wa">
        <div className="wa-inner">
          <div className="wa-grid">
            <div className="au">
              <div className="section-label" style={{ "--gold": "#C9A84C" }}>
                <div className="section-label-line" style={{ background: "var(--gold)" }} />
                <span className="section-label-text" style={{ color: "var(--gold)" }}>Why Ama?</span>
              </div>
              <h2 className="section-title" style={{ color: "#fff" }}>Baked with Honesty, Served with Love</h2>
              <p>Every item on our menu is made in an open kitchen — you can watch your food being prepared. No shortcuts, no mystery ingredients. Just quality, care, and the warmth of a mother's touch.</p>
              <div className="wa-founder">
                <div className="wa-founder-av">👩</div>
                <div>
                  <div className="wa-founder-name">Mangal Maya Bajracharya</div>
                  <div className="wa-founder-role">Founder & Head Baker</div>
                </div>
              </div>
            </div>
            <div className="wa-features">
              {[
                { icon: "🫙", t: "Open Kitchen",   d: "Watch your food being made fresh — no shortcuts, no hidden processes." },
                { icon: "💰", t: "From Rs 30",      d: "Quality bakes shouldn't be a luxury. Ama keeps prices honest and affordable." },
                { icon: "🌿", t: "Fresh Daily",     d: "Everything is baked in small batches each morning. Nothing goes stale." },
                { icon: "📍", t: "2 Branches",      d: "Boudha & Swayambhu — both near iconic Kathmandu landmarks." },
              ].map((f, i) => (
                <div key={f.t} className="waf au" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                  <div className="waf-icon">{f.icon}</div>
                  <div className="waf-title">{f.t}</div>
                  <div className="waf-desc">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Reviews strip ─────────────────────────────────────────────────────────────
function ReviewsStrip() {
  const reviews = [
    { t: "The pumpkin bites are absolutely unique — I've never had anything like them anywhere in Kathmandu. Totally addictive.", a: "Priya S.", loc: "Boudha" },
    { t: "The open kitchen is what sold me. You can see everything being made fresh — so clean and trustworthy.", a: "Rohan T.", loc: "Lalitpur" },
    { t: "Dora cake + morning tea = perfect day. Budget-friendly and genuinely delicious. My daily ritual.", a: "Sita M.", loc: "Kathmandu" },
    { t: "The coconut cake is heavenly! Moist, not too sweet, and perfectly sized. Will definitely be back.", a: "Arjun K.", loc: "Swayambhu" },
  ];

  return (
    <>
      <style>{`
        .rv { background:var(--gold-pale); padding:80px 28px; border-top:1px solid var(--border); }
        .rv-inner { max-width:1280px; margin:0 auto; }
        .rv-head { text-align:center; margin-bottom:48px; }
        .rv-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:20px; }
        .rvc { background:var(--white); border-radius:var(--radius-lg); padding:26px; box-shadow:var(--shadow-sm); border:1px solid var(--border); transition:all 0.3s; animation:fadeUp 0.5s ease both; }
        .rvc:hover { transform:translateY(-4px); box-shadow:var(--shadow); }
        .rv-stars  { display:flex; gap:3px; color:var(--gold); margin-bottom:14px; }
        .rv-stars svg { width:13px; height:13px; }
        .rv-text   { font-size:13px; color:var(--text-light); line-height:1.75; font-style:italic; margin-bottom:16px; }
        .rv-author { font-size:13px; font-weight:700; color:var(--brown); }
        .rv-loc    { font-size:11px; color:var(--text-light); margin-top:2px; }
      `}</style>
      <section className="rv">
        <div className="rv-inner">
          <div className="rv-head">
            <div className="section-label au" style={{ justifyContent: "center" }}>
              <div className="section-label-line" />
              <span className="section-label-text">Customer Love</span>
              <div className="section-label-line" />
            </div>
            <h2 className="section-title au" style={{ animationDelay: "0.05s", textAlign: "center", marginTop: 10 }}>
              What Kathmandu Says
            </h2>
          </div>
          <div className="rv-grid">
            {reviews.map((r, i) => (
              <div key={i} className="rvc" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="rv-stars">{[1,2,3,4,5].map(s => <span key={s}>{IC.star}</span>)}</div>
                <div className="rv-text">"{r.t}"</div>
                <div className="rv-author">{r.a}</div>
                <div className="rv-loc">📍 {r.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────
export default function HomePage({ onAdd, setPage }) {
  return (
    <>
      <AmaHero setPage={setPage} />
      <FeaturedStrip onAdd={onAdd} setPage={setPage} />
      <WhyAma />
      <ReviewsStrip />
    </>
  );
}
