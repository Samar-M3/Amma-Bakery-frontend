import { useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8001/api";

export default function AuthPage({ mode = "login", setPage, onAuthSuccess, notice = "" }) {
  const [active, setActive] = useState(mode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const isLogin = active === "login";
  const title = useMemo(() => (isLogin ? "Welcome Back" : "Create Your Bakery Account"), [isLogin]);

  const submitLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Login failed");
      }
      onAuthSuccess(json.data);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (signupForm.password !== signupForm.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password
      };
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Signup failed");
      }
      onAuthSuccess(json.data);
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .auth-wrap {
          min-height: 100vh;
          padding: 110px 20px 80px;
          background:
            radial-gradient(circle at 0% 0%, rgba(201,168,76,0.14) 0%, transparent 45%),
            radial-gradient(circle at 100% 0%, rgba(44,26,6,0.18) 0%, transparent 42%),
            var(--cream);
          display: grid;
          place-items: center;
        }

        .auth-card {
          width: min(100%, 560px);
          background: rgba(255,255,255,0.96);
          border: 1px solid var(--border);
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
          padding: 26px;
          backdrop-filter: blur(12px);
        }

        .auth-pill {
          display: inline-flex;
          border: 1px solid rgba(201,168,76,0.55);
          color: var(--brown-mid);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          border-radius: 999px;
          padding: 7px 12px;
        }

        .auth-title {
          margin-top: 12px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 42px);
          color: var(--brown);
        }

        .auth-sub {
          margin-top: 8px;
          color: var(--text-light);
          font-size: 14px;
          line-height: 1.7;
        }

        .auth-toggle {
          margin-top: 18px;
          background: var(--gold-pale);
          border: 1px solid var(--border);
          border-radius: 12px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 4px;
          gap: 4px;
        }

        .auth-tab {
          border: none;
          border-radius: 9px;
          background: transparent;
          color: var(--text-mid);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 10px 8px;
        }
        .auth-tab.active {
          background: var(--gold);
          color: var(--brown);
          box-shadow: 0 4px 10px rgba(201,168,76,0.25);
        }

        .auth-form {
          margin-top: 18px;
          display: grid;
          gap: 12px;
        }

        .auth-field { display: grid; gap: 6px; }
        .auth-field label { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--brown-mid); }
        .auth-field input {
          border: 1.5px solid var(--border);
          border-radius: 12px;
          padding: 12px;
          font-size: 14px;
          color: var(--text);
          background: #fff;
          outline: none;
        }
        .auth-field input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.18);
        }

        .auth-error,
        .auth-notice {
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 13px;
          border: 1px solid;
        }
        .auth-error { color: #8a2f2f; background: #fdf0ef; border-color: #efc8c3; }
        .auth-notice { color: var(--brown-mid); background: #fff8e8; border-color: #e8d5a2; }

        .auth-submit {
          margin-top: 4px;
          border: none;
          border-radius: 12px;
          background: var(--gold);
          color: var(--brown);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 13px;
          box-shadow: 0 6px 22px rgba(201,168,76,0.35);
        }
        .auth-submit:hover { filter: brightness(1.03); transform: translateY(-1px); }
        .auth-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        .auth-foot {
          margin-top: 14px;
          text-align: center;
          color: var(--text-light);
          font-size: 13px;
        }
        .auth-foot button {
          background: none;
          color: var(--brown-mid);
          text-decoration: underline;
          font-weight: 700;
          padding: 0;
          border: none;
        }

        @media (max-width: 560px) {
          .auth-wrap { padding: 92px 16px 56px; }
          .auth-card { padding: 20px; }
        }
      `}</style>

      <section className="auth-wrap">
        <div className="auth-card">
          <span className="auth-pill">Ama Bakery</span>
          <h1 className="auth-title">{title}</h1>
          <p className="auth-sub">
            Sign in or create an account to continue your bakery journey with fresh treats and faster checkout.
          </p>

          <div className="auth-toggle">
            <button className={`auth-tab${isLogin ? " active" : ""}`} onClick={() => setActive("login")}>Login</button>
            <button className={`auth-tab${!isLogin ? " active" : ""}`} onClick={() => setActive("signup")}>Signup</button>
          </div>

          {notice && <div className="auth-notice">{notice}</div>}
          {error && <div className="auth-error">{error}</div>}

          {isLogin ? (
            <form className="auth-form" onSubmit={submitLogin}>
              <div className="auth-field">
                <label>Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>
              <div className="auth-field">
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))}
                  required
                />
              </div>
              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={submitSignup}>
              <div className="auth-field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div className="auth-field">
                <label>Email</label>
                <input
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm((p) => ({ ...p, email: e.target.value }))}
                  required
                />
              </div>
              <div className="auth-field">
                <label>Password</label>
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm((p) => ({ ...p, password: e.target.value }))}
                  required
                  minLength={8}
                />
              </div>
              <div className="auth-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={signupForm.confirm}
                  onChange={(e) => setSignupForm((p) => ({ ...p, confirm: e.target.value }))}
                  required
                  minLength={8}
                />
              </div>
              <button className="auth-submit" type="submit" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          )}

          <div className="auth-foot">
            Want to continue browsing first? <button onClick={() => setPage("home")}>Back to Home</button>
          </div>
        </div>
      </section>
    </>
  );
}
