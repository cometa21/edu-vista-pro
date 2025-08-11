import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  MessageSquare, 
  Plus, 
  Send,
  Mail,
  MailOpen,
  Reply,
  Forward,
  Trash2,
  Star,
  StarOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for messages
const mockUsers = [
  { id: '1', name: 'Dr. María García', role: 'DOCEN', email: 'maria.garcia@edu.com' },
  { id: '2', name: 'Ing. Carlos López', role: 'DOCEN', email: 'carlos.lopez@edu.com' },
  { id: '3', name: 'Juan Pérez', role: 'ALUMN', email: 'juan.perez@estudiante.com' },
  { id: '4', name: 'Ana Rodríguez', role: 'ADMIN', email: 'ana.rodriguez@admin.com' }
];

const mockMessages = [
  {
    id: '1',
    from: { id: '1', name: 'Dr. María García', role: 'DOCEN' },
    to: { id: 'current', name: 'Usuario Actual', role: 'ALUMN' },
    subject: 'Evaluación de Matemáticas - Resultados',
    content: 'Estimado estudiante,\n\nMe complace informarte que los resultados de la evaluación de matemáticas ya están disponibles. Tu calificación fue excelente. Te felicito por tu dedicación y esfuerzo.\n\nSaludos cordiales,\nDr. María García',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    starred: true,
    priority: 'high',
    sent: false
  },
  {
    id: '2',
    from: { id: '4', name: 'Ana Rodríguez', role: 'ADMIN' },
    to: { id: 'current', name: 'Usuario Actual', role: 'ALUMN' },
    subject: 'Recordatorio: Pago de Matrícula',
    content: 'Estimado/a estudiante,\n\nEste es un recordatorio amigable sobre el vencimiento de su pago de matrícula el próximo viernes 19 de enero.\n\nPuede realizar el pago a través del portal de pagos en línea.\n\nSaludos,\nAdministración',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
    starred: false,
    priority: 'medium',
    sent: false
  },
  {
    id: '3',
    from: { id: '2', name: 'Ing. Carlos López', role: 'DOCEN' },
    to: { id: 'current', name: 'Usuario Actual', role: 'ALUMN' },
    subject: 'Material de Apoyo - Física General',
    content: 'Hola,\n\nHe subido nuevo material de apoyo para la clase de Física General. Incluye ejercicios adicionales y videos explicativos.\n\nRevísalos antes de la próxima clase.\n\nSaludos,\nIng. Carlos López',
    timestamp: '2024-01-13T14:20:00Z',
    read: true,
    starred: false,
    priority: 'low',
    sent: false
  }
];

export default function Messages() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    content: '',
    priority: 'medium'
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMessage = {
      id: Date.now().toString(),
      from: { id: 'current', name: user?.fullName || user?.username || 'Usuario', role: user?.role || 'ALUMN' },
      to: mockUsers.find(u => u.id === composeData.to) || { id: composeData.to, name: 'Destinatario', role: 'ALUMN' },
      subject: composeData.subject,
      content: composeData.content,
      timestamp: new Date().toISOString(),
      read: true,
      starred: false,
      priority: composeData.priority,
      sent: true
    };
    
    setMessages([newMessage, ...messages]);
    setIsComposeOpen(false);
    setComposeData({
      to: '',
      subject: '',
      content: '',
      priority: 'medium'
    });
    
    toast({
      title: "Mensaje enviado",
      description: "Tu mensaje ha sido enviado exitosamente.",
    });
  };

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const handleToggleStar = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    setSelectedMessage(null);
    toast({
      title: "Mensaje eliminado",
      description: "El mensaje ha sido eliminado exitosamente.",
    });
  };

  const filteredMessages = messages.filter(msg => {
    switch (filter) {
      case 'unread':
        return !msg.read;
      case 'starred':
        return msg.starred;
      case 'sent':
        return msg.sent;
      default:
        return true;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'admin';
      case 'DOCEN': return 'teacher';
      case 'ALUMN': return 'student';
      default: return 'primary';
    }
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mensajes</h1>
          <p className="text-muted-foreground">
            Comunicación entre estudiantes, docentes y administradores
          </p>
        </div>
        
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Mensaje
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Redactar Mensaje</DialogTitle>
              <DialogDescription>
                Envía un nuevo mensaje a otros usuarios del sistema
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="to">Para</Label>
                <Select value={composeData.to} onValueChange={(value) => setComposeData({...composeData, to: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un destinatario" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUsers.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`text-${getRoleColor(user.role)}`}>
                            {user.role === 'ADMIN' ? 'Admin' : user.role === 'DOCEN' ? 'Docente' : 'Estudiante'}
                          </Badge>
                          <span>{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  value={composeData.subject}
                  onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                  placeholder="Asunto del mensaje"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select value={composeData.priority} onValueChange={(value) => setComposeData({...composeData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Mensaje</Label>
                <Textarea
                  id="content"
                  value={composeData.content}
                  onChange={(e) => setComposeData({...composeData, content: e.target.value})}
                  placeholder="Escribe tu mensaje aquí..."
                  rows={6}
                  required
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsComposeOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <Card className="shadow-custom-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Bandeja de Entrada</span>
                </div>
                {unreadCount > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground">
                    {unreadCount}
                  </Badge>
                )}
              </CardTitle>
              
              {/* Filters */}
              <div className="flex space-x-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  Todos
                </Button>
                <Button
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('unread')}
                >
                  No leídos
                </Button>
                <Button
                  variant={filter === 'starred' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('starred')}
                >
                  Destacados
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-muted' : ''
                    } ${!message.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}
                    onClick={() => {
                      setSelectedMessage(message);
                      if (!message.read) {
                        handleMarkAsRead(message.id);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between space-x-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={`bg-${getRoleColor(message.from.role)}/10 text-${getRoleColor(message.from.role)}`}>
                              {message.from.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className={`text-sm truncate ${!message.read ? 'font-semibold' : 'font-medium'}`}>
                                {message.from.name}
                              </p>
                              <Badge 
                                variant="outline" 
                                className={`text-xs px-1 py-0 ${getPriorityColor(message.priority)}`}
                              >
                                {message.priority === 'high' ? 'Alta' : message.priority === 'medium' ? 'Media' : 'Baja'}
                              </Badge>
                            </div>
                            <p className={`text-sm truncate ${!message.read ? 'font-medium' : 'text-muted-foreground'}`}>
                              {message.subject}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(message.timestamp).toLocaleDateString('es-ES')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {!message.read && (
                          <Mail className="h-4 w-4 text-primary" />
                        )}
                        {message.starred && (
                          <Star className="h-4 w-4 text-warning fill-warning" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="shadow-custom-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedMessage.subject}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={`bg-${getRoleColor(selectedMessage.from.role)}/10 text-${getRoleColor(selectedMessage.from.role)}`}>
                            {selectedMessage.from.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedMessage.from.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(selectedMessage.timestamp).toLocaleString('es-ES')}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getPriorityColor(selectedMessage.priority)}
                      >
                        Prioridad {selectedMessage.priority === 'high' ? 'Alta' : selectedMessage.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStar(selectedMessage.id)}
                    >
                      {selectedMessage.starred ? 
                        <Star className="h-4 w-4 text-warning fill-warning" /> : 
                        <StarOff className="h-4 w-4" />
                      }
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-foreground">
                    {selectedMessage.content}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-6 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Reply className="h-4 w-4 mr-2" />
                    Responder
                  </Button>
                  <Button variant="outline" size="sm">
                    <Forward className="h-4 w-4 mr-2" />
                    Reenviar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-custom-card">
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Selecciona un mensaje para verlo</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}