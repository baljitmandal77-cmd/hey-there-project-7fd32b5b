import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, BookOpen, Calendar, Bell, ClipboardList, Users, FileText,
  Clock, CheckCircle2, Download, Plus, X, ArrowLeft, User, History,
  Mail, Phone, MapPin, Edit3, Save
} from "lucide-react";
import { getSeedStudents, getSeedTeachers, getSeedNotices, addAudit, getAuditLog } from "@/lib/erpStore";

const ME_TEACHER = getSeedTeachers()[0];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/erp/teacher" },
  { label: "My Profile", icon: User, href: "/erp/teacher/profile" },
  { label: "My Classes", icon: BookOpen, href: "/erp/teacher/classes" },
  { label: "Attendance", icon: Clock, href: "/erp/teacher/attendance" },
  { label: "Marks Entry", icon: FileText, href: "/erp/teacher/marks" },
  { label: "Students", icon: Users, href: "/erp/teacher/students" },
  { label: "Timetable", icon: Calendar, href: "/erp/teacher/timetable" },
  { label: "Homework", icon: ClipboardList, href: "/erp/teacher/homework" },
  { label: "Notices", icon: Bell, href: "/erp/teacher/notices" },
  { label: "Activity Log", icon: History, href: "/erp/teacher/audit" },
];

function Dashboard() {
  const navigate = useNavigate();
  const classes = [
    { name: "XII-A", subject: "Mathematics", students: 42, today: "8:00 AM – P1" },
    { name: "XI-B", subject: "Mathematics", students: 38, today: "9:30 AM – P3" },
    { name: "X-C", subject: "Mathematics", students: 45, today: "2:00 PM – P7" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome, {ME_TEACHER.name}! 👋</h2>
          <p className="text-muted-foreground text-sm">Mathematics Teacher | Employee ID: {ME_TEACHER.id}</p>
        </div>
        <button onClick={() => navigate("/erp/teacher/profile")} className="flex items-center gap-2 bg-secondary text-foreground px-3 py-1.5 rounded-lg text-xs hover:bg-accent">
          <User className="w-3.5 h-3.5" /> My Profile
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "125", sub: "Across 3 classes", onClick: () => navigate("/erp/teacher/students") },
          { label: "Classes Today", value: "3", sub: "Next: 8:00 AM", onClick: () => navigate("/erp/teacher/timetable") },
          { label: "Pending Marks", value: "2", sub: "To be entered", onClick: () => navigate("/erp/teacher/marks") },
          { label: "Homework Set", value: "5", sub: "This week", onClick: () => navigate("/erp/teacher/homework") },
        ].map(s => (
          <button key={s.label} onClick={s.onClick} className="bg-card border border-border rounded-xl p-5 text-left hover:shadow-md hover:border-primary transition-all group">
            <div className="text-2xl font-bold text-foreground group-hover:text-primary">{s.value}</div>
            <div className="text-sm font-medium text-foreground">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </button>
        ))}
      </div>
      <div>
        <h3 className="font-bold text-foreground mb-3">My Classes</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {classes.map(cls => (
            <button key={cls.name} onClick={() => navigate("/erp/teacher/attendance")} className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary transition-all text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">{cls.name}</div>
                <div>
                  <div className="font-semibold text-foreground">{cls.subject}</div>
                  <div className="text-xs text-muted-foreground">{cls.students} students</div>
                </div>
              </div>
              <div className="text-xs text-primary font-medium bg-accent px-2 py-1 rounded">Today: {cls.today}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-foreground">Quick Attendance – XII-A (Today)</h3>
          <button onClick={() => navigate("/erp/teacher/attendance")} className="text-xs text-primary hover:underline">Manage Attendance →</button>
        </div>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2">
          {Array.from({ length: 42 }, (_, i) => i + 1).map(roll => (
            <div key={roll} className={`text-center text-xs py-2 rounded-lg font-medium ${[3, 12, 28].includes(roll) ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{roll}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeacherProfile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState({ phone: ME_TEACHER.phone, address: ME_TEACHER.address });
  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    addAudit("UPDATE", "Teacher Profile", `Teacher ${ME_TEACHER.id} updated contact info`);
    setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">My Profile</h2>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center shrink-0">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{ME_TEACHER.name}</h3>
                <p className="text-muted-foreground text-sm">Employee ID: {ME_TEACHER.id} | {ME_TEACHER.subject} Teacher</p>
              </div>
              <button onClick={() => setEditing(!editing)} className="flex items-center gap-2 bg-secondary text-foreground px-3 py-1.5 rounded-lg text-xs hover:bg-accent">
                {editing ? <><X className="w-3.5 h-3.5" /> Cancel</> : <><Edit3 className="w-3.5 h-3.5" /> Edit</>}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div><div className="text-xs text-muted-foreground">Status</div><div className={`text-sm font-semibold ${ME_TEACHER.status === "Active" ? "text-green-600" : "text-yellow-600"}`}>{ME_TEACHER.status}</div></div>
              <div><div className="text-xs text-muted-foreground">Date of Birth</div><div className="text-sm font-medium text-foreground">{new Date(ME_TEACHER.dob).toLocaleDateString("en-IN")}</div></div>
              <div><div className="text-xs text-muted-foreground">Classes</div><div className="text-sm font-medium text-foreground">{ME_TEACHER.classes}</div></div>
              <div><div className="text-xs text-muted-foreground">Experience</div><div className="text-sm font-medium text-foreground">{ME_TEACHER.exp}</div></div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Mail className="w-3 h-3" /> Email</div>
            <a href={`mailto:${ME_TEACHER.email}`} className="text-sm text-primary hover:underline">{ME_TEACHER.email}</a>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</div>
            {editing ? (
              <input value={info.phone} onChange={e => setInfo(i => ({ ...i, phone: e.target.value }))} className="text-sm border border-input bg-background rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring" />
            ) : <a href={`tel:${info.phone}`} className="text-sm text-foreground hover:text-primary">{info.phone}</a>}
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Qualifications</div>
            <div className="text-sm text-foreground">{ME_TEACHER.qualifications}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Join Date</div>
            <div className="text-sm text-foreground">{ME_TEACHER.joinDate}</div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Address</div>
            {editing ? (
              <input value={info.address} onChange={e => setInfo(i => ({ ...i, address: e.target.value }))} className="w-full text-sm border border-input bg-background rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-ring" />
            ) : <div className="text-sm text-foreground">{info.address}</div>}
          </div>
        </div>
        {editing && (
          <button onClick={handleSave} className="mt-4 flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        )}
        {saved && <div className="mt-2 text-sm text-green-600 font-medium">✓ Profile updated successfully</div>}
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
          <button onClick={() => setTab("full")} className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${tab === "full" ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground"}`}><History className="w-3 h-3" /> Full Details</button>
        </div>
        {tab === "basic" && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><div className="text-xs text-muted-foreground">Gender</div><div className="font-medium text-foreground">{student.gender}</div></div>
            <div><div className="text-xs text-muted-foreground">DOB</div><div className="font-medium text-foreground">{new Date(student.dob).toLocaleDateString("en-IN")}</div></div>
            <div><div className="text-xs text-muted-foreground">Attendance</div><div className={`font-semibold ${parseInt(student.att) >= 90 ? "text-green-600" : "text-yellow-600"}`}>{student.att}</div></div>
            <div><div className="text-xs text-muted-foreground">Fee Status</div><div className={`font-semibold ${student.fees === "Paid" ? "text-green-600" : "text-red-600"}`}>{student.fees}</div></div>
            <div><div className="text-xs text-muted-foreground">Email</div><a href={`mailto:${student.email}`} className="text-primary hover:underline">{student.email}</a></div>
            <div><div className="text-xs text-muted-foreground">Phone</div><a href={`tel:${student.phone}`} className="text-foreground hover:text-primary">{student.phone}</a></div>
            <div><div className="text-xs text-muted-foreground">Parent Phone</div><a href={`tel:${student.parentPhone}`} className="text-foreground hover:text-primary">{student.parentPhone}</a></div>
            <div className="col-span-2"><div className="text-xs text-muted-foreground">Address</div><div className="font-medium text-foreground">{student.address}</div></div>
          </div>
        )}
        {tab === "full" && (
          <div className="space-y-4 text-sm">
            <div className="bg-secondary rounded-lg p-3">
              <div className="font-semibold text-foreground mb-2">Exam History</div>
              {[{ exam: "UT-1", marks: "18/20" }, { exam: "Mid Term", marks: "76/100" }, { exam: "UT-2", marks: "17/20" }, { exam: "Pre-Board", marks: "82/100" }].map(e => (
                <div key={e.exam} className="flex justify-between py-1 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{e.exam}</span><span className="font-semibold text-foreground">{e.marks}</span>
                </div>
              ))}
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <div className="font-semibold text-foreground mb-2">Attendance History</div>
              {[{ m: "January", p: "92%" }, { m: "February", p: "88%" }, { m: "March", p: "95%" }].map(a => (
                <div key={a.m} className="flex justify-between py-1 border-b border-border last:border-0">
                  <span className="text-muted-foreground">{a.m}</span><span className="font-semibold text-green-600">{a.p}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MyClassesPage() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<ReturnType<typeof getSeedStudents>[0] | null>(null);
  const students = getSeedStudents();
  const classes = [
    { name: "XII-A", subject: "Mathematics", students: 42, room: "Room 201", schedule: "Mon Wed Fri – P1", avgMarks: 78, attendance: "91%" },
    { name: "XI-B", subject: "Mathematics", students: 38, room: "Room 105", schedule: "Tue Thu – P3, P5", avgMarks: 72, attendance: "87%" },
    { name: "X-C", subject: "Mathematics", students: 45, room: "Room 302", schedule: "Mon Tue Wed Thu Fri – P7", avgMarks: 68, attendance: "83%" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      {selectedStudent && <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">My Classes</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {classes.map(cls => (
          <div key={cls.name} className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold">{cls.name}</div>
              <div><div className="font-bold text-foreground">{cls.subject}</div><div className="text-xs text-muted-foreground">{cls.students} Students • {cls.room}</div></div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Schedule</span><span className="text-foreground font-medium text-xs">{cls.schedule}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Avg. Marks</span><span className="font-semibold text-foreground">{cls.avgMarks}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Attendance</span><span className="text-green-600 font-semibold">{cls.attendance}</span></div>
            </div>
            <div className="h-2 bg-secondary rounded-full"><div className="h-full gradient-primary rounded-full" style={{ width: cls.attendance }} /></div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Student List – Click for Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>{["Roll", "Name", "Class", "Attendance", "Last Test", "Grade", "Action"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.class}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold ${parseInt(s.att) >= 90 ? "text-green-600" : "text-yellow-600"}`}>{s.att}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">18/20</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">A</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelectedStudent(s)} className="text-xs gradient-primary text-primary-foreground px-2 py-1 rounded font-medium">View Details</button>
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
  const navigate = useNavigate();
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
  const handleSave = () => {
    addAudit("SAVE", "Attendance", `Attendance saved for class ${classFilter} by teacher ${ME_TEACHER.id}`);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };
  const handleExport = () => alert(`Attendance report for class ${classFilter} exported! (Demo)`);
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center flex-wrap gap-3">
          <h2 className="text-2xl font-bold text-foreground">Attendance Management</h2>
          <div className="flex gap-2">
            {["XII-A", "XI-B", "X-C"].map(c => <button key={c} onClick={() => setClassFilter(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${classFilter === c ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{c}</button>)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-green-700">{present}</div><div className="text-sm text-green-600">Present</div></div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-red-700">{total - present}</div><div className="text-sm text-red-600">Absent</div></div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-blue-700">{Math.round((present / total) * 100)}%</div><div className="text-sm text-blue-600">Percentage</div></div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-foreground">Class {classFilter} – {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long" })}</h3>
          <span className="text-xs text-muted-foreground">(Click roll number to toggle)</span>
        </div>
        <div className="grid grid-cols-6 md:grid-cols-10 gap-2 mb-4">
          {Array.from({ length: total }, (_, i) => i + 1).map(roll => (
            <button key={roll} onClick={() => toggle(roll)} className={`text-center text-xs py-2 rounded-lg font-medium transition-all hover:scale-105 ${attendance[roll] ? "bg-green-100 text-green-700 border border-green-300" : "bg-red-100 text-red-700 border border-red-300"}`}>{roll}</button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {saved ? "Saved! ✓" : "Save Attendance"}
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 bg-secondary text-foreground px-4 py-2 rounded-lg text-sm hover:bg-accent transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>
    </div>
  );
}

function MarksEntry() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([
    { roll: 1, name: "Aarav Sharma", ut1: 18, midterm: 76, ut2: "", preboard: "" },
    { roll: 2, name: "Priya Gupta", ut1: 20, midterm: 91, ut2: "", preboard: "" },
    { roll: 3, name: "Rohit Yadav", ut1: 15, midterm: 62, ut2: "", preboard: "" },
    { roll: 4, name: "Sneha Patel", ut1: 19, midterm: 85, ut2: "", preboard: "" },
    { roll: 5, name: "Arjun Mehta", ut1: 17, midterm: 72, ut2: "", preboard: "" },
  ]);
  const [saved, setSaved] = useState(false);
  const update = (roll: number, field: string, val: string) => setStudents(s => s.map(st => st.roll === roll ? { ...st, [field]: val } : st));
  const handleSave = () => {
    addAudit("SAVE", "Marks", `Marks updated for class XII-A by ${ME_TEACHER.id}`);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Marks Entry – XII-A Mathematics</h2>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>{["Roll", "Student Name", "UT-1 (/20)", "Mid-Term (/100)", "UT-2 (/20)", "Pre-Board (/100)"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.roll} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3">{s.roll}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.ut1}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.midterm}</td>
                  <td className="px-4 py-3"><input type="number" min="0" max="20" placeholder="--" value={s.ut2} onChange={e => update(s.roll, "ut2", e.target.value)} className="w-16 border border-input bg-background rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-ring" /></td>
                  <td className="px-4 py-3"><input type="number" min="0" max="100" placeholder="--" value={s.preboard} onChange={e => update(s.roll, "preboard", e.target.value)} className="w-20 border border-input bg-background rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-ring" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={handleSave} className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {saved ? "Marks Saved! ✓" : "Save Marks"}
        </button>
        <button onClick={() => alert("Exported! (Demo)")} className="flex items-center gap-2 bg-secondary text-foreground px-4 py-2 rounded-lg text-sm hover:bg-accent">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>
    </div>
  );
}

function StudentsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<ReturnType<typeof getSeedStudents>[0] | null>(null);
  const students = getSeedStudents();
  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.class.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-4 animate-fade-in">
      {selectedStudent && <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">My Students</h2>
      </div>
      <input type="text" placeholder="Search by name or class…" value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-input bg-background rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-w-sm" />
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>{["Roll", "Name", "Class", "Parent Phone", "Attendance", "Fee", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.class}</td>
                  <td className="px-4 py-3"><a href={`tel:${s.parentPhone}`} className="text-primary hover:underline text-xs">{s.parentPhone}</a></td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold ${parseInt(s.att) >= 90 ? "text-green-600" : "text-yellow-600"}`}>{s.att}</span></td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.fees === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.fees}</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelectedStudent(s)} className="text-xs gradient-primary text-primary-foreground px-2 py-1 rounded font-medium">View</button>
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
  const navigate = useNavigate();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const mySchedule: Record<string, { time: string; class: string; room: string }[]> = {
    Monday: [{ time: "8:00-8:45", class: "XII-A", room: "Room 201" }, { time: "10:30-11:15", class: "XI-B", room: "Room 105" }],
    Tuesday: [{ time: "9:30-10:15", class: "X-C", room: "Room 302" }, { time: "12:45-1:30", class: "XII-A", room: "Room 201" }],
    Wednesday: [{ time: "8:00-8:45", class: "XII-A", room: "Room 201" }, { time: "11:15-12:00", class: "X-C", room: "Room 302" }],
    Thursday: [{ time: "9:30-10:15", class: "XI-B", room: "Room 105" }],
    Friday: [{ time: "11:15-12:00", class: "XII-A", room: "Room 201" }, { time: "8:45-9:30", class: "X-C", room: "Room 302" }],
    Saturday: [{ time: "8:00-8:45", class: "XI-B", room: "Room 105" }],
  };
  const [activeDay, setActiveDay] = useState(days[Math.max(0, new Date().getDay() - 1)] || "Monday");
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">My Timetable</h2>
      </div>
      <div className="flex gap-2 flex-wrap">
        {days.map(d => <button key={d} onClick={() => setActiveDay(d)} className={`px-4 py-1.5 rounded-full text-sm font-medium ${activeDay === d ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{d}</button>)}
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="gradient-primary text-primary-foreground px-5 py-3 font-bold">{activeDay} – Mathematics</div>
        <div className="divide-y divide-border">
          {(mySchedule[activeDay] || []).length > 0 ? mySchedule[activeDay].map((slot, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="text-sm font-mono text-muted-foreground w-28">{slot.time}</div>
              <div className="flex-1 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg">
                <span className="font-semibold">Class {slot.class}</span>
                <span className="text-xs ml-3">{slot.room}</span>
              </div>
            </div>
          )) : (
            <div className="px-5 py-8 text-center text-muted-foreground text-sm">No classes scheduled for {activeDay}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function HomeworkPage() {
  const navigate = useNavigate();
  const [homework, setHomework] = useState([
    { id: 1, sub: "Mathematics", class: "XII-A", title: "Complete Exercise 12.3", due: "22 Mar", assigned: "18 Mar" },
    { id: 2, sub: "Mathematics", class: "XI-B", title: "Practice Integration problems – Ch 7", due: "20 Mar", assigned: "17 Mar" },
    { id: 3, sub: "Mathematics", class: "X-C", title: "Trigonometry identities worksheet", due: "25 Mar", assigned: "19 Mar" },
    { id: 4, sub: "Mathematics", class: "XII-A", title: "3D Geometry – Exercise 11.1", due: "26 Mar", assigned: "20 Mar" },
    { id: 5, sub: "Mathematics", class: "XI-B", title: "Statistics – Mean, Median, Mode problems", due: "28 Mar", assigned: "21 Mar" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", class: "XII-A", due: "" });
  const add = () => {
    if (!form.title || !form.due) return;
    setHomework(h => [...h, { id: Date.now(), sub: "Mathematics", class: form.class, title: form.title, due: form.due, assigned: new Date().toLocaleDateString("en-IN") }]);
    setForm({ title: "", class: "XII-A", due: "" });
    setShowForm(false);
    addAudit("CREATE", "Homework", `Homework assigned for class ${form.class} by ${ME_TEACHER.id}`);
  };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Homework Management</h2>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
            <Plus className="w-4 h-4" /> Assign Homework
          </button>
        </div>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Assign New Homework</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <input type="text" placeholder="Homework description *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <select value={form.class} onChange={e => setForm(f => ({ ...f, class: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {["XII-A", "XI-B", "X-C"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="date" value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} className="border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button onClick={add} className="mt-3 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Assign</button>
        </div>
      )}
      <div className="space-y-3">
        {homework.map(h => (
          <div key={h.id} className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground text-sm">{h.title}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Class {h.class}</span>
              </div>
              <div className="text-xs text-muted-foreground">Assigned: {h.assigned} • Due: {h.due}</div>
            </div>
            <button onClick={() => setHomework(hw => hw.filter(x => x.id !== h.id))} className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoticesPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState(getSeedNotices());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const add = () => {
    if (!form.title) return;
    const n = { id: Date.now().toString(), title: form.title, content: form.content, type: "general" as const, postedBy: ME_TEACHER.name, postedAt: new Date().toISOString(), public: false, pinned: false };
    setNotices(prev => [n, ...prev]);
    setForm({ title: "", content: "" });
    setShowForm(false);
    addAudit("CREATE", "Notice", `Notice posted by teacher ${ME_TEACHER.id}: ${form.title}`);
  };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Notices</h2>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
            <Plus className="w-4 h-4" /> Post Notice
          </button>
        </div>
      </div>
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Post Notice</h3>
            <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder="Notice title *" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <textarea rows={3} placeholder="Notice content…" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <button onClick={add} className="mt-3 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Post Notice</button>
        </div>
      )}
      <div className="space-y-3">
        {notices.map(n => (
          <div key={n.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <span className="font-semibold text-foreground">{n.title}</span>
                  {n.public && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">🌐 Public</span>}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{n.content}</p>
                <div className="text-xs text-muted-foreground mt-1">Posted: {new Date(n.postedAt).toLocaleDateString("en-IN")}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditPage() {
  const navigate = useNavigate();
  const { getAuditLog } = require("@/lib/erpStore");
  const logs = getAuditLog({ role: "teacher" }).slice(0, 50);
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">My Activity Log</h2>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No activity recorded yet. Actions you take will appear here.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>{["Time", "Module", "Action", "Details"].map(h => <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={log.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap">{new Date(log.timestamp).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3 text-xs"><span className="bg-secondary px-2 py-0.5 rounded">{log.module}</span></td>
                  <td className="px-4 py-3 font-semibold text-foreground text-xs">{log.action}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function TeacherERP() {
  return (
    <ERPLayout navItems={navItems} role="Teacher" roleColor="bg-green-500/20 text-green-400">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<TeacherProfile />} />
        <Route path="/classes" element={<MyClassesPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/marks" element={<MarksEntry />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/homework" element={<HomeworkPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="*" element={<Navigate to="/erp/teacher" replace />} />
      </Routes>
    </ERPLayout>
  );
}
