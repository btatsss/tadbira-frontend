
import { useLocation, useNavigate } from "react-router-dom";


const titles: Record<string, string> = {
  "/": "Panel",
  "/clients": "Clients",
  "/projects": "Projects",
  "/tasks": "Tasks",
};

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const title = titles[pathname] ?? "Tadbira";

  return (
    <header style={styles.nav}>
      <div
        style={{
          ...styles.title,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        {title}
      </div>

      <div style={styles.right}>
        <div
          style={styles.avatar}
          onClick={() => navigate("/")}
        >
          Home
        </div>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 32px",
    background: "rgba(10,24,45,.78)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(212,166,81,.18)",
    fontFamily: '"Inter", system-ui, sans-serif',
    direction: "rtl",
  },
  title: {
    fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
    fontSize: "22px",
    fontWeight: 500,
    color: "#fff",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "55px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1b365f, #0a182d)",
    border: "1px solid #d4a651",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: "16px",
    color: "#d4a651",
    cursor: "pointer",
  },
};
