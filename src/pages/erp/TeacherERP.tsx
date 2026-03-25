import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, BookOpen, Calendar, Bell, ClipboardList, Users, FileText, Clock, CheckCircle2, Download, Plus, X
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/erp/teacher" },
  { label: "My Classes", icon: BookOpen, href: "/erp/teacher/classes" },
  { label: "Attendance", icon: Clock, href: "/erp/teacher/attendance" },
  { label: "Marks Entry", icon: FileText, href: "/erp/teacher/marks" },
  { label: "Students", icon: Users, href: "/erp/teacher/students" },
  { label: "Timetable", icon: Calendar, href: "/erp/teacher/timetable" },
  { label: "Homework", icon: ClipboardList, href: "/erp/teacher/homework" },
  { label: "Notices", icon: Bell, href: "/erp/teacher/notices" },
];

function Dashboard() {
  const classes = [
    { name: "XII-A", subject: "Mathematics", students: 42, today: "8:00 AM – P1" },
    { name: "XI-B", subject: "Mathematics", students: 38, today: "9:30 AM – P3" },
    { name: "X-C", subject: "Mathematics", students: 45, today: "2:00 PM – P7" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome, Mr. Sharma! 👋</h2>
        <p className="text-muted-foreground text-sm">Mathematics Teacher | Employee ID: T-2023-045</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "125", sub: "Across 3 classes" },
          { label: "Classes Today", value: "3", sub: "Next: 8:00 AM" },
          { label: "Pending Marks", value: "2", sub: "To be entered" },
          { label: "Leave Requests", value: "1", sub: "Pending approval" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5">
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-sm font-medium text-foreground">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-bold text-foreground mb-3">My Classes</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {classes.map(cls => (
            <div key={cls.name} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {cls.name}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{cls.subject}</div>
                  <div className="text-xs text-muted-foreground">{cls.students} students</div>
                </div>
              </div>
              <div className="text-xs text-primary font-medium bg-accent px-2 py-1 rounded">Today: {cls.today}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Quick Attendance – XII-A (Today)</h3>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
          {Array.from({ length: 42 }, (_, i) => i + 1).map(roll => (
            <div key={roll} className={`text-center text-xs py-2 rounded-lg font-medium cursor-pointer transition-colors ${[3, 12, 28].includes(roll) ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{roll}</div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-100 rounded" /> Present (39)</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 rounded" /> Absent (3)</span>
        </div>
      </div>
    </div>
  );
}

function MyClassesPage() {
  const classes = [
    { name: "XII-A", subject: "Mathematics", students: 42, room: "Room 201", schedule: "Mon Wed Fri – P1", avgMarks: 78, attendance: "91%" },
    { name: "XI-B", subject: "Mathematics", students: 38, room: "Room 105", schedule: "Tue Thu – P3, P5", avgMarks: 72, attendance: "87%" },
    { name: "X-C", subject: "Mathematics", students: 45, room: "Room 302", schedule: "Mon Tue Wed Thu Fri – P7", avgMarks: 68, attendance: "83%" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">My Classes</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {classes.map(cls => (
          <div key={cls.name} className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">{cls.name}</div>
              <div>
                <div className="font-bold text-foreground">{cls.subject}</div>
                <div className="text-xs text-muted-foreground">{cls.students} Students • {cls.room}</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Schedule</span><span className="text-foreground font-medium text-xs text-right">{cls.schedule}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg. Marks</span><span className="text-foreground font-semibold">{cls.avgMarks}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Attendance</span><span className="text-green-600 font-semibold">{cls.attendance}</span></div>
            </div>
            <div className="h-2 bg-secondary rounded-full">
              <div className="h-full gradient-primary rounded-full" style={{ width: cls.attendance }} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Class XII-A – Student List</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Roll</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Attendance</th>
                <th className="px-4 py-3 text-left">Last Test</th>
                <th className="px-4 py-3 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {[
                { roll: 1, name: "Aarav Sharma", att: "92%", test: "18/20", grade: "A" },
                { roll: 2, name: "Priya Gupta", att: "96%", test: "20/20", grade: "A+" },
                { roll: 3, name: "Rohit Yadav", att: "78%", test: "14/20", grade: "B" },
                { roll: 4, name: "Sneha Patel", att: "94%", test: "19/20", grade: "A" },
                { roll: 5, name: "Arjun Mehta", att: "88%", test: "17/20", grade: "A" },
              ].map((s, i) => (
                <tr key={s.roll} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${parseInt(s.att) >= 90 ? "text-green-600" : parseInt(s.att) >= 75 ? "text-yellow-600" : "text-red-600"}`}>{s.att}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.test}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded text-xs font-bold ${s.grade.startsWith("A") ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{s.grade}</span></td>
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
  const [classFilter, setClassFilter] = useState("XII-A");
  const [attendance, setAttendance] = useState<Record<number, boolean>>(() => {
    const obj: Record<number, boolean> = {};
    for (let i = 1; i <= 42; i++) obj[i] = ![3, 12, 28].includes(i);
    return obj;
  });
  const toggle = (roll: number) => setAttendance(a => ({ ...a, [roll]: !a[roll] }));
  const present = Object.values(attendance).filter(Boolean).length;
  const total = 42;
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">Attendance Management</h2>
        <div className="flex gap-2">
          {["XII-A", "XI-B", "X-C"].map(c => (
            <button key={c} onClick={() => setClassFilter(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${classFilter === c ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{c}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{present}</div>
          <div className="text-sm text-green-600">Present</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{total - present}</div>
          <div className="text-sm text-red-600">Absent</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{Math.round((present / total) * 100)}%</div>
          <div className="text-sm text-blue-600">Percentage</div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-foreground">Class {classFilter} – {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</h3>
          <div className="flex gap-2 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-200 rounded" />Present</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-200 rounded" />Absent</span>
            <span className="text-muted-foreground">(Click to toggle)</span>
          </div>
        </div>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2 mb-4">
          {Array.from({ length: total }, (_, i) => i + 1).map(roll => (
            <button
              key={roll}
              onClick={() => toggle(roll)}
              className={`text-center text-xs py-2 rounded-lg font-medium cursor-pointer transition-all hover:scale-105 ${attendance[roll] ? "bg-green-100 text-green-700 border border-green-300" : "bg-red-100 text-red-700 border border-red-300"}`}
            >
              {roll}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {saved ? "Saved!" : "Save Attendance"}
          </button>
          <button className="flex items-center gap-2 bg-secondary text-foreground px-4 py-2 rounded-lg text-sm hover:bg-accent transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>
    </div>
  );
}

function MarksEntry() {
  const [students, setStudents] = useState([
    { roll: 1, name: "Aarav Sharma", ut1: 18, midterm: 76, ut2: "", preboard: "" },
    { roll: 2, name: "Priya Gupta", ut1: 20, midterm: 91, ut2: "", preboard: "" },
    { roll: 3, name: "Rohit Yadav", ut1: 15, midterm: 62, ut2: "", preboard: "" },
    { roll: 4, name: "Sneha Patel", ut1: 19, midterm: 85, ut2: "", preboard: "" },
    { roll: 5, name: "Arjun Mehta", ut1: 17, midterm: 72, ut2: "", preboard: "" },
  ]);
  const [saved, setSaved] = useState(false);
  const update = (roll: number, field: string, val: string) => {
    setStudents(s => s.map(st => st.roll === roll ? { ...st, [field]: val } : st));
  };
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Marks Entry – XII-A Mathematics</h2>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Roll</th>
                <th className="px-4 py-3 text-left">Student Name</th>
                <th className="px-4 py-3 text-left">UT-1 (/20)</th>
                <th className="px-4 py-3 text-left">Mid-Term (/100)</th>
                <th className="px-4 py-3 text-left">UT-2 (/20)</th>
                <th className="px-4 py-3 text-left">Pre-Board (/100)</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.roll} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-foreground">{s.roll}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.ut1}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.midterm}</td>
                  <td className="px-4 py-3">
                    <input type="number" min="0" max="20" placeholder="--" value={s.ut2} onChange={e => update(s.roll, "ut2", e.target.value)} className="w-16 border border-input bg-background rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-ring" />
                  </td>
                  <td className="px-4 py-3">
                    <input type="number" min="0" max="100" placeholder="--" value={s.preboard} onChange={e => update(s.roll, "preboard", e.target.value)} className="w-20 border border-input bg-background rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-ring" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={handleSave} className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {saved ? "Marks Saved!" : "Save Marks"}
        </button>
        <button className="flex items-center gap-2 bg-secondary text-foreground px-4 py-2 rounded-lg text-sm hover:bg-accent transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>
    </div>
  );
}

function StudentsPage() {
  const [search, setSearch] = useState("");
  const students = [
    { roll: 1, name: "Aarav Sharma", class: "XII-A", parent: "Rajesh Sharma", phone: "9876543210", att: "92%", fees: "Paid" },
    { roll: 2, name: "Priya Gupta", class: "XII-A", parent: "Suresh Gupta", phone: "9876543211", att: "96%", fees: "Paid" },
    { roll: 3, name: "Rohit Yadav", class: "XI-B", parent: "Mohan Yadav", phone: "9876543212", att: "78%", fees: "Due" },
    { roll: 4, name: "Sneha Patel", class: "X-C", parent: "Ramesh Patel", phone: "9876543213", att: "94%", fees: "Paid" },
    { roll: 5, name: "Arjun Mehta", class: "XII-A", parent: "Vijay Mehta", phone: "9876543214", att: "88%", fees: "Paid" },
  ];
  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">My Students</h2>
      <input type="text" placeholder="Search by name or class..." value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-input bg-background rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-w-sm" />
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>
                {["Roll", "Name", "Class", "Parent", "Phone", "Attendance", "Fee"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.roll} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.class}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.parent}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${parseInt(s.att) >= 90 ? "text-green-600" : parseInt(s.att) >= 75 ? "text-yellow-600" : "text-red-600"}`}>{s.att}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.fees === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.fees}</span>
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

function TimetablePage() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [activeDay, setActiveDay] = useState("Monday");
  const schedule: Record<string, { time: string; class: string; room: string }[]> = {
    Monday: [
      { time: "8:00–8:45", class: "XII-A", room: "Room 201" },
      { time: "9:30–10:15", class: "XI-B", room: "Room 105" },
      { time: "11:15–12:00", class: "X-C", room: "Room 302" },
    ],
    Tuesday: [
      { time: "8:45–9:30", class: "XII-A", room: "Room 201" },
      { time: "10:30–11:15", class: "XI-B", room: "Room 105" },
    ],
    Wednesday: [
      { time: "8:00–8:45", class: "X-C", room: "Room 302" },
      { time: "11:15–12:00", class: "XII-A", room: "Room 201" },
    ],
    Thursday: [
      { time: "9:30–10:15", class: "X-C", room: "Room 302" },
      { time: "12:45–1:30", class: "XI-B", room: "Room 105" },
    ],
    Friday: [
      { time: "8:00–8:45", class: "XII-A", room: "Room 201" },
      { time: "10:30–11:15", class: "X-C", room: "Room 302" },
      { time: "12:45–1:30", class: "XI-B", room: "Room 105" },
    ],
    Saturday: [
      { time: "8:00–8:45", class: "XI-B", room: "Room 105" },
    ],
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">My Timetable</h2>
      <div className="flex gap-2 flex-wrap">
        {days.map(d => (
          <button key={d} onClick={() => setActiveDay(d)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeDay === d ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{d}</button>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="gradient-primary text-primary-foreground px-5 py-3 font-bold">{activeDay}</div>
        {(schedule[activeDay] || []).length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No classes scheduled</div>
        ) : (
          <div className="divide-y divide-border">
            {(schedule[activeDay] || []).map((s, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="text-sm font-mono text-muted-foreground w-28 shrink-0">{s.time}</div>
                <div className="flex-1 flex items-center justify-between bg-accent px-4 py-2 rounded-lg">
                  <div>
                    <div className="font-semibold text-foreground">Mathematics – Class {s.class}</div>
                    <div className="text-xs text-muted-foreground">{s.room}</div>
                  </div>
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HomeworkPage() {
  const [homeworks, setHomeworks] = useState([
    { id: 1, class: "XII-A", subject: "Mathematics", title: "Chapter 5 – Integration Practice", due: "22 Mar", submitted: 38, total: 42 },
    { id: 2, class: "XI-B", subject: "Mathematics", title: "Trigonometry Problems Set 3", due: "23 Mar", submitted: 30, total: 38 },
    { id: 3, class: "X-C", subject: "Mathematics", title: "Polynomials – Exercise 2.4", due: "24 Mar", submitted: 40, total: 45 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ class: "XII-A", title: "", due: "" });
  const add = () => {
    if (!form.title || !form.due) return;
    setHomeworks(h => [...h, { id: Date.now(), class: form.class, subject: "Mathematics", title: form.title, due: form.due, submitted: 0, total: 42 }]);
    setForm({ class: "XII-A", title: "", due: "" });
    setShowForm(false);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Homework Management</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
          <Plus className="w-4 h-4" /> Assign Homework
        </button>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">New Homework</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <select value={form.class} onChange={e => setForm(f => ({ ...f, class: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {["XII-A", "XI-B", "X-C"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="text" placeholder="Homework title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="date" value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={add} className="mt-3 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Assign</button>
        </div>
      )}
      <div className="space-y-3">
        {homeworks.map(hw => (
          <div key={hw.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-semibold text-foreground">{hw.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Class {hw.class} • {hw.subject} • Due: {hw.due}</div>
              </div>
              <span className="text-xs bg-accent px-2 py-1 rounded font-medium text-foreground">{hw.submitted}/{hw.total} submitted</span>
            </div>
            <div className="h-2 bg-secondary rounded-full">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${(hw.submitted / hw.total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoticesPage() {
  const [notices, setNotices] = useState([
    { id: 1, title: "Board Exam Dates announced", date: "18 Mar", target: "Class XII", content: "Board exams will commence from 1st April. All students should be prepared." },
    { id: 2, title: "PTM on 30th March", date: "15 Mar", target: "All Classes", content: "Parent-Teacher Meeting scheduled for 30th March 10 AM – 1 PM." },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", target: "All Classes", content: "" });
  const add = () => {
    if (!form.title || !form.content) return;
    const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    setNotices(n => [{ id: Date.now(), title: form.title, date: today, target: form.target, content: form.content }, ...n]);
    setForm({ title: "", target: "All Classes", content: "" });
    setShowForm(false);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Notices</h2>
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
            <input type="text" placeholder="Notice title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {["All Classes", "Class XII-A", "Class XI-B", "Class X-C"].map(c => <option key={c}>{c}</option>)}
            </select>
            <textarea rows={3} placeholder="Notice content..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
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
                <div className="text-xs text-muted-foreground mt-0.5">{n.target} • {n.date}</div>
                <p className="text-sm text-muted-foreground mt-2">{n.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeacherERP() {
  return (
    <ERPLayout navItems={navItems} role="Teacher" roleColor="bg-green-500/20 text-green-300">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="marks" element={<MarksEntry />} />
        <Route path="classes" element={<MyClassesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="timetable" element={<TimetablePage />} />
        <Route path="homework" element={<HomeworkPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="*" element={<Navigate to="/erp/teacher" />} />
      </Routes>
    </ERPLayout>
  );
}
