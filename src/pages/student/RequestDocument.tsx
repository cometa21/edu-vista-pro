import { SEO } from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RequestDocument() {
  const [docType, setDocType] = useState('');
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/pagos');
  };

  return (
    <div className="space-y-6">
      <SEO title="Solicitar Documentos | EduVista Pro" description="Solicita certificados y constancias." />

      <div>
        <h1 className="text-3xl font-bold text-foreground">Solicitar Documentos</h1>
        <p className="text-muted-foreground">Selecciona el tipo de documento y envía tu solicitud</p>
      </div>

      <Card className="max-w-lg shadow-custom-card">
        <CardHeader>
          <CardTitle>Nueva solicitud</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de documento</Label>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="constancia">Constancia de Estudios</SelectItem>
                  <SelectItem value="historial">Historial Académico</SelectItem>
                  <SelectItem value="certificado">Certificado de Notas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={!docType}>Enviar y pagar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
