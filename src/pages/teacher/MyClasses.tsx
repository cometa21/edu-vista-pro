import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Clock } from 'lucide-react';

const classes = [
  { id: '1', name: 'Matemáticas Avanzadas', code: 'MAT401', students: 28, schedule: 'Lun-Mie-Vie 08:00-09:30' },
  { id: '2', name: 'Física General', code: 'FIS201', students: 32, schedule: 'Mar-Jue 10:00-11:30' },
  { id: '3', name: 'Historia Contemporánea', code: 'HIS301', students: 25, schedule: 'Vie 14:00-17:00' },
];

export default function MyClasses() {
  return (
    <div className="space-y-6">
      <SEO title="Mis Clases | EduVista Pro" description="Listado de clases del docente." />

      <div>
        <h1 className="text-3xl font-bold text-foreground">Mis Clases</h1>
        <p className="text-muted-foreground">Accede a tus grupos y horarios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => (
          <Card key={c.id} className="shadow-custom-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teacher" /> {c.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="outline">{c.code}</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" /> {c.students} estudiantes
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" /> {c.schedule}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
