'use client';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';

export function NavSections({
  secciones,
  titulo = 'Sección',
}: {
  secciones: {
    nombre: string;
    url: string;
    icono: LucideIcon;
  }[];
  titulo?: string;
}) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const pathname = usePathname();

  return (
    <SidebarGroup className={isCollapsed ? '' : 'group-data-[collapsible=icon]:hidden'}>
      {!isCollapsed && <SidebarGroupLabel>{titulo}</SidebarGroupLabel>}
      <SidebarMenu>
        {secciones.map((elemento) => {
          const isActive = pathname === elemento.url || pathname.startsWith(`${elemento.url}/`);
          return (
            <SidebarMenuItem key={elemento.nombre}>
              <SidebarMenuButton asChild className={isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''} tooltip={isCollapsed ? elemento.nombre : undefined}>
                <Link href={elemento.url}>
                  <elemento.icono />
                  {!isCollapsed && <span>{elemento.nombre}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
