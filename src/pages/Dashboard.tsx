import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Calendar,
  FileText,
  CreditCard,
  GraduationCap,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockStats = {
  admin: {
    totalStudents: 1247,
    totalTeachers: 89,
    pendingPayments: 34,
    activeClasses: 156
  },
  teacher: {
    myClasses: 6,
    totalStudents: 187,
    pendingGrades: 23,
    upcomingActivities: 5
  },
  student: {
    pendingPayments: 2,
    nextClasses: 4,
    averageGrade: 8.7,
    documentsReady: 1
  }
};

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const getRoleColor = () => {
    switch (user.role) {
      case 'ADMIN': return 'admin';
      case 'DOCEN': return 'teacher';
      case 'ALUMN': return 'student';
      default: return 'primary';
    }
  };

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>
          <p className="text-muted-foreground">Vista general del sistema educativo</p>
        </div>
        <Badge variant="outline" className="bg-admin/10 text-admin border-admin/20">
          Administrador
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.admin.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Docentes Activos</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.admin.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="inline h-3 w-3 mr-1" />
              Todos activos
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.admin.pendingPayments}</div>
            <p className="text-xs text-warning">
              <AlertCircle className="inline h-3 w-3 mr-1" />
              Requieren atención
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clases Activas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.admin.activeClasses}</div>
            <p className="text-xs text-muted-foreground">
              Este semestre
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-admin" />
              <span>Gestión de Estudiantes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Administra la información de los estudiantes, inscripciones y datos académicos.
            </p>
            <Button asChild className="w-full bg-admin hover:bg-admin/90">
              <Link to="/gestion-alumnos">Gestionar Alumnos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-admin" />
              <span>Reportes Financieros</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Visualiza reportes de pagos, ingresos y análisis financiero del sistema.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/reportes-financieros">Ver Reportes</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-admin" />
              <span>Gestión de Docentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Administra el personal docente, asignaciones y evaluaciones.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/gestion-docentes">Gestionar Docentes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portal del Docente</h1>
          <p className="text-muted-foreground">Bienvenido, {user.fullName || user.username}</p>
        </div>
        <Badge variant="outline" className="bg-teacher/10 text-teacher border-teacher/20">
          Docente
        </Badge>
      </div>

      {/* Teacher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mis Clases</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.teacher.myClasses}</div>
            <p className="text-xs text-muted-foreground">Este semestre</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.teacher.totalStudents}</div>
            <p className="text-xs text-muted-foreground">En todas mis clases</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificaciones Pendientes</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.teacher.pendingGrades}</div>
            <p className="text-xs text-warning">Por calificar</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximas Actividades</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.teacher.upcomingActivities}</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-teacher" />
              <span>Mis Clases</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Accede a tus clases asignadas, gestiona actividades y calificaciones.
            </p>
            <Button asChild className="w-full bg-teacher hover:bg-teacher/90">
              <Link to="/mis-clases">Ver Mis Clases</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-teacher" />
              <span>Portal del Docente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Herramientas completas para la gestión académica y seguimiento estudiantil.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/portal-docente">Ir al Portal</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portal del Estudiante</h1>
          <p className="text-muted-foreground">Bienvenido, {user.fullName || user.username}</p>
        </div>
        <Badge variant="outline" className="bg-student/10 text-student border-student/20">
          Estudiante
        </Badge>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.student.pendingPayments}</div>
            <p className="text-xs text-warning">Próximos a vencer</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximas Clases</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.student.nextClasses}</div>
            <p className="text-xs text-muted-foreground">Hoy</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.student.averageGrade}</div>
            <p className="text-xs text-success">Excelente rendimiento</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos Listos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockStats.student.documentsReady}</div>
            <p className="text-xs text-success">Para descargar</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-student" />
              <span>Mi Horario</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Consulta tu horario semanal de clases y actividades académicas.
            </p>
            <Button asChild className="w-full bg-student hover:bg-student/90">
              <Link to="/horario">Ver Horario</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-student" />
              <span>Mis Pagos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Revisa el estado de tus pagos y realiza pagos pendientes.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/pagos">Gestionar Pagos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5 text-student" />
              <span>Calificaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Consulta tus calificaciones y progreso académico por materia.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/calificaciones">Ver Notas</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-student" />
              <span>Documentos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Gestiona tus documentos académicos y solicita nuevos certificados.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/mis-documentos">Ver Documentos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-student" />
              <span>Solicitar Documentos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Solicita certificados, constancias y otros documentos académicos.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/solicitar-documentos">Solicitar</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDashboard = () => {
    switch (user.role) {
      case 'ADMIN':
        return renderAdminDashboard();
      case 'DOCEN':
        return renderTeacherDashboard();
      case 'ALUMN':
        return renderStudentDashboard();
      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return (
    <div className="container mx-auto">
      {renderDashboard()}
    </div>
  );
}