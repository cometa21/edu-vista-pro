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
  Search,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for library books
const mockBooks = [
  {
    id: '1',
    title: 'Cálculo Diferencial e Integral',
    author: 'James Stewart',
    isbn: '978-607-522-294-6',
    category: 'Matemáticas',
    copies: 5,
    available: 3,
    location: 'A-101',
    publishYear: 2018
  },
  {
    id: '2',
    title: 'Física: Principios y Problemas',
    author: 'Paul Zitzewitz',
    isbn: '978-970-10-6841-2',
    category: 'Física',
    copies: 8,
    available: 5,
    location: 'B-205',
    publishYear: 2019
  },
  {
    id: '3',
    title: 'Historia Universal Contemporánea',
    author: 'Gloria Delgado',
    isbn: '978-607-15-1234-5',
    category: 'Historia',
    copies: 10,
    available: 8,
    location: 'C-310',
    publishYear: 2020
  }
];

// Mock data for loans
const mockLoans = [
  {
    id: '1',
    bookId: '1',
    bookTitle: 'Cálculo Diferencial e Integral',
    studentId: '2021001',
    studentName: 'Juan Pérez',
    loanDate: '2024-01-10',
    dueDate: '2024-01-24',
    returnDate: null,
    status: 'active'
  },
  {
    id: '2',
    bookId: '2',
    bookTitle: 'Física: Principios y Problemas',
    studentId: '2021002',
    studentName: 'María González',
    loanDate: '2024-01-08',
    dueDate: '2024-01-22',
    returnDate: '2024-01-20',
    status: 'returned'
  },
  {
    id: '3',
    bookId: '1',
    bookTitle: 'Cálculo Diferencial e Integral',
    studentId: '2021003',
    studentName: 'Carlos López',
    loanDate: '2024-01-05',
    dueDate: '2024-01-19',
    returnDate: null,
    status: 'overdue'
  }
];

export default function Library() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [books, setBooks] = useState(mockBooks);
  const [loans, setLoans] = useState(mockLoans);
  const [selectedTab, setSelectedTab] = useState('books');
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isLoanDialogOpen, setIsLoanDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    copies: '',
    location: '',
    publishYear: ''
  });
  const [loanForm, setLoanForm] = useState({
    bookId: '',
    studentId: '',
    studentName: ''
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBook = {
      id: Date.now().toString(),
      ...bookForm,
      copies: parseInt(bookForm.copies),
      available: parseInt(bookForm.copies),
      publishYear: parseInt(bookForm.publishYear)
    };
    
    setBooks([...books, newBook]);
    setIsBookDialogOpen(false);
    setBookForm({
      title: '',
      author: '',
      isbn: '',
      category: '',
      copies: '',
      location: '',
      publishYear: ''
    });
    
    toast({
      title: "Libro agregado",
      description: "El libro ha sido agregado al catálogo exitosamente.",
    });
  };

  const handleCreateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    
    const book = books.find(b => b.id === loanForm.bookId);
    if (!book || book.available === 0) {
      toast({
        title: "Error",
        description: "El libro no está disponible para préstamo.",
        variant: "destructive"
      });
      return;
    }

    const newLoan = {
      id: Date.now().toString(),
      bookId: loanForm.bookId,
      bookTitle: book.title,
      studentId: loanForm.studentId,
      studentName: loanForm.studentName,
      loanDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      returnDate: null,
      status: 'active'
    };
    
    setLoans([...loans, newLoan]);
    
    // Update book availability
    setBooks(books.map(b => 
      b.id === loanForm.bookId 
        ? { ...b, available: b.available - 1 }
        : b
    ));
    
    setIsLoanDialogOpen(false);
    setLoanForm({
      bookId: '',
      studentId: '',
      studentName: ''
    });
    
    toast({
      title: "Préstamo creado",
      description: "El préstamo ha sido registrado exitosamente.",
    });
  };

  const handleReturnBook = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    setLoans(loans.map(l => 
      l.id === loanId 
        ? { ...l, returnDate: new Date().toISOString().split('T')[0], status: 'returned' }
        : l
    ));
    
    // Update book availability
    setBooks(books.map(b => 
      b.id === loan.bookId 
        ? { ...b, available: b.available + 1 }
        : b
    ));
    
    toast({
      title: "Libro devuelto",
      description: "El libro ha sido devuelto exitosamente.",
    });
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-primary text-primary-foreground">Activo</Badge>;
      case 'returned':
        return <Badge className="bg-success text-success-foreground">Devuelto</Badge>;
      case 'overdue':
        return <Badge className="bg-destructive text-destructive-foreground">Vencido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const categories = [...new Set(books.map(book => book.category))];
  const availableBooks = books.filter(book => book.available > 0);
  const activeLoans = loans.filter(loan => loan.status === 'active').length;
  const overdueLoans = loans.filter(loan => loan.status === 'overdue').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Biblioteca</h1>
          <p className="text-muted-foreground">Gestión del catálogo y préstamos de libros</p>
        </div>
        
        <div className="flex space-x-2">
          {user?.role === 'ADMIN' && (
            <>
              <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Libro
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Libro</DialogTitle>
                    <DialogDescription>
                      Completa los datos del libro para agregarlo al catálogo
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleAddBook} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={bookForm.title}
                        onChange={(e) => setBookForm({...bookForm, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="author">Autor</Label>
                      <Input
                        id="author"
                        value={bookForm.author}
                        onChange={(e) => setBookForm({...bookForm, author: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input
                        id="isbn"
                        value={bookForm.isbn}
                        onChange={(e) => setBookForm({...bookForm, isbn: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Input
                          id="category"
                          value={bookForm.category}
                          onChange={(e) => setBookForm({...bookForm, category: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="copies">Ejemplares</Label>
                        <Input
                          id="copies"
                          type="number"
                          min="1"
                          value={bookForm.copies}
                          onChange={(e) => setBookForm({...bookForm, copies: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                          id="location"
                          value={bookForm.location}
                          onChange={(e) => setBookForm({...bookForm, location: e.target.value})}
                          placeholder="Ej: A-101"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="publishYear">Año</Label>
                        <Input
                          id="publishYear"
                          type="number"
                          min="1900"
                          max="2024"
                          value={bookForm.publishYear}
                          onChange={(e) => setBookForm({...bookForm, publishYear: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsBookDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-admin hover:bg-admin/90">
                        Agregar
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isLoanDialogOpen} onOpenChange={setIsLoanDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Préstamo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Préstamo</DialogTitle>
                    <DialogDescription>
                      Registra un nuevo préstamo de libro a un estudiante
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleCreateLoan} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bookSelect">Libro</Label>
                      <Select value={loanForm.bookId} onValueChange={(value) => setLoanForm({...loanForm, bookId: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un libro" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableBooks.map(book => (
                            <SelectItem key={book.id} value={book.id}>
                              {book.title} ({book.available} disponibles)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Código de Estudiante</Label>
                      <Input
                        id="studentId"
                        value={loanForm.studentId}
                        onChange={(e) => setLoanForm({...loanForm, studentId: e.target.value})}
                        placeholder="Ej: 2021001"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Nombre del Estudiante</Label>
                      <Input
                        id="studentName"
                        value={loanForm.studentName}
                        onChange={(e) => setLoanForm({...loanForm, studentName: e.target.value})}
                        placeholder="Nombre completo"
                        required
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsLoanDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        Crear Préstamo
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Libros</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{books.length}</div>
            <p className="text-xs text-muted-foreground">
              {books.reduce((total, book) => total + book.copies, 0)} ejemplares
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Préstamos Activos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeLoans}</div>
            <p className="text-xs text-muted-foreground">
              En curso
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Préstamos Vencidos</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{overdueLoans}</div>
            <p className="text-xs text-destructive">
              Requieren atención
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-custom-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Libros Disponibles</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {books.reduce((total, book) => total + book.available, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Para préstamo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={selectedTab === 'books' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedTab('books')}
        >
          Catálogo de Libros
        </Button>
        <Button
          variant={selectedTab === 'loans' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedTab('loans')}
        >
          Préstamos
        </Button>
      </div>

      {/* Books Tab */}
      {selectedTab === 'books' && (
        <Card className="shadow-custom-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Catálogo de Libros</span>
              </CardTitle>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar libros..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Libro</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Disponibilidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{book.title}</div>
                        <div className="text-sm text-muted-foreground">Año: {book.publishYear}</div>
                      </div>
                    </TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{book.isbn}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{book.category}</Badge>
                    </TableCell>
                    <TableCell>{book.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={book.available > 0 ? 'default' : 'destructive'}
                          className={book.available > 0 ? 'bg-success text-success-foreground' : ''}
                        >
                          {book.available}/{book.copies}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {book.available > 0 ? 'Disponible' : 'No disponible'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Loans Tab */}
      {selectedTab === 'loans' && (
        <Card className="shadow-custom-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Gestión de Préstamos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Libro</TableHead>
                  <TableHead>Estudiante</TableHead>
                  <TableHead>Fecha Préstamo</TableHead>
                  <TableHead>Fecha Vencimiento</TableHead>
                  <TableHead>Fecha Devolución</TableHead>
                  <TableHead>Estado</TableHead>
                  {user?.role === 'ADMIN' && <TableHead>Acciones</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell>
                      <div className="font-medium">{loan.bookTitle}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{loan.studentName}</div>
                        <div className="text-sm text-muted-foreground">{loan.studentId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(loan.loanDate).toLocaleDateString('es-ES')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(loan.dueDate).toLocaleDateString('es-ES')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {loan.returnDate ? (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(loan.returnDate).toLocaleDateString('es-ES')}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(loan.status)}
                    </TableCell>
                    {user?.role === 'ADMIN' && (
                      <TableCell>
                        {loan.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReturnBook(loan.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Devolver
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}