'use server';

import { cookies } from 'next/headers';
import privateApiServer from '@/api/private-api-server';

export async function cerrarSesionAction(idSistema: string): Promise<void> {
  // Llamar al backend usando el cliente API privado del servidor
  try {
    await privateApiServer.post('/autenticacion/cierre-sesion-sistema', { idSistema });
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
