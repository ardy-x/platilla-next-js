'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function PaginaSinAcceso() {
  const searchParams = useSearchParams();
  const expired = searchParams.get('expired') === 'true';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 gap-8">
      <div className="flex items-center gap-12 max-w-7xl">
        <div className="shrink-0">
          <Image src="/logos/Adelita.webp" alt="Adelita" width={300} height={300} className="object-contain" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-6">
            <Image src="/logos/logo-policia.webp" alt="Policía Boliviana" width={100} height={100} className="object-contain" />
            <Image src="/logos/logo-dntt.webp" alt="DNTT" width={100} height={100} className="object-contain" />
          </div>
          <h1 className="text-5xl text-center font-bold text-red-500">¡Acceso No Autorizado!</h1>
          <p className="text-2xl text-center text-muted-foreground">
            {expired ? 'Tu sesión ha expirado. Inicia sesión nuevamente desde Kerberos (Sistema Unificado de Acceso Policial)' : 'Inicia sesión desde Kerberos (Sistema Unificado de Acceso Policial)'}
          </p>
        </div>
      </div>
    </div>
  );
}
