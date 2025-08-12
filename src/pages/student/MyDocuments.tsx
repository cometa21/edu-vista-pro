import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const documents = [
  { id: '1', name: 'Constancia de Estudios', requestedAt: '2025-02-20', status: 'LISTO' },
  { id: '2', name: 'Historial Académico', requestedAt: '2025-02-18', status: 'EN PROCESO' },
];

export default function MyDocuments() {
  const { toast } = useToast();

  const download = (id: string) => {
    const doc = documents.find(d => d.id === id)!;
    toast({ title: 'Descarga iniciada', description: `Descargando ${doc.name}` });
  };

  return (
    <div className="space-y-6">
      <SEO title="Mis Documentos | EduVista Pro" description="Gestiona y descarga tus documentos académicos." />

      <div>
        <h1 className="text-3xl font-bold text-foreground">Mis Documentos</h1>
        <p className="text-muted-foreground">Solicitudes y descargas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((d) => (
          <Card key={d.id} className="shadow-custom-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2"><FileText className="h-5 w-5" /> {d.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">Solicitado: {d.requestedAt}</div>
              <Badge className={d.status === 'LISTO' ? 'bg-success text-success-foreground' : 'bg-muted'}>{d.status}</Badge>
              {d.status === 'LISTO' && (
                <Button className="w-full" onClick={() => download(d.id)}>
                  <Download className="h-4 w-4 mr-2" /> Descargar PDF
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
