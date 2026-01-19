'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { intercambiarCodigoAction } from './_acciones/intercambiar-codigo';

export default function InicializarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codigoAuth = searchParams.get('auth');

    if (!codigoAuth) {
      setError('No se encontraron datos de autenticación en la URL. Accede desde el sistema de autenticación.');
      return;
    }

    // Llamar a la Server Action directamente
    intercambiarCodigoAction(codigoAuth)
      .then(() => {
        router.replace('/dashboard');
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error de Autenticación</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return null;
}
