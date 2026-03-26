import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, Server, Database, Code2, Settings, Users,
  Activity, Shield, GitBranch, Terminal, RefreshCw, Plus, X,
  CheckCircle2, AlertTriangle, ArrowLeft, History, Edit3,
  Globe, Save, ExternalLink, User, Lock, Trash2, Eye, EyeOff
} from "lucide-react";
import {
  getSeedStudents, getSeedTeachers, addAudit, getAuditLog,
  getPublicContent, setPublicContent
} from "@/lib/erpStore";

const DEV_PROFILE = {
  name: "Dev Team",
  role: "Super Admin / Developer",
  id: "DEV-001",
  email: "dev@brightfuture.edu.in",
  phone: "+91 98765 00099",
  bio: "Full-stack developer and system architect for Bright Future ERP. Responsible for maintaining and developing all digital infrastructure for the school.",
  github: "https://github.com/brightfuture-dev",
  website: "https://brightfuture.edu.in",
  skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "Docker", "Redis"],
  joinDate: "2023-01-15",
};

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/erp/dev" },
  { label: "Dev Profile", icon: User, href: "/erp/dev/profile" },
  { label: "System Monitor", icon: Activity, href: "/erp/dev/monitor" },
  { label: "Database", icon: Database, href: "/erp/dev/database" },
  { label: "API Manager", icon: Code2, href: "/erp/dev/api" },
  { label: "User Management", icon: Users, href: "/erp/dev/users" },
  { label: "Server Logs", icon: Terminal, href: "/erp/dev/logs" },
  { label: "Security", icon: Shield, href: "/erp/dev/security" },
  { label: "Deployments", icon: GitBranch, href: "/erp/dev/deploy" },
  { label: "Site Editor", icon: Globe, href: "/erp/dev/site-editor" },
  { label: "Full Audit", icon: History, href: "/erp/dev/audit" },
  { label: "Settings", icon: Settings, href: "/erp/dev/settings" },
];

function Dashboard() {
  const navigate = useNavigate();
  const systemStats = [
    { label: "CPU Usage", value: "34%", status: "good", detail: "4 cores active" },
    { label: "Memory", value: "68%", status: "warn", detail: "5.4GB / 8GB" },
    { label: "Disk Usage", value: "42%", status: "good", detail: "420GB / 1TB" },
    { label: "Uptime", value: "99.98%", status: "good", detail: "14d 6h 23m" },
    { label: "DB Connections", value: "23", status: "good", detail: "Max: 100" },
    { label: "Active Users", value: "312", status: "good", detail: "Right now" },
  ];
  const recentLogs = getAuditLog().slice(0, 6);
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Developer Dashboard</h2>
        <p className="text-muted-foreground text-sm">Global super-user access • {DEV_PROFILE.id}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {systemStats.map(s => (
          <div key={s.label} className={`border-2 rounded-xl p-4 ${s.status === "good" ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}`}>
            <div className={`text-xl font-bold ${s.status === "good" ? "text-green-700" : "text-yellow-700"}`}>{s.value}</div>
            <div className="text-sm font-medium text-foreground">{s.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.detail}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground flex items-center gap-2"><Terminal className="w-4 h-4 text-primary" /> Recent Audit</h3>
            <button onClick={() => navigate("/erp/dev/audit")} className="text-xs text-primary hover:underline">View All →</button>
          </div>
          <div className="space-y-2 font-mono text-xs">
            {recentLogs.length === 0 ? (
              <div className="text-muted-foreground text-center py-4">No activity yet. Actions will be logged here.</div>
            ) : recentLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground shrink-0">{new Date(log.timestamp).toLocaleTimeString("en-IN")}</span>
                <span className="text-xs bg-secondary px-1.5 rounded shrink-0 capitalize">{log.userRole}</span>
                <span className="text-foreground break-all">{log.details}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Quick Dev Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Edit Public Site", icon: "🌐", href: "/erp/dev/site-editor" },
              { label: "User Management", icon: "👥", href: "/erp/dev/users" },
              { label: "System Monitor", icon: "📊", href: "/erp/dev/monitor" },
              { label: "Full Audit Log", icon: "🔍", href: "/erp/dev/audit" },
              { label: "API Manager", icon: "⚡", href: "/erp/dev/api" },
              { label: "Deployments", icon: "🚀", href: "/erp/dev/deploy" },
            ].map(a => (
              <button key={a.label} onClick={() => navigate(a.href)} className="flex items-center gap-2 bg-secondary hover:bg-accent border border-border rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors">
                <span>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DevProfilePage() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(DEV_PROFILE);
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Developer Profile</h2>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-28 h-28 gradient-primary rounded-2xl flex items-center justify-center shrink-0 text-4xl">
            👨‍💻
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{profile.name}</h3>
                <p className="text-muted-foreground text-sm">{profile.role} • {profile.id}</p>
                <p className="text-muted-foreground text-sm mt-1">Joined: {profile.joinDate}</p>
              </div>
              <button onClick={() => setEditing(!editing)} className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg text-xs hover:bg-accent">
                {editing ? <><X className="w-3.5 h-3.5" /> Cancel</> : <><Edit3 className="w-3.5 h-3.5" /> Edit</>}
              </button>
            </div>
            <div className="mt-4">
              {editing ? (
                <textarea rows={3} value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              ) : <p className="text-sm text-muted-foreground">{profile.bio}</p>}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Email</div>
            <a href={`mailto:${profile.email}`} className="text-sm text-primary hover:underline">{profile.email}</a>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Phone</div>
            <a href={`tel:${profile.phone}`} className="text-sm text-foreground hover:text-primary">{profile.phone}</a>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">GitHub</div>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">{profile.github} <ExternalLink className="w-3 h-3" /></a>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Website</div>
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">{profile.website} <ExternalLink className="w-3 h-3" /></a>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs text-muted-foreground mb-2">Skills</div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(s => <span key={s} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">{s}</span>)}
          </div>
        </div>
        <div className="mt-5 p-3 bg-secondary rounded-lg text-xs text-muted-foreground">
          🔒 <strong className="text-foreground">Developer Credit:</strong> This ERP system was designed, built and is maintained by <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">{profile.name}</a> for Bright Future Senior Secondary School. All rights reserved.
        </div>
        {editing && (
          <button onClick={() => { setEditing(false); addAudit("UPDATE", "Dev Profile", "Dev profile updated"); }} className="mt-4 flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
            <Save className="w-4 h-4" /> Save Profile
          </button>
        )}
      </div>
    </div>
  );
}

function SiteEditorPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState(getPublicContent());
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "notices" | "social">("general");
  const handleSave = () => {
    setPublicContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Public Site Editor</h2>
            <p className="text-xs text-muted-foreground">Changes sync directly to the public website</p>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
            <Save className="w-4 h-4" /> {saved ? "Saved! ✓" : "Save & Sync"}
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        {(["general", "notices", "social"] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${activeTab === t ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{t}</button>
        ))}
      </div>
      {activeTab === "general" && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-foreground">Website Content</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "School Name", key: "schoolName" as const },
              { label: "Established Year", key: "established" as const },
              { label: "Affiliation", key: "affiliation" as const },
              { label: "Contact Phone", key: "footerPhone" as const },
              { label: "Contact Email", key: "footerEmail" as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
                <input type="text" value={String(content[key])} onChange={e => setContent(c => ({ ...c, [key]: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Footer Address</label>
              <input type="text" value={content.footerAddress} onChange={e => setContent(c => ({ ...c, footerAddress: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Hero Title</label>
              <input type="text" value={content.heroTitle} onChange={e => setContent(c => ({ ...c, heroTitle: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Hero Subtitle</label>
              <textarea rows={2} value={content.heroSubtitle} onChange={e => setContent(c => ({ ...c, heroSubtitle: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">About Text</label>
              <textarea rows={3} value={content.aboutText} onChange={e => setContent(c => ({ ...c, aboutText: e.target.value }))} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                <div onClick={() => setContent(c => ({ ...c, admissionsOpen: !c.admissionsOpen }))} className={`relative w-11 h-6 rounded-full transition-colors ${content.admissionsOpen ? "gradient-primary" : "bg-secondary"}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${content.admissionsOpen ? "translate-x-6" : "translate-x-1"}`} />
                </div>
                Admissions Open
              </label>
            </div>
          </div>
        </div>
      )}
      {activeTab === "social" && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-foreground">Social Media Links</h3>
          {[
            { label: "Facebook URL", key: "facebookUrl" as const, icon: "📘" },
            { label: "Twitter / X URL", key: "twitterUrl" as const, icon: "🐦" },
            { label: "YouTube URL", key: "youtubeUrl" as const, icon: "📺" },
            { label: "Instagram URL", key: "instagramUrl" as const, icon: "📸" },
          ].map(({ label, key, icon }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-foreground mb-1">{icon} {label}</label>
              <div className="flex gap-2">
                <input type="url" value={String(content[key])} onChange={e => setContent(c => ({ ...c, [key]: e.target.value }))} className="flex-1 border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                <a href={String(content[key])} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-lg hover:bg-accent" title="Open"><ExternalLink className="w-4 h-4" /></a>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "notices" && (
        <div className="bg-card border border-border rounded-xl p-5 space-y-3">
          <h3 className="font-bold text-foreground">Public Notices (shown on website)</h3>
          {content.notices.filter(n => n.public).map(n => (
            <div key={n.id} className="flex items-start justify-between gap-3 p-3 bg-secondary rounded-lg">
              <div>
                <div className="font-medium text-foreground text-sm">{n.title}</div>
                <div className="text-xs text-muted-foreground">{new Date(n.postedAt).toLocaleDateString("en-IN")} • {n.pinned ? "📌 Pinned" : "Not pinned"}</div>
              </div>
              <button onClick={() => { setContent(c => ({ ...c, notices: c.notices.map(x => x.id === n.id ? { ...x, public: false } : x) })); }} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200">Remove from site</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SystemMonitor() {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [metrics, setMetrics] = useState([
    { label: "CPU Usage", value: 34, unit: "%", color: "bg-blue-500" },
    { label: "RAM Usage", value: 68, unit: "%", color: "bg-purple-500" },
    { label: "Disk I/O", value: 42, unit: "%", color: "bg-orange-500" },
    { label: "Network In", value: 28, unit: "MB/s", color: "bg-green-500" },
    { label: "Network Out", value: 15, unit: "MB/s", color: "bg-cyan-500" },
  ]);
  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setMetrics(m => m.map(item => ({ ...item, value: Math.max(5, Math.min(95, item.value + Math.floor(Math.random() * 20) - 10)) })));
      setRefreshing(false);
    }, 800);
  };
  const services = [
    { name: "Web Server (Nginx)", status: "running", port: "80, 443" },
    { name: "Application Server", status: "running", port: "3000" },
    { name: "Database (PostgreSQL)", status: "running", port: "5432" },
    { name: "Redis Cache", status: "running", port: "6379" },
    { name: "Email Service (SMTP)", status: "error", port: "587" },
    { name: "Backup Service", status: "running", port: "—" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <div className="flex-1 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">System Monitor</h2>
          <button onClick={refresh} disabled={refreshing} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60">
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} /> {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Resource Usage</h3>
        <div className="space-y-4">
          {metrics.map(m => (
            <div key={m.label} className="flex items-center gap-4">
              <div className="w-32 text-sm text-foreground">{m.label}</div>
              <div className="flex-1 h-5 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${m.color}`} style={{ width: `${m.value}%` }} />
              </div>
              <div className="text-sm font-bold text-foreground w-20 text-right">{m.value}{m.unit}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">Service Status</h3>
        <div className="space-y-3">
          {services.map(s => (
            <div key={s.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${s.status === "running" ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                <div>
                  <div className="font-medium text-foreground text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground">Port: {s.port}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.status === "running" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.status}</span>
                {s.status === "error" && <button className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200" onClick={() => alert("Restart attempted (Demo)")}>Restart</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FullAuditPage() {
  const navigate = useNavigate();
  const [roleFilter, setRoleFilter] = useState("all");
  const roles = ["all", "student", "teacher", "admin", "dev"];
  const logs = getAuditLog(roleFilter !== "all" ? { role: roleFilter } : undefined).slice(0, 200);
  const levelColor: Record<string, string> = { CREATE: "bg-green-100 text-green-700", UPDATE: "bg-blue-100 text-blue-700", DELETE: "bg-red-100 text-red-700", SAVE: "bg-yellow-100 text-yellow-700", PAYMENT: "bg-emerald-100 text-emerald-700", DOWNLOAD: "bg-purple-100 text-purple-700" };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Full System Audit Log</h2>
      </div>
      <div className="flex gap-2 flex-wrap">
        {roles.map(r => <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${roleFilter === r ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{r === "all" ? "All Users" : r}</button>)}
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No audit entries. Start using the ERP to generate audit logs.</div>
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

function UserManagementPage() {
  const navigate = useNavigate();
  const [users] = useState([
    { id: "U001", name: "Admin User", username: "admin", role: "admin", email: "admin@school.in", active: true, lastLogin: "25 Mar" },
    { id: "U002", name: "Mr. Rajesh Sharma", username: "teacher", role: "teacher", email: "sharma@school.in", active: true, lastLogin: "25 Mar" },
    { id: "U003", name: "Rahul Kumar", username: "student", role: "student", email: "rahul@student.in", active: true, lastLogin: "24 Mar" },
    { id: "U004", name: "Dev Team", username: "dev", role: "dev", email: "dev@school.in", active: true, lastLogin: "25 Mar" },
    { id: "U005", name: "Old Teacher", username: "oldteacher", role: "teacher", email: "old@school.in", active: false, lastLogin: "10 Jan" },
  ]);
  const [statuses, setStatuses] = useState<Record<string, boolean>>(Object.fromEntries(users.map(u => [u.id, u.active])));
  const roleColor: Record<string, string> = { admin: "bg-orange-100 text-orange-700", teacher: "bg-green-100 text-green-700", student: "bg-blue-100 text-blue-700", dev: "bg-purple-100 text-purple-700" };
  const toggle = (id: string) => { setStatuses(s => ({ ...s, [id]: !s[id] })); addAudit("UPDATE", "User Management", `User ${id} status changed by Dev`); };
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">Global User Management</h2>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>{["ID", "Name", "Username", "Role", "Email", "Last Login", "Status", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left">{h}</th>)}</tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{u.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{u.username}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${roleColor[u.role] || "bg-secondary"}`}>{u.role}</span></td>
                  <td className="px-4 py-3"><a href={`mailto:${u.email}`} className="text-primary hover:underline text-xs">{u.email}</a></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{u.lastLogin}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statuses[u.id] ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{statuses[u.id] ? "Active" : "Suspended"}</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggle(u.id)} className={`text-xs px-2 py-1 rounded font-medium ${statuses[u.id] ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                      {statuses[u.id] ? "Suspend" : "Activate"}
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

function SettingsPage() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const handleSave = () => { addAudit("UPDATE", "Dev Settings", "System settings updated by Dev"); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">System Settings</h2>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-foreground border-b border-border pb-3">Server Configuration</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: "App Port", val: "3000" }, { label: "Database Host", val: "localhost:5432" },
            { label: "Redis Host", val: "localhost:6379" }, { label: "SMTP Host", val: "smtp.gmail.com:587" },
            { label: "Backup Schedule", val: "Daily at 02:00 AM" }, { label: "Session Timeout", val: "8 hours" },
          ].map(s => (
            <div key={s.label}>
              <label className="block text-sm font-medium text-foreground mb-1">{s.label}</label>
              <input type="text" defaultValue={s.val} className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono" />
            </div>
          ))}
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm">
          <Save className="w-4 h-4" /> {saved ? "Settings Saved! ✓" : "Save Configuration"}
        </button>
      </div>
    </div>
  );
}

function GenericPage({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-secondary hover:bg-accent"><ArrowLeft className="w-4 h-4" /></button>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
        <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
        <p className="text-sm">{title} — Advanced features available with backend integration.</p>
      </div>
    </div>
  );
}

export default function DevERP() {
  return (
    <ERPLayout navItems={navItems} role="Developer" roleColor="bg-purple-500/20 text-purple-400">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<DevProfilePage />} />
        <Route path="/monitor" element={<SystemMonitor />} />
        <Route path="/database" element={<GenericPage title="Database Manager" />} />
        <Route path="/api" element={<GenericPage title="API Manager" />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/logs" element={<GenericPage title="Server Logs" />} />
        <Route path="/security" element={<GenericPage title="Security Dashboard" />} />
        <Route path="/deploy" element={<GenericPage title="Deployments" />} />
        <Route path="/site-editor" element={<SiteEditorPage />} />
        <Route path="/audit" element={<FullAuditPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/erp/dev" replace />} />
      </Routes>
    </ERPLayout>
  );
}
