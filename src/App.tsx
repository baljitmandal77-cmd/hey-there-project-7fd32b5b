import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import StudentERP from "./pages/erp/StudentERP";
import TeacherERP from "./pages/erp/TeacherERP";
import AdminERP from "./pages/erp/AdminERP";
import DevERP from "./pages/erp/DevERP";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function RequireAuth({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { profile, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!profile) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(profile.role)) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    {/* Public Website */}
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/academics" element={<Academics />} />
    <Route path="/admissions" element={<Admissions />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />

    {/* ERP - Protected */}
    <Route
      path="/erp/student/*"
      element={
        <RequireAuth allowedRoles={["student"]}>
          <StudentERP />
        </RequireAuth>
      }
    />
    <Route
      path="/erp/teacher/*"
      element={
        <RequireAuth allowedRoles={["teacher"]}>
          <TeacherERP />
        </RequireAuth>
      }
    />
    <Route
      path="/erp/admin/*"
      element={
        <RequireAuth allowedRoles={["admin", "accountant"]}>
          <AdminERP />
        </RequireAuth>
      }
    />
    <Route
      path="/erp/dev/*"
      element={
        <RequireAuth allowedRoles={["dev"]}>
          <DevERP />
        </RequireAuth>
      }
    />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
