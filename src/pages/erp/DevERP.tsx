import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, Server, Database, Code2, Settings, Users,
  Activity, Shield, GitBranch, Terminal, RefreshCw, Plus, X, CheckCircle2, AlertTriangle
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/erp/dev" },
  { label: "System Monitor", icon: Activity, href: "/erp/dev/monitor" },
  { label: "Database", icon: Database, href: "/erp/dev/database" },
  { label: "API Manager", icon: Code2, href: "/erp/dev/api" },
  { label: "User Management", icon: Users, href: "/erp/dev/users" },
  { label: "Server Logs", icon: Terminal, href: "/erp/dev/logs" },
  { label: "Security", icon: Shield, href: "/erp/dev/security" },
  { label: "Deployments", icon: GitBranch, href: "/erp/dev/deploy" },
  { label: "Server Config", icon: Server, href: "/erp/dev/config" },
  { label: "Settings", icon: Settings, href: "/erp/dev/settings" },
];

function Dashboard() {
  const systemStats = [
    { label: "CPU Usage", value: "34%", status: "good", detail: "4 cores active" },
    { label: "Memory", value: "68%", status: "warn", detail: "5.4GB / 8GB" },
    { label: "Disk Usage", value: "42%", status: "good", detail: "420GB / 1TB" },
    { label: "Network", value: "12 MB/s", status: "good", detail: "Stable" },
    { label: "DB Connections", value: "23", status: "good", detail: "Max: 100" },
    { label: "Uptime", value: "99.98%", status: "good", detail: "14d 6h 23m" },
  ];
  const recentLogs = [
    { time: "14:32:01", level: "INFO", msg: "User login: admin@school.in" },
    { time: "14:28:45", level: "INFO", msg: "Fee payment processed: ₹7,500 – S2401" },
    { time: "14:15:02", level: "WARN", msg: "High memory usage: 68% threshold reached" },
    { time: "13:55:30", level: "INFO", msg: "Attendance sync completed – 2397 records" },
    { time: "13:20:11", level: "ERROR", msg: "Failed email attempt: SMTP timeout" },
    { time: "12:48:00", level: "INFO", msg: "Backup completed successfully" },
  ];
  const colorMap: Record<string, string> = {
    INFO: "text-blue-600 bg-blue-50",
    WARN: "text-yellow-600 bg-yellow-50",
    ERROR: "text-red-600 bg-red-50",
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Developer Dashboard</h2>
        <p className="text-muted-foreground text-sm">System status & server management</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {systemStats.map(s => (
          <div key={s.label} className={`border-2 rounded-xl p-4 ${s.status === "good" ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}`}>
            <div className={`text-xl font-bold ${s.status === "good" ? "text-green-700" : "text-yellow-700"}`}>{s.value}</div>
            <div className="text-sm font-medium text-foreground">{s.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.detail}</div>
            <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${s.status === "good" ? "text-green-600" : "text-yellow-600"}`}>
              <div className={`w-2 h-2 rounded-full ${s.status === "good" ? "bg-green-500" : "bg-yellow-500"} animate-pulse`} />
              {s.status === "good" ? "Normal" : "Warning"}
            </div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Terminal className="w-4 h-4 text-primary" /> Recent Logs</h3>
          <div className="space-y-2 font-mono text-xs">
            {recentLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground shrink-0">{log.time}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs font-semibold shrink-0 ${colorMap[log.level]}`}>{log.level}</span>
                <span className="text-foreground break-all">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Code2 className="w-4 h-4 text-primary" /> API Endpoints Status</h3>
          <div className="space-y-2">
            {[
              { method: "GET", path: "/api/students", status: 200, ms: "32ms" },
              { method: "POST", path: "/api/attendance", status: 200, ms: "45ms" },
              { method: "GET", path: "/api/fees", status: 200, ms: "28ms" },
              { method: "POST", path: "/api/marks", status: 200, ms: "51ms" },
              { method: "GET", path: "/api/notices", status: 200, ms: "18ms" },
              { method: "POST", path: "/api/email/send", status: 503, ms: "timeout" },
            ].map((ep, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono">
                <span className={`px-1.5 py-0.5 rounded font-semibold ${ep.method === "GET" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{ep.method}</span>
                <span className="flex-1 text-foreground">{ep.path}</span>
                <span className={`px-1.5 py-0.5 rounded font-semibold ${ep.status === 200 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{ep.status}</span>
                <span className="text-muted-foreground">{ep.ms}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Database className="w-4 h-4 text-primary" /> Database Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { table: "students", rows: "2,547", size: "4.2 MB" },
            { table: "teachers", rows: "124", size: "0.8 MB" },
            { table: "attendance", rows: "48,293", size: "12.1 MB" },
            { table: "marks", rows: "15,210", size: "5.4 MB" },
            { table: "fees", rows: "9,876", size: "3.2 MB" },
          ].map(db => (
            <div key={db.table} className="bg-secondary rounded-lg p-3">
              <div className="text-xs text-muted-foreground font-mono">{db.table}</div>
              <div className="text-sm font-bold text-foreground mt-1">{db.rows}</div>
              <div className="text-xs text-muted-foreground">rows • {db.size}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemMonitor() {
  const [refreshing, setRefreshing] = useState(false);
  const [metrics, setMetrics] = useState([
    { label: "CPU Usage", value: 34, unit: "%", color: "bg-blue-500", max: 100 },
    { label: "RAM Usage", value: 68, unit: "%", color: "bg-purple-500", max: 100 },
    { label: "Disk I/O", value: 42, unit: "%", color: "bg-orange-500", max: 100 },
    { label: "Network In", value: 28, unit: "MB/s", color: "bg-green-500", max: 100 },
    { label: "Network Out", value: 15, unit: "MB/s", color: "bg-cyan-500", max: 100 },
  ]);
  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setMetrics(m => m.map(item => ({ ...item, value: Math.max(5, Math.min(95, item.value + Math.floor(Math.random() * 20) - 10)) })));
      setRefreshing(false);
    }, 800);
  };
  const services = [
    { name: "Web Server (Nginx)", status: "running", pid: "1234", port: "80, 443" },
    { name: "Application Server", status: "running", pid: "1235", port: "3000" },
    { name: "Database (PostgreSQL)", status: "running", pid: "1236", port: "5432" },
    { name: "Redis Cache", status: "running", pid: "1237", port: "6379" },
    { name: "Email Service (SMTP)", status: "error", pid: "—", port: "587" },
    { name: "Backup Service", status: "running", pid: "1239", port: "—" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">System Monitor</h2>
        <button onClick={refresh} disabled={refreshing} className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} /> {refreshing ? "Refreshing..." : "Refresh"}
        </button>
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
                  <div className="text-xs text-muted-foreground">PID: {s.pid} • Port: {s.port}</div>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.status === "running" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DatabasePage() {
  const [query, setQuery] = useState("SELECT * FROM students LIMIT 10;");
  const [result, setResult] = useState<null | { cols: string[]; rows: (string | number)[][] }>(null);
  const runQuery = () => {
    setResult({
      cols: ["id", "name", "class", "roll", "fees_status"],
      rows: [
        ["S2401", "Rahul Kumar", "XII-A", 1, "Paid"],
        ["S2402", "Priya Sharma", "XII-A", 2, "Paid"],
        ["S2403", "Aarav Singh", "XI-B", 5, "Due"],
      ],
    });
  };
  const tables = [
    { name: "students", rows: 2547, cols: 14 },
    { name: "teachers", rows: 124, cols: 10 },
    { name: "attendance", rows: 48293, cols: 6 },
    { name: "marks", rows: 15210, cols: 8 },
    { name: "fees", rows: 9876, cols: 9 },
    { name: "notices", rows: 234, cols: 7 },
    { name: "library", rows: 1823, cols: 8 },
    { name: "homework", rows: 892, cols: 6 },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Database Manager</h2>
      <div className="grid md:grid-cols-4 gap-3">
        {tables.map(t => (
          <div key={t.name} className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors" onClick={() => setQuery(`SELECT * FROM ${t.name} LIMIT 10;`)}>
            <div className="font-mono text-sm font-bold text-primary">{t.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{t.rows.toLocaleString()} rows • {t.cols} columns</div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2"><Terminal className="w-4 h-4" /> SQL Query Runner</h3>
        <textarea
          rows={3}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full font-mono text-sm border border-input bg-muted rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <button onClick={runQuery} className="mt-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Run Query</button>
        {result && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="bg-secondary">
                  {result.cols.map(c => <th key={c} className="px-3 py-2 text-left text-foreground font-semibold">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                    {row.map((cell, j) => <td key={j} className="px-3 py-2 text-muted-foreground">{String(cell)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-xs text-muted-foreground mt-2">{result.rows.length} rows returned</div>
          </div>
        )}
      </div>
    </div>
  );
}

function APIManager() {
  const endpoints = [
    { method: "GET", path: "/api/v1/students", auth: true, status: 200, calls: "1,234", ms: "32ms" },
    { method: "POST", path: "/api/v1/students", auth: true, status: 200, calls: "89", ms: "68ms" },
    { method: "GET", path: "/api/v1/attendance", auth: true, status: 200, calls: "3,421", ms: "45ms" },
    { method: "POST", path: "/api/v1/attendance", auth: true, status: 200, calls: "560", ms: "71ms" },
    { method: "GET", path: "/api/v1/fees", auth: true, status: 200, calls: "892", ms: "28ms" },
    { method: "POST", path: "/api/v1/fees/pay", auth: true, status: 200, calls: "145", ms: "120ms" },
    { method: "GET", path: "/api/v1/notices", auth: false, status: 200, calls: "5,678", ms: "18ms" },
    { method: "POST", path: "/api/v1/email/send", auth: true, status: 503, calls: "12", ms: "timeout" },
  ];
  const methodColor: Record<string, string> = { GET: "bg-blue-100 text-blue-700", POST: "bg-green-100 text-green-700", DELETE: "bg-red-100 text-red-700", PUT: "bg-yellow-100 text-yellow-700" };
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">API Manager</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">{endpoints.length}</div>
          <div className="text-sm text-muted-foreground">Total Endpoints</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{endpoints.filter(e => e.status === 200).length}</div>
          <div className="text-sm text-green-600">Healthy</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{endpoints.filter(e => e.status !== 200).length}</div>
          <div className="text-sm text-red-600">Issues</div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>
                {["Method", "Endpoint", "Auth", "Status", "Calls/day", "Avg. Time"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {endpoints.map((ep, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded font-semibold text-xs font-mono ${methodColor[ep.method]}`}>{ep.method}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{ep.path}</td>
                  <td className="px-4 py-3">
                    {ep.auth ? <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-semibold">Token</span> : <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded">Public</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded font-semibold text-xs ${ep.status === 200 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{ep.status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{ep.calls}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{ep.ms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  const [users, setUsers] = useState([
    { id: "U001", name: "Admin User", email: "admin@school.in", role: "admin", lastLogin: "25 Mar, 10:32", status: "Active" },
    { id: "U002", name: "Mr. Sharma", email: "sharma@school.in", role: "teacher", lastLogin: "25 Mar, 08:15", status: "Active" },
    { id: "U003", name: "Rahul Kumar", email: "rahul@student.in", role: "student", lastLogin: "24 Mar, 18:45", status: "Active" },
    { id: "U004", name: "Dev Ops", email: "dev@school.in", role: "dev", lastLogin: "25 Mar, 09:00", status: "Active" },
    { id: "U005", name: "Inactive Teacher", email: "old@school.in", role: "teacher", lastLogin: "10 Jan, 09:00", status: "Suspended" },
  ]);
  const roleColor: Record<string, string> = { admin: "bg-orange-100 text-orange-700", teacher: "bg-green-100 text-green-700", student: "bg-blue-100 text-blue-700", dev: "bg-purple-100 text-purple-700" };
  const toggleStatus = (id: string) => setUsers(u => u.map(user => user.id === id ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" } : user));
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">User Management</h2>
      <div className="grid grid-cols-4 gap-4">
        {["admin", "teacher", "student", "dev"].map(role => (
          <div key={role} className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{users.filter(u => u.role === role && u.status === "Active").length}</div>
            <div className="text-sm text-muted-foreground capitalize">{role}s</div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="gradient-primary text-primary-foreground">
              <tr>
                {["ID", "Name", "Email", "Role", "Last Login", "Status", "Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground text-xs font-mono">{u.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{u.email}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${roleColor[u.role]}`}>{u.role}</span></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{u.lastLogin}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{u.status}</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(u.id)} className={`text-xs px-2 py-1 rounded font-semibold transition-colors ${u.status === "Active" ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                      {u.status === "Active" ? "Suspend" : "Activate"}
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

function ServerLogsPage() {
  const [filter, setFilter] = useState("ALL");
  const allLogs = [
    { time: "25 Mar 14:32:01", level: "INFO", service: "AUTH", msg: "User login: admin@school.in from 192.168.1.5" },
    { time: "25 Mar 14:28:45", level: "INFO", service: "FEES", msg: "Fee payment processed: ₹7,500 – S2401" },
    { time: "25 Mar 14:15:02", level: "WARN", service: "MONITOR", msg: "High memory usage: 68% threshold reached" },
    { time: "25 Mar 13:55:30", level: "INFO", service: "SYNC", msg: "Attendance sync completed – 2397 records" },
    { time: "25 Mar 13:20:11", level: "ERROR", service: "EMAIL", msg: "SMTP connection timeout: smtp.gmail.com:587" },
    { time: "25 Mar 12:48:00", level: "INFO", service: "BACKUP", msg: "Database backup completed: backup_25032024.sql (42MB)" },
    { time: "25 Mar 12:00:01", level: "INFO", service: "CRON", msg: "Daily attendance report generated" },
    { time: "25 Mar 11:34:22", level: "WARN", service: "API", msg: "Rate limit approached: /api/students (850/1000 req/hr)" },
    { time: "25 Mar 11:22:05", level: "ERROR", service: "EMAIL", msg: "Email delivery failed: recipient not found" },
    { time: "25 Mar 10:15:44", level: "INFO", service: "AUTH", msg: "New user registered: teacher_joshi@school.in" },
  ];
  const filtered = filter === "ALL" ? allLogs : allLogs.filter(l => l.level === filter);
  const colorMap: Record<string, string> = { INFO: "text-blue-600 bg-blue-50", WARN: "text-yellow-600 bg-yellow-50", ERROR: "text-red-600 bg-red-50" };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-foreground">Server Logs</h2>
        <div className="flex gap-2">
          {["ALL", "INFO", "WARN", "ERROR"].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f ? "gradient-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent"}`}>{f}</button>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="space-y-2 font-mono text-xs">
          {filtered.map((log, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded hover:bg-muted transition-colors">
              <span className="text-muted-foreground shrink-0 w-36">{log.time}</span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-semibold shrink-0 w-12 text-center ${colorMap[log.level]}`}>{log.level}</span>
              <span className="text-primary shrink-0 w-16">[{log.service}]</span>
              <span className="text-foreground break-all">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecurityPage() {
  const events = [
    { time: "25 Mar 14:32", type: "Login Success", user: "admin@school.in", ip: "192.168.1.5", risk: "low" },
    { time: "25 Mar 13:45", type: "Login Failed", user: "unknown@test.com", ip: "203.45.67.89", risk: "high" },
    { time: "25 Mar 12:22", type: "Password Changed", user: "sharma@school.in", ip: "192.168.1.12", risk: "medium" },
    { time: "25 Mar 11:00", type: "Login Success", user: "dev@school.in", ip: "192.168.1.8", risk: "low" },
    { time: "24 Mar 18:45", type: "Login Failed", user: "admin@school.in", ip: "45.33.22.11", risk: "high" },
  ];
  const riskColor: Record<string, string> = { low: "bg-green-100 text-green-700", medium: "bg-yellow-100 text-yellow-700", high: "bg-red-100 text-red-700" };
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Security</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{events.filter(e => e.risk === "low").length}</div>
          <div className="text-sm text-green-600">Low Risk Events</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{events.filter(e => e.risk === "medium").length}</div>
          <div className="text-sm text-yellow-600">Medium Risk</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{events.filter(e => e.risk === "high").length}</div>
          <div className="text-sm text-red-600">High Risk</div>
        </div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-yellow-700">Security Alert</div>
          <div className="text-sm text-yellow-600">2 failed login attempts from suspicious IP addresses (45.33.22.11, 203.45.67.89). Consider blocking these IPs.</div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="gradient-primary text-primary-foreground px-5 py-3 font-bold">Recent Security Events</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {["Time", "Event Type", "User", "IP Address", "Risk"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((e, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted"}>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{e.time}</td>
                  <td className="px-4 py-3 text-foreground font-medium">{e.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.user}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.ip}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${riskColor[e.risk]}`}>{e.risk}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DeploymentsPage() {
  const deployments = [
    { id: "d-001", version: "v2.4.1", branch: "main", by: "dev@school.in", time: "25 Mar, 09:00", status: "success", duration: "2m 34s" },
    { id: "d-002", version: "v2.4.0", branch: "main", by: "dev@school.in", time: "20 Mar, 10:15", status: "success", duration: "2m 18s" },
    { id: "d-003", version: "v2.3.9", branch: "hotfix/email", by: "dev@school.in", time: "18 Mar, 14:30", status: "failed", duration: "1m 5s" },
    { id: "d-004", version: "v2.3.8", branch: "main", by: "dev@school.in", time: "15 Mar, 11:00", status: "success", duration: "2m 45s" },
  ];
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Deployments</h2>
        <button className="flex items-center gap-2 gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
          <GitBranch className="w-4 h-4" /> New Deployment
        </button>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <div>
            <div className="font-semibold text-green-700">Current Version: v2.4.1</div>
            <div className="text-xs text-green-600">Deployed on 25 Mar 2024 at 09:00 – Running stable</div>
          </div>
        </div>
        <div className="space-y-3">
          {deployments.map(d => (
            <div key={d.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${d.status === "success" ? "bg-green-100" : "bg-red-100"}`}>
                {d.status === "success" ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{d.version}</span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded font-mono">{d.branch}</span>
                </div>
                <div className="text-xs text-muted-foreground">{d.by} • {d.time} • Duration: {d.duration}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${d.status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{d.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServerConfigPage() {
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    domain: "erp.brightfuture.edu.in",
    maxConnections: "100",
    sessionTimeout: "30",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    backupSchedule: "Daily at 00:00",
  });
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Server Configuration</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-foreground">General Settings</h3>
          {[
            { label: "Domain", key: "domain" },
            { label: "Max DB Connections", key: "maxConnections" },
            { label: "Session Timeout (min)", key: "sessionTimeout" },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
              <input
                type="text"
                value={config[f.key as keyof typeof config]}
                onChange={e => setConfig(c => ({ ...c, [f.key]: e.target.value }))}
                className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-foreground">Email (SMTP) Settings</h3>
          {[
            { label: "SMTP Host", key: "smtpHost" },
            { label: "SMTP Port", key: "smtpPort" },
            { label: "Backup Schedule", key: "backupSchedule" },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-foreground mb-1">{f.label}</label>
              <input
                type="text"
                value={config[f.key as keyof typeof config]}
                onChange={e => setConfig(c => ({ ...c, [f.key]: e.target.value }))}
                className="w-full border border-input bg-background rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSave} className="flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm">
        <CheckCircle2 className="w-4 h-4" /> {saved ? "Configuration Saved!" : "Save Configuration"}
      </button>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground">Dev Settings</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "Debug Mode", desc: "Enable verbose logging for all services", enabled: false },
          { title: "Maintenance Mode", desc: "Redirect all users to maintenance page", enabled: false },
          { title: "Auto Backup", desc: "Automatic daily database backups at midnight", enabled: true },
          { title: "Email Notifications", desc: "Send alerts for critical system events", enabled: true },
          { title: "API Rate Limiting", desc: "Limit API calls to 1000 req/hr per user", enabled: true },
          { title: "HTTPS Redirect", desc: "Automatically redirect HTTP to HTTPS", enabled: true },
        ].map(s => {
          const [enabled, setEnabled] = useState(s.enabled);
          return (
            <div key={s.title} className="bg-card border border-border rounded-xl p-5 flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-foreground">{s.title}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{s.desc}</div>
              </div>
              <button
                onClick={() => setEnabled(e => !e)}
                className={`w-11 h-6 rounded-full transition-colors shrink-0 relative ${enabled ? "bg-primary" : "bg-secondary"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${enabled ? "left-6" : "left-1"}`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DevERP() {
  return (
    <ERPLayout navItems={navItems} role="Developer" roleColor="bg-purple-500/20 text-purple-300">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="monitor" element={<SystemMonitor />} />
        <Route path="database" element={<DatabasePage />} />
        <Route path="api" element={<APIManager />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="logs" element={<ServerLogsPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="deploy" element={<DeploymentsPage />} />
        <Route path="config" element={<ServerConfigPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/erp/dev" />} />
      </Routes>
    </ERPLayout>
  );
}
