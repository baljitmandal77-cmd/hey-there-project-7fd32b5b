import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout"; 
import {
  LayoutDashboard, Users, BookOpen, CreditCard, Bell,
  Calendar, FileText, Settings, UserPlus, BarChart3, Plus, X,
  CheckCircle2, Download, ArrowLeft, History, Shield, Mail,
  MessageSquare, Edit3, Trash2, Eye, User, Phone, MapPin, Lock
} from "lucide-react";
import {
  getSeedStudents, getSeedTeachers, getSeedNotices, getSeedFeeRecords,
  getSeedMessages, addAudit, getAuditLog, getPublicContent, setPublicContent
} from "@/lib/erpStore";
import type { Notice, ERPUser, Role } from "@/lib/erpStore";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/erp/admin" },
  { label: "Students", icon: Users, href: "/erp/admin/students" },
  { label: "Teachers", icon: UserPlus, href: "/erp/admin/teachers" },
  { label: "Classes", icon: BookOpen, href: "/erp/admin/classes" },
  { label: "Fee Management", icon: CreditCard, href: "/erp/admin/fees" },
  { label: "Attendance", icon: Calendar, href: "/erp/admin/attendance" },
  { label: "Reports", icon: BarChart3, href: "/erp/admin/reports" },
  { label: "Notice Board", icon: Bell, href: "/erp/admin/notices" },
  { label: "Admissions", icon: FileText, href: "/erp/admin/admissions" },
  { label: "User Management", icon: Shield, href: "/erp/admin/users" },
  { label: "Public Messages", icon: MessageSquare, href: "/erp/admin/messages" },
  { label: "Activity Audit", icon: History, href: "/erp/admin/audit" },
  { label: "Settings", icon: Settings, href: "/erp/admin/settings" },
];

function Dashboard() {
  const navigate = useNavigate();
  const stats = [
    { label: "Total Students", value: "2,547", delta: "+23 this month", color: "border-blue-200 bg-blue-50 text-blue-700", onClick: () => navigate("/erp/admin/students") },
    { label: "Total Teachers", value: "124", delta: "+2 this month", color: "border-green-200 bg-green-50 text-green-700", onClick: () => navigate("/erp/admin/teachers") },
    { label: "Fee Collected", value: "₹12.4L", delta: "This month", color: "border-emerald-200 bg-emerald-50 text-emerald-700", onClick: () => navigate("/erp/admin/fees") },
    { label: "Pending Fees", value: "₹2.1L", delta: "142 students", color: "border-red-200 bg-red-50 text-red-700", onClick: () => navigate("/erp/admin/fees") },
    { label: "Attendance Today", value: "94.2%", delta: "2,397 present", color: "border-purple-200 bg-purple-50 text-purple-700", onClick: () => navigate("/erp/admin/attendance") },
    { label: "New Admissions", value: "18", delta: "This week", color: "border-orange-200 bg-orange-50 text-orange-700", onClick: () => navigate("/erp/admin/admissions") },
  ];
  const messages = getSeedMessages().filter(m => !m.read).slice(0, 3);
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground text-sm">Bright Future Senior Secondary School • AY 2023-24</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(s => (
          <button key={s.label} onClick={s.onClick} className={`border-2 rounded-xl p-5 text-left hover:shadow-md transition-shadow ${s.color}`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm font-medium">{s.label}</div>
            <div className="text-xs opacity-70 mt-0.5">{s.delta}</div>
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Unread Public Messages</h3>
            <button onClick={() => navigate("/erp/admin/messages")} className="text-xs text-primary hover:underline">View All →</button>
          </div>
          {messages.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-4">No unread messages</div>
          ) : (
            <div className="space-y-3">
              {messages.map(m => (
                <div key={m.id} className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-foreground text-sm">{m.subject}</div>
                  <div className="text-xs text-muted-foreground">From: {m.from} • {new Date(m.sentAt).toLocaleDateString("en-IN")}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Student", icon: "👤", href: "/erp/admin/students" },
              { label: "Add Teacher", icon: "🧑‍🏫", href: "/erp/admin/teachers" },
              { label: "Post Notice", icon: "📢", href: "/erp/admin/notices" },
              { label: "Fee Report", icon: "💰", href: "/erp/admin/fees" },
              { label: "Check Messages", icon: "✉️", href: "/erp/admin/messages" },
              { label: "Audit Log", icon: "🔍", href: "/erp/admin/audit" },
            ].map(a => (
              <button key={a.label} onClick={() => navigate(a.href)} className="flex items-center gap-2 bg-secondary hover:bg-accent border border-border rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors">
                <span className="text-lg">{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentDetailModal({ student, onClose }: { student: ReturnType<typeof getSeedStudents>[0]; onClose: () => void }) {
  const [tab, setTab] = useState<"basic" | "full">("basic");
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center"><User className="w-6 h-6 text-primary-foreground" /></div>
            <div>
              <h3 className="font-bold text-foreground text-lg">{student.name}</h3>
              <p className="text-xs text-muted-foreground">ID: {student.id} | Class {student.class} | Roll: {student.roll}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl">✕</button>
        </div>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setTab("basic")} className={`px-3 py-1 rounded-lg text-xs font-medium ${tab === "basic" ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>Basic Info</button>
          <button onClick={() => setTab("full")} className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${tab === "full" ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground"}`}><History className="w-3 h-3" /> Payment & History</button>
        </div>
        {tab === "basic" && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><div className="text-xs text-muted-foreground">Gender</div><div className="font-medium">{student.gender}</div></div>
            <div><div className="text-xs text-muted-foreground">DOB</div><div className="font-medium">{new Date(student.dob).toLocaleDateString("en-IN")}</div></div>
            <div><div className="text-xs text-muted-foreground">Attendance</div><div className={`font-semibold ${parseInt(student.att) >= 90 ? "text-green-600" : "text-yellow-600"}`}>{student.att}</div></div>
            <div><div className="text-xs text-muted-foreground">Fee Status</div><div className={`font-semibold ${student.fees === "Paid" ? "text-green-600" : "text-red-600"}`}>{student.fees}</div></div>
            <div><div className="text-xs text-muted-foreground">Email</div><a href={`mailto:${student.email}`} className="text-primary hover:underline text-xs">{student.email}</a></div>
            <div><div className="text-xs text-muted-foreground">Phone</div><a href={`tel:${student.phone}`} className="text-foreground hover:text-primary text-xs">{student.phone}</a></div>
            <div><div className="text-xs text-muted-foreground">Parent Phone</div><a href={`tel:${student.parentPhone}`} className="text-foreground hover:text-primary text-xs">{student.parentPhone}</a></div>
            <div className="col-span-2"><div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> Address</div><div className="font-medium text-xs mt-0.5">{student.address}</div></div>
          </div>
        )}
        {tab === "full" && (
          <div className="space-y-4">
            <div className="bg-secondary rounded-lg p-3">
              <div className="font-semibold text-foreground mb-2 text-sm">Payment History</div>
              {getSeedFeeRecords().filter(f => f.studentId === student.id).map(f => (
                <div key={f.id} className="flex justify-between py-1.5 border-b border-border last:border-0 text-xs">
                  <span className="text-muted-foreground">{f.type} • {f.term}</span>
                  <span className={`font-semibold ${f.status === "Paid" ? "text-green-600" : "text-red-600"}`}>₹{f.amount.toLocaleString()} – {f.status}</span>
                </div>
              ))}
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <div className="font-semibold text-foreground mb-2 text-sm">Attendance Summary</div>
              {[{ m: "January", p: 24, t: 26 }, { m: "February", p: 22, t: 25 }, { m: "March", p: 18, t: 19 }].map(a => (
                <div key={a.m} className="flex justify-between py-1 border-b border-border last:border-0 text-xs">
                  <span className="text-muted-foreground">{a.m}</span>
                  <span className="font-semibold text-foreground">{a.p}/{a.t} ({Math.round(a.p / a.t * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StudentsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState(getSeedStudents());
  const [selected, setSelected] = useState<ReturnType<typeof getSeedStudents>[0] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", class: "XII-A", roll: "", phone: "", email: "", address: "", gender: "Male" });
  const add = () => {
    if (!form.name || !form.roll) return;
    const id = "S" + (2400 + students.length + 1);
    const s = { id, name: form.name, class: form.class, roll: parseInt(form.roll), phone: form.phone, parentPhone: "", address: form.address, dob: "2005-01-01", fees: "Due" as const, feesAmount: 12000, att: "0%", email: form.email, gender: form.gender };
    setStudents(prev => [...prev, s]);
    addAudit("CREATE", "Students", `New student added: ${form.name} (${id})`);
    setForm({ name: "", class: "XII-A", roll: "", phone: "", email: "", address: "", gender: "Male" });
    setShowForm(false);
  };
  const remove = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    addAudit("DELETE", "Students", `Student removed: ${id}`);
  };
  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4 animate-fade-in">
      {selected && <StudentDetailModal student={selected} onClose={() => setSelected(null)} />}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-foreground">Students ({students.length})</h2>
          <div className="flex gap-2">
            <button onClick={() => alert("Exported! (Demo)")} className="flex items-center gap-2 bg-secondary text-foreground px-3 py-2 rounded-lg text-sm hover:bg-accent"><Download className="w-4 h-4" /> Export</button>
            <button onClick={() => setShowForm(true)} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold"><Plus className="w-4 h-4" /> Add Student</button>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Add New Student</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={form.class} onChange={e => setForm(f => ({ ...f, class: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {["XII-A", "XII-B", "XI-A", "XI-B", "X-A", "X-B", "X-C", "IX-A"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Roll No *" value={form.roll} onChange={e => setForm(f => ({ ...f, roll: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="text" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
            <input type="text" placeholder="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="md:col-span-3 border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={add} className="mt-3 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Save Student</button>
        </div>
      )}
      <input type="text" placeholder="Search students…" value={search} onChange={e => setSearch(e.target.value)} className="border border-input bg-background rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-w-sm w-full" />
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>{["ID", "Name", "Class", "Roll", "Phone", "Fee Status", "Attendance", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{s.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.class}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3"><a href={`tel:${s.phone}`} className="text-primary hover:underline text-xs">{s.phone}</a></td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.fees === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.fees}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold ${parseInt(s.att) >= 90 ? "text-green-600" : "text-yellow-600"}`}>{s.att}</span></td>
                  <td className="px-4 py-3 flex items-center gap-1.5">
                    <button onClick={() => setSelected(s)} className="p-1.5 rounded bg-secondary hover:bg-accent" title="View Details"><Eye className="w-3.5 h-3.5" /></button>
                    <button onClick={() => remove(s.id)} className="p-1.5 rounded hover:bg-destructive/10 text-destructive" title="Remove"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TeachersPage() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState(getSeedTeachers());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", phone: "", email: "", address: "", qualifications: "" });
  const add = () => {
    if (!form.name || !form.subject) return;
    const id = "T" + String(teachers.length + 1).padStart(3, "0");
    setTeachers(t => [...t, { id, name: form.name, subject: form.subject, classes: "TBD", exp: "0 yrs", phone: form.phone, email: form.email, address: form.address, dob: "1985-01-01", status: "Active" as const, qualifications: form.qualifications, joinDate: new Date().toISOString().slice(0, 10) }]);
    addAudit("CREATE", "Teachers", `New teacher added: ${form.name} (${id})`);
    setForm({ name: "", subject: "", phone: "", email: "", address: "", qualifications: "" });
    setShowForm(false);
  };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-foreground">Teachers ({teachers.length})</h2>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold"><Plus className="w-4 h-4" /> Add Teacher</button>
        </div>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Add New Teacher</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="text" placeholder="Subject *" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="text" placeholder="Qualifications" value={form.qualifications} onChange={e => setForm(f => ({ ...f, qualifications: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="text" placeholder="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={add} className="mt-3 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Save Teacher</button>
        </div>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(t => (
          <div key={t.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shrink-0"><User className="w-6 h-6 text-primary-foreground" /></div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-foreground truncate">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.subject} • {t.exp}</div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${t.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{t.status}</span>
                  <span className="text-xs text-muted-foreground">{t.id}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground"><Phone className="w-3 h-3" /><a href={`tel:${t.phone}`} className="hover:text-primary">{t.phone}</a></div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><Mail className="w-3 h-3" /><a href={`mailto:${t.email}`} className="hover:text-primary">{t.email}</a></div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="w-3 h-3" /><span className="truncate">{t.address}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeesPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState(getSeedFeeRecords());
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? records : records.filter(r => r.status === filter);
  const markPaid = (id: string) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, status: "Paid" as const, paidDate: new Date().toISOString().slice(0, 10), receiptNo: "RCT-" + Date.now() } : r));
    addAudit("UPDATE", "Fees", `Fee record ${id} marked as Paid`);
  };
  const totalPaid = records.filter(r => r.status === "Paid").reduce((a, b) => a + b.amount, 0);
  const totalPending = records.filter(r => r.status === "Pending").reduce((a, b) => a + b.amount, 0);
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-foreground">Fee Management</h2>
          <button onClick={() => alert("Report exported! (Demo)")} className="flex items-center gap-2 bg-secondary text-foreground px-3 py-2 rounded-lg text-sm hover:bg-accent"><Download className="w-4 h-4" /> Export</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"><div className="text-xl font-bold text-green-700">₹{totalPaid.toLocaleString()}</div><div className="text-sm text-green-600">Total Collected</div></div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><div className="text-xl font-bold text-red-700">₹{totalPending.toLocaleString()}</div><div className="text-sm text-red-600">Total Pending</div></div>
        <div className="bg-card border border-border rounded-xl p-4 text-center"><div className="text-xl font-bold text-foreground">{records.length}</div><div className="text-sm text-muted-foreground">Total Records</div></div>
      </div>
      <div className="flex gap-2">
        {["All", "Paid", "Pending"].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{f}</button>)}
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>{["Receipt", "Student", "Amount", "Type", "Term", "Due Date", "Paid Date", "Status", "Action"].map(h => <th key={h} className="px-3 py-3 text-left font-semibold whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{r.receiptNo || "—"}</td>
                  <td className="px-3 py-3 font-medium text-foreground whitespace-nowrap">{r.studentName}</td>
                  <td className="px-3 py-3 font-semibold text-foreground">₹{r.amount.toLocaleString()}</td>
                  <td className="px-3 py-3 text-muted-foreground whitespace-nowrap">{r.type}</td>
                  <td className="px-3 py-3 text-muted-foreground">{r.term}</td>
                  <td className="px-3 py-3 text-muted-foreground">{r.dueDate}</td>
                  <td className="px-3 py-3 text-muted-foreground">{r.paidDate || "—"}</td>
                  <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${r.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{r.status}</span></td>
                  <td className="px-3 py-3">
                    {r.status !== "Paid" && <button onClick={() => markPaid(r.id)} className="text-xs gradient-primary text-primary-foreground px-2 py-1 rounded font-medium whitespace-nowrap">Mark Paid</button>}
                    {r.status === "Paid" && <span className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Paid</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NoticesPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>(getSeedNotices());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", type: "general" as Notice["type"], public: true, pinned: false });
  const [editing, setEditing] = useState<Notice | null>(null);
  const save = () => {
    if (!form.title || !form.content) return;
    if (editing) {
      setNotices(prev => prev.map(n => n.id === editing.id ? { ...n, ...form } : n));
      addAudit("UPDATE", "Notice Board", `Notice updated: ${form.title}`);
      setEditing(null);
    } else {
      const n: Notice = { id: Date.now().toString(), ...form, postedBy: "Admin", postedAt: new Date().toISOString() };
      setNotices(prev => [n, ...prev]);
      // sync to public content
      const content = getPublicContent();
      setPublicContent({ notices: [n, ...content.notices] });
      addAudit("CREATE", "Notice Board", `Notice posted: ${form.title} (Public: ${form.public})`);
    }
    setForm({ title: "", content: "", type: "general", public: true, pinned: false });
    setShowForm(false);
  };
  const remove = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    addAudit("DELETE", "Notice Board", `Notice deleted: ${id}`);
  };
  const startEdit = (n: Notice) => { setEditing(n); setForm({ title: n.title, content: n.content, type: n.type, public: n.public, pinned: n.pinned }); setShowForm(true); };
  const typeColor: Record<string, string> = {
    general: "bg-blue-100 text-blue-700", urgent: "bg-red-100 text-red-700",
    exam: "bg-purple-100 text-purple-700", holiday: "bg-green-100 text-green-700", event: "bg-orange-100 text-orange-700"
  };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Notice Board</h2>
          <button onClick={() => { setEditing(null); setForm({ title: "", content: "", type: "general", public: true, pinned: false }); setShowForm(true); }} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
            <Plus className="w-4 h-4" /> Post Notice
          </button>
        </div>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">{editing ? "Edit Notice" : "New Notice"}</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="Notice title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <textarea rows={3} placeholder="Notice content *" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            <div className="flex flex-wrap gap-3 items-center">
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as Notice["type"] }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {["general", "urgent", "exam", "holiday", "event"].map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input type="checkbox" checked={form.public} onChange={e => setForm(f => ({ ...f, public: e.target.checked }))} className="rounded" />
                🌐 Show on Public Website
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input type="checkbox" checked={form.pinned} onChange={e => setForm(f => ({ ...f, pinned: e.target.checked }))} className="rounded" />
                📌 Pin Notice
              </label>
            </div>
          </div>
          <button onClick={save} className="mt-3 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">{editing ? "Update Notice" : "Post Notice"}</button>
        </div>
      )}
      <div className="space-y-3">
        {notices.map(n => (
          <div key={n.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-foreground">{n.title}</span>
                  {n.pinned && <span className="text-xs bg-gold text-gold-foreground px-1.5 py-0.5 rounded">📌 Pinned</span>}
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded capitalize ${typeColor[n.type]}`}>{n.type}</span>
                  {n.public && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">🌐 Public</span>}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{n.content}</p>
                <div className="text-xs text-muted-foreground mt-1">{new Date(n.postedAt).toLocaleString("en-IN")}</div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => startEdit(n)} className="p-1.5 rounded bg-secondary hover:bg-accent" title="Edit"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => remove(n.id)} className="p-1.5 rounded hover:bg-destructive/10 text-destructive" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(getSeedMessages());
  const [selected, setSelected] = useState<ReturnType<typeof getSeedMessages>[0] | null>(null);
  const markRead = (id: string) => setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  const deleteMsg = (id: string) => setMessages(prev => prev.filter(m => m.id !== id));
  return (
    <div className="space-y-4 animate-fade-in">
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-foreground text-lg">{selected.subject}</h3>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-xl">✕</button>
            </div>
            <div className="text-sm text-muted-foreground mb-1">From: <span className="text-foreground font-medium">{selected.from}</span></div>
            <div className="text-xs text-muted-foreground mb-4">{new Date(selected.sentAt).toLocaleString("en-IN")}</div>
            <p className="text-sm text-foreground leading-relaxed bg-secondary rounded-lg p-4">{selected.body}</p>
            <div className="flex gap-3 mt-4">
              <a href={`mailto:admin@school.in?subject=Re: ${encodeURIComponent(selected.subject)}`} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
                <Mail className="w-4 h-4" /> Reply via Email
              </a>
              <button onClick={() => { deleteMsg(selected.id); setSelected(null); }} className="flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm font-semibold hover:bg-destructive/20">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Public Messages</h2>
        <span className="bg-destructive text-destructive-foreground text-xs font-bold px-2 py-0.5 rounded-full">{messages.filter(m => !m.read).length} unread</span>
      </div>
      <div className="space-y-3">
        {messages.length === 0 ? <div className="text-center text-muted-foreground py-8">No messages</div> : messages.map(m => (
          <div key={m.id} className={`bg-card border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow ${!m.read ? "border-primary" : "border-border"}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1" onClick={() => { setSelected(m); markRead(m.id); }}>
                <div className="flex items-center gap-2 mb-1">
                  {!m.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                  <span className={`font-semibold text-sm ${!m.read ? "text-foreground" : "text-muted-foreground"}`}>{m.subject}</span>
                </div>
                <div className="text-xs text-muted-foreground">From: {m.from} • {new Date(m.sentAt).toLocaleDateString("en-IN")}</div>
                <div className="text-sm text-muted-foreground mt-1 line-clamp-1">{m.body}</div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <a href={`mailto:admin@school.in?subject=Re: ${encodeURIComponent(m.subject)}`} className="p-1.5 rounded bg-secondary hover:bg-accent" title="Reply"><Mail className="w-3.5 h-3.5" /></a>
                <button onClick={() => deleteMsg(m.id)} className="p-1.5 rounded hover:bg-destructive/10 text-destructive" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserManagementPage() {
  const navigate = useNavigate();
  const allRoles: Role[] = ["student", "teacher", "admin", "accountant", "dev"];
  const defaultPermissions = { student: ["view_grades", "view_attendance", "view_notices", "view_timetable", "view_fees"], teacher: ["view_grades", "enter_marks", "take_attendance", "post_notices", "view_students"], admin: ["manage_students", "manage_teachers", "manage_fees", "post_notices", "view_reports", "manage_admissions", "manage_users"], accountant: ["view_fees", "manage_fees", "generate_receipts", "view_reports"], dev: ["all_access"] };
  const [users, setUsers] = useState<ERPUser[]>([
    { id: "U001", username: "admin", password: "admin123", name: "Admin User", role: "admin", email: "admin@school.in", phone: "9876500010", address: "School Campus", active: true, permissions: defaultPermissions.admin, createdAt: "2023-06-01", lastLogin: "2024-03-25" },
    { id: "U002", username: "teacher", password: "teacher123", name: "Mr. Rajesh Sharma", role: "teacher", email: "sharma@school.in", phone: "9876510001", address: "101 Model Town", active: true, permissions: defaultPermissions.teacher, createdAt: "2023-06-01", lastLogin: "2024-03-25" },
    { id: "U003", username: "student", password: "student123", name: "Rahul Kumar", role: "student", email: "rahul@student.in", phone: "9876500001", address: "45 MG Road", active: true, permissions: defaultPermissions.student, createdAt: "2023-06-01", lastLogin: "2024-03-24" },
    { id: "U004", username: "dev", password: "dev123", name: "Dev Team", role: "dev", email: "dev@school.in", phone: "9876500020", address: "Tech Wing", active: true, permissions: ["all_access"], createdAt: "2023-06-01", lastLogin: "2024-03-25" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", username: "", password: "", role: "student" as Role, email: "", phone: "" });
  const [permModal, setPermModal] = useState<ERPUser | null>(null);
  const add = () => {
    if (!form.name || !form.username || !form.password) return;
    const id = "U" + String(users.length + 1).padStart(3, "0");
    const perms = defaultPermissions[form.role] || [];
    setUsers(prev => [...prev, { id, ...form, address: "", active: true, permissions: perms, createdAt: new Date().toISOString().slice(0, 10) }]);
    addAudit("CREATE", "User Management", `New user created: ${form.username} (${form.role})`);
    setForm({ name: "", username: "", password: "", role: "student", email: "", phone: "" });
    setShowForm(false);
  };
  const toggleActive = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
    addAudit("UPDATE", "User Management", `User ${id} status toggled`);
  };
  const roleColor: Record<string, string> = { admin: "bg-orange-100 text-orange-700", teacher: "bg-green-100 text-green-700", student: "bg-blue-100 text-blue-700", dev: "bg-purple-100 text-purple-700", accountant: "bg-yellow-100 text-yellow-700" };
  return (
    <div className="space-y-4 animate-fade-in">
      {permModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setPermModal(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-foreground">Permissions – {permModal.name}</h3>
              <button onClick={() => setPermModal(null)}>✕</button>
            </div>
            <div className="space-y-2">
              {(defaultPermissions[permModal.role] || []).map(p => (
                <label key={p} className="flex items-center gap-3 p-2 rounded-lg bg-secondary cursor-pointer">
                  <input type="checkbox" defaultChecked={permModal.permissions.includes(p)} className="rounded" readOnly />
                  <span className="text-sm text-foreground font-mono">{p}</span>
                </label>
              ))}
            </div>
            <button onClick={() => setPermModal(null)} className="mt-4 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold w-full">Save Permissions</button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold"><Plus className="w-4 h-4" /> Add User</button>
        </div>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Create New User</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="text" placeholder="Username *" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="password" placeholder="Password *" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as Role }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {allRoles.map(r => <option key={r} value={r} className="capitalize">{r}</option>)}
            </select>
            <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={add} className="mt-3 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Create User</button>
        </div>
      )}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>{["ID", "Name", "Username", "Role", "Email", "Status", "Last Login", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
  {users.map((u, i) => (
    <tr key={u.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{u.id}</td>
      <td className="px-4 py-3 font-medium text-foreground">
        <div>{u.name}</div>
        <div className="text-[10px] text-muted-foreground">Pass: {u.password}</div>
      </td>
      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">@{u.username}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${roleColor[u.role] || "bg-secondary text-foreground"}`}>
          {u.role}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`text-xs font-semibold ${u.active ? "text-green-600" : "text-red-600"}`}>
          {u.active ? "Active" : "Suspended"}
        </span>
      </td>
      <td className="px-4 py-3 flex items-center gap-1.5">
        {/* EDIT BUTTON: Isse password aur username badal jayega */}
        <button 
          onClick={() => { 
            setEditingUser(u); 
            setForm({ name: u.name, username: u.username, password: u.password, role: u.role, email: u.email || "", phone: u.phone || "" }); 
            setShowForm(true); 
          }} 
          className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100" title="Edit/Password"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>

        {/* DELETE BUTTON: Sach mein user delete ho jayega */}
        <button 
          onClick={() => {
            if (u.username === 'admin' || u.username === 'dev') return alert("Main Admin ko delete nahi kar sakte!");
            if (window.confirm(`${u.username} ko delete karein?`)) {
              setUsers(prev => prev.filter(user => user.id !== u.id));
              addAudit("DELETE", "User Management", `Deleted user: ${u.username}`);
            }
          }} 
          className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100" title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AuditPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const modules = ["All", "Students", "Teachers", "Fees", "Notice Board", "User Management", "Attendance", "Marks"];
  const logs = getAuditLog(filter !== "All" ? { module: filter } : undefined).slice(0, 100);
  const levelColor: Record<string, string> = { CREATE: "bg-green-100 text-green-700", UPDATE: "bg-blue-100 text-blue-700", DELETE: "bg-red-100 text-red-700", DOWNLOAD: "bg-purple-100 text-purple-700", SAVE: "bg-yellow-100 text-yellow-700", PAYMENT: "bg-emerald-100 text-emerald-700" };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Activity Audit Log</h2>
      </div>
      <div className="flex gap-2 flex-wrap">
        {modules.map(m => <button key={m} onClick={() => setFilter(m)} className={`px-3 py-1 rounded-lg text-xs font-medium ${filter === m ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{m}</button>)}
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No audit entries yet. ERP actions will be logged here with timestamps.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="gradient-primary text-primary-foreground">
                <tr>{["Timestamp", "User", "Role", "Module", "Action", "Details"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={log.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap">{new Date(log.timestamp).toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3 font-medium text-foreground text-xs">{log.userName}</td>
                    <td className="px-4 py-3"><span className="text-xs capitalize bg-secondary px-2 py-0.5 rounded">{log.userRole}</span></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{log.module}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded ${levelColor[log.action] || "bg-secondary text-foreground"}`}>{log.action}</span></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    schoolName: "Bright Future Senior Secondary School",
    principal: "Dr. Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "info@brightfuture.edu.in",
    address: "123 School Road, Education Nagar, New Delhi - 110001",
    session: "2023-24",
    admissionsOpen: true,
    emailNotifications: true,
    autoBackup: true,
  });
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    addAudit("UPDATE", "Settings", `School settings updated by Admin`);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">School Settings</h2>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground border-b border-border pb-3">General Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "School Name", key: "schoolName" },
            { label: "Principal Name", key: "principal" },
            { label: "Phone", key: "phone" },
            { label: "Email", key: "email" },
            { label: "Academic Session", key: "session" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
              <input type="text" value={settings[key as keyof typeof settings] as string} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">School Address</label>
            <input type="text" value={settings.address} onChange={e => setSettings(s => ({ ...s, address: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div className="flex flex-wrap gap-6 pt-2">
          {[
            { label: "Admissions Open", key: "admissionsOpen" },
            { label: "Email Notifications", key: "emailNotifications" },
            { label: "Auto Backup", key: "autoBackup" },
          ].map(({ label, key }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <div onClick={() => setSettings(s => ({ ...s, [key]: !s[key as keyof typeof settings] }))} className={`relative w-11 h-6 rounded-full transition-colors ${settings[key as keyof typeof settings] ? "gradient-primary" : "bg-secondary"}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings[key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"}`} />
              </div>
              <span className="text-sm text-foreground">{label}</span>
            </label>
          ))}
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm">
          <CheckCircle2 className="w-4 h-4" /> {saved ? "Settings Saved! ✓" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

function AttendancePage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Attendance Overview</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today Present", value: "2,397", pct: "94.2%", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Today Absent", value: "150", pct: "5.8%", color: "bg-red-50 border-red-200 text-red-700" },
          { label: "This Month Avg.", value: "91.5%", pct: "Overall", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Low Attendance", value: "38", pct: "Below 75%", color: "bg-orange-50 border-orange-200 text-orange-700" },
        ].map(s => (
          <div key={s.label} className={`border-2 rounded-xl p-5 ${s.color}`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm font-medium">{s.label}</div>
            <div className="text-xs opacity-70">{s.pct}</div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Class-wise Attendance Today</h3>
        <div className="space-y-3">
          {[
            { cls: "XII-A", present: 40, total: 42 }, { cls: "XII-B", present: 38, total: 40 },
            { cls: "XI-A", present: 42, total: 44 }, { cls: "XI-B", present: 35, total: 38 },
            { cls: "X-A", present: 44, total: 45 }, { cls: "IX-A", present: 45, total: 47 },
          ].map(c => {
            const pct = Math.round((c.present / c.total) * 100);
            return (
              <div key={c.cls} className="flex items-center gap-3">
                <div className="w-16 text-sm font-medium text-foreground">{c.cls}</div>
                <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pct >= 90 ? "bg-green-500" : pct >= 75 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="text-sm font-semibold text-foreground w-20 text-right">{c.present}/{c.total} ({pct}%)</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReportsPage() {
  const navigate = useNavigate();
  const reports = [
    { title: "Fee Collection Report", desc: "Monthly fee collection summary with pending details", icon: "💰" },
    { title: "Attendance Report", desc: "Class-wise and student-wise attendance analytics", icon: "📅" },
    { title: "Academic Performance", desc: "Exam results and grade distribution report", icon: "📊" },
    { title: "Admission Report", desc: "New admissions and enrollment statistics", icon: "📋" },
    { title: "Staff Report", desc: "Teacher attendance and class completion report", icon: "👩‍🏫" },
    { title: "Finance Summary", desc: "Income, expenses and budget overview", icon: "📈" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Reports</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map(r => (
          <button key={r.title} onClick={() => alert(`Generating ${r.title}… (Demo — PDF requires backend)`)} className="bg-card border border-border rounded-xl p-5 text-left hover:shadow-md hover:border-primary transition-all group">
            <div className="text-3xl mb-3">{r.icon}</div>
            <div className="font-bold text-foreground group-hover:text-primary">{r.title}</div>
            <div className="text-sm text-muted-foreground mt-1">{r.desc}</div>
            <div className="mt-3 flex items-center gap-2 text-xs text-primary font-medium"><Download className="w-3 h-3" /> Generate & Download</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AdmissionsPage() {
  const navigate = useNavigate();
  const [admissions, setAdmissions] = useState([
    { id: "A001", name: "Aanya Singh", class: "IX-A", date: "20 Mar", status: "Pending" as const, phone: "9876540001", email: "aanya@gmail.com" },
    { id: "A002", name: "Rohan Gupta", class: "XI-B", date: "19 Mar", status: "Confirmed" as const, phone: "9876540002", email: "rohan@gmail.com" },
    { id: "A003", name: "Kavya Sharma", class: "VI-C", date: "18 Mar", status: "Pending" as const, phone: "9876540003", email: "kavya@gmail.com" },
    { id: "A004", name: "Dev Patel", class: "XII-A", date: "17 Mar", status: "Rejected" as const, phone: "9876540004", email: "dev@gmail.com" },
  ]);
  const updateStatus = (id: string, status: "Confirmed" | "Rejected" | "Pending") => {
    setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    addAudit("UPDATE", "Admissions", `Admission ${id} status changed to ${status}`);
  };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Admissions Pipeline</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending", count: admissions.filter(a => a.status === "Pending").length, color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
          { label: "Confirmed", count: admissions.filter(a => a.status === "Confirmed").length, color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Rejected", count: admissions.filter(a => a.status === "Rejected").length, color: "bg-red-50 border-red-200 text-red-700" },
        ].map(s => <div key={s.label} className={`border-2 rounded-xl p-4 text-center ${s.color}`}><div className="text-2xl font-bold">{s.count}</div><div className="text-sm font-medium">{s.label}</div></div>)}
      </div>
      <div className="space-y-3">
        {admissions.map(a => (
          <div key={a.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1">
                <div className="font-semibold text-foreground">{a.name}</div>
                <div className="text-xs text-muted-foreground">Class {a.class} • Applied: {a.date} • ID: {a.id}</div>
                <div className="flex gap-3 mt-1 text-xs">
                  <a href={`tel:${a.phone}`} className="text-primary hover:underline">{a.phone}</a>
                  <a href={`mailto:${a.email}`} className="text-primary hover:underline">{a.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${a.status === "Confirmed" ? "bg-green-100 text-green-700" : a.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{a.status}</span>
                {a.status === "Pending" && (
                  <>
                    <button onClick={() => updateStatus(a.id, "Confirmed")} className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Confirm</button>
                    <button onClick={() => updateStatus(a.id, "Rejected")} className="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-lg font-medium flex items-center gap-1"><X className="w-3 h-3" /> Reject</button>
                  </>
                )}
                {a.status !== "Pending" && (
                  <button onClick={() => updateStatus(a.id, "Pending")} className="text-xs bg-secondary text-foreground hover:bg-accent px-3 py-1 rounded-lg font-medium">Reset</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminERP() {
  return (
    <ERPLayout navItems={navItems} role="Admin" roleColor="bg-orange-500/20 text-orange-400">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/classes" element={<AttendancePage />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/erp/admin" replace />} />
      </Routes>
    </ERPLayout>
  );
}
