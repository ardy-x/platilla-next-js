import { type NextRequest, NextResponse } from 'next/server';

// Rutas protegidas (requieren autenticación)
const protectedRoutes = ['/dashboard'];

// Rutas públicas (no requieren autenticación)
const publicRoutes = ['/auth/initialize', '/auth/unauthorized'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  // Obtener cookies de autenticación
  const accessToken = req.cookies.get('accessToken')?.value;
  const datosUsuario = req.cookies.get('datosUsuario')?.value;
  const datosSistema = req.cookies.get('datosSistema')?.value;

  // Verificar si el usuario está autenticado
  const isAuthenticated = accessToken && datosUsuario && datosSistema;

  // Redirigir a unauthorized si intenta acceder a ruta protegida sin autenticación
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
  }

  // Redirigir a dashboard si ya está autenticado e intenta acceder a rutas de auth
  if (isPublicRoute && isAuthenticated && !path.startsWith('/auth/unauthorized')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Configuración: rutas donde el middleware NO debe ejecutarse
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logos|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)',
  ],
};
