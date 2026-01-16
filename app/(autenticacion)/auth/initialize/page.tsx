'use client';

import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { ENVS } from '@/config/envs.config';
import { useInicializacionAutenticacion } from '@/hooks/autenticacion/use-inicializacion-autenticacion';

function InicializarContenido() {
  const { error, loading } = useInicializacionAutenticacion();

  if (error) {
    return <div className="min-h-screen flex items-center justify-center p-4"></div>;
  }

  if (loading) {
    return (
      <SidebarProvider>
        {/* Skeleton del Sidebar simulando AppSidebar */}
        <Sidebar collapsible="icon">
          {/* Header - Logo del sistema */}
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-64" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          {/* Content - Módulos y submódulos */}
          <SidebarContent>
            <div className="space-y-4 p-2">
              {Array.from({ length: 3 }).map((_, sectionIndex) => (
                <div key={sectionIndex} className="space-y-2">
                  <Skeleton className="h-5 w-20 ml-2" />
                  <div className="space-y-1">
                    {Array.from({ length: 3 }).map((_, itemIndex) => (
                      <div key={itemIndex} className="p-2 rounded-md">
                        <Skeleton className="h-7.5 w-56" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SidebarContent>

          {/* Footer - Información del usuario */}
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="flex flex-col gap-1 flex-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <main className="flex h-screen w-full flex-col">
            {/* Skeleton del Header - estructura exacta */}
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 bg-background border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Skeleton className="h-6 w-6 -ml-1 rounded-md" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <span>{ENVS.app.name}</span>
              </div>

              <div className="flex items-center gap-2 px-4">
                <Skeleton className="h-5 w-20 text-xs rounded-full" />
                <Separator orientation="vertical" className="h-4" />
                <Skeleton className="h-6 w-16 rounded-md" />
                <Separator orientation="vertical" className="h-4" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Separator orientation="vertical" className="h-4" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </header>
            {/* Skeleton Main*/}
            <div className="p-4 h-full"></div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return null;
}

export default function InicializaPage() {
  return <InicializarContenido />;
}
