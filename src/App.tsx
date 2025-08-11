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

              {/* Admin Routes */}
              <Route 
                path="/gestion-alumnos" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Gestión de Alumnos</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/gestion-docentes" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Gestión de Docentes</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reportes-financieros" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Reportes Financieros</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Teacher Routes */}
              <Route 
                path="/portal-docente" 
                element={
                  <ProtectedRoute allowedRoles={['DOCEN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Portal del Docente</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/mis-clases" 
                element={
                  <ProtectedRoute allowedRoles={['DOCEN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Mis Clases</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Student Routes */}
              <Route 
                path="/horario" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Mi Horario</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/pagos" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Mis Pagos</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/calificaciones" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Mis Calificaciones</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/mis-documentos" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Mis Documentos</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
                    </AppLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/solicitar-documentos" 
                element={
                  <ProtectedRoute allowedRoles={['ALUMN']}>
                    <AppLayout>
                      <div className="text-center">
                        <h1 className="text-2xl font-bold">Solicitar Documentos</h1>
                        <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
                      </div>
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
