import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { obtenerMensajeError } from '@/lib/api-helpers';
import { autenticacionService } from '@/services/autenticacion-service';
import { useAutenticacion } from './use-autenticacion';

export function useInicializacionAutenticacion() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { setDatosUsuario, setDatosSistema, setDatosUbicacion } = useAutenticacion();

  const inicializadoRef = useRef(false);

  const inicializarAutenticacion = useCallback(async () => {
    inicializadoRef.current = true;
    try {
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const codigoAuth = params ? params.get('auth') : null;

      if (!codigoAuth || !codigoAuth.length) {
        setError('No se encontraron datos de autenticación en la URL. Accede desde el sistema de autenticación.');
        setLoading(false);
        return;
      }

      // Limpiar el parámetro auth de la URL inmediatamente
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', '/auth/initialize');
      }

      const respuesta = await autenticacionService.intercambiarCodigo(codigoAuth);
      const datosUsuario = respuesta.datosUsuario;
      const datosSistema = {
        roles: respuesta.datosSistema?.rol,
        modulos: respuesta.datosSistema?.modulos,
        permisos: respuesta.datosSistema?.permisos,
      };
      const ubicacionUsuario = respuesta.ubicacionUsuario;

      setDatosUsuario(datosUsuario);
      setDatosSistema(datosSistema);
      if (ubicacionUsuario) {
        setDatosUbicacion(ubicacionUsuario);
      }
      setTimeout(() => {
        router.replace('/dashboard');
        setLoading(false);
      }, 5000);
    } catch (error) {
      setError(obtenerMensajeError(error));
      setLoading(false);
    }
  }, [setDatosUsuario, setDatosSistema, setDatosUbicacion, router]);

  useEffect(() => {
    if (inicializadoRef.current) {
      return;
    }
    inicializarAutenticacion();
  }, [inicializarAutenticacion]);

  return { error, loading };
}
