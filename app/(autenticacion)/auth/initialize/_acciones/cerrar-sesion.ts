'use server';

import { cookies } from 'next/headers';
import privateApi from '@/api/private-api';

export async function cerrarSesionAction(idSistema: string): Promise<void> {
  // Llamar al backend usando el cliente API privado
  try {
    await privateApi.post('/autenticacion/cierre-sesion-sistema', { idSistema });
  } catch (error) {
    console.error('Error al cerrar sesión en el backend:', error);
  }

  // Limpiar cookies locales
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('datosUsuario');
  cookieStore.delete('datosSistema');
  cookieStore.delete('ubicacionUsuario');
}
