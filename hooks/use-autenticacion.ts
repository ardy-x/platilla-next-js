'use client';

import type { DatosSistema, DatosUsuario, UbicacionUsuario } from '@/app/_types/autenticacion.types';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return value ? decodeURIComponent(value) : null;
}

function parseCookie<T>(name: string): T | null {
  const value = getCookie(name);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch (e) {
    console.error(`Error parsing ${name}:`, e);
    return null;
  }
}

export function useAutenticacion() {
  // Leer directo de cookies (fuente de verdad)
  const datosUsuario = parseCookie<DatosUsuario>('datosUsuario');
  const datosSistema = parseCookie<DatosSistema>('datosSistema');
  const datosUbicacion = parseCookie<UbicacionUsuario>('ubicacionUsuario');

  const cerrarSesion = async () => {
    // Obtener el ID del sistema de las cookies
    const idSistema = datosSistema?.id || '';

    // Llamar Server Action para cerrar sesión en backend y limpiar cookies
    const { cerrarSesionAction } = await import('@/app/(autenticacion)/auth/initialize/_acciones/cerrar-sesion');
    await cerrarSesionAction(idSistema);

    // Cerrar la ventana
    window.close();
  };

  return {
    datosUsuario,
    datosSistema,
    datosUbicacion,
    cerrarSesion,
  };
}
