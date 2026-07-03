import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/auth.service";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.bgGlow} />
      <div style={s.card}>
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

        <h1 style={s.heading}>نسيت كلمة المرور؟</h1>
        <p style={s.lede}>أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين</p>

        {error && <div style={s.errorBox}>{error}</div>}

        {sent ? (
          <div style={s.successBox}>
            تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني، تحقق من صندوق الوارد.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.field}>
              <label style={s.label}>البريد الإلكتروني</label>
              <input
                type="email"
                required
                style={s.input}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ahmed@example.com"
                onFocus={e => (e.target.style.borderColor = "#d4a651")}
                onBlur={e => (e.target.style.borderColor = "rgba(212,166,81,.18)")}
              />
            </div>
            <button type="submit" disabled={loading} style={s.btn}>
              {loading ? "جارٍ الإرسال..." : "إرسال رابط إعادة التعيين"}
            </button>
          </form>
        )}

        <button onClick={() => navigate("/login")} style={s.backLink}>
          ← العودة لتسجيل الدخول
        </button>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh", background: "linear-gradient(180deg, #0a182d, #0d1e36)",
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
  heading: { fontFamily: '"Cormorant Garamond", serif', fontWeight: 500, fontSize: "30px", color: "#fff", margin: "0 0 8px" },
  lede: { color: "#9aa7bd", fontSize: "14px", margin: "0 0 28px", lineHeight: 1.6 },
  errorBox: { background: "rgba(220,50,50,.12)", border: "1px solid rgba(220,50,50,.3)", borderRadius: "8px", padding: "12px 16px", color: "#f87171", fontSize: "13px", marginBottom: "18px" },
  successBox: { background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.25)", borderRadius: "8px", padding: "16px", color: "#4ade80", fontSize: "13.5px", lineHeight: 1.7, marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  field: { display: "flex", flexDirection: "column", gap: "7px" },
  label: { fontSize: "12.5px", color: "#9aa7bd", letterSpacing: ".03em" },
  input: {
    background: "rgba(255,255,255,.04)", border: "1px solid rgba(212,166,81,.18)",
    borderRadius: "10px", padding: "13px 16px", color: "#e9eef7", fontSize: "14px",
    fontFamily: '"Inter", sans-serif', outline: "none", width: "100%", boxSizing: "border-box",
  },
  btn: {
    marginTop: "6px", background: "#d4a651", color: "#0a182d", border: "none",
    borderRadius: "999px", padding: "14px", fontSize: "14px", fontWeight: 600,
    cursor: "pointer", fontFamily: '"Inter", sans-serif', letterSpacing: ".02em",
  },
  backLink: {
    marginTop: "24px", background: "none", border: "none", color: "#9aa7bd",
    fontSize: "13px", cursor: "pointer", fontFamily: '"Inter", sans-serif',
    width: "100%", textAlign: "center", padding: "8px",
  },
};
