'use client';

import Image from 'next/image';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { ENVS } from '@/config/envs.config';

export function NavSystem() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <Image src="/logos/logo-sistema.webp" alt="Logo del sistema" width={32} height={32} className="object-contain rounded-full bg-white" />

          <span className="font-semibold whitespace-normal wrap-break">{ENVS.app.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
