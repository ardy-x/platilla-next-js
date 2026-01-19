'use client';

import { BarChart3, Calendar, CheckCircle, Home, type LucideIcon, MessageSquareWarning, Monitor, MonitorCheck, Settings, User, UserRound, UsersRound } from 'lucide-react';
import { NavSections } from '@/components/nav-sections';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAutenticacion } from '@/hooks/use-autenticacion';
import { NavSystem } from './nav-system';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { datosSistema, datosUsuario, cerrarSesion } = useAutenticacion();

  // Validar que los datos estén disponibles - mostrar skeleton durante carga inicial
  if (!datosSistema || !datosUsuario) {
    return (
      <Sidebar {...props}>
        <SidebarHeader>
          <Skeleton className="h-10 w-full" />
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-2 p-2 mt-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-12 w-full" />
        </SidebarFooter>
      </Sidebar>
    );
  }

  const getIcon = (iconName?: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      Home: Home,
      UsersRound: UsersRound,
      BarChart3: BarChart3,
      MonitorCheck: MonitorCheck,
      User: User,
      CheckCircle: CheckCircle,
      Calendar: Calendar,
      Monitor: Monitor,
      UserRound: UserRound,
      MessageSquareWarning: MessageSquareWarning,
      Settings: Settings,
      FileText: BarChart3,
    };
    const normalizedIconName = iconName?.replace(/\s+/g, '').replace(/^\w/, (c) => c.toUpperCase()) || '';
    return iconMap[normalizedIconName] || Home;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavSystem />
      </SidebarHeader>
      <SidebarContent>
        {/* Módulos del sistema */}
        {datosSistema.modulos.map((modulo) => (
          <NavSections
            key={modulo.nombre}
            secciones={modulo.submodulos.map((submodulo) => ({
              nombre: submodulo.nombre,
              url: submodulo.ruta,
              icono: getIcon(submodulo.icono),
            }))}
            titulo={modulo.nombre}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          usuario={{
            nombre: datosUsuario.nombreCompleto,
            correo: datosUsuario.correo,
            avatar: datosUsuario.imagenUsuario,
            rol: datosSistema.rol,
            nombreUsuario: datosUsuario.nombreUsuario,
            unidad: datosUsuario.unidad,
            activo: datosUsuario.activo,
            verificado: datosUsuario.verificado,
            ultimoAcceso: datosUsuario.ultimoAcceso,
          }}
          onCerrarSesion={cerrarSesion}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
