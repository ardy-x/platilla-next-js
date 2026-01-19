'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error de Autenticación</h1>
        <p className="text-muted-foreground mb-6">{error.message || 'Ocurrió un error al inicializar la sesión.'}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Intentar nuevamente</Button>
        </div>
      </div>
    </div>
  );
}
