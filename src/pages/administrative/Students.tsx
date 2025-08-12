import { useMemo, useState } from 'react';
import { SEO } from '@/components/SEO';
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
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  code: string;
  name: string;
  grade: string;
  email: string;
  status: 'ACTIVO' | 'INACTIVO';
}

const initialStudents: Student[] = [
  { id: '1', code: '2021001', name: 'Juan Pérez', grade: '3° Secundaria', email: 'juan.perez@edu.com', status: 'ACTIVO' },
  { id: '2', code: '2021002', name: 'María González', grade: '4° Secundaria', email: 'maria.gonzalez@edu.com', status: 'ACTIVO' },
  { id: '3', code: '2021003', name: 'Carlos López', grade: '5° Secundaria', email: 'carlos.lopez@edu.com', status: 'INACTIVO' },
];

export default function Students() {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVO' | 'INACTIVO'>('ALL');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState({ code: '', name: '', grade: '', email: '', status: 'ACTIVO' as const });

  const filtered = useMemo(() => {
    return students.filter(s => {
      const matches = [s.code, s.name, s.email, s.grade].some(v => v.toLowerCase().includes(query.toLowerCase()));
      const statusOk = statusFilter === 'ALL' ? true : s.status === statusFilter;
      return matches && statusOk;
    });
  }, [students, query, statusFilter]);

  const openCreate = () => {
    setEditing(null);
    setForm({ code: '', name: '', grade: '', email: '', status: 'ACTIVO' });
    setDialogOpen(true);
  };

  const openEdit = (s: Student) => {
    setEditing(s);
    setForm({ code: s.code, name: s.name, grade: s.grade, email: s.email, status: s.status });
    setDialogOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setStudents(prev => prev.map(s => s.id === editing.id ? { ...s, ...form } : s));
      toast({ title: 'Alumno actualizado', description: 'Los datos del alumno se actualizaron correctamente.' });
    } else {
      setStudents(prev => [{ id: Date.now().toString(), ...form }, ...prev]);
      toast({ title: 'Alumno añadido', description: 'El alumno fue creado correctamente.' });
    }
    setDialogOpen(false);
  };

  const onDelete = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    toast({ title: 'Alumno eliminado', description: 'El registro fue eliminado.' });
  };

  return (
    <div className="space-y-6">
      <SEO title="Gestionar Alumnos | EduVista Pro" description="Administra estudiantes: búsqueda, filtrado y CRUD." />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Alumnos</h1>
          <p className="text-muted-foreground">Lista completa de alumnos con búsqueda, filtros y acciones.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8 w-60" placeholder="Buscar alumno..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Select value={statusFilter} onValueChange={(v: 'ALL' | 'ACTIVO' | 'INACTIVO') => setStatusFilter(v)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="ACTIVO">Activos</SelectItem>
              <SelectItem value="INACTIVO">Inactivos</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-admin hover:bg-admin/90" onClick={openCreate}>
                <Plus className="h-4 w-4 mr-2" /> Añadir Alumno
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editing ? 'Editar Alumno' : 'Nuevo Alumno'}</DialogTitle>
                <DialogDescription>Completa la información del alumno</DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input id="code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grado/Nivel</Label>
                    <Input id="grade" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select value={form.status} onValueChange={(v: 'ACTIVO' | 'INACTIVO') => setForm({ ...form, status: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVO">Activo</SelectItem>
                      <SelectItem value="INACTIVO">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
                  <Button type="submit" className="bg-admin hover:bg-admin/90">{editing ? 'Guardar' : 'Crear'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="shadow-custom-card">
        <CardHeader>
          <CardTitle>Alumnos ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Grado</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell><Badge variant="outline">{s.code}</Badge></TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.grade}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.email}</TableCell>
                  <TableCell>
                    <Badge className={s.status === 'ACTIVO' ? 'bg-success text-success-foreground' : 'bg-muted'}>
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(s)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(s.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
