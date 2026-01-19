import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
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

        {/* Footer - Usuario */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="p-2 rounded-md">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Contenido Principal */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Skeleton className="h-6 w-48" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 p-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
              <Separator className="my-6" />
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
