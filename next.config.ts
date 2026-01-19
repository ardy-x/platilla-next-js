import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Optimización de producción
  compress: true,
  poweredByHeader: false,

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Configuración de imágenes remotas si es necesario
  images: {
    remotePatterns: [
      // Agregar dominios permitidos aquí si usas imágenes externas
      // {
      //   protocol: 'https',
      //   hostname: 'ejemplo.com',
      // },
    ],
  },
};

export default nextConfig;
