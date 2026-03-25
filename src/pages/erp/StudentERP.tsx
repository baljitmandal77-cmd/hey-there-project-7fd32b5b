import { Routes, Route, Navigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, BookOpen, Calendar, CreditCard, Bell,
  ClipboardList, FileText, Clock
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/erp/student" },
  { label: "Attendance", icon: Clock, href: "/erp/student/attendance" },
  { label: "Results / Marks", icon: FileText, href: "/erp/student/results" },
  { label: "Timetable", icon: Calendar, href: "/erp/student/timetable" },
  { label: "Fee Payment", icon: CreditCard, href: "/erp/student/fees" },
  { label: "Notices", icon: Bell, href: "/erp/student/notices" },
  { label: "Homework", icon: ClipboardList, href: "/erp/student/homework" },
  { label: "Library", icon: BookOpen, href: "/erp/student/library" },
];

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
        <span className="text-lg">{value.charAt(0) === "9" || value.includes("%") ? "📊" : "📋"}</span>
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
}

function Dashboard() {
  const subjects = [
    { sub: "Mathematics", marks: 88, total: 100, grade: "A" },
    { sub: "Physics", marks: 82, total: 100, grade: "A" },
    { sub: "Chemistry", marks: 79, total: 100, grade: "B+" },
    { sub: "English", marks: 91, total: 100, grade: "A+" },
    { sub: "Computer Sc.", marks: 95, total: 100, grade: "A+" },
  ];

  const notices = [
    { title: "Board Exam Admit Card available", date: "18 Mar" },
    { title: "Science Project submission deadline", date: "22 Mar" },
    { title: "Holiday on 25th March – Holi", date: "15 Mar" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back, Rahul! 👋</h2>
        <p className="text-muted-foreground text-sm">Class XII-A | Roll No: 2401 | Session 2023-24</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Attendance" value="92%" sub="Good standing" color="bg-green-100" />
        <StatCard label="Overall Grade" value="A" sub="Excellent" color="bg-blue-100" />
        <StatCard label="Fee Status" value="Paid" sub="Up to date" color="bg-emerald-100" />
        <StatCard label="Pending HW" value="3" sub="Due this week" color="bg-orange-100" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Results */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Recent Exam Results</h3>
          <div className="space-y-3">
            {subjects.map((s) => (
              <div key={s.sub} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground">{s.sub}</span>
                    <span className="text-sm font-semibold text-foreground">{s.marks}/{s.total}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary rounded-full"
                      style={{ width: `${(s.marks / s.total) * 100}%` }}
                    />
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  s.grade.startsWith("A") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {s.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Latest Notices</h3>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.title} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-foreground font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Timetable */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Today's Schedule</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { period: "P1", time: "8:00-8:45", sub: "Mathematics", teacher: "Mr. Sharma" },
            { period: "P2", time: "8:45-9:30", sub: "Physics", teacher: "Mrs. Gupta" },
            { period: "P3", time: "9:30-10:15", sub: "Chemistry", teacher: "Mr. Verma" },
            { period: "P4", time: "10:30-11:15", sub: "English", teacher: "Mrs. Joshi" },
            { period: "P5", time: "11:15-12:00", sub: "Computer Sc.", teacher: "Mr. Rajan" },
            { period: "P6", time: "12:45-1:30", sub: "P.E.", teacher: "Mr. Yadav" },
          ].map((p) => (
            <div key={p.period} className="bg-secondary rounded-lg p-3 text-center">
              <div className="text-xs font-bold text-primary">{p.period}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{p.time}</div>
              <div className="text-sm font-semibold text-foreground mt-1">{p.sub}</div>
              <div className="text-xs text-muted-foreground">{p.teacher}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttendancePage() {
  const months = ["Jan", "Feb", "Mar"];
  const data = [
    { month: "January", present: 24, absent: 2, total: 26 },
    { month: "February", present: 22, absent: 3, total: 25 },
    { month: "March", present: 18, absent: 1, total: 19 },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">My Attendance</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {data.map(d => (
          <div key={d.month} className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-3">{d.month}</h3>
            <div className="text-3xl font-bold text-primary mb-1">{Math.round((d.present/d.total)*100)}%</div>
            <div className="text-sm text-muted-foreground">Present: {d.present} | Absent: {d.absent} | Total: {d.total}</div>
            <div className="mt-3 h-2 bg-secondary rounded-full">
              <div className="h-full gradient-primary rounded-full" style={{ width: `${(d.present/d.total)*100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Subject-wise Attendance</h3>
        <div className="space-y-3">
          {[
            { sub: "Mathematics", pct: 92 },
            { sub: "Physics", pct: 88 },
            { sub: "Chemistry", pct: 95 },
            { sub: "English", pct: 90 },
            { sub: "Computer Sc.", pct: 100 },
          ].map(s => (
            <div key={s.sub} className="flex items-center gap-3">
              <div className="w-32 text-sm text-foreground">{s.sub}</div>
              <div className="flex-1 h-3 bg-secondary rounded-full">
                <div className={`h-full rounded-full ${s.pct >= 90 ? "bg-green-500" : s.pct >= 75 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${s.pct}%` }} />
              </div>
              <div className="text-sm font-semibold text-foreground w-12 text-right">{s.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultsPage() {
  const exams = [
    { exam: "Unit Test 1", math: 18, phy: 17, chem: 16, eng: 19, cs: 20, total: 20 },
    { exam: "Mid Term", math: 76, phy: 72, chem: 68, eng: 80, cs: 85, total: 100 },
    { exam: "Unit Test 2", math: 17, phy: 16, chem: 18, eng: 18, cs: 19, total: 20 },
    { exam: "Pre-Board", math: 82, phy: 78, chem: 75, eng: 88, cs: 92, total: 100 },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Exam Results</h2>
      <div className="overflow-x-auto bg-card border border-border rounded-xl">
        <table className="w-full text-sm">
          <thead className="gradient-primary text-primary-foreground">
            <tr>
              {["Exam", "Maths", "Physics", "Chemistry", "English", "Comp. Sc.", "Total", "Grade"].map(h => (
                <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exams.map((row, i) => {
              const obtained = row.math + row.phy + row.chem + row.eng + row.cs;
              const max = row.total * 5;
              const pct = Math.round((obtained / max) * 100);
              const grade = pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B+" : "B";
              return (
                <tr key={row.exam} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 font-medium text-foreground">{row.exam}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.math}/{row.total}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.phy}/{row.total}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.chem}/{row.total}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.eng}/{row.total}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.cs}/{row.total}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">{obtained}/{max}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${grade.startsWith("A") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FeesPage() {
  const fees = [
    { term: "Term 1 (Apr–Jul)", amount: "₹7,500", status: "Paid", date: "05 Apr 2023" },
    { term: "Term 2 (Aug–Nov)", amount: "₹7,500", status: "Paid", date: "02 Aug 2023" },
    { term: "Term 3 (Dec–Mar)", amount: "₹8,000", status: "Due", date: "01 Dec 2023" },
    { term: "Development Fee", amount: "₹4,000", status: "Paid", date: "05 Apr 2023" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Fee Details</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-green-700">₹19,000</div>
          <div className="text-sm text-green-600">Total Paid</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-red-700">₹8,000</div>
          <div className="text-sm text-red-600">Pending Amount</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-blue-700">₹27,000</div>
          <div className="text-sm text-blue-600">Total Annual Fee</div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="gradient-primary text-primary-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Term</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((f, i) => (
              <tr key={f.term} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                <td className="px-4 py-3 font-medium text-foreground">{f.term}</td>
                <td className="px-4 py-3 text-foreground">{f.amount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${f.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {f.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{f.date}</td>
                <td className="px-4 py-3">
                  {f.status === "Due" ? (
                    <button className="gradient-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold">
                      Pay Now
                    </button>
                  ) : (
                    <button className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-xs font-semibold">
                      Receipt
                    </button>
                  )}
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
        <p className="text-sm text-muted-foreground mt-1">Connect your backend API to populate this data.</p>
      </div>
    </div>
  );
}

export default function StudentERP() {
  return (
    <ERPLayout navItems={navItems} role="Student" roleColor="bg-blue-500/20 text-blue-300">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="timetable" element={<GenericPage title="Timetable" />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="notices" element={<GenericPage title="Notices" />} />
        <Route path="homework" element={<GenericPage title="Homework" />} />
        <Route path="library" element={<GenericPage title="Library" />} />
        <Route path="*" element={<Navigate to="/erp/student" />} />
      </Routes>
    </ERPLayout>
  );
}
