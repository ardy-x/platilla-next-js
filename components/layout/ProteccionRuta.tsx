'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProteccionRuta({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [autenticado, setAutenticado] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar si existe el token de acceso
    const token = localStorage.getItem('accessToken');
    const datosUsuario = localStorage.getItem('datosUsuario');
    const datosSistema = localStorage.getItem('datosSistema');

    // Si no hay token o datos de usuario, redirigir a unauthorized
    if (!token || !datosUsuario || !datosSistema) {
      router.replace('/auth/unauthorized');
      setAutenticado(false);
    } else {
      setAutenticado(true);
    }
  }, [router]);

  // No renderizar nada mientras verifica
  if (autenticado === null) {
    return null;
  }

  // Solo renderizar children si está autenticado
  if (!autenticado) {
    return null;
  }

  return <>{children}</>;
}
