import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, LogIn } from "lucide-react";

const DEMO_USERS = [
  { id: "student", label: "Student", username: "student", password: "student123", color: "bg-blue-500", route: "/erp/student" },
  { id: "teacher", label: "Teacher", username: "teacher", password: "teacher123", color: "bg-green-500", route: "/erp/teacher" },
  { id: "admin", label: "Admin", username: "admin", password: "admin123", color: "bg-orange-500", route: "/erp/admin" },
  { id: "dev", label: "Developer", username: "dev", password: "dev123", color: "bg-purple-500", route: "/erp/dev" },
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const user = DEMO_USERS.find(
        u => u.username === username.toLowerCase() && u.password === password
      );
      if (user) {
        localStorage.setItem("erp_user", JSON.stringify({ role: user.id, name: user.label }));
        navigate(user.route);
      } else {
        setError("Invalid username or password.");
      }
      setLoading(false);
    }, 700);
  };

  const fillDemo = (user: typeof DEMO_USERS[0]) => {
    setUsername(user.username);
    setPassword(user.password);
    setError("");
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-9 h-9 text-gold-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-white">Bright Future ERP</h1>
          <p className="text-white/60 text-sm mt-1">School Management Portal</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-foreground mb-6 text-center">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-input bg-background rounded-lg px-3 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary text-primary-foreground py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 border-t border-border pt-5">
            <p className="text-xs text-muted-foreground text-center mb-3">Demo Credentials (click to fill)</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.id}
                  onClick={() => fillDemo(user)}
                  className="flex items-center gap-2 bg-muted hover:bg-accent border border-border rounded-lg px-3 py-2 text-xs transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full ${user.color}`} />
                  <div className="text-left">
                    <div className="font-medium text-foreground">{user.label}</div>
                    <div className="text-muted-foreground">{user.username} / {user.password}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-4">
          © 2024 Bright Future Senior Secondary School
        </p>
      </div>
    </div>
  );
}
