import { useEffect, useState } from "react";
import LOGO_SRC from "../data/logo.js";
import { IC } from "../data/icons.jsx";

export default function Navbar({ page, setPage, cartCount, onCartOpen, isAdmin, authUser, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = isAdmin
    ? [{ l: "← Back to Site", k: "home" }]
    : [
        { l: "Menu", k: "menu" },
        { l: "About", k: "about" },
        { l: "Find Us", k: "find" }
      ];

  const isLoggedIn = Boolean(authUser);
  const isAdminUser = authUser?.role === "admin";

  return (
    <>
      <style>{`
        .nav { position:fixed; top:0; left:0; right:0; z-index:1000; transition:all 0.3s; }
        .nav.sc { background:rgba(253,250,245,0.97); backdrop-filter:blur(20px); box-shadow:0 1px 0 var(--border),var(--shadow-sm); }
        .nav.top { background:transparent; }
        .nav-inner { max-width:1280px; margin:0 auto; padding:0 28px; display:flex; align-items:center; justify-content:space-between; height:72px; }

        .nav-brand { display:flex; align-items:center; gap:12px; cursor:pointer; }
        .nav-logo-img { width:48px; height:48px; border-radius:50%; object-fit:cover; box-shadow:0 2px 12px rgba(201,168,76,0.4); }
        .nav-brand-name { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--brown); letter-spacing:-0.01em; }
        .nav-brand-sub  { font-size:9px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold-dark); margin-top:2px; }
        .nav.top .nav-brand-name { color:var(--gold-light); }
        .nav.top .nav-brand-sub  { color:rgba(255,255,255,0.72); }

        .nav-links { display:flex; gap:2px; align-items:center; }
        .nav-open-pill { display:flex; align-items:center; gap:6px; background:rgba(27,94,59,0.1); color:var(--green); font-size:11px; font-weight:700; letter-spacing:0.08em; padding:5px 13px; border-radius:20px; margin-right:10px; }
        .nav-dot { width:7px; height:7px; background:var(--green); border-radius:50%; animation:pulse 2s infinite; }
        .nl { padding:8px 16px; border-radius:10px; font-size:13px; font-weight:600; color:var(--text-mid); transition:all 0.2s; cursor:pointer; background:none; letter-spacing:0.01em; }
        .nl:hover, .nl.ac { color:var(--brown); background:var(--gold-wash); }
        .nav.top .nl { color:rgba(255,255,255,0.88); }
        .nav.top .nl:hover, .nav.top .nl.ac { color:var(--brown); background:rgba(228,199,107,0.95); }

        .nav-actions { display:flex; align-items:center; gap:10px; margin-left:8px; }
        .nav-user-chip { display:inline-flex; align-items:center; background:rgba(255,255,255,0.16); border:1px solid rgba(201,168,76,0.45); color:var(--gold-light); border-radius:999px; font-size:11px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; padding:8px 12px; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .nav.sc .nav-user-chip { color:var(--brown-mid); background:var(--gold-pale); border-color:var(--border); }

        .nav-login-btn, .nav-logout-btn, .nav-admin-btn {
          display:flex; align-items:center; justify-content:center;
          border-radius:12px; padding:10px 16px; font-size:12px; font-weight:700;
          letter-spacing:0.07em; text-transform:uppercase; transition:all 0.25s;
        }
        .nav-login-btn {
          background:transparent; color:var(--gold-light); border:1px solid rgba(201,168,76,0.55);
        }
        .nav-login-btn:hover { background:rgba(201,168,76,0.14); border-color:var(--gold-light); color:#fff; transform:translateY(-1px); }
        .nav.sc .nav-login-btn { color:var(--brown); border-color:rgba(154,122,46,0.45); }
        .nav.sc .nav-login-btn:hover { color:var(--brown); background:var(--gold-wash); border-color:var(--gold); }

        .nav-admin-btn { background:var(--brown); color:var(--gold-light); border:1px solid rgba(201,168,76,0.35); }
        .nav-admin-btn:hover { background:var(--gold); color:var(--brown); }

        .nav-logout-btn { background:transparent; color:var(--text-mid); border:1px solid var(--border); }
        .nav-logout-btn:hover { background:var(--gold-wash); color:var(--brown); }
        .nav.top .nav-logout-btn { color:rgba(255,255,255,0.86); border-color:rgba(255,255,255,0.3); }
        .nav.top .nav-logout-btn:hover { color:var(--brown); background:rgba(255,255,255,0.92); }

        .nav-cart-btn { display:flex; align-items:center; gap:7px; background:var(--gold); color:var(--brown); border:none; border-radius:12px; padding:10px 18px; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.25s; box-shadow:0 2px 12px rgba(201,168,76,0.35); }
        .nav-cart-btn:hover { background:var(--gold-dark); color:#fff; transform:translateY(-1px); }
        .nav-cart-btn svg { width:16px; height:16px; }
        .cart-count { background:var(--brown); color:var(--gold-light); font-size:10px; font-weight:900; min-width:19px; height:19px; border-radius:10px; display:flex; align-items:center; justify-content:center; animation:pulse 0.3s ease; }

        .hbg { display:none; background:none; padding:8px; color:var(--brown); }
        .hbg svg { width:22px; height:22px; }
        .nav.top .hbg { color:var(--gold-light); }

        .mob-menu { display:none; position:absolute; top:72px; left:0; right:0; background:var(--cream); border-bottom:1px solid var(--border); padding:16px 28px 20px; flex-direction:column; gap:6px; box-shadow:var(--shadow); }
        .mob-menu.open { display:flex; }

        @media (max-width: 920px) {
          .nav-links { display:none; }
          .hbg { display:flex; }
        }
      `}</style>

      <nav className={`nav ${scrolled || page !== "home" ? "sc" : "top"}`}>
        <div className="nav-inner">
          <div className="nav-brand" onClick={() => setPage("home")}>
            <img src={LOGO_SRC} alt="Ama Bakery Logo" className="nav-logo-img" />
            <div>
              <div className="nav-brand-name">Ama Bakery</div>
              <div className="nav-brand-sub">Kathmandu · Est. 2022</div>
            </div>
          </div>

          <div className="nav-links">
            {!isAdmin && (
              <span className="nav-open-pill">
                <span className="nav-dot" /> Open 6AM-9PM
              </span>
            )}

            {links.map((l) => (
              <button key={l.k} className={`nl${page === l.k ? " ac" : ""}`} onClick={() => setPage(l.k)}>
                {l.l}
              </button>
            ))}

            {!isAdmin && (
              <div className="nav-actions">
                <button className="nav-cart-btn" onClick={onCartOpen}>
                  <span style={{ width: 16, height: 16, display: "flex" }}>{IC.cart}</span>
                  Cart
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </button>

                {isLoggedIn ? (
                  <>
                    <span className="nav-user-chip">{authUser.name || authUser.email}</span>
                    {isAdminUser && <button className="nav-admin-btn" onClick={() => setPage("admin")}>Admin</button>}
                    <button className="nav-logout-btn" onClick={onLogout}>Logout</button>
                  </>
                ) : (
                  <button className="nav-login-btn" onClick={() => setPage("login")}>Login</button>
                )}
              </div>
            )}
          </div>

          <button className="hbg" onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? IC.close : IC.menu}
          </button>
        </div>

        <div className={`mob-menu${mobileOpen ? " open" : ""}`}>
          {!isAdmin && (
            <span className="nav-open-pill" style={{ justifyContent: "center" }}>
              <span className="nav-dot" /> Open Daily 6AM-9PM
            </span>
          )}

          {links.map((l) => (
            <button
              key={l.k}
              className="nl"
              onClick={() => {
                setPage(l.k);
                setMobileOpen(false);
              }}
            >
              {l.l}
            </button>
          ))}

          {!isAdmin && (
            <button
              className="nav-cart-btn"
              style={{ justifyContent: "center", marginTop: 4 }}
              onClick={() => {
                onCartOpen();
                setMobileOpen(false);
              }}
            >
              {IC.cart} Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          )}

          {!isAdmin && !isLoggedIn && (
            <button
              className="nav-login-btn"
              style={{ justifyContent: "center", marginTop: 4 }}
              onClick={() => {
                setPage("login");
                setMobileOpen(false);
              }}
            >
              Login
            </button>
          )}

          {!isAdmin && isLoggedIn && (
            <>
              {isAdminUser && (
                <button
                  className="nav-admin-btn"
                  style={{ justifyContent: "center", marginTop: 4 }}
                  onClick={() => {
                    setPage("admin");
                    setMobileOpen(false);
                  }}
                >
                  Admin
                </button>
              )}
              <button
                className="nav-logout-btn"
                style={{ justifyContent: "center", marginTop: 4 }}
                onClick={() => {
                  onLogout();
                  setMobileOpen(false);
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
