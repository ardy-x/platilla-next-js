import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ENVS } from '@/config/envs.config';

const limpiarCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('datosUsuario');
  cookieStore.delete('datosSistema');
  cookieStore.delete('ubicacionUsuario');
};

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    await limpiarCookies();
    return NextResponse.json({ error: true, message: 'No refresh token found' }, { status: 401 });
  }

  try {
    const response = await fetch(`${ENVS.api.url}/autenticacion/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Refresh ${refreshToken}`,
      },
    });

    if (!response.ok) {
      await limpiarCookies();
      return NextResponse.json({ error: true, message: 'Failed to refresh token' }, { status: response.status });
    }

    const data = await response.json();

    // Actualizar cookies con los nuevos tokens
    if (data.response?.tokens) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.response.tokens;

      cookieStore.set('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: '/',
      });

      cookieStore.set('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 días
        path: '/',
      });
    }

    return NextResponse.json({ error: false, message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Error refreshing token:', error);
    await limpiarCookies();
    return NextResponse.json({ error: true, message: 'Internal server error' }, { status: 500 });
  }
}
