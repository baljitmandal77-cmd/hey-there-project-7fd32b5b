import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, BookOpen, Calendar, CreditCard, Bell,
  ClipboardList, FileText, Clock, CheckCircle2, XCircle, Download
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

function Dashboard() {
  const subjects = [
    { sub: "Mathematics", marks: 88, total: 100, grade: "A" },
    { sub: "Physics", marks: 82, total: 100, grade: "A" },
    { sub: "Chemistry", marks: 79, total: 100, grade: "B+" },
    { sub: "English", marks: 91, total: 100, grade: "A+" },
    { sub: "Computer Sc.", marks: 95, total: 100, grade: "A+" },
  ];
  const notices = [
    { title: "Board Exam Admit Card available", date: "18 Mar", type: "important" },
    { title: "Science Project submission deadline", date: "22 Mar", type: "deadline" },
    { title: "Holiday on 25th March – Holi", date: "15 Mar", type: "holiday" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back, Rahul! 👋</h2>
        <p className="text-muted-foreground text-sm">Class XII-A | Roll No: 2401 | Session 2023-24</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Attendance", value: "92%", sub: "Good standing", emoji: "📅", bg: "bg-green-100" },
          { label: "Overall Grade", value: "A", sub: "Excellent", emoji: "🏆", bg: "bg-blue-100" },
          { label: "Fee Status", value: "Paid", sub: "Up to date", emoji: "✅", bg: "bg-emerald-100" },
          { label: "Pending HW", value: "3", sub: "Due this week", emoji: "📚", bg: "bg-orange-100" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.bg}`}>
              <span className="text-lg">{s.emoji}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-sm font-medium text-foreground">{s.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">Recent Exam Results</h3>
          <div className="space-y-3">
            {subjects.map(s => (
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
          <h3 className="font-bold text-foreground mb-4">Latest Notices</h3>
          <div className="space-y-3">
            {notices.map(n => (
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

function AttendancePage() {
  const data = [
    { month: "January", present: 24, absent: 2, total: 26 },
    { month: "February", present: 22, absent: 3, total: 25 },
    { month: "March", present: 18, absent: 1, total: 19 },
  ];
  const absentDates = ["03 Jan", "15 Jan", "07 Feb", "19 Feb", "22 Feb", "12 Mar"];
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">My Attendance</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {data.map(d => (
          <div key={d.month} className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-2">{d.month}</h3>
            <div className="text-3xl font-bold text-primary mb-1">{Math.round((d.present / d.total) * 100)}%</div>
            <div className="text-xs text-muted-foreground">Present: {d.present} | Absent: {d.absent} | Total: {d.total}</div>
            <div className="mt-3 h-2 bg-secondary rounded-full">
              <div className="h-full gradient-primary rounded-full" style={{ width: `${(d.present / d.total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
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
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-destructive" /> Absent Dates
          </h3>
          <div className="flex flex-wrap gap-2">
            {absentDates.map(d => (
              <span key={d} className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">{d}</span>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
            ⚠️ Minimum 75% attendance required to appear in board exams.
          </div>
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Exam Results</h2>
        <button className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
          <Download className="w-4 h-4" /> Download Report Card
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { sub: "Mathematics", marks: 82, grade: "A" },
          { sub: "Physics", marks: 78, grade: "B+" },
          { sub: "Chemistry", marks: 75, grade: "B+" },
          { sub: "English", marks: 88, grade: "A" },
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

function TimetablePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const schedule: Record<string, { sub: string; teacher: string }[]> = {
    Monday: [
      { sub: "Mathematics", teacher: "Mr. Sharma" },
      { sub: "Physics", teacher: "Mrs. Gupta" },
      { sub: "Chemistry", teacher: "Mr. Verma" },
      { sub: "English", teacher: "Mrs. Joshi" },
      { sub: "Computer Sc.", teacher: "Mr. Rajan" },
      { sub: "P.E.", teacher: "Mr. Yadav" },
    ],
    Tuesday: [
      { sub: "Physics", teacher: "Mrs. Gupta" },
      { sub: "Mathematics", teacher: "Mr. Sharma" },
      { sub: "English", teacher: "Mrs. Joshi" },
      { sub: "Chemistry", teacher: "Mr. Verma" },
      { sub: "Library", teacher: "Mrs. Sinha" },
      { sub: "Computer Sc.", teacher: "Mr. Rajan" },
    ],
    Wednesday: [
      { sub: "Chemistry", teacher: "Mr. Verma" },
      { sub: "Computer Sc.", teacher: "Mr. Rajan" },
      { sub: "Mathematics", teacher: "Mr. Sharma" },
      { sub: "P.E.", teacher: "Mr. Yadav" },
      { sub: "Physics", teacher: "Mrs. Gupta" },
      { sub: "English", teacher: "Mrs. Joshi" },
    ],
    Thursday: [
      { sub: "English", teacher: "Mrs. Joshi" },
      { sub: "Chemistry", teacher: "Mr. Verma" },
      { sub: "Computer Sc.", teacher: "Mr. Rajan" },
      { sub: "Mathematics", teacher: "Mr. Sharma" },
      { sub: "Physics", teacher: "Mrs. Gupta" },
      { sub: "Drawing", teacher: "Mrs. Mehta" },
    ],
    Friday: [
      { sub: "Computer Sc.", teacher: "Mr. Rajan" },
      { sub: "English", teacher: "Mrs. Joshi" },
      { sub: "P.E.", teacher: "Mr. Yadav" },
      { sub: "Physics", teacher: "Mrs. Gupta" },
      { sub: "Mathematics", teacher: "Mr. Sharma" },
      { sub: "Chemistry", teacher: "Mr. Verma" },
    ],
    Saturday: [
      { sub: "Mathematics", teacher: "Mr. Sharma" },
      { sub: "Physics Lab", teacher: "Mrs. Gupta" },
      { sub: "Chemistry Lab", teacher: "Mr. Verma" },
      { sub: "Computer Lab", teacher: "Mr. Rajan" },
      { sub: "—", teacher: "—" },
      { sub: "—", teacher: "—" },
    ],
  };
  const periods = ["8:00–8:45", "8:45–9:30", "9:30–10:15", "10:30–11:15", "11:15–12:00", "12:45–1:30"];
  const subColors: Record<string, string> = {
    "Mathematics": "bg-blue-50 border-blue-200 text-blue-700",
    "Physics": "bg-purple-50 border-purple-200 text-purple-700",
    "Chemistry": "bg-green-50 border-green-200 text-green-700",
    "English": "bg-orange-50 border-orange-200 text-orange-700",
    "Computer Sc.": "bg-cyan-50 border-cyan-200 text-cyan-700",
    "P.E.": "bg-red-50 border-red-200 text-red-700",
    "Physics Lab": "bg-purple-50 border-purple-200 text-purple-700",
    "Chemistry Lab": "bg-green-50 border-green-200 text-green-700",
    "Computer Lab": "bg-cyan-50 border-cyan-200 text-cyan-700",
    "Library": "bg-yellow-50 border-yellow-200 text-yellow-700",
    "Drawing": "bg-pink-50 border-pink-200 text-pink-700",
    "—": "bg-muted border-border text-muted-foreground",
  };
  const today = days[new Date().getDay() - 1] || "Monday";
  const [activeDay, setActiveDay] = useState(today);
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Weekly Timetable – Class XII-A</h2>
      <div className="flex gap-2 flex-wrap">
        {days.map(d => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeDay === d ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}
          >
            {d}
          </button>
        ))}
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
                ) : (
                  <div className="flex-1 px-3 py-2 text-sm text-muted-foreground">— Free Period —</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-sm font-bold text-foreground mb-2">Subject Color Key</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(subColors).filter(([k]) => k !== "—").slice(0, 8).map(([sub, cls]) => (
            <span key={sub} className={`px-3 py-1 border rounded-full text-xs font-medium ${cls}`}>{sub}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeesPage() {
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const fees = [
    { term: "Term 1 (Apr–Jul)", amount: "₹7,500", status: "Paid", date: "05 Apr 2023", receipt: "RC-001" },
    { term: "Term 2 (Aug–Nov)", amount: "₹7,500", status: "Paid", date: "02 Aug 2023", receipt: "RC-002" },
    { term: "Term 3 (Dec–Mar)", amount: "₹8,000", status: paid ? "Paid" : "Due", date: paid ? "25 Mar 2024" : "01 Dec 2023", receipt: paid ? "RC-003" : null },
    { term: "Development Fee", amount: "₹4,000", status: "Paid", date: "05 Apr 2023", receipt: "RC-004" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Fee Details</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="text-2xl font-bold text-green-700">₹{paid ? "27,000" : "19,000"}</div>
          <div className="text-sm text-green-600">Total Paid</div>
        </div>
        <div className={`border rounded-xl p-5 ${paid ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <div className={`text-2xl font-bold ${paid ? "text-green-700" : "text-red-700"}`}>{paid ? "₹0" : "₹8,000"}</div>
          <div className={`text-sm ${paid ? "text-green-600" : "text-red-600"}`}>{paid ? "No Pending Amount" : "Pending Amount"}</div>
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
                <td className="px-4 py-3 text-foreground font-semibold">{f.amount}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${f.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{f.status}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{f.date}</td>
                <td className="px-4 py-3">
                  {f.status === "Due" ? (
                    <button
                      onClick={() => { setPaying(true); setTimeout(() => { setPaid(true); setPaying(false); }, 1500); }}
                      disabled={paying}
                      className="gradient-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold disabled:opacity-60"
                    >
                      {paying ? "Processing..." : "Pay Now"}
                    </button>
                  ) : (
                    <button className="flex items-center gap-1 bg-secondary text-secondary-foreground hover:bg-accent px-3 py-1 rounded text-xs font-semibold transition-colors">
                      <Download className="w-3 h-3" /> Receipt
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {paid && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <div>
            <div className="text-sm font-semibold text-green-700">Payment Successful!</div>
            <div className="text-xs text-green-600">₹8,000 paid for Term 3. Receipt: RC-003</div>
          </div>
        </div>
      )}
    </div>
  );
}

function NoticesPage() {
  const notices = [
    { id: 1, title: "Board Exam Admit Card Available", date: "18 Mar 2024", category: "Exam", content: "All Class XII students can collect their Board Exam Admit Cards from the school office between 9 AM – 2 PM. Carry your school ID card.", important: true },
    { id: 2, title: "Science Project Submission Deadline", date: "22 Mar 2024", category: "Academic", content: "Science projects must be submitted to respective subject teachers by 22nd March. Late submissions will not be accepted.", important: true },
    { id: 3, title: "Holiday – Holi Celebration", date: "25 Mar 2024", category: "Holiday", content: "School will remain closed on 25th March 2024 on account of Holi. Classes will resume on 26th March.", important: false },
    { id: 4, title: "Annual Sports Day – Registration Open", date: "15 Mar 2024", category: "Event", content: "Students interested in participating in Annual Sports Day can register with the Sports teacher by 20th March.", important: false },
    { id: 5, title: "Fee Payment Reminder", date: "10 Mar 2024", category: "Finance", content: "Term 3 fee payment is due. Students with pending fees must clear dues before 31st March to avoid late fee charges.", important: true },
    { id: 6, title: "Parent-Teacher Meeting", date: "5 Mar 2024", category: "Meeting", content: "PTM scheduled for 30th March (Saturday) from 10 AM – 1 PM. All parents are requested to attend.", important: false },
  ];
  const [selected, setSelected] = useState<typeof notices[0] | null>(null);
  const catColors: Record<string, string> = {
    Exam: "bg-red-100 text-red-700",
    Academic: "bg-blue-100 text-blue-700",
    Holiday: "bg-green-100 text-green-700",
    Event: "bg-purple-100 text-purple-700",
    Finance: "bg-orange-100 text-orange-700",
    Meeting: "bg-cyan-100 text-cyan-700",
  };
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Notice Board</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {notices.map(n => (
          <div
            key={n.id}
            onClick={() => setSelected(n)}
            className={`bg-card border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow ${n.important ? "border-primary/40" : "border-border"}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="font-semibold text-foreground text-sm">{n.title}</div>
              {n.important && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold shrink-0">Important</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColors[n.category] || "bg-secondary text-foreground"}`}>{n.category}</span>
              <span className="text-xs text-muted-foreground">{n.date}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{n.content}</p>
          </div>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-foreground">{selected.title}</h3>
              {selected.important && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">Important</span>}
            </div>
            <div className="flex gap-2 mb-4">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColors[selected.category]}`}>{selected.category}</span>
              <span className="text-xs text-muted-foreground">{selected.date}</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{selected.content}</p>
            <button onClick={() => setSelected(null)} className="mt-4 w-full gradient-primary text-primary-foreground py-2 rounded-lg font-semibold text-sm">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function HomeworkPage() {
  const [tasks, setTasks] = useState([
    { id: 1, sub: "Mathematics", title: "Chapter 5 – Integration Practice", due: "22 Mar", done: false, priority: "high" },
    { id: 2, sub: "Physics", title: "Numericals: Electromagnetic Induction", due: "23 Mar", done: false, priority: "medium" },
    { id: 3, sub: "Chemistry", title: "Write notes on Organic Reactions", due: "24 Mar", done: true, priority: "low" },
    { id: 4, sub: "English", title: "Essay: Importance of Technology", due: "25 Mar", done: false, priority: "medium" },
    { id: 5, sub: "Computer Sc.", title: "Python Program – Binary Search", due: "26 Mar", done: true, priority: "high" },
    { id: 6, sub: "Chemistry", title: "Lab Report – Titration Experiment", due: "28 Mar", done: false, priority: "high" },
  ]);
  const toggle = (id: number) => setTasks(t => t.map(h => h.id === id ? { ...h, done: !h.done } : h));
  const priColor: Record<string, string> = { high: "bg-red-100 text-red-700", medium: "bg-yellow-100 text-yellow-700", low: "bg-green-100 text-green-700" };
  const pending = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Homework</h2>
        <div className="flex gap-3 text-sm">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">{pending} Pending</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">{done} Done</span>
        </div>
      </div>
      <div className="space-y-3">
        {tasks.map(hw => (
          <div key={hw.id} className={`bg-card border border-border rounded-xl p-4 flex items-start gap-4 transition-opacity ${hw.done ? "opacity-60" : ""}`}>
            <button onClick={() => toggle(hw.id)} className="mt-0.5 shrink-0">
              {hw.done
                ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                : <div className="w-5 h-5 border-2 border-border rounded-full hover:border-primary transition-colors" />
              }
            </button>
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-sm ${hw.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{hw.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-primary font-medium">{hw.sub}</span>
                <span className="text-xs text-muted-foreground">Due: {hw.due}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${priColor[hw.priority]}`}>{hw.priority}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LibraryPage() {
  const [search, setSearch] = useState("");
  const books = [
    { id: 1, title: "Mathematics NCERT Part 1", author: "NCERT", category: "Textbook", issued: true, due: "30 Mar" },
    { id: 2, title: "Mathematics NCERT Part 2", author: "NCERT", category: "Textbook", issued: true, due: "30 Mar" },
    { id: 3, title: "Problems in Physics", author: "I.E. Irodov", category: "Reference", issued: false, due: null },
    { id: 4, title: "Organic Chemistry", author: "Morrison & Boyd", category: "Reference", issued: false, due: null },
    { id: 5, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", category: "General", issued: false, due: null },
    { id: 6, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", issued: false, due: null },
    { id: 7, title: "Computer Networks", author: "Tanenbaum", category: "Reference", issued: false, due: null },
    { id: 8, title: "Objective Physics", author: "D.C. Pandey", category: "Reference", issued: false, due: null },
  ];
  const filtered = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Library</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">2</div>
          <div className="text-sm text-muted-foreground">Books Issued</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-foreground">30 Mar</div>
          <div className="text-sm text-muted-foreground">Due Date</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">₹0</div>
          <div className="text-sm text-muted-foreground">Fine Pending</div>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-input bg-background rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="gradient-primary text-primary-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={b.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                <td className="px-4 py-3 font-medium text-foreground">{b.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.author}</td>
                <td className="px-4 py-3 text-muted-foreground">{b.category}</td>
                <td className="px-4 py-3">
                  {b.issued ? (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold">Issued (Due: {b.due})</span>
                  ) : (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Available</span>
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

export default function StudentERP() {
  return (
    <ERPLayout navItems={navItems} role="Student" roleColor="bg-blue-500/20 text-blue-300">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="fees" element={<FeesPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="homework" element={<HomeworkPage />} />
        <Route path="library" element={<LibraryPage />} />
        <Route path="*" element={<Navigate to="/erp/student" />} />
      </Routes>
    </ERPLayout>
  );
}
