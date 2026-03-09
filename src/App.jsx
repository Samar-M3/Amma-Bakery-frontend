import { useEffect, useState } from "react";

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

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState(SEED_ORDERS);
  const [products, setProducts] = useState(PRODUCTS);
  const [auth, setAuth] = useState(readStoredAuth());

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

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartOpen(true);
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
