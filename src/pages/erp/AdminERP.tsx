import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, Users, BookOpen, CreditCard, Bell,
  Calendar, FileText, Settings, UserPlus, BarChart3, Plus, X, CheckCircle2, Download
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/erp/admin" },
  { label: "Students", icon: Users, href: "/erp/admin/students" },
  { label: "Teachers", icon: UserPlus, href: "/erp/admin/teachers" },
  { label: "Classes", icon: BookOpen, href: "/erp/admin/classes" },
  { label: "Fee Management", icon: CreditCard, href: "/erp/admin/fees" },
  { label: "Attendance", icon: Calendar, href: "/erp/admin/attendance" },
  { label: "Reports", icon: BarChart3, href: "/erp/admin/reports" },
  { label: "Notices", icon: Bell, href: "/erp/admin/notices" },
  { label: "Admissions", icon: FileText, href: "/erp/admin/admissions" },
  { label: "Settings", icon: Settings, href: "/erp/admin/settings" },
];

function Dashboard() {
  const recentAdmissions = [
    { name: "Aanya Singh", class: "IX-A", date: "20 Mar", status: "Confirmed" },
    { name: "Rohan Gupta", class: "XI-B", date: "19 Mar", status: "Pending" },
    { name: "Kavya Sharma", class: "VI-C", date: "18 Mar", status: "Confirmed" },
    { name: "Dev Patel", class: "XII-A", date: "17 Mar", status: "Pending" },
  ];
  const stats = [
    { label: "Total Students", value: "2,547", delta: "+23 this month", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { label: "Total Teachers", value: "124", delta: "+2 this month", color: "bg-green-50 text-green-700 border-green-200" },
    { label: "Fee Collected", value: "₹12.4L", delta: "This month", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { label: "Pending Fees", value: "₹2.1L", delta: "142 students", color: "bg-red-50 text-red-700 border-red-200" },
    { label: "Attendance Today", value: "94.2%", delta: "2,397 present", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { label: "New Admissions", value: "18", delta: "This week", color: "bg-orange-50 text-orange-700 border-orange-200" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground text-sm">Bright Future Senior Secondary School • AY 2023-24</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`border-2 rounded-xl p-5 ${s.color}`}>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm font-medium">{s.label}</div>
            <div className="text-xs opacity-70 mt-0.5">{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Recent Admissions</h3>
          <div className="space-y-3">
            {recentAdmissions.map(a => (
              <div key={a.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium text-foreground text-sm">{a.name}</div>
                  <div className="text-xs text-muted-foreground">Class {a.class} • {a.date}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${a.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Student", icon: "👤", href: "/erp/admin/students" },
              { label: "Add Teacher", icon: "🧑‍🏫", href: "/erp/admin/teachers" },
              { label: "Post Notice", icon: "📢", href: "/erp/admin/notices" },
              { label: "Generate Report", icon: "📊", href: "/erp/admin/reports" },
              { label: "Fee Management", icon: "💰", href: "/erp/admin/fees" },
              { label: "Admissions", icon: "🗓️", href: "/erp/admin/admissions" },
            ].map(a => (
              <a key={a.label} href={a.href} className="flex items-center gap-2 bg-secondary hover:bg-accent border border-border rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors cursor-pointer">
                <span className="text-lg">{a.icon}</span> {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Class-wise Student Strength</h3>
        <div className="space-y-2">
          {[
            { cls: "Class I–V", count: 620, max: 700 },
            { cls: "Class VI–VIII", count: 580, max: 600 },
            { cls: "Class IX–X", count: 480, max: 500 },
            { cls: "Class XI–XII", count: 867, max: 900 },
          ].map(c => (
            <div key={c.cls} className="flex items-center gap-3">
              <div className="w-32 text-sm text-foreground">{c.cls}</div>
              <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                <div className="h-full gradient-primary rounded-full" style={{ width: `${(c.count / c.max) * 100}%` }} />
              </div>
              <div className="text-sm font-semibold text-foreground w-16 text-right">{c.count}/{c.max}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([
    { id: "S2401", name: "Rahul Kumar", class: "XII-A", roll: 1, fees: "Paid", att: "92%", phone: "9876500001" },
    { id: "S2402", name: "Priya Sharma", class: "XII-A", roll: 2, fees: "Paid", att: "95%", phone: "9876500002" },
    { id: "S2403", name: "Aarav Singh", class: "XI-B", roll: 5, fees: "Due", att: "78%", phone: "9876500003" },
    { id: "S2404", name: "Nisha Gupta", class: "X-C", roll: 12, fees: "Paid", att: "88%", phone: "9876500004" },
    { id: "S2405", name: "Rohan Mehta", class: "IX-A", roll: 7, fees: "Due", att: "91%", phone: "9876500005" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", class: "XII-A", roll: "", phone: "" });
  const add = () => {
    if (!form.name || !form.roll) return;
    const id = "S" + (2400 + students.length + 1);
    setStudents(s => [...s, { id, name: form.name, class: form.class, roll: parseInt(form.roll), fees: "Due", att: "0%", phone: form.phone }]);
    setForm({ name: "", class: "XII-A", roll: "", phone: "" });
    setShowForm(false);
  };
  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">Students</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Add New Student</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={form.class} onChange={e => setForm(f => ({ ...f, class: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {["XII-A", "XII-B", "XI-A", "XI-B", "X-C", "IX-A"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Roll No *" value={form.roll} onChange={e => setForm(f => ({ ...f, roll: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="text" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={add} className="mt-3 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Save Student</button>
        </div>
      )}
      <input type="text" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} className="border border-input bg-background rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-w-sm w-full" />
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>
                {["ID", "Name", "Class", "Roll", "Phone", "Fee Status", "Attendance"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{s.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.class}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.fees === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.fees}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${parseInt(s.att) >= 90 ? "text-green-600" : parseInt(s.att) >= 75 ? "text-yellow-600" : "text-red-600"}`}>{s.att}</span>
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
  const [teachers, setTeachers] = useState([
    { id: "T001", name: "Mr. Rajesh Sharma", subject: "Mathematics", classes: "X, XI, XII", exp: "12 yrs", phone: "9876510001", status: "Active" },
    { id: "T002", name: "Mrs. Sunita Gupta", subject: "Physics", classes: "XI, XII", exp: "8 yrs", phone: "9876510002", status: "Active" },
    { id: "T003", name: "Mr. Anil Verma", subject: "Chemistry", classes: "XI, XII", exp: "15 yrs", phone: "9876510003", status: "Active" },
    { id: "T004", name: "Mrs. Neha Joshi", subject: "English", classes: "IX, X, XI", exp: "6 yrs", phone: "9876510004", status: "Active" },
    { id: "T005", name: "Mr. Suresh Rajan", subject: "Computer Sc.", classes: "IX, X, XI, XII", exp: "9 yrs", phone: "9876510005", status: "On Leave" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", phone: "" });
  const add = () => {
    if (!form.name || !form.subject) return;
    const id = "T" + String(teachers.length + 1).padStart(3, "0");
    setTeachers(t => [...t, { id, name: form.name, subject: form.subject, classes: "TBD", exp: "0 yrs", phone: form.phone, status: "Active" }]);
    setForm({ name: "", subject: "", phone: "" });
    setShowForm(false);
  };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">Teachers</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
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
            <input type="text" placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={add} className="mt-3 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Save Teacher</button>
        </div>
      )}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>
                {["ID", "Name", "Subject", "Classes", "Experience", "Phone", "Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={t.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{t.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{t.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.subject}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.classes}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.exp}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${t.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{t.status}</span>
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

function ClassesPage() {
  const classes = [
    { name: "XII-A", classTeacher: "Mr. Sharma", students: 42, room: "Room 201", section: "Science" },
    { name: "XII-B", classTeacher: "Mrs. Gupta", students: 40, room: "Room 202", section: "Commerce" },
    { name: "XI-A", classTeacher: "Mr. Verma", students: 44, room: "Room 101", section: "Science" },
    { name: "XI-B", classTeacher: "Mrs. Joshi", students: 38, room: "Room 102", section: "Arts" },
    { name: "X-A", classTeacher: "Mr. Rajan", students: 45, room: "Room 301", section: "General" },
    { name: "X-B", classTeacher: "Mrs. Mehta", students: 43, room: "Room 302", section: "General" },
    { name: "X-C", classTeacher: "Mr. Yadav", students: 41, room: "Room 303", section: "General" },
    { name: "IX-A", classTeacher: "Mrs. Sinha", students: 47, room: "Room 401", section: "General" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Class Management</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Classes", value: "28" },
          { label: "Total Students", value: "2,547" },
          { label: "Total Teachers", value: "124" },
          { label: "Avg. Class Size", value: "32" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(cls => (
          <div key={cls.name} className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">{cls.name}</div>
              <span className="text-xs bg-accent px-2 py-1 rounded font-medium text-foreground">{cls.section}</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Class Teacher</span><span className="text-foreground font-medium">{cls.classTeacher}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Students</span><span className="text-foreground font-semibold">{cls.students}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Room</span><span className="text-foreground">{cls.room}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeesPage() {
  const [search, setSearch] = useState("");
  const fees = [
    { id: "S2401", name: "Rahul Kumar", class: "XII-A", total: 27000, paid: 27000, due: 0, lastPaid: "02 Aug 2023" },
    { id: "S2403", name: "Aarav Singh", class: "XI-B", total: 27000, paid: 19000, due: 8000, lastPaid: "02 Aug 2023" },
    { id: "S2402", name: "Priya Sharma", class: "XII-A", total: 27000, paid: 27000, due: 0, lastPaid: "02 Aug 2023" },
    { id: "S2405", name: "Rohan Mehta", class: "IX-A", total: 23000, paid: 15000, due: 8000, lastPaid: "05 Apr 2023" },
    { id: "S2404", name: "Nisha Gupta", class: "X-C", total: 25000, paid: 25000, due: 0, lastPaid: "03 Aug 2023" },
  ];
  const filtered = fees.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  const totalCollected = fees.reduce((sum, f) => sum + f.paid, 0);
  const totalPending = fees.reduce((sum, f) => sum + f.due, 0);
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Fee Management</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-green-700">₹{(totalCollected / 100000).toFixed(1)}L</div>
          <div className="text-sm text-green-600">Total Collected</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-red-700">₹{(totalPending / 1000).toFixed(0)}K</div>
          <div className="text-sm text-red-600">Total Pending</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-blue-700">{fees.filter(f => f.due > 0).length}</div>
          <div className="text-sm text-blue-600">Students with Due</div>
        </div>
      </div>
      <input type="text" placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} className="border border-input bg-background rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-w-sm w-full" />
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>
                {["ID", "Name", "Class", "Total Fee", "Paid", "Due", "Last Payment", "Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, i) => (
                <tr key={f.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground text-xs font-mono">{f.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{f.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.class}</td>
                  <td className="px-4 py-3 text-foreground">₹{f.total.toLocaleString()}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">₹{f.paid.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${f.due > 0 ? "text-red-600" : "text-green-600"}`}>₹{f.due.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{f.lastPaid}</td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 bg-secondary hover:bg-accent text-foreground px-2 py-1 rounded text-xs font-semibold transition-colors">
                      <Download className="w-3 h-3" /> Receipt
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

function AttendancePage() {
  const data = [
    { class: "XII-A", total: 42, present: 39, absent: 3 },
    { class: "XII-B", total: 40, present: 37, absent: 3 },
    { class: "XI-A", total: 44, present: 41, absent: 3 },
    { class: "XI-B", total: 38, present: 33, absent: 5 },
    { class: "X-A", total: 45, present: 43, absent: 2 },
    { class: "X-B", total: 43, present: 40, absent: 3 },
    { class: "X-C", total: 41, present: 37, absent: 4 },
    { class: "IX-A", total: 47, present: 44, absent: 3 },
  ];
  const overall = data.reduce((acc, d) => ({ present: acc.present + d.present, total: acc.total + d.total }), { present: 0, total: 0 });
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Attendance Reports</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-green-700">{overall.present}</div>
          <div className="text-sm text-green-600">Present Today</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-red-700">{overall.total - overall.present}</div>
          <div className="text-sm text-red-600">Absent Today</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <div className="text-2xl font-bold text-blue-700">{Math.round((overall.present / overall.total) * 100)}%</div>
          <div className="text-sm text-blue-600">Overall Attendance</div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Class-wise Attendance – Today</h3>
        <div className="space-y-3">
          {data.map(d => {
            const pct = Math.round((d.present / d.total) * 100);
            return (
              <div key={d.class} className="flex items-center gap-4">
                <div className="w-14 text-sm font-semibold text-foreground">{d.class}</div>
                <div className="flex-1 h-5 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${pct >= 90 ? "bg-green-500" : pct >= 75 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${pct}%` }} />
                </div>
                <div className="text-sm text-foreground w-24 text-right">{d.present}/{d.total} ({pct}%)</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "Academic Performance Report", desc: "Class-wise and student-wise performance analysis", icon: "📊", color: "border-blue-200 bg-blue-50" },
          { title: "Attendance Summary Report", desc: "Monthly and yearly attendance statistics", icon: "📅", color: "border-green-200 bg-green-50" },
          { title: "Fee Collection Report", desc: "Term-wise fee collection and pending dues", icon: "💰", color: "border-emerald-200 bg-emerald-50" },
          { title: "Teacher Performance Report", desc: "Class performance and coverage analysis", icon: "👨‍🏫", color: "border-purple-200 bg-purple-50" },
          { title: "Admission Report", desc: "New admissions and enrollment statistics", icon: "📝", color: "border-orange-200 bg-orange-50" },
          { title: "Library Report", desc: "Book issuance, returns, and fine collection", icon: "📚", color: "border-cyan-200 bg-cyan-50" },
        ].map(r => (
          <div key={r.title} className={`border-2 rounded-xl p-5 flex items-start gap-4 ${r.color}`}>
            <div className="text-3xl">{r.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-foreground">{r.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{r.desc}</div>
              <button className="mt-3 flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-1.5 rounded-lg text-xs font-semibold">
                <Download className="w-3 h-3" /> Generate Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoticesPage() {
  const [notices, setNotices] = useState([
    { id: 1, title: "Board Exam Schedule Announced", date: "18 Mar 2024", target: "All", category: "Exam", content: "Board exams for Class X and XII will commence from 1st April 2024." },
    { id: 2, title: "Annual Sports Day – 5 April", date: "15 Mar 2024", target: "All", category: "Event", content: "Annual Sports Day will be held on 5th April. All students are encouraged to participate." },
    { id: 3, title: "Fee Payment Deadline", date: "10 Mar 2024", target: "Parents", category: "Finance", content: "Term 3 fee must be paid by 31st March to avoid late fee charges." },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", target: "All", category: "General", content: "" });
  const add = () => {
    if (!form.title || !form.content) return;
    const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    setNotices(n => [{ id: Date.now(), title: form.title, date: today, target: form.target, category: form.category, content: form.content }, ...n]);
    setForm({ title: "", target: "All", category: "General", content: "" });
    setShowForm(false);
  };
  const catColors: Record<string, string> = {
    Exam: "bg-red-100 text-red-700", Event: "bg-purple-100 text-purple-700",
    Finance: "bg-orange-100 text-orange-700", General: "bg-blue-100 text-blue-700",
    Holiday: "bg-green-100 text-green-700",
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Notice Board</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
          <Plus className="w-4 h-4" /> Post Notice
        </button>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">New Notice</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="Notice Title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {["All", "Students", "Teachers", "Parents", "Class XII", "Class XI", "Class X"].map(t => <option key={t}>{t}</option>)}
              </select>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {["General", "Exam", "Event", "Finance", "Holiday"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <textarea rows={3} placeholder="Notice content *" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            <button onClick={add} className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Post Notice</button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {notices.map(n => (
          <div key={n.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-foreground">{n.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColors[n.category] || "bg-secondary text-foreground"}`}>{n.category}</span>
                  <span className="text-xs text-muted-foreground">For: {n.target} • {n.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{n.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdmissionsPage() {
  const [applications, setApplications] = useState([
    { id: "APP001", name: "Aanya Singh", class: "IX-A", date: "20 Mar", status: "Confirmed", phone: "9876520001", docs: true },
    { id: "APP002", name: "Rohan Gupta", class: "XI-B", date: "19 Mar", status: "Pending", phone: "9876520002", docs: false },
    { id: "APP003", name: "Kavya Sharma", class: "VI-C", date: "18 Mar", status: "Confirmed", phone: "9876520003", docs: true },
    { id: "APP004", name: "Dev Patel", class: "XII-A", date: "17 Mar", status: "Pending", phone: "9876520004", docs: false },
    { id: "APP005", name: "Riya Shah", class: "VIII-B", date: "16 Mar", status: "Rejected", phone: "9876520005", docs: true },
  ]);
  const confirm = (id: string) => setApplications(a => a.map(ap => ap.id === id ? { ...ap, status: "Confirmed" } : ap));
  const reject = (id: string) => setApplications(a => a.map(ap => ap.id === id ? { ...ap, status: "Rejected" } : ap));
  const statusColor: Record<string, string> = {
    Confirmed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Admission Management</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{applications.filter(a => a.status === "Confirmed").length}</div>
          <div className="text-sm text-green-600">Confirmed</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{applications.filter(a => a.status === "Pending").length}</div>
          <div className="text-sm text-yellow-600">Pending</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{applications.filter(a => a.status === "Rejected").length}</div>
          <div className="text-sm text-red-600">Rejected</div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>
                {["App ID", "Name", "Class", "Date", "Phone", "Docs", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.map((a, i) => (
                <tr key={a.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground text-xs font-mono">{a.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.class}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.phone}</td>
                  <td className="px-4 py-3">
                    {a.docs
                      ? <CheckCircle2 className="w-4 h-4 text-green-600" />
                      : <X className="w-4 h-4 text-red-500" />
                    }
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    {a.status === "Pending" && (
                      <>
                        <button onClick={() => confirm(a.id)} className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded font-semibold transition-colors">Confirm</button>
                        <button onClick={() => reject(a.id)} className="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-2 py-1 rounded font-semibold transition-colors">Reject</button>
                      </>
                    )}
                    {a.status !== "Pending" && <span className="text-xs text-muted-foreground">—</span>}
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

function SettingsPage() {
  const [schoolName, setSchoolName] = useState("Bright Future Senior Secondary School");
  const [email, setEmail] = useState("admin@brightfuture.edu.in");
  const [phone, setPhone] = useState("+91 99999 00000");
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Settings</h2>
      <div className="bg-card border border-border rounded-xl p-6 space-y-5 max-w-lg">
        <h3 className="font-bold text-foreground">School Information</h3>
        <div className="space-y-4">
          {[
            { label: "School Name", value: schoolName, setter: setSchoolName },
            { label: "Admin Email", value: email, setter: setEmail },
            { label: "Phone", value: phone, setter: setPhone },
          ].map(field => (
            <div key={field.label}>
              <label className="block text-sm font-medium text-foreground mb-1">{field.label}</label>
              <input type="text" value={field.value} onChange={e => field.setter(e.target.value)} className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          ))}
        </div>
        <button onClick={handleSave} className="gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {saved ? "Settings Saved!" : "Save Settings"}
        </button>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 max-w-lg">
        <h3 className="font-bold text-foreground mb-4">Academic Year</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-foreground font-medium">Current Session</div>
            <div className="text-muted-foreground text-sm">April 2023 – March 2024</div>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">Active</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminERP() {
  return (
    <ERPLayout navItems={navItems} role="Admin" roleColor="bg-orange-500/20 text-orange-300">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/erp/admin" />} />
      </Routes>
    </ERPLayout>
  );
}
