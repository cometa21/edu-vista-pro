import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const schedule = {
  Monday: [
    { time: '08:00 - 09:30', subject: 'Matemáticas', room: 'A-101' },
    { time: '10:00 - 11:30', subject: 'Inglés', room: 'B-205' },
  ],
  Tuesday: [
    { time: '08:00 - 09:30', subject: 'Física', room: 'C-110' },
    { time: '12:00 - 13:30', subject: 'Historia', room: 'D-210' },
  ],
  Wednesday: [
    { time: '08:00 - 09:30', subject: 'Matemáticas', room: 'A-101' },
  ],
  Thursday: [
    { time: '10:00 - 11:30', subject: 'Química', room: 'Lab-2' },
  ],
  Friday: [
    { time: '14:00 - 17:00', subject: 'Proyecto', room: 'E-301' },
  ],
};

export default function Schedule() {
  const days = Object.keys(schedule) as (keyof typeof schedule)[];

  return (
    <div className="space-y-6">
      <SEO title="Mi Horario | EduVista Pro" description="Consulta tu horario semanal de clases." />

      <div>
        <h1 className="text-3xl font-bold text-foreground">Mi Horario</h1>
        <p className="text-muted-foreground">Vista semanal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {days.map((day) => (
          <Card key={day} className="shadow-custom-card">
            <CardHeader>
              <CardTitle className="text-base">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedule[day].map((item, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <div className="text-sm text-muted-foreground">{item.time}</div>
                  <div className="font-medium">{item.subject}</div>
                  <Badge variant="outline">Aula {item.room}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
