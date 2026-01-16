'use client';

import {
  Ambulance,
  BarChart3,
  Calendar,
  CheckCircle,
  ClockAlert,
  Home,
  type LucideIcon,
  MapPin,
  MessageSquareWarning,
  Monitor,
  MonitorCheck,
  Settings,
  ShieldAlert,
  User,
  UserRound,
  UsersRound,
} from 'lucide-react';
import { NavSections } from '@/components/nav-sections';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { useAutenticacion } from '@/hooks/autenticacion/use-autenticacion';
import { NavSystem } from './nav-system';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { datosSistema, datosUsuario, cerrarSesion } = useAutenticacion();

  const getIcon = (iconName?: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      Home: Home,
      UsersRound: UsersRound,
      BarChart3: BarChart3,
      MonitorCheck: MonitorCheck,
      User: User,
      ShieldAlert: ShieldAlert,
      CheckCircle: CheckCircle,
      Calendar: Calendar,
      MapPin: MapPin,
      Monitor: Monitor,
      UserRound: UserRound,
      MessageSquareWarning: MessageSquareWarning,
      ClockAlert: ClockAlert,
      Settings: Settings,
      FileText: BarChart3,
      Ambulance: Ambulance,
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
            rol: datosSistema.roles,
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
