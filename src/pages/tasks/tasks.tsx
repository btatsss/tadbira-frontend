import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../../services/task.service";
import { getProjects } from "../../services/project.service";

const emptyForm = { title: "", description: "", status: "TODO", priority: "1", projectId: "", assignedTo: "" };

const statusLabel: Record<string, string> = {
  TODO: "To DO",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};
const statusColor: Record<string, string> = {
  TODO: "#9aa7bd",
  IN_PROGRESS: "#d4a651",
  DONE: "#4ade80",
};

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [t, p] = await Promise.all([getTasks(), getProjects()]);
      setTasks(t.data ?? []);
      setProjects(p.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    setError("");
    setSaving(true);
    try {
      await createTask({ ...form, priority: parseInt(form.priority) });
      setShowModal(false);
      setForm(emptyForm);
      load();
    } catch (e: any) {
      setError(e.response?.data?.message ?? "Error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are You Sure You Wanna Delete It?")) return;
    await deleteTask(id);
    load();
  };

  if (loading) return <div style={s.loading}>Loading ...</div>;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <div style={s.eyebrow}><span style={s.dot} /> Tasks</div>
          <h1 style={s.h1}>All Tasks</h1>
        </div>
        <button style={s.addBtn} onClick={() => setShowModal(true)}>+ New Task</button>
      </div>

      <div style={s.card}>
        {tasks.length === 0 ? (
          <div style={s.empty}>No Tasks, Add New Task</div>
        ) : (
          <table style={s.table}>
            <thead>
              <tr>
                {["Task", "Project", "Piority", "Statue", ""].map(h => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((t, i) => (
                <tr key={t.id} style={i % 2 === 0 ? s.trEven : s.trOdd}>
                  <td style={s.td}>
                    <div style={s.taskTitle}>{t.title}</div>
                    {t.description && <div style={s.taskDesc}>{t.description}</div>}
                  </td>
                  <td style={s.td}>{t.project?.title ?? "—"}</td>
                  <td style={s.td}>
                    <span style={s.priority}>{t.priority ?? "—"}</span>
                  </td>
                  <td style={s.td}>
                    <span style={{ ...s.badge, color: statusColor[t.status], borderColor: statusColor[t.status] + "44" }}>
                      {statusLabel[t.status] ?? t.status}
                    </span>
                  </td>
                  <td style={s.td}>
                    <button style={s.deleteBtn} onClick={() => handleDelete(t.id)}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={s.overlay} onClick={() => setShowModal(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <h2 style={s.modalTitle}>New Task</h2>
            {error && <div style={s.errorBox}>{error}</div>}
            <div style={s.fields}>
              {[
                { key: "title", label: "Task Address" },
                { key: "description", label: "Discription" },
                { key: "priority", label: "Piority(1-5)", type: "number" },
              ].map(f => (
                <div key={f.key} style={s.field}>
                  <label style={s.label}>{f.label}</label>
                  <input
                    type={f.type ?? "text"}
                    style={s.input}
                    value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  />
                </div>
              ))}
              <div style={s.field}>
                <label style={s.label}>Project</label>
                <select style={s.input} value={form.projectId}
                  onChange={e => setForm({ ...form, projectId: e.target.value })}>
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div style={s.field}>
                <label style={s.label}>Statue</label>
                <select style={s.input} value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}>
                  {Object.entries(statusLabel).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={s.modalActions}>
              <button style={s.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              <button style={s.saveBtn} disabled={saving} onClick={handleCreate}>
                {saving ? "Saving ..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { display: "flex", flexDirection: "column", gap: "28px", direction: "rtl" },
  loading: { color: "#9aa7bd", fontSize: "14px", padding: "40px", textAlign: "center" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end" },
  eyebrow: { display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#9aa7bd" },
  dot: { display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#d4a651", boxShadow: "0 0 10px #d4a651" },
  h1: { fontFamily: '"Cormorant Garamond", serif', fontSize: "36px", fontWeight: 500, color: "#fff", margin: "6px 0 0" },
  addBtn: { background: "#d4a651", color: "#0a182d", border: "none", borderRadius: "999px", padding: "12px 22px", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", fontFamily: '"Inter", sans-serif' },
  card: { background: "linear-gradient(180deg, #0f2440, #0b1c34)", border: "1px solid rgba(212,166,81,.18)", borderRadius: "14px", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "14px 24px", fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", color: "#9aa7bd", textAlign: "right", fontWeight: 400 },
  td: { padding: "16px 24px", fontSize: "14px", color: "#e9eef7" },
  trEven: { background: "transparent" },
  trOdd: { background: "rgba(255,255,255,.02)" },
  taskTitle: { fontWeight: 500 },
  taskDesc: { fontSize: "12.5px", color: "#9aa7bd", marginTop: "3px" },
  priority: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "28px", height: "28px", borderRadius: "50%", background: "rgba(212,166,81,.12)", color: "#d4a651", fontSize: "12px", fontWeight: 600 },
  badge: { display: "inline-block", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", border: "1px solid" },
  deleteBtn: { background: "none", border: "1px solid rgba(248,113,113,.3)", color: "#f87171", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", cursor: "pointer", fontFamily: '"Inter", sans-serif' },
  empty: { padding: "48px 24px", color: "#9aa7bd", fontSize: "14px", textAlign: "center" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 },
  modal: { background: "#0f2440", border: "1px solid rgba(212,166,81,.18)", borderRadius: "18px", padding: "40px", width: "100%", maxWidth: "480px", direction: "rtl" },
  modalTitle: { fontFamily: '"Cormorant Garamond", serif', fontSize: "28px", fontWeight: 500, color: "#fff", margin: "0 0 24px" },
  fields: { display: "flex", flexDirection: "column", gap: "14px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "12px", color: "#9aa7bd", letterSpacing: ".03em" },
  input: { background: "rgba(255,255,255,.04)", border: "1px solid rgba(212,166,81,.18)", borderRadius: "8px", padding: "11px 14px", color: "#e9eef7", fontSize: "13.5px", fontFamily: '"Inter", sans-serif', outline: "none" },
  modalActions: { display: "flex", gap: "12px", justifyContent: "flex-start", marginTop: "28px" },
  saveBtn: { background: "#d4a651", color: "#0a182d", border: "none", borderRadius: "999px", padding: "12px 28px", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", fontFamily: '"Inter", sans-serif' },
  cancelBtn: { background: "none", color: "#9aa7bd", border: "1px solid rgba(255,255,255,.12)", borderRadius: "999px", padding: "12px 22px", fontSize: "13.5px", cursor: "pointer", fontFamily: '"Inter", sans-serif' },
  errorBox: { background: "rgba(220,50,50,.12)", border: "1px solid rgba(220,50,50,.3)", borderRadius: "8px", padding: "10px 14px", color: "#f87171", fontSize: "13px", marginBottom: "16px" },
};
