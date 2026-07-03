import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";


export default function Sidebar() {
  const navigate = useNavigate();
  const { isAdmin, isEmployee } = useAuth();

  const nav = [
    {
      to: "/dashboard", label: "Panel", show: true,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    },
    {
      to: "/dashboard/clients", label: "Clients", show: isAdmin || isEmployee,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/></svg>,
    },
    {
      to: "/dashboard/projects", label: "Projects", show: true,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/></svg>,
    },
    {
      to: "/dashboard/tasks", label: "Tasks", show: true,
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    },
  ];

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="10" fill="#d4a651" fillOpacity=".15"/>
          <path d="M18 8 L28 14 L28 22 L18 28 L8 22 L8 14 Z" stroke="#d4a651" strokeWidth="1.4" fill="none"/>
          <circle cx="18" cy="18" r="3" fill="#d4a651"/>
        </svg>
        <div
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div style={styles.wordmark}>Tadbira</div>
          <div style={styles.sub}>SUITE</div>
        </div>
      </div>

      <nav style={styles.nav}>
        <div style={styles.navLabel}>Menu</div>
        {nav.filter(item => item.show).map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"}
            style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.linkActive : {}) })}>
            <span style={styles.icon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={styles.roleBadge}>
        {isAdmin ? "Admin" : isEmployee ? "Employee" : "Client"}
      </div>

      <button onClick={handleLogout} style={styles.logout}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Logout
      </button>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: { width: "240px", minHeight: "100vh", background: "#0a182d", borderLeft: "1px solid rgba(212,166,81,.18)", display: "flex", flexDirection: "column", padding: "28px 16px", fontFamily: '"Inter", system-ui, sans-serif', direction: "rtl", flexShrink: 0 },
  brand: { display: "flex", alignItems: "center", gap: "10px", padding: "0 8px 28px", borderBottom: "1px solid rgba(212,166,81,.12)", marginBottom: "8px" },
  wordmark: { fontFamily: '"Cormorant Garamond", serif', fontSize: "20px", fontWeight: 600, color: "#fff" },
  sub: { fontSize: "9px", letterSpacing: ".28em", color: "#9aa7bd" },
  nav: { display: "flex", flexDirection: "column", gap: "2px", flex: 1 },
  navLabel: { fontSize: "10px", letterSpacing: ".22em", textTransform: "uppercase", color: "#9aa7bd", padding: "0 12px", marginBottom: "8px" },
  link: { display: "flex", alignItems: "center", gap: "10px", padding: "11px 12px", borderRadius: "10px", fontSize: "14px", color: "#9aa7bd", textDecoration: "none", transition: "background .2s, color .2s" },
  linkActive: { background: "rgba(212,166,81,.12)", color: "#e7c887" },
  icon: { opacity: 0.8 },
  roleBadge: { margin: "16px 8px 8px", padding: "6px 12px", borderRadius: "8px", background: "rgba(212,166,81,.08)", border: "1px solid rgba(212,166,81,.2)", fontSize: "11px", letterSpacing: ".1em", color: "#d4a651", textAlign: "center" },
  logout: { display: "flex", alignItems: "center", gap: "8px", padding: "11px 12px", borderRadius: "10px", fontSize: "13px", color: "#9aa7bd", background: "none", border: "none", cursor: "pointer", fontFamily: '"Inter", sans-serif', width: "100%" },
};
