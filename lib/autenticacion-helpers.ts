import { cookies } from 'next/headers';
import type { DatosSistema, DatosUsuario, UbicacionUsuario } from '@/app/_types/autenticacion.types';

/**
 * Obtiene los datos del usuario autenticado desde las cookies
 */
export async function obtenerDatosUsuario(): Promise<DatosUsuario | null> {
  const cookieStore = await cookies();
  const datosUsuarioCookie = cookieStore.get('datosUsuario')?.value;

  if (!datosUsuarioCookie) {
    return null;
  }

  try {
    return JSON.parse(datosUsuarioCookie) as DatosUsuario;
  } catch {
    return null;
  }
}

/**
 * Obtiene los datos del sistema desde las cookies
 */
export async function obtenerDatosSistema(): Promise<DatosSistema | null> {
  const cookieStore = await cookies();
  const datosSistemaCookie = cookieStore.get('datosSistema')?.value;

  if (!datosSistemaCookie) {
    return null;
  }

  try {
    return JSON.parse(datosSistemaCookie) as DatosSistema;
  } catch {
    return null;
  }
}

/**
 * Obtiene la ubicación del usuario desde las cookies
 */
export async function obtenerUbicacionUsuario(): Promise<UbicacionUsuario | null> {
  const cookieStore = await cookies();
  const ubicacionCookie = cookieStore.get('ubicacionUsuario')?.value;

  if (!ubicacionCookie) {
    return null;
  }

  try {
    return JSON.parse(ubicacionCookie) as UbicacionUsuario;
  } catch {
    return null;
  }
}

/**
 * Verifica si el usuario está autenticado
 */
export async function estaAutenticado(): Promise<boolean> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const datosUsuario = cookieStore.get('datosUsuario')?.value;
  const datosSistema = cookieStore.get('datosSistema')?.value;

  return !!(accessToken && datosUsuario && datosSistema);
}

/**
 * Verifica si el usuario tiene un rol específico
 */
export async function tieneRol(rolBuscado: string): Promise<boolean> {
  const datosSistema = await obtenerDatosSistema();

  if (!datosSistema?.rol) {
    return false;
  }

  // Comparación case-insensitive
  return datosSistema.rol.toLowerCase() === rolBuscado.toLowerCase();
}

/**
 * Verifica si el usuario tiene alguno de los roles especificados
 */
export async function tieneAlgunRol(roles: string[]): Promise<boolean> {
  const datosSistema = await obtenerDatosSistema();

  if (!datosSistema?.rol) {
    return false;
  }

  const rolUsuario = datosSistema.rol.toLowerCase();
  return roles.some((rol) => rol.toLowerCase() === rolUsuario);
}

/**
 * Verifica si el usuario tiene un permiso específico
 */
export async function tienePermiso(permiso: string): Promise<boolean> {
  const datosSistema = await obtenerDatosSistema();

  if (!datosSistema?.permisos || datosSistema.permisos.length === 0) {
    return false;
  }

  return datosSistema.permisos.includes(permiso);
}

/**
 * Verifica si el usuario tiene todos los permisos especificados
 */
export async function tieneTodosLosPermisos(permisos: string[]): Promise<boolean> {
  const datosSistema = await obtenerDatosSistema();

  if (!datosSistema?.permisos || datosSistema.permisos.length === 0) {
    return false;
  }

  return permisos.every((permiso) => datosSistema.permisos.includes(permiso));
}

/**
 * Verifica si el usuario tiene al menos uno de los permisos especificados
 */
export async function tieneAlgunPermiso(permisos: string[]): Promise<boolean> {
  const datosSistema = await obtenerDatosSistema();

  if (!datosSistema?.permisos || datosSistema.permisos.length === 0) {
    return false;
  }

  return permisos.some((permiso) => datosSistema.permisos.includes(permiso));
}

/**
 * Obtiene todos los datos de autenticación
 */
export async function obtenerDatosAutenticacion() {
  const [datosUsuario, datosSistema, ubicacionUsuario] = await Promise.all([obtenerDatosUsuario(), obtenerDatosSistema(), obtenerUbicacionUsuario()]);

  return {
    datosUsuario,
    datosSistema,
    ubicacionUsuario,
    estaAutenticado: !!(datosUsuario && datosSistema),
  };
}
