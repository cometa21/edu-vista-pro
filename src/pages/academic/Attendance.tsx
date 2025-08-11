import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  UserCheck, 
  UserX, 
  Clock,
  Calendar as CalendarIcon,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for attendance
const mockClasses = [
  { id: '1', name: 'Matemáticas Avanzadas', code: 'MAT401' },
  { id: '2', name: 'Física General', code: 'FIS201' },
  { id: '3', name: 'Historia Contemporánea', code: 'HIS301' }
];

const mockStudents = [
  { id: '1', name: 'Juan Pérez', code: '2021001' },
  { id: '2', name: 'María González', code: '2021002' },
  { id: '3', name: 'Carlos López', code: '2021003' },
  { id: '4', name: 'Ana Rodríguez', code: '2021004' },
  { id: '5', name: 'Luis Martínez', code: '2021005' }
];

const mockAttendance = [
  {
    date: '2024-01-15',
    classId: '1',
    records: [
      { studentId: '1', status: 'present', time: '08:15' },
      { studentId: '2', status: 'present', time: '08:10' },
      { studentId: '3', status: 'late', time: '08:25' },
      { studentId: '4', status: 'absent', time: null },
      { studentId: '5', status: 'present', time: '08:05' }
    ]
  }
];

export default function Attendance() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendance);

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    setAttendanceRecords(prev => {
      const existingRecord = prev.find(r => r.date === dateStr && r.classId === selectedClass);
      
      if (existingRecord) {
        return prev.map(record => 
          record.date === dateStr && record.classId === selectedClass
            ? {
                ...record,
                records: record.records.map(r => 
                  r.studentId === studentId 
                    ? { ...r, status, time: status === 'absent' ? null : currentTime }
                    : r
                )
              }
            : record
        );
      } else {
        const newRecord = {
          date: dateStr,
          classId: selectedClass,
          records: mockStudents.map(student => ({
            studentId: student.id,
            status: student.id === studentId ? status : 'present' as const,
            time: student.id === studentId ? (status === 'absent' ? null : currentTime) : currentTime
          }))
        };
        return [...prev, newRecord];
      }
    });

    toast({
      title: "Asistencia actualizada",
      description: `Asistencia registrada para ${mockStudents.find(s => s.id === studentId)?.name}`,
    });
  };

  const getCurrentAttendance = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return attendanceRecords.find(r => r.date === dateStr && r.classId === selectedClass);
  };

  const getAttendanceStats = () => {
    const current = getCurrentAttendance();
    if (!current) return { present: 0, absent: 0, late: 0, total: mockStudents.length };

    const present = current.records.filter(r => r.status === 'present').length;
    const absent = current.records.filter(r => r.status === 'absent').length;
    const late = current.records.filter(r => r.status === 'late').length;

    return { present, absent, late, total: current.records.length };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      present: 'bg-success text-success-foreground',
      absent: 'bg-destructive text-destructive-foreground',
      late: 'bg-warning text-warning-foreground'
    };

    const labels = {
      present: 'Presente',
      absent: 'Ausente',
      late: 'Tardanza'
    };

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const stats = getAttendanceStats();
  const currentAttendance = getCurrentAttendance();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Control de Asistencia</h1>
          <p className="text-muted-foreground">Registra y monitorea la asistencia de estudiantes</p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-teacher" />
              <span>Seleccionar Fecha</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-custom-card">
            <CardHeader>
              <CardTitle>Seleccionar Clase</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una clase" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map(class_ => (
                    <SelectItem key={class_.id} value={class_.id}>
                      {class_.name} ({class_.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Stats */}
          {selectedClass && (
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-custom-card">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stats.present}</div>
                      <p className="text-xs text-muted-foreground">Presentes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-custom-card">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stats.absent}</div>
                      <p className="text-xs text-muted-foreground">Ausentes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-teacher" />
              <span>Resumen del Día</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-medium text-foreground">
                  {selectedDate.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                {selectedClass && (
                  <div className="text-sm text-muted-foreground">
                    {mockClasses.find(c => c.id === selectedClass)?.name}
                  </div>
                )}
              </div>
              
              {selectedClass && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total de estudiantes:</span>
                    <span className="font-medium">{stats.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Presentes:</span>
                    <span className="font-medium text-success">{stats.present}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ausentes:</span>
                    <span className="font-medium text-destructive">{stats.absent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tardanzas:</span>
                    <span className="font-medium text-warning">{stats.late}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      {selectedClass && (
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-teacher" />
              <span>Registro de Asistencia</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Hora</TableHead>
                  {user?.role === 'DOCEN' && <TableHead>Acciones</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents.map((student) => {
                  const attendance = currentAttendance?.records.find(r => r.studentId === student.id);
                  const status = attendance?.status || 'present';
                  
                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="font-medium">{student.name}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.code}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(status)}
                          {getStatusBadge(status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {attendance?.time || '--:--'}
                      </TableCell>
                      {user?.role === 'DOCEN' && (
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant={status === 'present' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleAttendanceChange(student.id, 'present')}
                              className={status === 'present' ? 'bg-success hover:bg-success/90' : ''}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={status === 'late' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleAttendanceChange(student.id, 'late')}
                              className={status === 'late' ? 'bg-warning hover:bg-warning/90' : ''}
                            >
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant={status === 'absent' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleAttendanceChange(student.id, 'absent')}
                              className={status === 'absent' ? 'bg-destructive hover:bg-destructive/90' : ''}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}