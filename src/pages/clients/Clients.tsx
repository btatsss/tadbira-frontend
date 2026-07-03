import { useEffect, useState } from "react";
import { getClients, createClient, deleteClient } from "../../services/client.service";

const emptyForm = { fullName: "", email: "", phone: "", address: "", companyName: "", notes: "" };

export default function Clients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
  try {
    const res = await getClients();
    setClients(Array.isArray(res) ? res : (res.data ?? res.clients ?? []));
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    setError("");
    setSaving(true);
    try {
      await createClient(form);
      setShowModal(false);
      setForm(emptyForm);
      load();
    } catch (e: any) {
      setError(e.response?.data?.message ?? "حدث خطأ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العميل؟")) return;
    await deleteClient(id);
    load();
  };

  if (loading) return <div style={s.loading}>جارٍ التحميل...</div>;

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <div style={s.eyebrow}><span style={s.dot} /> العملاء</div>
          <h1 style={s.h1}>كل العملاء</h1>
        </div>
        <button style={s.addBtn} onClick={() => setShowModal(true)}>+ عميل جديد</button>
      </div>

      <div style={s.grid}>
        {clients.length === 0 ? (
          <div style={s.empty}>لا يوجد عملاء — أضف أول عميل.</div>
        ) : clients.map(c => (
          <div key={c.id} style={s.card}>
            <div style={s.avatar}>{c.fullName?.[0] ?? "؟"}</div>
            <div style={s.name}>{c.fullName}</div>
            {c.companyName && <div style={s.company}>{c.companyName}</div>}
            <div style={s.details}>
              {c.email && <span>{c.email}</span>}
              {c.phone && <span>{c.phone}</span>}
            </div>
            <button style={s.deleteBtn} onClick={() => handleDelete(c.id)}>حذف</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div style={s.overlay} onClick={() => setShowModal(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <h2 style={s.modalTitle}>عميل جديد</h2>
            {error && <div style={s.errorBox}>{error}</div>}
            <div style={s.fields}>
              {[
                { key: "fullName", label: "الاسم الكامل", required: true },
                { key: "email", label: "البريد الإلكتروني" },
                { key: "phone", label: "رقم الهاتف" },
                { key: "companyName", label: "اسم الشركة" },
                { key: "address", label: "العنوان" },
                { key: "notes", label: "ملاحظات" },
              ].map(f => (
                <div key={f.key} style={s.field}>
                  <label style={s.label}>{f.label}</label>
                  <input
                    style={s.input}
                    value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
            <div style={s.modalActions}>
              <button style={s.cancelBtn} onClick={() => setShowModal(false)}>إلغاء</button>
              <button style={s.saveBtn} disabled={saving} onClick={handleCreate}>
                {saving ? "جارٍ الحفظ..." : "حفظ"}
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
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
  card: { background: "linear-gradient(180deg, #0f2440, #0b1c34)", border: "1px solid rgba(212,166,81,.18)", borderRadius: "14px", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "8px" },
  avatar: { width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #1b365f, #0a182d)", border: "1px solid #d4a651", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"Cormorant Garamond", serif', fontSize: "22px", color: "#d4a651", marginBottom: "8px" },
  name: { fontFamily: '"Cormorant Garamond", serif', fontSize: "20px", fontWeight: 500, color: "#fff" },
  company: { fontSize: "12.5px", color: "#d4a651", letterSpacing: ".04em" },
  details: { display: "flex", flexDirection: "column", gap: "3px", fontSize: "13px", color: "#9aa7bd", marginTop: "4px", flex: 1 },
  deleteBtn: { background: "none", border: "1px solid rgba(248,113,113,.3)", color: "#f87171", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", cursor: "pointer", fontFamily: '"Inter", sans-serif', marginTop: "8px", alignSelf: "flex-start" },
  empty: { padding: "48px 24px", color: "#9aa7bd", fontSize: "14px", textAlign: "center", gridColumn: "1/-1" },
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
