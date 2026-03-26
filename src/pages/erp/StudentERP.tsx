import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, BookOpen, Calendar, CreditCard, Bell,
  ClipboardList, FileText, Clock, CheckCircle2, XCircle,
  Download, User, Trophy, ArrowLeft, History, ChevronRight, Star
} from "lucide-react";
import { getSeedStudents, getSeedNotices, getSeedFeeRecords, addAudit } from "@/lib/erpStore";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/erp/student" },
  { label: "My Profile", icon: User, href: "/erp/student/profile" },
  { label: "Attendance", icon: Clock, href: "/erp/student/attendance" },
  { label: "Results / Marks", icon: FileText, href: "/erp/student/results" },
  { label: "Score Rankings", icon: Trophy, href: "/erp/student/ranking" },
  { label: "Timetable", icon: Calendar, href: "/erp/student/timetable" },
  { label: "Fee Payment", icon: CreditCard, href: "/erp/student/fees" },
  { label: "Notices", icon: Bell, href: "/erp/student/notices" },
  { label: "Homework", icon: ClipboardList, href: "/erp/student/homework" },
  { label: "Library", icon: BookOpen, href: "/erp/student/library" },
];

const ME = getSeedStudents()[0];

function Dashboard() {
  const navigate = useNavigate();
  const notices = getSeedNotices().filter(n => n.public).slice(0, 3);
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome back, {ME.name}! 👋</h2>
          <p className="text-muted-foreground text-sm">Class {ME.class} | Roll No: {ME.roll} | Session 2023-24</p>
        </div>
        <button onClick={() => navigate("/erp/student/profile")} className="flex items-center gap-2 bg-secondary text-foreground px-3 py-1.5 rounded-lg text-xs hover:bg-accent transition-colors">
          <User className="w-3.5 h-3.5" /> View Profile
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Attendance", value: ME.att, sub: "This session", emoji: "📅", onClick: () => navigate("/erp/student/attendance") },
          { label: "Overall Grade", value: "A", sub: "Pre-Board", emoji: "🏆", onClick: () => navigate("/erp/student/results") },
          { label: "Fee Status", value: ME.fees, sub: ME.fees === "Paid" ? "Up to date" : "Payment due", emoji: "✅", onClick: () => navigate("/erp/student/fees") },
          { label: "Pending HW", value: "3", sub: "Due this week", emoji: "📚", onClick: () => navigate("/erp/student/homework") },
        ].map(s => (
          <button key={s.label} onClick={s.onClick} className="bg-card border border-border rounded-xl p-5 text-left hover:shadow-md transition-shadow hover:border-primary group">
            <div className="text-2xl mb-2">{s.emoji}</div>
            <div className="text-2xl font-bold text-foreground group-hover:text-primary">{s.value}</div>
            <div className="text-sm font-medium text-foreground">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Recent Exam Results</h3>
            <button onClick={() => navigate("/erp/student/results")} className="text-xs text-primary hover:underline flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-3">
            {[
              { sub: "Mathematics", marks: 82, total: 100, grade: "A" },
              { sub: "Physics", marks: 78, total: 100, grade: "B+" },
              { sub: "Chemistry", marks: 75, total: 100, grade: "B+" },
              { sub: "English", marks: 88, total: 100, grade: "A" },
              { sub: "Computer Sc.", marks: 92, total: 100, grade: "A+" },
            ].map(s => (
              <div key={s.sub} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-foreground">{s.sub}</span>
                    <span className="text-sm font-semibold text-foreground">{s.marks}/{s.total}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${s.marks}%` }} />
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${s.grade.startsWith("A") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{s.grade}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Latest Notices</h3>
            <button onClick={() => navigate("/erp/student/notices")} className="text-xs text-primary hover:underline flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></button>
          </div>
          <div className="space-y-3">
            {notices.map(n => (
              <div key={n.id} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-foreground font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{new Date(n.postedAt).toLocaleDateString("en-IN")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Today's Schedule – Class {ME.class}</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { period: "P1", time: "8:00-8:45", sub: "Mathematics", teacher: "Mr. Sharma" },
            { period: "P2", time: "8:45-9:30", sub: "Physics", teacher: "Mrs. Gupta" },
            { period: "P3", time: "9:30-10:15", sub: "Chemistry", teacher: "Mr. Verma" },
            { period: "P4", time: "10:30-11:15", sub: "English", teacher: "Mrs. Joshi" },
            { period: "P5", time: "11:15-12:00", sub: "Computer Sc.", teacher: "Mr. Rajan" },
            { period: "P6", time: "12:45-1:30", sub: "P.E.", teacher: "Mr. Yadav" },
          ].map(p => (
            <div key={p.period} className="bg-secondary rounded-lg p-3 text-center">
              <div className="text-xs font-bold text-primary">{p.period}</div>
              <div className="text-xs text-muted-foreground">{p.time}</div>
              <div className="text-sm font-semibold text-foreground mt-1">{p.sub}</div>
              <div className="text-xs text-muted-foreground">{p.teacher}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"basic" | "full">("basic");
  const feeHistory = getSeedFeeRecords().filter(f => f.studentId === ME.id);
  const attHistory = [
    { month: "January", present: 24, absent: 2, total: 26 },
    { month: "February", present: 22, absent: 3, total: 25 },
    { month: "March", present: 18, absent: 1, total: 19 },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent transition-colors"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">My Profile</h2>
      </div>
      {/* Profile Card */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center shrink-0">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{ME.name}</h3>
                <p className="text-muted-foreground text-sm">Student ID: {ME.id} | Class {ME.class} | Roll: {ME.roll}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${ME.fees === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>Fee: {ME.fees}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div><div className="text-xs text-muted-foreground">Gender</div><div className="text-sm font-medium text-foreground">{ME.gender}</div></div>
              <div><div className="text-xs text-muted-foreground">Date of Birth</div><div className="text-sm font-medium text-foreground">{new Date(ME.dob).toLocaleDateString("en-IN")}</div></div>
              <div><div className="text-xs text-muted-foreground">Attendance</div><div className="text-sm font-semibold text-green-600">{ME.att}</div></div>
              <div><div className="text-xs text-muted-foreground">Session</div><div className="text-sm font-medium text-foreground">2023-24</div></div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-border">
          <div><div className="text-xs text-muted-foreground mb-1">Email</div><a href={`mailto:${ME.email}`} className="text-sm text-primary hover:underline">{ME.email}</a></div>
          <div><div className="text-xs text-muted-foreground mb-1">Phone</div><a href={`tel:${ME.phone}`} className="text-sm text-foreground hover:text-primary">{ME.phone}</a></div>
          <div><div className="text-xs text-muted-foreground mb-1">Parent Phone</div><a href={`tel:${ME.parentPhone}`} className="text-sm text-foreground hover:text-primary">{ME.parentPhone}</a></div>
          <div className="md:col-span-3"><div className="text-xs text-muted-foreground mb-1">Address</div><div className="text-sm text-foreground">{ME.address}</div></div>
        </div>
      </div>
      {/* Tabs for full details */}
      <div className="flex gap-2">
        <button onClick={() => setTab("basic")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "basic" ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>Basic Info</button>
        <button onClick={() => setTab("full")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${tab === "full" ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}><History className="w-4 h-4" /> Full Details & History</button>
      </div>
      {tab === "full" && (
        <div className="space-y-6">
          {/* Fee History */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Fee Payment History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="gradient-primary text-primary-foreground">
                  <tr>
                    {["Receipt No", "Amount", "Type", "Term", "Due Date", "Paid Date", "Status"].map(h => <th key={h} className="px-3 py-2 text-left text-xs font-semibold">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {feeHistory.map((f, i) => (
                    <tr key={f.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                      <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{f.receiptNo || "—"}</td>
                      <td className="px-3 py-2 font-semibold text-foreground">₹{f.amount.toLocaleString()}</td>
                      <td className="px-3 py-2 text-muted-foreground">{f.type}</td>
                      <td className="px-3 py-2 text-muted-foreground">{f.term}</td>
                      <td className="px-3 py-2 text-muted-foreground">{f.dueDate}</td>
                      <td className="px-3 py-2 text-muted-foreground">{f.paidDate || "—"}</td>
                      <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${f.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{f.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Attendance History */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Attendance History</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {attHistory.map(d => (
                <div key={d.month} className="bg-secondary rounded-xl p-4">
                  <div className="font-semibold text-foreground mb-1">{d.month}</div>
                  <div className="text-2xl font-bold text-primary">{Math.round((d.present / d.total) * 100)}%</div>
                  <div className="text-xs text-muted-foreground">Present: {d.present} | Absent: {d.absent} | Total: {d.total}</div>
                  <div className="mt-2 h-2 bg-background rounded-full"><div className="h-full gradient-primary rounded-full" style={{ width: `${(d.present / d.total) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AttendancePage() {
  const navigate = useNavigate();
  const data = [
    { month: "January", present: 24, absent: 2, total: 26 },
    { month: "February", present: 22, absent: 3, total: 25 },
    { month: "March", present: 18, absent: 1, total: 19 },
  ];
  const absentDates = ["03 Jan", "15 Jan", "07 Feb", "19 Feb", "22 Feb", "12 Mar"];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">My Attendance</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {data.map(d => (
          <div key={d.month} className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-2">{d.month}</h3>
            <div className="text-3xl font-bold text-primary mb-1">{Math.round((d.present / d.total) * 100)}%</div>
            <div className="text-xs text-muted-foreground">Present: {d.present} | Absent: {d.absent} | Total: {d.total}</div>
            <div className="mt-3 h-2 bg-secondary rounded-full"><div className="h-full gradient-primary rounded-full" style={{ width: `${(d.present / d.total) * 100}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Subject-wise Attendance</h3>
          <div className="space-y-3">
            {[
              { sub: "Mathematics", pct: 92 }, { sub: "Physics", pct: 88 },
              { sub: "Chemistry", pct: 95 }, { sub: "English", pct: 90 }, { sub: "Computer Sc.", pct: 100 },
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
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Absent Dates</h3>
          <div className="flex flex-wrap gap-2">
            {absentDates.map(d => <span key={d} className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">{d}</span>)}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
            ⚠️ Minimum 75% attendance required to appear in board exams. Current: {ME.att}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsPage() {
  const navigate = useNavigate();
  const exams = [
    { exam: "Unit Test 1", math: 18, phy: 17, chem: 16, eng: 19, cs: 20, total: 20 },
    { exam: "Mid Term", math: 76, phy: 72, chem: 68, eng: 80, cs: 85, total: 100 },
    { exam: "Unit Test 2", math: 17, phy: 16, chem: 18, eng: 18, cs: 19, total: 20 },
    { exam: "Pre-Board", math: 82, phy: 78, chem: 75, eng: 88, cs: 92, total: 100 },
  ];
  const handleDownload = () => {
    addAudit("DOWNLOAD", "Results", `Student ${ME.name} downloaded report card`);
    alert("Report Card downloaded! (Demo — PDF generation requires backend)");
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Exam Results</h2>
          <button onClick={handleDownload} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
            <Download className="w-4 h-4" /> Download Report Card
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { sub: "Mathematics", marks: 82, grade: "A" }, { sub: "Physics", marks: 78, grade: "B+" },
          { sub: "Chemistry", marks: 75, grade: "B+" }, { sub: "English", marks: 88, grade: "A" },
          { sub: "Computer Sc.", marks: 92, grade: "A+" },
        ].map(s => (
          <div key={s.sub} className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.marks}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
            <div className={`mt-2 inline-block px-2 py-0.5 text-xs font-bold rounded ${s.grade.startsWith("A") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{s.grade}</div>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto bg-card border border-border rounded-xl">
        <table className="w-full text-sm">
          <thead className="gradient-primary text-primary-foreground">
            <tr>{["Exam", "Maths", "Physics", "Chemistry", "English", "Comp. Sc.", "Total", "Grade"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
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
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${grade.startsWith("A") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{grade}</span>
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

function RankingPage() {
  const navigate = useNavigate();
  const rankings = [
    { rank: 1, name: "Priya Sharma", class: "XII-A", roll: 2, total: 415, pct: "83%", grade: "A+" },
    { rank: 2, name: "Aarav Sharma", class: "XII-A", roll: 1, total: 410, pct: "82%", grade: "A+" },
    { rank: 3, name: "Sneha Patel", class: "XII-A", roll: 4, total: 398, pct: "79.6%", grade: "A" },
    { rank: 4, name: "Rahul Kumar", class: "XII-A", roll: 1, total: 390, pct: "78%", grade: "A", me: true },
    { rank: 5, name: "Arjun Mehta", class: "XII-A", roll: 5, total: 380, pct: "76%", grade: "B+" },
    { rank: 6, name: "Rohit Yadav", class: "XII-A", roll: 3, total: 355, pct: "71%", grade: "B+" },
  ];
  const myHistory = [
    { exam: "Unit Test 1", rank: 3, total: 42 },
    { exam: "Mid Term", rank: 4, total: 42 },
    { exam: "Unit Test 2", rank: 3, total: 42 },
    { exam: "Pre-Board", rank: 4, total: 42 },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Score Table & Rankings – Class XII-A</h2>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="gradient-primary text-primary-foreground">
            <tr>{["Rank", "Name", "Class", "Total (500)", "Percentage", "Grade"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rankings.map((r, i) => (
              <tr key={r.name} className={`${r.me ? "bg-primary/10 font-bold" : i % 2 === 0 ? "bg-card" : "bg-muted"}`}>
                <td className="px-4 py-3">
                  <span className={`flex items-center gap-1.5 font-bold ${r.rank === 1 ? "text-yellow-500" : r.rank === 2 ? "text-gray-400" : r.rank === 3 ? "text-orange-500" : "text-muted-foreground"}`}>
                    {r.rank <= 3 ? <Star className="w-4 h-4 fill-current" /> : null} #{r.rank}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{r.name} {r.me && <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded ml-1">You</span>}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.class}</td>
                <td className="px-4 py-3 font-semibold text-foreground">{r.total}/500</td>
                <td className="px-4 py-3 text-muted-foreground">{r.pct}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${r.grade.startsWith("A") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{r.grade}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><History className="w-4 h-4 text-primary" /> My Rank History</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {myHistory.map(h => (
            <div key={h.exam} className="bg-secondary rounded-xl p-4 text-center">
              <div className="text-xs text-muted-foreground">{h.exam}</div>
              <div className="text-2xl font-bold text-primary mt-1">#{h.rank}</div>
              <div className="text-xs text-muted-foreground">out of {h.total}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimetablePage() {
  const navigate = useNavigate();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const schedule: Record<string, { sub: string; teacher: string }[]> = {
    Monday: [{ sub: "Mathematics", teacher: "Mr. Sharma" }, { sub: "Physics", teacher: "Mrs. Gupta" }, { sub: "Chemistry", teacher: "Mr. Verma" }, { sub: "English", teacher: "Mrs. Joshi" }, { sub: "Computer Sc.", teacher: "Mr. Rajan" }, { sub: "P.E.", teacher: "Mr. Yadav" }],
    Tuesday: [{ sub: "Physics", teacher: "Mrs. Gupta" }, { sub: "Mathematics", teacher: "Mr. Sharma" }, { sub: "English", teacher: "Mrs. Joshi" }, { sub: "Chemistry", teacher: "Mr. Verma" }, { sub: "Library", teacher: "Mrs. Sinha" }, { sub: "Computer Sc.", teacher: "Mr. Rajan" }],
    Wednesday: [{ sub: "Chemistry", teacher: "Mr. Verma" }, { sub: "Computer Sc.", teacher: "Mr. Rajan" }, { sub: "Mathematics", teacher: "Mr. Sharma" }, { sub: "P.E.", teacher: "Mr. Yadav" }, { sub: "Physics", teacher: "Mrs. Gupta" }, { sub: "English", teacher: "Mrs. Joshi" }],
    Thursday: [{ sub: "English", teacher: "Mrs. Joshi" }, { sub: "Chemistry", teacher: "Mr. Verma" }, { sub: "Computer Sc.", teacher: "Mr. Rajan" }, { sub: "Mathematics", teacher: "Mr. Sharma" }, { sub: "Physics", teacher: "Mrs. Gupta" }, { sub: "Drawing", teacher: "Mrs. Mehta" }],
    Friday: [{ sub: "Computer Sc.", teacher: "Mr. Rajan" }, { sub: "English", teacher: "Mrs. Joshi" }, { sub: "P.E.", teacher: "Mr. Yadav" }, { sub: "Physics", teacher: "Mrs. Gupta" }, { sub: "Mathematics", teacher: "Mr. Sharma" }, { sub: "Chemistry", teacher: "Mr. Verma" }],
    Saturday: [{ sub: "Mathematics", teacher: "Mr. Sharma" }, { sub: "Physics Lab", teacher: "Mrs. Gupta" }, { sub: "Chemistry Lab", teacher: "Mr. Verma" }, { sub: "Computer Lab", teacher: "Mr. Rajan" }, { sub: "—", teacher: "—" }, { sub: "—", teacher: "—" }],
  };
  const periods = ["8:00–8:45", "8:45–9:30", "9:30–10:15", "10:30–11:15", "11:15–12:00", "12:45–1:30"];
  const subColors: Record<string, string> = {
    "Mathematics": "bg-blue-50 border-blue-200 text-blue-700", "Physics": "bg-purple-50 border-purple-200 text-purple-700",
    "Chemistry": "bg-green-50 border-green-200 text-green-700", "English": "bg-orange-50 border-orange-200 text-orange-700",
    "Computer Sc.": "bg-cyan-50 border-cyan-200 text-cyan-700", "P.E.": "bg-red-50 border-red-200 text-red-700",
    "Physics Lab": "bg-purple-50 border-purple-200 text-purple-700", "Chemistry Lab": "bg-green-50 border-green-200 text-green-700",
    "Computer Lab": "bg-cyan-50 border-cyan-200 text-cyan-700", "Library": "bg-yellow-50 border-yellow-200 text-yellow-700",
    "Drawing": "bg-pink-50 border-pink-200 text-pink-700", "—": "bg-muted border-border text-muted-foreground",
  };
  const [activeDay, setActiveDay] = useState(days[Math.max(0, new Date().getDay() - 1)] || "Monday");
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Weekly Timetable – Class {ME.class}</h2>
      </div>
      <div className="flex gap-2 flex-wrap">
        {days.map(d => <button key={d} onClick={() => setActiveDay(d)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeDay === d ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{d}</button>)}
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="gradient-primary text-primary-foreground px-5 py-3 font-bold">{activeDay}</div>
        <div className="divide-y divide-border">
          {periods.map((time, i) => {
            const slot = schedule[activeDay]?.[i];
            const colorClass = slot ? (subColors[slot.sub] || "bg-card border-border text-foreground") : "bg-card";
            return (
              <div key={i} className="flex items-center gap-4 px-5 py-3">
                <div className="text-sm font-mono text-muted-foreground w-24 shrink-0">P{i + 1} {time}</div>
                {slot && slot.sub !== "—" ? (
                  <div className={`flex-1 flex items-center justify-between px-3 py-2 rounded-lg border ${colorClass}`}>
                    <span className="font-semibold text-sm">{slot.sub}</span>
                    <span className="text-xs">{slot.teacher}</span>
                  </div>
                ) : <div className="flex-1 px-3 py-2 text-sm text-muted-foreground">— Free Period —</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FeesPage() {
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const feeItems = [
    { label: "Tuition Fee (Annual)", amount: 8000, status: "Paid" },
    { label: "Development Fund", amount: 2000, status: "Paid" },
    { label: "Sports Fee", amount: 500, status: "Paid" },
    { label: "Library Fee", amount: 300, status: "Paid" },
    { label: "Examination Fee", amount: 500, status: paid ? "Paid" : "Pending" },
    { label: "Miscellaneous", amount: 700, status: "Paid" },
  ];
  const handlePay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); addAudit("PAYMENT", "Fees", `Fee payment of ₹500 processed for student ${ME.id}`); }, 1500);
  };
  const history = getSeedFeeRecords().filter(f => f.studentId === ME.id);
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Fee Management</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-green-700">₹11,500</div><div className="text-sm text-green-600">Amount Paid</div></div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-red-700">₹{paid ? 0 : 500}</div><div className="text-sm text-red-600">Amount Due</div></div>
        <div className="bg-card border border-border rounded-xl p-4 text-center"><div className="text-2xl font-bold text-foreground">₹12,000</div><div className="text-sm text-muted-foreground">Total Annual Fee</div></div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Fee Breakdown – Session 2023-24</h3>
        <div className="space-y-3">
          {feeItems.map(item => (
            <div key={item.label} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="text-sm text-foreground">{item.label}</span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground">₹{item.amount.toLocaleString()}</span>
                {item.status === "Paid" ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600"><CheckCircle2 className="w-3.5 h-3.5" /> Paid</span>
                ) : (
                  <button onClick={handlePay} disabled={paying} className="flex items-center gap-1 text-xs font-semibold gradient-primary text-primary-foreground px-3 py-1 rounded-lg disabled:opacity-60">
                    {paying ? "Processing…" : "Pay Now"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fee History */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><History className="w-4 h-4 text-primary" /> Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>{["Receipt", "Amount", "Type", "Paid Date", "Status"].map(h => <th key={h} className="px-3 py-2 text-left text-xs">{h}</th>)}</tr>
            </thead>
            <tbody>
              {history.map((f, i) => (
                <tr key={f.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{f.receiptNo || "—"}</td>
                  <td className="px-3 py-2 font-semibold">₹{f.amount.toLocaleString()}</td>
                  <td className="px-3 py-2 text-muted-foreground">{f.type}</td>
                  <td className="px-3 py-2 text-muted-foreground">{f.paidDate || "—"}</td>
                  <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${f.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{f.status}</span></td>
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
  const notices = getSeedNotices();
  const [selected, setSelected] = useState<string | null>(null);
  const typeColor: Record<string, string> = {
    general: "bg-blue-100 text-blue-700", urgent: "bg-red-100 text-red-700",
    exam: "bg-purple-100 text-purple-700", holiday: "bg-green-100 text-green-700", event: "bg-orange-100 text-orange-700"
  };
  const sel = notices.find(n => n.id === selected);
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Notice Board</h2>
      </div>
      {sel && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded capitalize ${typeColor[sel.type] || "bg-secondary text-foreground"}`}>{sel.type}</span>
                {sel.pinned && <span className="ml-2 text-xs bg-gold text-gold-foreground px-2 py-0.5 rounded font-semibold">📌 Pinned</span>}
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-xl leading-none">✕</button>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{sel.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{sel.content}</p>
            <div className="text-xs text-muted-foreground">Posted by {sel.postedBy} • {new Date(sel.postedAt).toLocaleString("en-IN")}</div>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {notices.map(n => (
          <button key={n.id} onClick={() => setSelected(n.id)} className="w-full text-left bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow hover:border-primary">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center shrink-0"><Bell className="w-5 h-5 text-primary-foreground" /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-foreground">{n.title}</span>
                  {n.pinned && <span className="text-xs bg-gold text-gold-foreground px-1.5 py-0.5 rounded">📌 Pinned</span>}
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded capitalize ${typeColor[n.type] || "bg-secondary"}`}>{n.type}</span>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(n.postedAt).toLocaleDateString("en-IN")} • By {n.postedBy}</div>
                <div className="text-sm text-muted-foreground mt-1 line-clamp-1">{n.content}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeworkPage() {
  const navigate = useNavigate();
  const [homework, setHomework] = useState([
    { id: 1, sub: "Mathematics", title: "Complete Exercise 12.3 (Probability)", due: "22 Mar", done: false, teacher: "Mr. Sharma" },
    { id: 2, sub: "Physics", title: "Prepare notes on Electromagnetic Induction", due: "20 Mar", done: true, teacher: "Mrs. Gupta" },
    { id: 3, sub: "Chemistry", title: "Lab report on Titration experiment", due: "25 Mar", done: false, teacher: "Mr. Verma" },
    { id: 4, sub: "English", title: "Write an essay on Climate Change (500 words)", due: "21 Mar", done: false, teacher: "Mrs. Joshi" },
    { id: 5, sub: "Computer Sc.", title: "Python program for sorting algorithms", due: "19 Mar", done: true, teacher: "Mr. Rajan" },
  ]);
  const toggle = (id: number) => setHomework(hw => hw.map(h => h.id === id ? { ...h, done: !h.done } : h));
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Homework</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-red-700">{homework.filter(h => !h.done).length}</div><div className="text-sm text-red-600">Pending</div></div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-green-700">{homework.filter(h => h.done).length}</div><div className="text-sm text-green-600">Completed</div></div>
        <div className="bg-card border border-border rounded-xl p-4 text-center"><div className="text-2xl font-bold text-foreground">{homework.length}</div><div className="text-sm text-muted-foreground">Total</div></div>
      </div>
      <div className="space-y-3">
        {homework.map(h => (
          <div key={h.id} className={`bg-card border rounded-xl p-4 transition-colors ${h.done ? "border-green-200 opacity-70" : "border-border hover:border-primary"}`}>
            <div className="flex items-start gap-4">
              <button onClick={() => toggle(h.id)} className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${h.done ? "bg-green-500 border-green-500 text-white" : "border-input bg-background hover:border-primary"}`}>
                {h.done && <CheckCircle2 className="w-3 h-3" />}
              </button>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`font-medium text-sm ${h.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{h.title}</span>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">{h.sub}</span>
                </div>
                <div className="text-xs text-muted-foreground">Due: {h.due} • Teacher: {h.teacher}</div>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${h.done ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{h.done ? "Done" : "Pending"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LibraryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const books = [
    { id: 1, title: "Physics – NCERT Class XII", author: "NCERT", category: "Textbook", available: true },
    { id: 2, title: "Chemistry – NCERT Class XII", author: "NCERT", category: "Textbook", available: false },
    { id: 3, title: "Mathematics – NCERT Class XII", author: "NCERT", category: "Textbook", available: true },
    { id: 4, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", category: "Biography", available: true },
    { id: 5, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", available: false },
    { id: 6, title: "Competitive Programming", author: "S. Halim", category: "Reference", available: true },
    { id: 7, title: "Concepts of Physics Vol 1", author: "H.C. Verma", category: "Reference", available: true },
    { id: 8, title: "Organic Chemistry", author: "Morrison & Boyd", category: "Reference", available: false },
  ];
  const [issued, setIssued] = useState<number[]>([]);
  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));
  const handleIssue = (id: number) => {
    setIssued(i => i.includes(id) ? i.filter(x => x !== id) : [...i, id]);
    addAudit("ISSUE_BOOK", "Library", `Student requested book ID ${id}`);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">School Library</h2>
      </div>
      <input type="text" placeholder="Search books by title or author…" value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-input bg-background rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-w-sm" />
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(b => (
          <div key={b.id} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center shrink-0"><BookOpen className="w-5 h-5 text-primary-foreground" /></div>
            <div className="flex-1">
              <div className="font-semibold text-foreground">{b.title}</div>
              <div className="text-xs text-muted-foreground">{b.author} • {b.category}</div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{b.available ? "Available" : "Issued"}</span>
              {b.available && (
                <button onClick={() => handleIssue(b.id)} className={`text-xs px-2 py-1 rounded font-medium transition-colors ${issued.includes(b.id) ? "bg-yellow-100 text-yellow-700" : "gradient-primary text-primary-foreground"}`}>
                  {issued.includes(b.id) ? "Requested ✓" : "Request Issue"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StudentERP() {
  return (
    <ERPLayout navItems={navItems} role="Student" roleColor="bg-blue-500/20 text-blue-400">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/homework" element={<HomeworkPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="*" element={<Navigate to="/erp/student" replace />} />
      </Routes>
    </ERPLayout>
  );
}
