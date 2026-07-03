import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/auth.service";
//import Dashboard from "../dashboard/Dashboard";
import { useSearchParams } from "react-router-dom";

type Tab = "login" | "register";

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ fullName: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const verified = searchParams.get("verified");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(""); setSuccess("");
  setLoading(true);
  try {
    await login(loginForm.email, loginForm.password);
    navigate("/dashboard");  // ← "/" مش "/Dashboard"
  } catch (err: any) {
    setError(err.response?.data?.message ||"Failed To Login");
  } finally {
    setLoading(false);
  }
};

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (registerForm.password !== registerForm.confirm) {
      setError("Unmatched Password");
      return;
    }
    setLoading(true);
    try {
      await register(registerForm.fullName, registerForm.email, registerForm.password);
      setSuccess("Account Created! Login Now!");
      setTab("login");
      setLoginForm({ email: registerForm.email, password: "" });
      setRegisterForm({ fullName: "", email: "", password: "", confirm: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed To Create Account");
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (t: Tab) => { setTab(t); setError(""); setSuccess(""); };

  return (
    <div style={s.page}>
      <div style={s.bgGlow} />
      <div style={s.card}>

        {/* Brand */}
        <div style={s.brand}>
          <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="10" fill="#d4a651" fillOpacity=".15" />
            <path d="M18 8 L28 14 L28 22 L18 28 L8 22 L8 14 Z" stroke="#d4a651" strokeWidth="1.4" fill="none" />
            <circle cx="18" cy="18" r="3" fill="#d4a651" />
          </svg>
          <div>
            <div style={s.wordmark}>Tadbira</div>
            <div style={s.sub}>MANAGEMENT SUITE</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          <button style={{ ...s.tab, ...(tab === "login" ? s.tabActive : {}) }} onClick={() => switchTab("login")}>
            Login
          </button>
          <button style={{ ...s.tab, ...(tab === "register" ? s.tabActive : {}) }} onClick={() => switchTab("register")}>
            Create Account
          </button>
        </div>

        {error   && <div style={s.errorBox}>{error}</div>}
        {success && <div style={s.successBox}>{success}</div>}

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} style={s.form}>
            <div style={s.field}>
              <label style={s.label}>Email Address</label>
              <input type="email" required style={s.input}
                value={loginForm.email}
                onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="example@example.com"
                onFocus={e => (e.target.style.borderColor = "#d4a651")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,166,81,.18)")}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Password</label>
              <input type="password" required style={s.input}
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                onFocus={e => (e.target.style.borderColor = "#d4a651")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,166,81,.18)")}
              />
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                style={{ background: "none", border: "none", color: "#9aa7bd", fontSize: "12.5px", cursor: "pointer", textAlign: "center", marginTop: "4px" }}
              >
                Forgot Password?
              </button>
            </div>
            <button type="submit" disabled={loading} style={s.btn}>
              {loading ? "Logging in" : "Log in"}
            </button>
          </form>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <form onSubmit={handleRegister} style={s.form}>
            <div style={s.field}>
              <label style={s.label}>Full Name</label>
              <input type="text" required style={s.input}
                value={registerForm.fullName}
                onChange={e => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                placeholder="Name"
                onFocus={e => (e.target.style.borderColor = "#d4a651")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,166,81,.18)")}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Email Address</label>
              <input type="email" required style={s.input}
                value={registerForm.email}
                onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                placeholder="example@example.com"
                onFocus={e => (e.target.style.borderColor = "#d4a651")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,166,81,.18)")}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Password</label>
              <input type="password" required style={s.input}
                value={registerForm.password}
                onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                placeholder="••••••••"
                onFocus={e => (e.target.style.borderColor = "#d4a651")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,166,81,.18)")}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Password</label>
              <input type="password" required style={s.input}
                value={registerForm.confirm}
                onChange={e => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                placeholder="••••••••"
                onFocus={e => (e.target.style.borderColor = "#d4a651")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,166,81,.18)")}
              />
            </div>
            <button type="submit" disabled={loading} style={s.btn}>
              {loading ? "Creating Account" : "Create Account"}
            </button>
            {verified && <div style={s.successBox}>✅ Email Verified You Can Login Now</div>}
          </form>
        )}
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a182d, #0d1e36)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "24px", position: "relative", overflow: "hidden",
    fontFamily: '"Inter", system-ui, sans-serif', direction: "rtl",
  },
  bgGlow: {
    position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(212,166,81,.1), transparent 70%)",
    top: "-200px", right: "-200px", pointerEvents: "none",
  },
  card: {
    position: "relative", zIndex: 1, width: "100%", maxWidth: "420px",
    background: "linear-gradient(180deg, #0f2440, #0b1c34)",
    border: "1px solid rgba(212,166,81,.18)", borderRadius: "18px", padding: "44px 40px",
  },
  brand: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" },
  wordmark: { fontFamily: '"Cormorant Garamond", serif', fontSize: "22px", fontWeight: 600, color: "#fff", letterSpacing: ".5px" },
  sub: { fontSize: "10px", letterSpacing: ".28em", color: "#9aa7bd", marginTop: "2px" },
  tabs: {
    display: "flex", background: "rgba(255,255,255,.04)",
    borderRadius: "10px", padding: "4px", marginBottom: "28px", gap: "4px",
  },
  tab: {
    flex: 1, padding: "10px", border: "none", borderRadius: "7px",
    fontSize: "13.5px", cursor: "pointer", fontFamily: '"Inter", sans-serif',
    background: "none", color: "#9aa7bd", transition: "all .2s",
  },
  tabActive: { background: "#d4a651", color: "#0a182d", fontWeight: 600 },
  errorBox: {
    background: "rgba(220,50,50,.12)", border: "1px solid rgba(220,50,50,.3)",
    borderRadius: "8px", padding: "12px 16px", color: "#f87171",
    fontSize: "13px", marginBottom: "18px",
  },
  successBox: {
    background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.25)",
    borderRadius: "8px", padding: "12px 16px", color: "#4ade80",
    fontSize: "13px", marginBottom: "18px",
  },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  field: { display: "flex", flexDirection: "column", gap: "7px" },
  label: { fontSize: "12.5px", color: "#9aa7bd", letterSpacing: ".03em" },
  input: {
    background: "rgba(255,255,255,.04)", border: "1px solid rgba(212,166,81,.18)",
    borderRadius: "10px", padding: "13px 16px", color: "#e9eef7", fontSize: "14px",
    fontFamily: '"Inter", sans-serif', outline: "none", transition: "border-color .2s",
    width: "100%", boxSizing: "border-box",
  },
  btn: {
    marginTop: "6px", background: "#d4a651", color: "#0a182d", border: "none",
    borderRadius: "999px", padding: "14px", fontSize: "14px", fontWeight: 600,
    cursor: "pointer", fontFamily: '"Inter", sans-serif', letterSpacing: ".02em",
  },
};
