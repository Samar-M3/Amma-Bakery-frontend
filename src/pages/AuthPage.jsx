import { useState, useEffect, useRef, useCallback } from "react";

// const API_BASE =
//   (typeof import !== "undefined" &&
//     typeof import.meta !== "undefined" &&
//     import.meta.env?.VITE_API_BASE_URL) ||
//   "http://127.0.0.1:8001/api";

/* ═══════════════════════════════════════
   STEAM CANVAS
═══════════════════════════════════════ */
function SteamCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let W = (c.width = c.offsetWidth);
    let H = (c.height = c.offsetHeight);
    window.addEventListener("resize", () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; });
    const wisps = Array.from({ length: 8 }, (_, i) => ({
      x: W * 0.18 + (i / 7) * W * 0.64 + (Math.random() - 0.5) * 18,
      y: H, vy: -(Math.random() * 0.5 + 0.25),
      life: Math.random(), maxLife: Math.random() * 0.5 + 0.45,
      r: Math.random() * 10 + 8, wave: Math.random() * Math.PI * 2,
      waveSpd: (Math.random() - 0.5) * 0.018, baseX: 0,
    }));
    wisps.forEach(w => (w.baseX = w.x));
    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      wisps.forEach(w => {
        w.life += 0.004; w.wave += w.waveSpd;
        if (w.life > w.maxLife) { w.life = 0; w.y = H; w.x = w.baseX + (Math.random() - 0.5) * 28; }
        w.y += w.vy;
        const a = Math.sin((w.life / w.maxLife) * Math.PI) * 0.22;
        const cx = w.x + Math.sin(w.wave) * 12;
        const g = ctx.createRadialGradient(cx, w.y, 0, cx, w.y, w.r + w.life * 26);
        g.addColorStop(0, `rgba(255,235,180,${a})`);
        g.addColorStop(1, `rgba(255,235,180,0)`);
        ctx.beginPath(); ctx.arc(cx, w.y, w.r + w.life * 26, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

/* ═══════════════════════════════════════
   BREAD LOAF SVG
═══════════════════════════════════════ */
const BreadLoaf = () => (
  <svg viewBox="0 0 340 190" fill="none" style={{ width: "100%", maxWidth: 340, filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.6))" }}>
    <ellipse cx="170" cy="178" rx="118" ry="12" fill="rgba(0,0,0,0.4)" />
    <path d="M50 155 Q45 124 52 97 Q62 62 94 47 Q124 34 170 32 Q216 34 246 47 Q278 62 288 97 Q295 124 290 155 Z" fill="url(#lg1)" />
    <path d="M94 47 Q124 28 170 26 Q216 28 246 47 Q230 37 170 35 Q110 37 94 47 Z" fill="rgba(255,218,130,0.32)" />
    <path d="M126 47 Q136 86 134 148" stroke="rgba(100,48,8,0.5)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M170 36 Q180 78 178 150" stroke="rgba(100,48,8,0.5)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M214 47 Q222 86 220 148" stroke="rgba(100,48,8,0.5)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <rect x="50" y="152" width="240" height="16" rx="5" fill="url(#lg2)" />
    <ellipse cx="148" cy="76" rx="38" ry="20" fill="rgba(255,232,150,0.1)" transform="rotate(-14 148 76)" />
    <defs>
      <radialGradient id="lg1" cx="50%" cy="30%" r="62%">
        <stop offset="0%" stopColor="#edae34" />
        <stop offset="38%" stopColor="#cb7e1e" />
        <stop offset="78%" stopColor="#9e5a12" />
        <stop offset="100%" stopColor="#733b06" />
      </radialGradient>
      <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8a450e" />
        <stop offset="100%" stopColor="#4e2504" />
      </linearGradient>
    </defs>
  </svg>
);

/* ═══════════════════════════════════════
   WHEAT SPRIG
═══════════════════════════════════════ */
const WheatSprig = ({ style }) => (
  <svg viewBox="0 0 80 240" fill="none" style={style}>
    <path d="M40 235 Q39 180 38 120 Q37 70 42 18" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" opacity="0.55"/>
    {[[42,18,-30],[41,36,-22],[40,54,-28],[39,72,-20],[38,90,-26],[37,108,-18],[36,126,-24]].map(([x,y,r],i) => (
      <g key={i} transform={`translate(${x},${y}) rotate(${r})`} opacity={0.48 + i * 0.06}>
        <ellipse cx="0" cy="-11" rx="5.5" ry="11" fill="#C9A84C"/>
        <ellipse cx="0" cy="-11" rx="5.5" ry="11" fill="#C9A84C" transform="scale(-1,1)"/>
      </g>
    ))}
    <path d="M38 78 Q20 66 10 58" stroke="#C9A84C" strokeWidth="1.2" fill="none" opacity="0.38"/>
    <path d="M37 112 Q55 102 64 95" stroke="#C9A84C" strokeWidth="1.2" fill="none" opacity="0.38"/>
  </svg>
);

/* ═══════════════════════════════════════
   STAMP RING
═══════════════════════════════════════ */
const StampRing = () => (
  <svg viewBox="0 0 180 180" fill="none" style={{ width: 170, height: 170 }}>
    <circle cx="90" cy="90" r="82" stroke="#C9A84C" strokeWidth="1.2" strokeDasharray="4 3.5" opacity="0.4"/>
    <circle cx="90" cy="90" r="73" stroke="#C9A84C" strokeWidth="0.8" opacity="0.22"/>
    <circle cx="90" cy="90" r="65" stroke="#C9A84C" strokeWidth="1.8" opacity="0.28"/>
    {Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * Math.PI * 2;
      return <line key={i} x1={90 + Math.cos(a) * 76} y1={90 + Math.sin(a) * 76} x2={90 + Math.cos(a) * 82} y2={90 + Math.sin(a) * 82} stroke="#C9A84C" strokeWidth="1" opacity="0.32" />;
    })}
    <text x="90" y="55" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="9.5" letterSpacing="4.5" fill="#C9A84C" opacity="0.7" fontStyle="italic">HANDCRAFTED</text>
    <text x="90" y="131" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="9.5" letterSpacing="4" fill="#C9A84C" opacity="0.7" fontStyle="italic">EST · 1987</text>
    <text x="90" y="100" textAnchor="middle" fontFamily="'Bodoni Moda',serif" fontSize="34" fontWeight="400" fill="#C9A84C" opacity="0.75" fontStyle="italic">Ama</text>
  </svg>
);

/* ═══════════════════════════════════════
   PASSWORD STRENGTH
═══════════════════════════════════════ */
const PW_LEVELS = [
  { label: "", color: "transparent" },
  { label: "Weak",   color: "#e05252" },
  { label: "Fair",   color: "#d4941a" },
  { label: "Good",   color: "#7ec87e" },
  { label: "Strong", color: "#3aad5e" },
];
function getPwStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

/* ═══════════════════════════════════════
   INPUT FIELD COMPONENT
═══════════════════════════════════════ */
function InputField({ label, type = "text", value, onChange, autoComplete, required, minLength, note }) {
  const [focused, setFocused] = useState(false);
  const filled = value && value.length > 0;
  const active = focused || filled;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {/* Label always visible */}
      <label style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: 10, fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: focused ? "#C9A84C" : "rgba(201,168,76,0.65)",
        transition: "color 0.2s",
      }}>
        {label}
      </label>

      {/* Input */}
      <div style={{ position: "relative" }}>
        <input
          type={type} value={value} onChange={onChange}
          autoComplete={autoComplete} required={required} minLength={minLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: focused
              ? "rgba(201,168,76,0.07)"
              : filled
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0.03)",
            border: `1.5px solid ${focused ? "rgba(201,168,76,0.7)" : filled ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.13)"}`,
            borderRadius: 8,
            padding: "13px 16px",
            fontFamily: "'Jost', sans-serif",
            fontSize: 14.5,
            fontWeight: 400,
            color: "#f0e6cc",
            outline: "none",
            transition: "all 0.22s ease",
            WebkitAppearance: "none",
            boxShadow: focused ? "0 0 0 3px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.04)" : "none",
            letterSpacing: "0.01em",
          }}
          placeholder=""
        />
        {note && (
          <span style={{
            position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: 12, color: "rgba(201,168,76,0.5)", pointerEvents: "none", paddingRight: 0,
          }}>{note}</span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
export default function AuthPage({ mode = "login", setPage, onAuthSuccess, notice = "" }) {
  const [tab, setTab]         = useState(mode);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [loginForm, setLoginForm]   = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const isLogin = tab === "login";
  const pwStr   = getPwStrength(signupForm.password);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const switchTab = useCallback((t) => { setError(""); setTab(t); }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(loginForm) });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Login failed");
      setSuccess(true);
      setTimeout(() => onAuthSuccess?.(json.data), 900);
    } catch (err) { setError(err.message || "Something went wrong"); }
    finally { setLoading(false); }
  };

  const handleSignup = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    if (signupForm.password !== signupForm.confirm) { setError("Passwords do not match."); setLoading(false); return; }
    try {
      const res  = await fetch(`${API_BASE}/auth/signup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: signupForm.name, email: signupForm.email, password: signupForm.password }) });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Signup failed");
      setSuccess(true);
      setTimeout(() => onAuthSuccess?.(json.data), 900);
    } catch (err) { setError(err.message || "Something went wrong"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400;1,6..96,500&family=Jost:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── ROOT LAYOUT ── */
        .root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 48% 52%;
          font-family: 'Jost', sans-serif;
          background: #100c05;
          overflow: hidden;
        }
        @media (max-width: 860px) {
          .root { grid-template-columns: 1fr; }
          .left-panel { display: none; }
          .right-panel { min-height: 100vh; }
        }

        /* ═══════════════════════
           LEFT PANEL
        ═══════════════════════ */
        .left-panel {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 56px 44px;
          background:
            radial-gradient(ellipse 100% 70% at 45% 30%, #331a07 0%, transparent 65%),
            radial-gradient(ellipse 65% 85% at 65% 85%, #1c0e04 0%, transparent 55%),
            #120b03;
        }
        .left-panel::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E");
        }
        .left-panel::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(8,4,1,0.65) 100%);
        }

        .left-glow {
          position: absolute; width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,168,76,0.13) 0%, transparent 70%);
          top: 45%; left: 50%; transform: translate(-50%,-55%);
          pointer-events: none;
          animation: breathe 4.5s ease-in-out infinite;
        }
        @keyframes breathe { 0%,100%{opacity:.75;transform:translate(-50%,-55%) scale(1)} 50%{opacity:1;transform:translate(-50%,-55%) scale(1.1)} }

        .left-content {
          position: relative; z-index: 2;
          width: 100%; max-width: 360px;
          display: flex; flex-direction: column; align-items: center; gap: 18px;
        }

        /* Bread scene */
        .bread-scene {
          position: relative; width: 100%; height: 210px;
          display: flex; align-items: flex-end; justify-content: center;
          opacity: 0; animation: fadeUp .7s .12s ease forwards;
        }

        /* Stamp */
        .stamp-wrap {
          opacity: 0; animation: fadeUp .6s .05s ease forwards;
        }

        /* Headlines */
        .left-copy {
          text-align: center;
          opacity: 0; animation: fadeUp .6s .22s ease forwards;
        }
        .left-h {
          font-family: 'Bodoni Moda', serif;
          font-style: italic; font-weight: 400;
          font-size: clamp(38px, 3.8vw, 54px);
          line-height: 1.08; letter-spacing: -0.01em;
          color: rgba(255,255,255,0.94);
        }
        .left-h span { color: #C9A84C; text-shadow: 0 0 50px rgba(201,168,76,0.4); }
        .left-sub {
          margin-top: 12px;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 15.5px; line-height: 1.7;
          color: rgba(255,255,255,0.48);
          max-width: 290px; margin-left: auto; margin-right: auto;
        }

        /* Divider */
        .left-div {
          display: flex; align-items: center; gap: 12px;
          width: 100%; max-width: 260px;
          opacity: 0; animation: fadeUp .6s .32s ease forwards;
        }
        .left-div-line { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3)); }
        .left-div-line:last-child { background:linear-gradient(270deg,transparent,rgba(201,168,76,0.3)); }
        .left-div-text { font-size:9.5px; letter-spacing:.2em; text-transform:uppercase; color:rgba(201,168,76,0.5); white-space:nowrap; }

        /* Perks */
        .left-perks {
          width: 100%;
          display: flex; flex-direction: column; gap: 11px;
          opacity: 0; animation: fadeUp .6s .42s ease forwards;
        }
        .left-perk { display:flex; align-items:center; gap:12px; }
        .left-perk-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #C9A84C; flex-shrink: 0;
          box-shadow: 0 0 10px rgba(201,168,76,0.65);
        }
        .left-perk-text {
          font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.02em;
        }

        /* Wheat corners */
        .wheat-tl { position:absolute; top:18px; left:14px; width:52px; opacity:0.55; transform:rotate(-14deg); }
        .wheat-br { position:absolute; bottom:18px; right:14px; width:48px; opacity:0.45; transform:rotate(164deg); }


        /* ═══════════════════════
           RIGHT PANEL
        ═══════════════════════ */
        .right-panel {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 52px;
          overflow: hidden;
          background:
            radial-gradient(ellipse 75% 55% at 85% 8%,  rgba(201,168,76,0.055) 0%, transparent 60%),
            radial-gradient(ellipse 55% 75% at 15% 92%, rgba(50,24,5,0.45)     0%, transparent 58%),
            #150e04;
        }
        @media (max-width: 860px) {
          .right-panel { padding: 72px 24px 44px; align-items: flex-start; }
        }
        @media (max-width: 480px) {
          .right-panel { padding: 64px 18px 36px; }
        }

        /* Subtle horizontal rules */
        .right-rule {
          position: absolute; left: 0; right: 0; height: 1px; pointer-events: none;
          background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.1) 30%, rgba(201,168,76,0.16) 50%, rgba(201,168,76,0.1) 70%, transparent 100%);
        }

        /* Big watermark A */
        .right-wm {
          position: absolute; bottom: 18px; right: 32px;
          font-family: 'Bodoni Moda', serif; font-style: italic;
          font-size: 96px; font-weight: 400; line-height: 1;
          color: rgba(201,168,76,0.04); user-select: none; pointer-events: none;
        }

        /* Form card */
        .form-card {
          width: 100%; max-width: 420px;
          position: relative; z-index: 1;
          opacity: 0; transform: translateY(24px);
          transition: opacity .65s ease, transform .65s ease;
        }
        .form-card.on { opacity: 1; transform: translateY(0); }

        /* Mobile logo */
        .mob-logo {
          display: none; align-items: center; gap: 10px; margin-bottom: 28px;
        }
        @media (max-width: 860px) { .mob-logo { display: flex; } }
        .mob-logo-ring {
          width: 42px; height: 42px; border-radius: 50%;
          border: 1.5px solid rgba(201,168,76,0.5);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bodoni Moda', serif; font-style: italic;
          font-size: 21px; color: #C9A84C;
        }
        .mob-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 21px; font-weight: 400;
          color: rgba(255,255,255,0.82);
        }

        /* Form heading */
        .form-eyebrow {
          display: flex; align-items: center; gap: 9px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.26em;
          text-transform: uppercase; color: rgba(201,168,76,0.65);
          margin-bottom: 10px;
        }
        .form-eyebrow-line { width: 20px; height: 1px; background: rgba(201,168,76,0.5); }

        .form-h1 {
          font-family: 'Bodoni Moda', serif;
          font-style: italic; font-weight: 400;
          font-size: clamp(34px, 4vw, 48px);
          line-height: 1.1; letter-spacing: -0.01em;
          color: rgba(255,255,255,0.95);
          margin-bottom: 9px;
        }
        .form-h1 span { color: #C9A84C; text-shadow: 0 0 40px rgba(201,168,76,0.35); }

        .form-desc {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 15px; line-height: 1.65;
          color: rgba(255,255,255,0.5);
          margin-bottom: 26px;
        }

        /* Tab toggle */
        .tabs {
          display: grid; grid-template-columns: 1fr 1fr;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 10px; overflow: hidden; padding: 4px; gap: 4px;
          margin-bottom: 28px;
        }
        .tab-btn {
          border: none; border-radius: 7px;
          padding: 11px 8px;
          font-family: 'Jost', sans-serif;
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }
        .tab-btn.active {
          background: rgba(201,168,76,0.15);
          color: #e8c96a;
          box-shadow: inset 0 1px 0 rgba(201,168,76,0.25);
        }
        .tab-btn.active::after {
          content: '';
          position: absolute; bottom: 4px; left: 20%; right: 20%;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
        }
        .tab-btn:not(.active):hover { color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.04); }

        /* Messages */
        .msg {
          display: flex; align-items: flex-start; gap: 10px;
          border-radius: 8px; padding: 12px 15px;
          margin-bottom: 18px; font-size: 13.5px; line-height: 1.55;
          animation: msgIn .28s ease;
        }
        @keyframes msgIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .msg.err  { background: rgba(200,60,50,0.16); border: 1px solid rgba(220,90,80,0.32); color: #f0a0a0; }
        .msg.info { background: rgba(201,168,76,0.1);  border: 1px solid rgba(201,168,76,0.32); color: rgba(232,201,106,0.92); }
        .msg-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }

        /* Fields */
        .fields { display: flex; flex-direction: column; gap: 16px; animation: formIn .38s cubic-bezier(.4,0,.2,1) forwards; }
        @keyframes formIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        /* Forgot link */
        .forgot-link {
          background: none; border: none; cursor: pointer;
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 13px; color: rgba(201,168,76,0.55);
          padding: 0; transition: color .2s; text-align: right;
          display: block; margin-top: 4px;
        }
        .forgot-link:hover { color: rgba(201,168,76,0.9); }

        /* PW Meter */
        .pw-meter { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
        .pw-bars  { display: flex; gap: 4px; flex: 1; }
        .pw-bar   { height: 3px; flex: 1; border-radius: 99px; background: rgba(255,255,255,0.09); transition: background .4s ease; }
        .pw-lbl   { font-size: 10px; letter-spacing: .06em; min-width: 40px; text-align: right; transition: color .4s; }

        /* Confirm match indicator */
        .match-wrap { position: relative; }
        .match-mark {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          font-size: 14px; pointer-events: none; transition: color .25s;
        }

        /* Submit button */
        .submit-btn {
          width: 100%; border: none; border-radius: 10px;
          background: linear-gradient(135deg, #d4b254 0%, #b88c2c 50%, #c9a84c 100%);
          color: #1c0e02;
          font-family: 'Jost', sans-serif;
          font-size: 11px; font-weight: 800;
          letter-spacing: 0.26em; text-transform: uppercase;
          padding: 16px 24px; margin-top: 24px;
          cursor: pointer; position: relative; overflow: hidden;
          box-shadow: 0 6px 30px rgba(201,168,76,0.28), 0 1px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: transform .2s ease, box-shadow .25s ease, opacity .2s;
        }
        .submit-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.18) 0%, transparent 55%);
          opacity: 0; transition: opacity .25s;
        }
        .submit-btn::after {
          content: '';
          position: absolute; top: -50%; left: -70%;
          width: 44%; height: 200%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,.28), transparent);
          transform: skewX(-18deg); transition: left .55s ease;
        }
        .submit-btn:hover:not(:disabled)::before { opacity: 1; }
        .submit-btn:hover:not(:disabled)::after  { left: 118%; }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 38px rgba(201,168,76,0.38), 0 3px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.22);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: .5; cursor: not-allowed; }
        .submit-btn.done {
          background: linear-gradient(135deg, #52b872, #339952);
          color: #fff;
          box-shadow: 0 6px 28px rgba(82,184,114,0.32);
        }

        .spin {
          display: inline-block; width: 13px; height: 13px;
          border: 2px solid rgba(28,14,2,0.22); border-top-color: #1c0e02;
          border-radius: 50%; vertical-align: middle; margin-right: 9px;
          animation: spin .65s linear infinite;
        }
        .spin.light { border-color: rgba(255,255,255,0.22); border-top-color: #fff; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Divider before footer */
        .foot-rule {
          margin-top: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.14), transparent);
        }

        /* Footer */
        .form-foot {
          margin-top: 16px;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .foot-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 14px;
          color: rgba(255,255,255,0.32);
        }
        .foot-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.07em;
          color: rgba(201,168,76,0.6);
          text-decoration: underline; text-decoration-color: rgba(201,168,76,0.25);
          text-underline-offset: 3px;
          padding: 0; margin-left: 4px; transition: color .2s;
        }
        .foot-btn:hover { color: #C9A84C; }
        .foot-tagline {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 11px; letter-spacing: 0.14em;
          color: rgba(201,168,76,0.25);
          margin-top: 2px;
        }

        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div className="root">

        {/* ══════════════════ LEFT PANEL ══════════════════ */}
        <div className="left-panel">
          <div className="left-glow" />

          <div className="wheat-tl"><WheatSprig style={{ width: "100%", height: "auto" }} /></div>
          <div className="wheat-br"><WheatSprig style={{ width: "100%", height: "auto" }} /></div>

          <div className="left-content">

            <div className="stamp-wrap">
              <StampRing />
            </div>

            <div className="bread-scene">
              <SteamCanvas />
              <BreadLoaf />
            </div>

            <div className="left-copy">
              <h2 className="left-h">
                Baked with<br /><span>soul.</span>
              </h2>
              <p className="left-sub">
                Every loaf carries decades of craft, warmth, and the gentle hands of our bakers.
              </p>
            </div>

            <div className="left-div">
              <div className="left-div-line" />
              <span className="left-div-text">Why join us</span>
              <div className="left-div-line" />
            </div>

            <ul className="left-perks">
              {[
                "Fresh daily — never frozen, never rushed",
                "Track & manage your orders in one place",
                "Early access to seasonal collections",
                "Members-only offers & surprise treats",
              ].map(p => (
                <li key={p} className="left-perk">
                  <div className="left-perk-dot" />
                  <span className="left-perk-text">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ══════════════════ RIGHT PANEL ══════════════════ */}
        <div className="right-panel">
          <div className="right-rule" style={{ top: "12%" }} />
          <div className="right-rule" style={{ top: "90%" }} />
          <div className="right-wm">A</div>

          <div className={`form-card${mounted ? " on" : ""}`}>

            {/* Mobile logo */}
            <div className="mob-logo">
              <div className="mob-logo-ring">A</div>
              <span className="mob-logo-name">Ama Bakery</span>
            </div>

            {/* Heading */}
            <div className="form-eyebrow">
              <div className="form-eyebrow-line" />
              {isLogin ? "Member Portal" : "Begin Your Journey"}
            </div>
            <h1 className="form-h1">
              {isLogin
                ? <>Welcome <span>back.</span></>
                : <>Join the <span>family.</span></>}
            </h1>
            <p className="form-desc">
              {isLogin
                ? "Your favourites are waiting. Sign in and pick up where you left off."
                : "Become part of something made with love. It only takes a moment."}
            </p>

            {/* Tabs */}
            <div className="tabs">
              <button className={`tab-btn${isLogin ? " active" : ""}`} onClick={() => switchTab("login")}>Sign In</button>
              <button className={`tab-btn${!isLogin ? " active" : ""}`} onClick={() => switchTab("signup")}>Create Account</button>
            </div>

            {/* Messages */}
            {notice && (
              <div className="msg info">
                <span className="msg-icon">✦</span>
                <span>{notice}</span>
              </div>
            )}
            {error && (
              <div className="msg err">
                <span className="msg-icon">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* ── LOGIN ── */}
            {isLogin ? (
              <form key="login" onSubmit={handleLogin}>
                <div className="fields">
                  <InputField label="Email Address" type="email"
                    value={loginForm.email} autoComplete="email" required
                    onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} />
                  <InputField label="Password" type="password"
                    value={loginForm.password} autoComplete="current-password" required
                    onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} />
                </div>

                <button type="button" className="forgot-link">Forgot your password?</button>

                <button type="submit" className={`submit-btn${success ? " done" : ""}`} disabled={loading || success}>
                  {loading && <span className="spin" />}
                  {success
                    ? <><span className="spin light" />Welcome back — redirecting…</>
                    : loading ? "Signing in…" : "Sign In  →"}
                </button>
              </form>
            ) : (
              /* ── SIGNUP ── */
              <form key="signup" onSubmit={handleSignup}>
                <div className="fields">
                  <InputField label="Full Name" type="text"
                    value={signupForm.name} autoComplete="name" required
                    onChange={e => setSignupForm(p => ({ ...p, name: e.target.value }))} />
                  <InputField label="Email Address" type="email"
                    value={signupForm.email} autoComplete="email" required
                    onChange={e => setSignupForm(p => ({ ...p, email: e.target.value }))} />
                  <div>
                    <InputField label="Password" type="password"
                      value={signupForm.password} autoComplete="new-password" required minLength={8}
                      onChange={e => setSignupForm(p => ({ ...p, password: e.target.value }))} />
                    {signupForm.password.length > 0 && (
                      <div className="pw-meter">
                        <div className="pw-bars">
                          {[0,1,2,3].map(i => (
                            <div key={i} className="pw-bar" style={{ background: i < pwStr ? PW_LEVELS[pwStr].color : undefined }} />
                          ))}
                        </div>
                        <span className="pw-lbl" style={{ color: PW_LEVELS[pwStr].color }}>
                          {PW_LEVELS[pwStr].label}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="match-wrap">
                    <InputField label="Confirm Password" type="password"
                      value={signupForm.confirm} autoComplete="new-password" required minLength={8}
                      onChange={e => setSignupForm(p => ({ ...p, confirm: e.target.value }))} />
                    {signupForm.confirm.length > 0 && (
                      <span className="match-mark" style={{ color: signupForm.confirm === signupForm.password ? "#52b872" : "#e05252" }}>
                        {signupForm.confirm === signupForm.password ? "✓" : "✕"}
                      </span>
                    )}
                  </div>
                </div>

                <button type="submit" className={`submit-btn${success ? " done" : ""}`} disabled={loading || success}>
                  {loading && <span className="spin" />}
                  {success
                    ? <><span className="spin light" />Welcome to the family…</>
                    : loading ? "Creating your account…" : "Create Account  →"}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="foot-rule" />
            <div className="form-foot">
              <p className="foot-text">
                Just browsing?
                <button className="foot-btn" onClick={() => setPage?.("home")}>Return to home</button>
              </p>
              <p className="foot-tagline">Handcrafted · Fresh Daily · Est. 1987</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}