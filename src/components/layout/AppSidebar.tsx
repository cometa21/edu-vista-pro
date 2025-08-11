import { 
  BookOpen, 
  Calendar, 
  CreditCard, 
  FileText, 
  GraduationCap, 
  Home, 
  Settings, 
  Users, 
  BarChart3,
  Presentation,
  UserCheck,
  FileSearch,
  Plus
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<any>;
  roles: UserRole[];
}

const navigationItems: NavigationItem[] = [
  // Common
  { title: 'Dashboard', url: '/dashboard', icon: Home, roles: ['ADMIN', 'DOCEN', 'ALUMN'] },
  
  // Admin routes
  { title: 'Gestionar Alumnos', url: '/gestion-alumnos', icon: Users, roles: ['ADMIN'] },
  { title: 'Gestionar Docentes', url: '/gestion-docentes', icon: UserCheck, roles: ['ADMIN'] },
  { title: 'Reportes Financieros', url: '/reportes-financieros', icon: BarChart3, roles: ['ADMIN'] },
  
  // Teacher routes
  { title: 'Portal del Docente', url: '/portal-docente', icon: Presentation, roles: ['DOCEN'] },
  { title: 'Mis Clases', url: '/mis-clases', icon: BookOpen, roles: ['DOCEN'] },
  
  // Student routes
  { title: 'Mi Horario', url: '/horario', icon: Calendar, roles: ['ALUMN'] },
  { title: 'Mis Pagos', url: '/pagos', icon: CreditCard, roles: ['ALUMN'] },
  { title: 'Mis Calificaciones', url: '/calificaciones', icon: GraduationCap, roles: ['ALUMN'] },
  { title: 'Mis Documentos', url: '/mis-documentos', icon: FileText, roles: ['ALUMN'] },
  { title: 'Solicitar Documentos', url: '/solicitar-documentos', icon: Plus, roles: ['ALUMN'] },
];

export function AppSidebar() {
  const sidebar = useSidebar();
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const userNavItems = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  const isActive = (path: string) => location.pathname === path;
  
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN': return 'admin';
      case 'DOCEN': return 'teacher';
      case 'ALUMN': return 'student';
      default: return 'primary';
    }
  };

  const roleColor = getRoleColor(user.role);
  const isCollapsed = sidebar.state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"}>
      <SidebarContent>
        {/* Logo and Brand */}
        {!isCollapsed && (
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-${roleColor} to-${roleColor}/80 flex items-center justify-center`}>
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">EduVista Pro</h1>
                <p className="text-xs text-sidebar-foreground/60">
                  {user.role === 'ADMIN' ? 'Administrador' : 
                   user.role === 'DOCEN' ? 'Docente' : 'Estudiante'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Navegación Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? `bg-${roleColor}/10 text-${roleColor} border-r-2 border-${roleColor}` 
                            : 'hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${roleColor} to-${roleColor}/80 flex items-center justify-center`}>
                <span className="text-sm font-medium text-white">
                  {user.fullName?.charAt(0) || user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.fullName || user.username}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}