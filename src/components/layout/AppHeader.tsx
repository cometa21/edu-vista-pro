import { Bell, Moon, Sun, LogOut, Menu, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

export function AppHeader() {
  const { user, logout } = useAuth();
  const { theme, setTheme, effectiveTheme } = useTheme();

  const getRoleColor = () => {
    switch (user?.role) {
      case 'ADMIN': return 'admin';
      case 'DOCEN': return 'teacher';
      case 'ALUMN': return 'student';
      default: return 'primary';
    }
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'ADMIN': return 'Administrador';
      case 'DOCEN': return 'Docente';
      case 'ALUMN': return 'Estudiante';
      default: return '';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Left side - Sidebar trigger and breadcrumb */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="h-9 w-9" />
          <div className="hidden md:flex items-center space-x-2">
            <h1 className="text-lg font-semibold text-foreground">EduVista Pro</h1>
            <Badge variant="outline" className={`bg-${getRoleColor()}/10 text-${getRoleColor()} border-${getRoleColor()}/20`}>
              {getRoleLabel()}
            </Badge>
          </div>
        </div>

        {/* Right side - Actions and user menu */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center">
              <span className="text-[10px] text-destructive-foreground">3</span>
            </span>
          </Button>

          {/* Theme toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {effectiveTheme === 'dark' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Oscuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <User className="mr-2 h-4 w-4" />
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-${getRoleColor()} to-${getRoleColor()}/80 flex items-center justify-center`}>
                  <span className="text-sm font-medium text-white">
                    {user?.fullName?.charAt(0) || user?.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.fullName || user?.username}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-${getRoleColor()} to-${getRoleColor()}/80 flex items-center justify-center`}>
                  <span className="text-sm font-medium text-white">
                    {user?.fullName?.charAt(0) || user?.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.fullName || user?.username}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}