import { useEffect, useRef, useState } from "react";

import { PRODUCTS, SEED_ORDERS } from "./data/products.js";
import { globalCSS } from "./styles/global.css.js";

import Navbar from "./components/Navbar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Footer from "./components/Footer.jsx";

import HomePage from "./pages/HomePage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FindPage from "./pages/FindPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8001/api";
const AUTH_KEY = "ama_auth";

const DEFAULT_PRODUCT_PHOTO =
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80&auto=format&fit=crop";

const PRODUCT_PHOTO_MAP = [
  { keys: ["croissant", "butter", "flaky"], src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop" },
  { keys: ["cake", "dora", "coconut", "slice"], src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80&auto=format&fit=crop" },
  { keys: ["cookie", "biscuit", "chocolate"], src: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop" },
  { keys: ["bread", "loaf", "sourdough"], src: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80&auto=format&fit=crop" },
  { keys: ["muffin", "cupcake"], src: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80&auto=format&fit=crop" },
  { keys: ["donut", "doughnut"], src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop" },
  { keys: ["tart", "pastry", "danish"], src: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80&auto=format&fit=crop" },
  { keys: ["pumpkin", "bite", "snack"], src: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=600&q=80&auto=format&fit=crop" },
  { keys: ["sandwich", "savory"], src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80&auto=format&fit=crop" },
  { keys: ["roll", "bun", "sweet"], src: "https://images.unsplash.com/photo-1600626334041-e64e3369e69e?w=600&q=80&auto=format&fit=crop" },
];

const CATEGORY_PHOTO_FALLBACK = {
  Muffins: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80&auto=format&fit=crop",
  Snacks: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=600&q=80&auto=format&fit=crop",
  Cakes: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80&auto=format&fit=crop",
  Breads: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80&auto=format&fit=crop",
  Cookies: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80&auto=format&fit=crop",
  Pastries: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80&auto=format&fit=crop",
  Savory: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80&auto=format&fit=crop",
};

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { token: "", user: null };
    const parsed = JSON.parse(raw);
    return { token: parsed.token || "", user: parsed.user || null };
  } catch {
    return { token: "", user: null };
  }
}

function saveAuth(auth) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

function resolveProductPhoto(product) {
  if (product?.photo) return product.photo;
  if (product?.image) return product.image;
  if (product?.img) return product.img;

  const text = `${product?.name || ""} ${product?.description || ""} ${product?.category || ""}`.toLowerCase();
  const matched = PRODUCT_PHOTO_MAP.find((entry) => entry.keys.some((key) => text.includes(key)));
  if (matched) return matched.src;

  return CATEGORY_PHOTO_FALLBACK[product?.category] || DEFAULT_PRODUCT_PHOTO;
}

function CartAddedToast({ notice, onClose }) {
  const [imgErr, setImgErr] = useState(false);

  if (!notice) return null;

  return (
    <>
      <style>{`
        .cart-toast {
          position: fixed;
          top: 88px;
          right: 16px;
          z-index: 2600;
          width: min(360px, calc(100vw - 24px));
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid var(--border);
          box-shadow: 0 12px 38px rgba(44, 26, 6, 0.18);
          animation: cartToastIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
        }
        @keyframes cartToastIn {
          from { opacity: 0; transform: translateX(16px) translateY(-8px); }
          to { opacity: 1; transform: translateX(0) translateY(0); }
        }
        .cart-toast-thumb {
          width: 54px;
          height: 54px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid var(--border);
          background: var(--gold-wash);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-toast-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .cart-toast-fallback {
          font-size: 24px;
          line-height: 1;
        }
        .cart-toast-copy {
          min-width: 0;
          flex: 1;
        }
        .cart-toast-kicker {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: 4px;
        }
        .cart-toast-name {
          font-family: "Playfair Display", serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--brown);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cart-toast-note {
          margin-top: 2px;
          font-size: 12px;
          color: var(--text-mid);
        }
        .cart-toast-close {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--white);
          color: var(--text-mid);
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          transition: all 0.2s;
        }
        .cart-toast-close:hover {
          background: var(--gold-wash);
          color: var(--brown);
          border-color: var(--gold);
        }
      `}</style>
      <div className="cart-toast" role="status" aria-live="polite">
        <div className="cart-toast-thumb">
          {!imgErr ? (
            <img src={notice.photo} alt={notice.name} onError={() => setImgErr(true)} />
          ) : (
            <span className="cart-toast-fallback">{notice.emoji || "Item"}</span>
          )}
        </div>
        <div className="cart-toast-copy">
          <div className="cart-toast-kicker">Added To Cart</div>
          <div className="cart-toast-name">{notice.name}</div>
          <div className="cart-toast-note">Item added successfully.</div>
        </div>
        <button type="button" className="cart-toast-close" onClick={onClose} aria-label="Close notification">
          x
        </button>
      </div>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartNotice, setCartNotice] = useState(null);
  const [orders, setOrders] = useState(SEED_ORDERS);
  const [products, setProducts] = useState(PRODUCTS);
  const [auth, setAuth] = useState(readStoredAuth());
  const cartNoticeTimerRef = useRef(null);

  useEffect(() => {
    const verifyToken = async () => {
      if (!auth.token) return;
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        if (!res.ok) throw new Error("Invalid session");
        const json = await res.json();
        const nextAuth = { token: auth.token, user: json.data };
        setAuth(nextAuth);
        saveAuth(nextAuth);
      } catch {
        setAuth({ token: "", user: null });
        clearAuth();
      }
    };

    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (cartNoticeTimerRef.current) clearTimeout(cartNoticeTimerRef.current);
    };
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartQty = (id, qty) => {
    if (qty <= 0) setCart((prev) => prev.filter((i) => i.id !== id));
    else setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const showCartNotice = (product) => {
    const notice = {
      id: `${product?.id || "item"}-${Date.now()}`,
      name: product?.name || "Item",
      photo: resolveProductPhoto(product),
      emoji: product?.emoji || "",
    };

    setCartNotice(notice);

    if (cartNoticeTimerRef.current) clearTimeout(cartNoticeTimerRef.current);
    cartNoticeTimerRef.current = setTimeout(() => {
      setCartNotice(null);
      cartNoticeTimerRef.current = null;
    }, 2200);
  };

  const hideCartNotice = () => {
    setCartNotice(null);
    if (cartNoticeTimerRef.current) {
      clearTimeout(cartNoticeTimerRef.current);
      cartNoticeTimerRef.current = null;
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showCartNotice(product);
  };

  const placeOrder = (order) => {
    setOrders((prev) => [...prev, order]);
    setCart([]);
  };

  const handleAuthSuccess = ({ token, user }) => {
    const next = { token, user };
    setAuth(next);
    saveAuth(next);
    setPage(user?.role === "admin" ? "admin" : "home");
  };

  const handleLogout = async () => {
    try {
      if (auth.token) {
        await fetch(`${API_BASE}/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${auth.token}` }
        });
      }
    } catch {
      // no-op
    }
    setAuth({ token: "", user: null });
    clearAuth();
    setPage("home");
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const isAdminView = page === "admin";
  const isAdminUser = auth.user?.role === "admin";

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage onAdd={handleAddToCart} setPage={setPage} />;
      case "menu":
        return <MenuPage onAdd={handleAddToCart} />;
      case "about":
        return <AboutPage />;
      case "find":
        return <FindPage />;
      case "checkout":
        return <CheckoutPage cart={cart} onPlaceOrder={placeOrder} />;
      case "login":
        return <AuthPage mode="login" setPage={setPage} onAuthSuccess={handleAuthSuccess} />;
      case "signup":
        return <AuthPage mode="signup" setPage={setPage} onAuthSuccess={handleAuthSuccess} />;
      case "admin":
        if (!isAdminUser) {
          return (
            <AuthPage
              mode="login"
              setPage={setPage}
              onAuthSuccess={handleAuthSuccess}
              notice="Admin login required to open dashboard."
            />
          );
        }
        return (
          <AdminPage
            orders={orders}
            products={products}
            setOrders={setOrders}
            setProducts={setProducts}
          />
        );
      default:
        return <HomePage onAdd={handleAddToCart} setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{globalCSS}</style>

      <Navbar
        page={page}
        setPage={setPage}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        isAdmin={isAdminView}
        authUser={auth.user}
        onLogout={handleLogout}
      />

      <main>{renderPage()}</main>

      {!isAdminView && page !== "login" && page !== "signup" && <Footer setPage={setPage} />}

      {!isAdminView && page !== "login" && page !== "signup" && cartNotice && (
        <CartAddedToast key={cartNotice.id} notice={cartNotice} onClose={hideCartNotice} />
      )}

      {!isAdminView && cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateCartQty}
          onRemove={removeFromCart}
          onCheckout={() => {
            setCartOpen(false);
            setPage("checkout");
          }}
        />
      )}
    </>
  );
}

