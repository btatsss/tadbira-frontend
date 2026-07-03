import { useEffect, useState } from "react";
import { getProjects } from "../../services/project.service";
import { getClients } from "../../services/client.service";
import { getTasks } from "../../services/task.service";


const statusLabel: Record<string, string> = {
  PENDING: "Pending", IN_PROGRESS: "In Progress", COMPLETED: "Completed", CANCELLED: "Canceled",
};
const statusColor: Record<string, string> = {
  PENDING: "#9aa7bd", IN_PROGRESS: "#d4a651", COMPLETED: "#4ade80", CANCELLED: "#f87171",
};

export default function Dashboard() {

  const [data, setData] = useState({ projects: [] as any[], clients: [] as any[], tasks: [] as any[] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [p, c, t] = await Promise.all([getProjects(), getClients(), getTasks()]);
        setData({
          projects: Array.isArray(p) ? p : (p.data ?? p.projects ?? []),
          clients: Array.isArray(c) ? c : (c.data ?? c.clients ?? []),
          tasks: Array.isArray(t) ? t : (t.data ?? t.tasks ?? []),
        });
      } catch {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const { projects, clients, tasks } = data;

  const inProgress  = projects.filter(p => p.status === "IN_PROGRESS").length;
  const completed   = projects.filter(p => p.status === "COMPLETED").length;
  const doneTasks   = tasks.filter(t => t.status === "DONE").length;
  const recentProjects = [...projects].slice(0, 5);

  const stats = [
    { label: "Projects",     value: projects.length, color: "#d4a651", icon: "📁" },
    { label: "Clients",      value: clients.length,  color: "#e7c887", icon: "👥" },
    { label: "Tasks",       value: tasks.length,    color: "#9aa7bd", icon: "✅" },
    { label: "In Progress", value: inProgress,       color: "#4ade80", icon: "⚡" },
  ];

  if (loading) return <div style={s.loading}>Loading ...</div>;

  return (
    <div style={s.page}>

      {/* Header */}
      <div>
        <div style={s.eyebrow}><span style={s.dot} /> Over View</div>
        <h1 style={s.h1}>Panel</h1>
        <p style={s.sub}>Hello ,Here's The Latest Updates</p>
      </div>

      {/* Stats */}
      <div style={s.statsGrid}>
        {stats.map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={s.statTop}>
              <span style={s.statIcon}>{st.icon}</span>
              <span style={{ ...s.statValue, color: st.color }}>{st.value}</span>
            </div>
            <span style={s.statLabel}>{st.label}</span>
          </div>
        ))}
      </div>

      {/* Progress row */}
      <div style={s.progressRow}>
        <div style={s.progressCard}>
          <div style={s.progressHead}>
            <span style={s.progressTitle}>Completed Persentage</span>
            <span style={s.progressPct}>
              {projects.length ? Math.round((completed / projects.length) * 100) : 0}%
            </span>
          </div>
          <div style={s.progressBg}>
            <div style={{
              ...s.progressFill,
              width: projects.length ? `${(completed / projects.length) * 100}%` : "0%",
              background: "#4ade80",
            }} />
          </div>
          <div style={s.progressLegend}>
            <span style={s.legendItem}><span style={{ ...s.legendDot, background: "#4ade80" }} />Completed({completed})</span>
            <span style={s.legendItem}><span style={{ ...s.legendDot, background: "#d4a651" }} />In Progress({inProgress})</span>
            <span style={s.legendItem}><span style={{ ...s.legendDot, background: "#9aa7bd" }} />Pending({projects.filter(p => p.status === "PENDING").length})</span>
          </div>
        </div>

        <div style={s.progressCard}>
          <div style={s.progressHead}>
            <span style={s.progressTitle}>Tasks Persentage</span>
            <span style={s.progressPct}>
              {tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0}%
            </span>
          </div>
          <div style={s.progressBg}>
            <div style={{
              ...s.progressFill,
              width: tasks.length ? `${(doneTasks / tasks.length) * 100}%` : "0%",
              background: "#d4a651",
            }} />
          </div>
          <div style={s.progressLegend}>
            <span style={s.legendItem}><span style={{ ...s.legendDot, background: "#4ade80" }} />Completed({doneTasks})</span>
            <span style={s.legendItem}><span style={{ ...s.legendDot, background: "#d4a651" }} />In Progress({tasks.filter(t => t.status === "IN_PROGRESS").length})</span>
            <span style={s.legendItem}><span style={{ ...s.legendDot, background: "#9aa7bd" }} />Pending({tasks.filter(t => t.status === "TODO").length})</span>
          </div>
        </div>
      </div>

      {/* Recent Projects Table */}
      <div style={s.section}>
        <div style={s.sectionHead}>
          <h2 style={s.sectionTitle}>Lastest Projects</h2>
          <span style={s.sectionSub}>{projects.length} Total Projects</span>
        </div>
        {recentProjects.length === 0 ? (
          <div style={s.empty}>Empty Projects</div>
        ) : (
          <table style={s.table}>
            <thead>
              <tr>
                {["Project", "Client", "Badget", "Starting Date", "Status"].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((p, i) => (
                <tr key={p.id} style={i % 2 === 0 ? s.trEven : s.trOdd}>
                  <td style={s.td}>
                    <div style={s.projectName}>{p.title}</div>
                    {p.description && <div style={s.projectDesc}>{p.description}</div>}
                  </td>
                  <td style={s.td}>{p.client?.fullName ?? "—"}</td>
                  <td style={s.td}>{p.budget ? `${p.budget.toLocaleString()} ج.م` : "—"}</td>
                  <td style={s.td}>
                    {p.startDate ? new Date(p.startDate).toLocaleDateString("ar-EG") : "—"}
                  </td>
                  <td style={s.td}>
                    <span style={{
                      ...s.badge,
                      color: statusColor[p.status] ?? "#9aa7bd",
                      borderColor: (statusColor[p.status] ?? "#9aa7bd") + "44",
                    }}>
                      {statusLabel[p.status] ?? p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { display: "flex", flexDirection: "column", gap: "28px", direction: "rtl" },
  loading: { color: "#9aa7bd", fontSize: "14px", padding: "40px", textAlign: "center" },
  eyebrow: { display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#9aa7bd" },
  dot: { display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#d4a651", boxShadow: "0 0 10px #d4a651" },
  h1: { fontFamily: '"Cormorant Garamond", serif', fontSize: "38px", fontWeight: 500, color: "#fff", margin: "6px 0 4px" },
  sub: { color: "#9aa7bd", fontSize: "14px", margin: 0 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" },
  statCard: { background: "linear-gradient(180deg, #0f2440, #0b1c34)", border: "1px solid rgba(212,166,81,.18)", borderRadius: "14px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" },
  statTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  statIcon: { fontSize: "22px" },
  statValue: { fontFamily: '"Cormorant Garamond", serif', fontSize: "44px", fontWeight: 500, lineHeight: 1 },
  statLabel: { fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", color: "#9aa7bd" },
  progressRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  progressCard: { background: "linear-gradient(180deg, #0f2440, #0b1c34)", border: "1px solid rgba(212,166,81,.18)", borderRadius: "14px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" },
  progressHead: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  progressTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: "18px", color: "#fff", fontWeight: 500 },
  progressPct: { fontFamily: '"Cormorant Garamond", serif', fontSize: "28px", color: "#d4a651", fontWeight: 500 },
  progressBg: { height: "6px", borderRadius: "999px", background: "rgba(255,255,255,.06)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: "999px", transition: "width .6s ease" },
  progressLegend: { display: "flex", gap: "16px", flexWrap: "wrap" },
  legendItem: { display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#9aa7bd" },
  legendDot: { display: "inline-block", width: "8px", height: "8px", borderRadius: "50%" },
  section: { background: "linear-gradient(180deg, #0f2440, #0b1c34)", border: "1px solid rgba(212,166,81,.18)", borderRadius: "14px", overflow: "hidden" },
  sectionHead: { padding: "20px 28px", borderBottom: "1px solid rgba(212,166,81,.12)", display: "flex", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: "22px", fontWeight: 500, color: "#fff", margin: 0 },
  sectionSub: { fontSize: "12px", color: "#9aa7bd" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "14px 28px", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", color: "#9aa7bd", textAlign: "right", fontWeight: 400 },
  td: { padding: "14px 28px", fontSize: "14px", color: "#e9eef7" },
  trEven: { background: "transparent" },
  trOdd: { background: "rgba(255,255,255,.02)" },
  projectName: { fontWeight: 500 },
  projectDesc: { fontSize: "12px", color: "#9aa7bd", marginTop: "2px" },
  badge: { display: "inline-block", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", border: "1px solid" },
  empty: { padding: "48px 28px", color: "#9aa7bd", fontSize: "14px", textAlign: "center" },
};
