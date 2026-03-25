import { Routes, Route, Navigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, BookOpen, Calendar, Bell, ClipboardList, Users, FileText, Clock
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
    { name: "XII-A", subject: "Mathematics", students: 42, today: "8:00 AM - P1" },
    { name: "XI-B", subject: "Mathematics", students: 38, today: "9:30 AM - P3" },
    { name: "X-C", subject: "Mathematics", students: 45, today: "2:00 PM - P7" },
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
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                  {cls.name}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{cls.subject}</div>
                  <div className="text-xs text-muted-foreground">{cls.students} students</div>
                </div>
              </div>
              <div className="text-xs text-primary font-medium bg-accent px-2 py-1 rounded">
                Today: {cls.today}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Quick Attendance – XII-A (Today)</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {Array.from({ length: 42 }, (_, i) => i + 1).map(roll => (
            <div key={roll} className={`text-center text-xs py-2 rounded-lg font-medium cursor-pointer transition-colors ${
              [3, 12, 28].includes(roll)
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}>
              {roll}
            </div>
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

function MarksEntry() {
  const students = [
    { roll: 1, name: "Aarav Sharma", ut1: 18, midterm: 76 },
    { roll: 2, name: "Priya Gupta", ut1: 20, midterm: 91 },
    { roll: 3, name: "Rohit Yadav", ut1: 15, midterm: 62 },
    { roll: 4, name: "Sneha Patel", ut1: 19, midterm: 85 },
    { roll: 5, name: "Arjun Mehta", ut1: 17, midterm: 72 },
  ];
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Marks Entry – XII-A Mathematics</h2>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
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
                  <input type="number" placeholder="--" className="w-16 border border-input bg-background rounded px-2 py-1 text-xs" />
                </td>
                <td className="px-4 py-3">
                  <input type="number" placeholder="--" className="w-20 border border-input bg-background rounded px-2 py-1 text-xs" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="gradient-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-90">
        Save Marks
      </button>
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

export default function TeacherERP() {
  return (
    <ERPLayout navItems={navItems} role="Teacher" roleColor="bg-green-500/20 text-green-300">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="marks" element={<MarksEntry />} />
        <Route path="classes" element={<GenericPage title="My Classes" />} />
        <Route path="attendance" element={<GenericPage title="Attendance Management" />} />
        <Route path="students" element={<GenericPage title="Student List" />} />
        <Route path="timetable" element={<GenericPage title="Timetable" />} />
        <Route path="homework" element={<GenericPage title="Homework" />} />
        <Route path="notices" element={<GenericPage title="Notices" />} />
        <Route path="*" element={<Navigate to="/erp/teacher" />} />
      </Routes>
    </ERPLayout>
  );
}
