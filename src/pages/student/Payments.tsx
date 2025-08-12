import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const payments = [
  { id: '1', concept: 'Matrícula 2025 - Semestre 1', amount: 1200, dueDate: '2025-03-10', status: 'PENDIENTE' },
  { id: '2', concept: 'Cuota Biblioteca', amount: 50, dueDate: '2025-03-18', status: 'PENDIENTE' },
  { id: '3', concept: 'Seguro Estudiantil', amount: 35, dueDate: '2025-04-01', status: 'PAGADO' },
];

export default function Payments() {
  const { toast } = useToast();

  const pay = (id: string) => {
    const p = payments.find(x => x.id === id)!;
    toast({ title: 'Redirigiendo a checkout', description: `Simulando pago de: ${p.concept}` });
  };

  return (
    <div className="space-y-6">
      <SEO title="Mis Pagos | EduVista Pro" description="Consulta y paga tus obligaciones pendientes." />

      <div>
        <h1 className="text-3xl font-bold text-foreground">Mis Pagos</h1>
        <p className="text-muted-foreground">Pagos pendientes y realizados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {payments.map((p) => (
          <Card key={p.id} className="shadow-custom-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><CreditCard className="h-5 w-5" /> {p.concept}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold">${'{'}p.amount.toFixed(2){'}'}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" /> Vence: {p.dueDate}
              </div>
              <div>
                <Badge className={p.status === 'PAGADO' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}>
                  {p.status}
                </Badge>
              </div>
              {p.status !== 'PAGADO' && (
                <Button className="w-full" onClick={() => pay(p.id)}>Pagar ahora</Button>
              )}
              {p.status === 'PENDIENTE' && (
                <div className="flex items-center gap-2 text-xs text-warning"><AlertCircle className="h-4 w-4" /> Próximo a vencer</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
