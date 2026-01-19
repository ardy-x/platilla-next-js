'use server';

import { cookies } from 'next/headers';
import publicApiServer from '@/api/public-api-server';
import type { DatosIntercambioCodigo, RespuestaIntercambioCodigo } from '@/app/_types/autenticacion.types';

export async function intercambiarCodigoAction(codigo: string): Promise<DatosIntercambioCodigo> {
  // Llamar al backend usando el cliente API
  const data = await publicApiServer.post<RespuestaIntercambioCodigo>('/autenticacion/intercambio-codigo', { codigo });

  if (!data.response) {
    throw new Error('Respuesta inválida del servidor');
  }

  const respuesta = data.response;

  // Guardar tokens en cookies HttpOnly
  const cookieStore = await cookies();
  cookieStore.set('accessToken', respuesta.tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15, // 15 minutos
    path: '/',
  });

  cookieStore.set('refreshToken', respuesta.tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  });

  // Guardar datos del usuario en cookies (no HttpOnly para acceso desde cliente)
  cookieStore.set('datosUsuario', JSON.stringify(respuesta.datosUsuario), {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  cookieStore.set('datosSistema', JSON.stringify(respuesta.datosSistema), {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  if (respuesta.ubicacionUsuario) {
    cookieStore.set('ubicacionUsuario', JSON.stringify(respuesta.ubicacionUsuario), {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
  }

  // Retornar solo los datos sin los tokens
  return {
    datosSistema: respuesta.datosSistema,
    datosUsuario: respuesta.datosUsuario,
    ubicacionUsuario: respuesta.ubicacionUsuario,
  };
}
