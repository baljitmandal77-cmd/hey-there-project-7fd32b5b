import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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

// Simple auth guard
function RequireAuth({ children, role }: { children: React.ReactNode; role: string }) {
  const user = JSON.parse(localStorage.getItem("erp_user") || "null");
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
              <RequireAuth role="student">
                <StudentERP />
              </RequireAuth>
            }
          />
          <Route
            path="/erp/teacher/*"
            element={
              <RequireAuth role="teacher">
                <TeacherERP />
              </RequireAuth>
            }
          />
          <Route
            path="/erp/admin/*"
            element={
              <RequireAuth role="admin">
                <AdminERP />
              </RequireAuth>
            }
          />
          <Route
            path="/erp/dev/*"
            element={
              <RequireAuth role="dev">
                <DevERP />
              </RequireAuth>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
