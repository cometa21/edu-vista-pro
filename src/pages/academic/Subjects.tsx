import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Clock,
  Users,
  Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for subjects
const mockSubjects = [
  {
    id: '1',
    name: 'Matemáticas Avanzadas',
    code: 'MAT401',
    credits: 4,
    semester: '2024-1',
    teacher: 'Dr. María García',
    students: 28,
    schedule: 'Lun-Mie-Vie 08:00-09:30',
    status: 'active'
  },
  {
    id: '2',
    name: 'Física General',
    code: 'FIS201',
    credits: 3,
    semester: '2024-1',
    teacher: 'Ing. Carlos López',
    students: 32,
    schedule: 'Mar-Jue 10:00-11:30',
    status: 'active'
  },
  {
    id: '3',
    name: 'Historia Contemporánea',
    code: 'HIS301',
    credits: 2,
    semester: '2024-1',
    teacher: 'Lic. Ana Rodríguez',
    students: 25,
    schedule: 'Vie 14:00-17:00',
    status: 'inactive'
  }
];

export default function Subjects() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subjects, setSubjects] = useState(mockSubjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: '',
    semester: '',
    teacher: '',
    schedule: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSubject) {
      // Update existing subject
      setSubjects(subjects.map(subject => 
        subject.id === editingSubject.id 
          ? { ...subject, ...formData, credits: parseInt(formData.credits) }
          : subject
      ));
      toast({
        title: "Materia actualizada",
        description: "La materia ha sido actualizada exitosamente.",
      });
    } else {
      // Create new subject
      const newSubject = {
        id: Date.now().toString(),
        ...formData,
        credits: parseInt(formData.credits),
        students: 0,
        status: 'active'
      };
      setSubjects([...subjects, newSubject]);
      toast({
        title: "Materia creada",
        description: "La nueva materia ha sido creada exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingSubject(null);
    setFormData({
      name: '',
      code: '',
      credits: '',
      semester: '',
      teacher: '',
      schedule: ''
    });
  };

  const handleEdit = (subject: any) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      credits: subject.credits.toString(),
      semester: subject.semester,
      teacher: subject.teacher,
      schedule: subject.schedule
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    toast({
      title: "Materia eliminada",
      description: "La materia ha sido eliminada exitosamente.",
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Materias</h1>
          <p className="text-muted-foreground">Administra las materias del sistema educativo</p>
        </div>
        
        {user?.role === 'ADMIN' && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-admin hover:bg-admin/90">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Materia
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingSubject ? 'Editar Materia' : 'Nueva Materia'}
                </DialogTitle>
                <DialogDescription>
                  {editingSubject 
                    ? 'Modifica los datos de la materia seleccionada'
                    : 'Completa los datos para crear una nueva materia'
                  }
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la Materia</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ej: Matemáticas Avanzadas"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="Ej: MAT401"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="credits">Créditos</Label>
                  <Input
                    id="credits"
                    type="number"
                    min="1"
                    max="6"
                    value={formData.credits}
                    onChange={(e) => setFormData({...formData, credits: e.target.value})}
                    placeholder="4"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="semester">Semestre</Label>
                  <Select value={formData.semester} onValueChange={(value) => setFormData({...formData, semester: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el semestre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-1">2024-1</SelectItem>
                      <SelectItem value="2024-2">2024-2</SelectItem>
                      <SelectItem value="2025-1">2025-1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="teacher">Docente Asignado</Label>
                  <Input
                    id="teacher"
                    value={formData.teacher}
                    onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                    placeholder="Ej: Dr. María García"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule">Horario</Label>
                  <Input
                    id="schedule"
                    value={formData.schedule}
                    onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                    placeholder="Ej: Lun-Mie-Vie 08:00-09:30"
                    required
                  />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-admin hover:bg-admin/90">
                    {editingSubject ? 'Actualizar' : 'Crear'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Materias</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">
              {subjects.filter(s => s.status === 'active').length} activas
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {subjects.reduce((total, subject) => total + subject.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              En todas las materias
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Créditos Totales</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {subjects.reduce((total, subject) => total + subject.credits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Créditos disponibles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Table */}
      <Card className="shadow-custom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-admin" />
            <span>Lista de Materias</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Créditos</TableHead>
                <TableHead>Docente</TableHead>
                <TableHead>Estudiantes</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Estado</TableHead>
                {user?.role === 'ADMIN' && <TableHead>Acciones</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-muted-foreground">{subject.semester}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{subject.code}</Badge>
                  </TableCell>
                  <TableCell>{subject.credits}</TableCell>
                  <TableCell>{subject.teacher}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{subject.students}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{subject.schedule}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={subject.status === 'active' ? 'default' : 'secondary'}
                      className={subject.status === 'active' ? 'bg-success text-success-foreground' : ''}
                    >
                      {subject.status === 'active' ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </TableCell>
                  {user?.role === 'ADMIN' && (
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(subject)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(subject.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}