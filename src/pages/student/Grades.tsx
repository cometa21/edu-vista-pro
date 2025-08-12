import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const grades = [
  { subject: 'Matemáticas', code: 'MAT401', teacher: 'Dra. García', grade: 9.2 },
  { subject: 'Física', code: 'FIS201', teacher: 'Ing. López', grade: 8.1 },
  { subject: 'Historia', code: 'HIS301', teacher: 'Lic. Rodríguez', grade: 8.7 },
  { subject: 'Inglés', code: 'ING101', teacher: 'Prof. Smith', grade: 7.9 },
];

export default function Grades() {
  return (
    <div className="space-y-6">
      <SEO title="Mis Calificaciones | EduVista Pro" description="Consulta tus calificaciones por materia." />

      <div>
        <h1 className="text-3xl font-bold text-foreground">Mis Calificaciones</h1>
        <p className="text-muted-foreground">Promedio general y notas por curso</p>
      </div>

      <Card className="shadow-custom-card">
        <CardHeader>
          <CardTitle>Resumen</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Docente</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((g, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{g.subject}</TableCell>
                  <TableCell><Badge variant="outline">{g.code}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{g.teacher}</TableCell>
                  <TableCell>{g.grade}</TableCell>
                  <TableCell>
                    <Badge className={g.grade >= 8.5 ? 'bg-success text-success-foreground' : g.grade >= 7.0 ? 'bg-warning text-warning-foreground' : 'bg-destructive text-destructive-foreground'}>
                      {g.grade >= 8.5 ? 'Excelente' : g.grade >= 7 ? 'Bueno' : 'Insuficiente'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
