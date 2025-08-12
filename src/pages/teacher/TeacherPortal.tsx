import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeacherPortal() {
  return (
    <div className="space-y-6">
      <SEO title="Portal del Docente | EduVista Pro" description="Herramientas para gestión de clases, asistencia y calificaciones." />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portal del Docente</h1>
          <p className="text-muted-foreground">Accesos rápidos a tus herramientas académicas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-teacher" /> Mis Clases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Gestiona actividades y calificaciones por clase.</p>
            <Button asChild className="bg-teacher hover:bg-teacher/90 w-full"><Link to="/mis-clases">Entrar</Link></Button>
          </CardContent>
        </Card>
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-teacher" /> Asistencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Registra asistencia diaria de tus estudiantes.</p>
            <Button asChild variant="outline" className="w-full"><Link to="/asistencia">Abrir</Link></Button>
          </CardContent>
        </Card>
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-teacher" /> Materias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Consulta el catálogo de materias y asignaciones.</p>
            <Button asChild variant="outline" className="w-full"><Link to="/materias">Ver materias</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
