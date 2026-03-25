import { Routes, Route, Navigate } from "react-router-dom";
import ERPLayout from "@/components/ERPLayout";
import {
  LayoutDashboard, Server, Database, Code2, Settings, Users,
  Activity, Shield, GitBranch, Terminal
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
          <div key={s.label} className={`border-2 rounded-xl p-4 ${
            s.status === "good" ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"
          }`}>
            <div className={`text-xl font-bold ${s.status === "good" ? "text-green-700" : "text-yellow-700"}`}>
              {s.value}
            </div>
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
        {/* Logs */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" /> Recent Logs
          </h3>
          <div className="space-y-2 font-mono text-xs">
            {recentLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground shrink-0">{log.time}</span>
                <span className={`px-1.5 py-0.5 rounded text-xs font-semibold shrink-0 ${colorMap[log.level]}`}>
                  {log.level}
                </span>
                <span className="text-foreground break-all">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" /> API Endpoints Status
          </h3>
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
                <span className={`px-1.5 py-0.5 rounded font-semibold ${
                  ep.method === "GET" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                }`}>{ep.method}</span>
                <span className="flex-1 text-foreground">{ep.path}</span>
                <span className={`px-1.5 py-0.5 rounded font-semibold ${
                  ep.status === 200 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>{ep.status}</span>
                <span className="text-muted-foreground">{ep.ms}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Database info */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" /> Database Overview
        </h3>
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

function GenericPage({ title }: { title: string }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      <div className="bg-card border border-border rounded-xl p-10 text-center">
        <div className="text-4xl mb-4">🚧</div>
        <p className="text-muted-foreground">This section is under development.</p>
        <p className="text-sm text-muted-foreground mt-1">Connect your backend server to enable full functionality.</p>
      </div>
    </div>
  );
}

export default function DevERP() {
  return (
    <ERPLayout navItems={navItems} role="Developer" roleColor="bg-purple-500/20 text-purple-300">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="monitor" element={<GenericPage title="System Monitor" />} />
        <Route path="database" element={<GenericPage title="Database Manager" />} />
        <Route path="api" element={<GenericPage title="API Manager" />} />
        <Route path="users" element={<GenericPage title="User Management" />} />
        <Route path="logs" element={<GenericPage title="Server Logs" />} />
        <Route path="security" element={<GenericPage title="Security" />} />
        <Route path="deploy" element={<GenericPage title="Deployments" />} />
        <Route path="config" element={<GenericPage title="Server Configuration" />} />
        <Route path="settings" element={<GenericPage title="Settings" />} />
        <Route path="*" element={<Navigate to="/erp/dev" />} />
      </Routes>
    </ERPLayout>
  );
}
