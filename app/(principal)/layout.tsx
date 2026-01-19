'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { ENVS } from '@/config/envs.config';

export default function LayoutPrincipal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="flex h-screen w-full flex-col">
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 bg-background border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <span>{ENVS.app.name}</span>
              </div>
              <div className="px-4">
                <ModeToggle />
              </div>
            </header>
            <div className="flex-1 min-h-0 p-4 overflow-auto">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </>
  );
}
