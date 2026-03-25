import { Routes, Route, Navigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, Users, BookOpen, CreditCard, Bell,
  Calendar, FileText, Settings, UserPlus, BarChart3
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
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  a.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Student", icon: "👤" },
              { label: "Add Teacher", icon: "🧑‍🏫" },
              { label: "Post Notice", icon: "📢" },
              { label: "Generate Report", icon: "📊" },
              { label: "Collect Fee", icon: "💰" },
              { label: "Update Timetable", icon: "🗓️" },
            ].map(a => (
              <button key={a.label} className="flex items-center gap-2 bg-secondary hover:bg-accent border border-border rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors">
                <span className="text-lg">{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Class-wise strength */}
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
  const students = [
    { id: "S2401", name: "Rahul Kumar", class: "XII-A", roll: 1, fees: "Paid", att: "92%" },
    { id: "S2402", name: "Priya Sharma", class: "XII-A", roll: 2, fees: "Paid", att: "95%" },
    { id: "S2403", name: "Aarav Singh", class: "XI-B", roll: 5, fees: "Due", att: "78%" },
    { id: "S2404", name: "Nisha Gupta", class: "X-C", roll: 12, fees: "Paid", att: "88%" },
    { id: "S2405", name: "Rohan Mehta", class: "IX-A", roll: 7, fees: "Due", att: "91%" },
  ];
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Students</h2>
        <button className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
          + Add Student
        </button>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="gradient-primary text-primary-foreground">
            <tr>
              {["ID", "Name", "Class", "Roll", "Fee Status", "Attendance", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                <td className="px-4 py-3 text-muted-foreground">{s.id}</td>
                <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.class}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.roll}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.fees === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {s.fees}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{s.att}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="text-xs bg-accent hover:bg-secondary px-2 py-1 rounded">View</button>
                  <button className="text-xs bg-accent hover:bg-secondary px-2 py-1 rounded">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GenericPage({ title }: { title: string }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <div className="bg-card border border-border rounded-xl p-10 text-center">
        <div className="text-4xl mb-4">🚧</div>
        <p className="text-muted-foreground">This section is under development.</p>
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
        <Route path="teachers" element={<GenericPage title="Teacher Management" />} />
        <Route path="classes" element={<GenericPage title="Class Management" />} />
        <Route path="fees" element={<GenericPage title="Fee Management" />} />
        <Route path="attendance" element={<GenericPage title="Attendance Reports" />} />
        <Route path="reports" element={<GenericPage title="Reports & Analytics" />} />
        <Route path="notices" element={<GenericPage title="Notice Board" />} />
        <Route path="admissions" element={<GenericPage title="Admission Management" />} />
        <Route path="settings" element={<GenericPage title="Settings" />} />
        <Route path="*" element={<Navigate to="/erp/admin" />} />
      </Routes>
    </ERPLayout>
  );
}
