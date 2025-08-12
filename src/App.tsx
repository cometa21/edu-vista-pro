import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context Providers
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Components
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Feature Pages
import Subjects from "./pages/academic/Subjects";
import Attendance from "./pages/academic/Attendance";
import Library from "./pages/administrative/Library";
import Messages from "./pages/communication/Messages";
import Analytics from "./pages/reports/Analytics";

// Admin
import Students from "./pages/administrative/Students";
import Teachers from "./pages/administrative/Teachers";

// Teacher
import TeacherPortal from "./pages/teacher/TeacherPortal";
import MyClasses from "./pages/teacher/MyClasses";

// Student
import Schedule from "./pages/student/Schedule";
import Payments from "./pages/student/Payments";
import Grades from "./pages/student/Grades";
import MyDocuments from "./pages/student/MyDocuments";
import RequestDocument from "./pages/student/RequestDocument";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Common Modules */}
              <Route 
                path="/mensajes" 
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <Messages />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Admin Modules */}
              <Route 
                path="/gestion-alumnos" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AppLayout>
                      <Students />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/gestion-docentes" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AppLayout>
                      <Teachers />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/materias" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AppLayout>
                      <Subjects />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/biblioteca" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AppLayout>
                      <Library />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AppLayout>
                      <Analytics />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reportes-financieros" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AppLayout>
                      <Analytics />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Teacher Modules */}
              <Route 
                path="/portal-docente" 
                element={
                  <ProtectedRoute allowedRoles={['DOCEN']}>
                    <AppLayout>
                      <TeacherPortal />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/mis-clases" 
                element={
                  <ProtectedRoute allowedRoles={['DOCEN']}>
                    <AppLayout>
                      <MyClasses />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/asistencia" 
                element={
                  <ProtectedRoute allowedRoles={['DOCEN']}>
                    <AppLayout>
                      <Attendance />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Student Modules */}
              <Route 
                path="/horario" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <Schedule />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/pagos" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <Payments />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/calificaciones" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <Grades />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/mis-documentos" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <MyDocuments />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/solicitar-documentos" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <RequestDocument />
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
