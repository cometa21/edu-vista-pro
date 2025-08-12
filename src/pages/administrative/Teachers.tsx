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

interface Teacher {
  id: string;
  code: string;
  name: string;
  email: string;
  department: string;
  status: 'ACTIVO' | 'INACTIVO';
}

const initialTeachers: Teacher[] = [
  { id: '1', code: 'DOC-1001', name: 'Dra. María García', email: 'maria.garcia@edu.com', department: 'Ciencias', status: 'ACTIVO' },
  { id: '2', code: 'DOC-1002', name: 'Ing. Carlos López', email: 'carlos.lopez@edu.com', department: 'Física', status: 'ACTIVO' },
  { id: '3', code: 'DOC-1003', name: 'Lic. Ana Rodríguez', email: 'ana.rodriguez@edu.com', department: 'Historia', status: 'INACTIVO' },
];

export default function Teachers() {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVO' | 'INACTIVO'>('ALL');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [form, setForm] = useState<{ code: string; name: string; email: string; department: string; status: 'ACTIVO' | 'INACTIVO'; }>({ code: '', name: '', email: '', department: '', status: 'ACTIVO' });

  const filtered = useMemo(() => {
    return teachers.filter(t => {
      const matches = [t.code, t.name, t.email, t.department].some(v => v.toLowerCase().includes(query.toLowerCase()));
      const statusOk = statusFilter === 'ALL' ? true : t.status === statusFilter;
      return matches && statusOk;
    });
  }, [teachers, query, statusFilter]);

  const openCreate = () => {
    setEditing(null);
    setForm({ code: '', name: '', email: '', department: '', status: 'ACTIVO' });
    setDialogOpen(true);
  };

  const openEdit = (t: Teacher) => {
    setEditing(t);
    setForm({ code: t.code, name: t.name, email: t.email, department: t.department, status: t.status });
    setDialogOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setTeachers(prev => prev.map(t => t.id === editing.id ? { ...t, ...form } : t));
      toast({ title: 'Docente actualizado', description: 'Los datos del docente se actualizaron correctamente.' });
    } else {
      setTeachers(prev => [{ id: Date.now().toString(), ...form }, ...prev]);
      toast({ title: 'Docente añadido', description: 'El docente fue creado correctamente.' });
    }
    setDialogOpen(false);
  };

  const onDelete = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
    toast({ title: 'Docente eliminado', description: 'El registro fue eliminado.' });
  };

  return (
    <div className="space-y-6">
      <SEO title="Gestionar Docentes | EduVista Pro" description="Administra docentes: búsqueda, filtrado y CRUD." />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Docentes</h1>
          <p className="text-muted-foreground">Registro de docentes, departamentos y estado.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8 w-60" placeholder="Buscar docente..." value={query} onChange={(e) => setQuery(e.target.value)} />
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
                <Plus className="h-4 w-4 mr-2" /> Añadir Docente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editing ? 'Editar Docente' : 'Nuevo Docente'}</DialogTitle>
                <DialogDescription>Completa la información del docente</DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código</Label>
                    <Input id="code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input id="department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required />
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
          <CardTitle>Docentes ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell><Badge variant="outline">{t.code}</Badge></TableCell>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>{t.department}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.email}</TableCell>
                  <TableCell>
                    <Badge className={t.status === 'ACTIVO' ? 'bg-success text-success-foreground' : 'bg-muted'}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(t)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(t.id)}>
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
