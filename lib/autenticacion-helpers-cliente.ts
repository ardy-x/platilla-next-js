'use client';

import type { DatosSistema, DatosUsuario, UbicacionUsuario } from '@/app/_types/autenticacion.types';

/**
 * Lee una cookie del navegador
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return value ? decodeURIComponent(value) : null;
}

/**
 * Parsea una cookie JSON
 */
function parseCookie<T>(name: string): T | null {
  const value = getCookie(name);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

/**
 * Obtiene los datos del usuario desde las cookies del navegador
 */
export function obtenerDatosUsuarioCliente(): DatosUsuario | null {
  return parseCookie<DatosUsuario>('datosUsuario');
}

/**
 * Obtiene los datos del sistema desde las cookies del navegador
 */
export function obtenerDatosSistemaCliente(): DatosSistema | null {
  return parseCookie<DatosSistema>('datosSistema');
}

/**
 * Obtiene la ubicación del usuario desde las cookies del navegador
 */
export function obtenerUbicacionUsuarioCliente(): UbicacionUsuario | null {
  return parseCookie<UbicacionUsuario>('ubicacionUsuario');
}

/**
 * Verifica si el usuario está autenticado (cliente)
 */
export function estaAutenticadoCliente(): boolean {
  const accessToken = getCookie('accessToken');
  const datosUsuario = getCookie('datosUsuario');
  const datosSistema = getCookie('datosSistema');

  return !!(accessToken && datosUsuario && datosSistema);
}

/**
 * Cierra la sesión del usuario
 */
export async function cerrarSesionCliente(idSistema: string): Promise<void> {
  const { cerrarSesionAction } = await import('@/app/(autenticacion)/auth/initialize/_acciones/cerrar-sesion');
  await cerrarSesionAction(idSistema);
  window.close();
}

/**
 * Verifica si el usuario tiene un rol específico (cliente)
 */
export function tieneRolCliente(rolBuscado: string): boolean {
  const datosSistema = obtenerDatosSistemaCliente();

  if (!datosSistema?.rol) {
    return false;
  }

  return datosSistema.rol.toLowerCase() === rolBuscado.toLowerCase();
}

/**
 * Verifica si el usuario tiene alguno de los roles especificados (cliente)
 */
export function tieneAlgunRolCliente(roles: string[]): boolean {
  const datosSistema = obtenerDatosSistemaCliente();

  if (!datosSistema?.rol) {
    return false;
  }

  const rolUsuario = datosSistema.rol.toLowerCase();
  return roles.some((rol) => rol.toLowerCase() === rolUsuario);
}

/**
 * Verifica si el usuario tiene un permiso específico (cliente)
 */
export function tienePermisoCliente(permiso: string): boolean {
  const datosSistema = obtenerDatosSistemaCliente();

  if (!datosSistema?.permisos || datosSistema.permisos.length === 0) {
    return false;
  }

  return datosSistema.permisos.includes(permiso);
}

/**
 * Verifica si el usuario tiene todos los permisos especificados (cliente)
 */
export function tieneTodosLosPermisosCliente(permisos: string[]): boolean {
  const datosSistema = obtenerDatosSistemaCliente();

  if (!datosSistema?.permisos || datosSistema.permisos.length === 0) {
    return false;
  }

  return permisos.every((permiso) => datosSistema.permisos.includes(permiso));
}

/**
 * Verifica si el usuario tiene al menos uno de los permisos especificados (cliente)
 */
export function tieneAlgunPermisoCliente(permisos: string[]): boolean {
  const datosSistema = obtenerDatosSistemaCliente();

  if (!datosSistema?.permisos || datosSistema.permisos.length === 0) {
    return false;
  }

  return permisos.some((permiso) => datosSistema.permisos.includes(permiso));
}
