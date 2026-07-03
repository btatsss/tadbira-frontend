import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div style={styles.root}>
      <Sidebar />
      <div style={styles.main}>
        <Navbar />
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#0d1e36",
    fontFamily: '"Inter", system-ui, sans-serif',
    direction: "rtl",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: "32px",
    overflowY: "auto",
  },
};
