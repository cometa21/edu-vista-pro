import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  BookOpen,
  DollarSign,
  Award,
  Calendar,
  Download,
  Filter
} from 'lucide-react';

// Mock data for analytics
const enrollmentData = [
  { month: 'Ene', students: 1150, teachers: 85 },
  { month: 'Feb', students: 1180, teachers: 87 },
  { month: 'Mar', students: 1200, teachers: 89 },
  { month: 'Abr', students: 1220, teachers: 89 },
  { month: 'May', students: 1240, teachers: 91 },
  { month: 'Jun', students: 1260, teachers: 93 }
];

const gradeDistribution = [
  { grade: 'A', count: 245, percentage: 25 },
  { grade: 'B', count: 294, percentage: 30 },
  { grade: 'C', count: 196, percentage: 20 },
  { grade: 'D', count: 147, percentage: 15 },
  { grade: 'F', count: 98, percentage: 10 }
];

const subjectPerformance = [
  { subject: 'Matemáticas', average: 8.2, students: 320 },
  { subject: 'Física', average: 7.8, students: 280 },
  { subject: 'Química', average: 7.5, students: 250 },
  { subject: 'Historia', average: 8.5, students: 300 },
  { subject: 'Literatura', average: 8.0, students: 290 },
  { subject: 'Inglés', average: 7.9, students: 310 }
];

const attendanceData = [
  { day: 'Lun', attendance: 92 },
  { day: 'Mar', attendance: 94 },
  { day: 'Mié', attendance: 91 },
  { day: 'Jue', attendance: 93 },
  { day: 'Vie', attendance: 88 },
];

const revenueData = [
  { month: 'Ene', tuition: 180000, fees: 25000, total: 205000 },
  { month: 'Feb', tuition: 185000, fees: 28000, total: 213000 },
  { month: 'Mar', tuition: 190000, fees: 30000, total: 220000 },
  { month: 'Abr', tuition: 188000, fees: 27000, total: 215000 },
  { month: 'May', tuition: 192000, fees: 32000, total: 224000 },
  { month: 'Jun', tuition: 195000, fees: 35000, total: 230000 }
];

const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

export default function Analytics() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedYear, setSelectedYear] = useState('2024');

  const getPerformanceColor = (average: number) => {
    if (average >= 8.5) return 'text-success';
    if (average >= 7.5) return 'text-warning';
    return 'text-destructive';
  };

  const getTrendIcon = (current: number, previous: number) => {
    return current > previous ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-destructive" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Análisis y Reportes</h1>
          <p className="text-muted-foreground">
            Dashboard analítico del sistema educativo
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mensual</SelectItem>
              <SelectItem value="semester">Semestral</SelectItem>
              <SelectItem value="year">Anual</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,260</div>
            <div className="flex items-center space-x-1 text-xs">
              {getTrendIcon(1260, 1240)}
              <span className="text-success">+1.6% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8.1</div>
            <div className="flex items-center space-x-1 text-xs">
              {getTrendIcon(8.1, 7.9)}
              <span className="text-success">+0.2 vs semestre anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">91.6%</div>
            <div className="flex items-center space-x-1 text-xs">
              {getTrendIcon(91.6, 90.2)}
              <span className="text-success">+1.4% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$230K</div>
            <div className="flex items-center space-x-1 text-xs">
              {getTrendIcon(230000, 224000)}
              <span className="text-success">+2.7% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Tendencia de Inscripciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                  name="Estudiantes"
                />
                <Area 
                  type="monotone" 
                  dataKey="teachers" 
                  stroke="hsl(var(--teacher))" 
                  fill="hsl(var(--teacher))" 
                  fillOpacity={0.3}
                  name="Docentes"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Distribución de Calificaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ grade, percentage }) => `${grade} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Rendimiento por Materia</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 10]} />
                <YAxis dataKey="subject" type="category" width={80} />
                <Tooltip />
                <Bar 
                  dataKey="average" 
                  fill="hsl(var(--primary))" 
                  name="Promedio"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Patterns */}
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Patrón de Asistencia Semanal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Asistencia']} />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analysis */}
      <Card className="shadow-custom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span>Análisis de Ingresos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Bar dataKey="tuition" stackId="a" fill="hsl(var(--primary))" name="Matrículas" />
              <Bar dataKey="fees" stackId="a" fill="hsl(var(--teacher))" name="Cuotas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Summary Table */}
      <Card className="shadow-custom-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Resumen de Rendimiento por Materia</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{subject.subject}</h3>
                    <p className="text-sm text-muted-foreground">
                      {subject.students} estudiantes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getPerformanceColor(subject.average)}`}>
                      {subject.average}
                    </div>
                    <p className="text-xs text-muted-foreground">Promedio</p>
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={
                      subject.average >= 8.5 ? 'border-success text-success' :
                      subject.average >= 7.5 ? 'border-warning text-warning' :
                      'border-destructive text-destructive'
                    }
                  >
                    {subject.average >= 8.5 ? 'Excelente' :
                     subject.average >= 7.5 ? 'Bueno' : 'Necesita Mejora'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}