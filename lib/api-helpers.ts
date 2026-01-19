import type { RespuestaBase } from '@/app/_types/respuesta.types';

export class FetchError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

export function extraerDatos<T>(response: RespuestaBase<T>): T {
  const { error, message, response: data } = response;
  if (error) {
    throw new FetchError(message || 'Error desconocido');
  }
  return data as T;
}

export function extraerMensajeExito<T>(response: RespuestaBase<T>): string {
  const { error, message } = response;
  if (error) {
    throw new FetchError(message || 'Error desconocido');
  }
  return message || 'Operación exitosa';
}

export function obtenerMensajeError(error: unknown): string {
  // PRIORIDAD 1: Error personalizado con mensaje del backend
  if (error instanceof FetchError) {
    return error.message;
  }

  // PRIORIDAD 2: Errores de fetch nativos
  if (error instanceof DOMException) {
    if (error.name === 'AbortError') {
      return 'La solicitud tardó demasiado tiempo. Intenta nuevamente';
    }
  }

  // PRIORIDAD 3: TypeError (común en fetch)
  if (error instanceof TypeError) {
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return 'No se pudo conectar al servidor. Verifica tu conexión';
    }
    return 'Error de conexión. Verifica tu conexión a internet';
  }

  // PRIORIDAD 4: Errores genéricos con mensaje
  if (error instanceof Error) {
    // Verificar mensajes específicos
    if (error.message.includes('timeout') || error.message.includes('aborted')) {
      return 'La solicitud tardó demasiado tiempo. Intenta nuevamente';
    }

    if (error.message.includes('network') || error.message.includes('Network')) {
      return 'No se pudo conectar al servidor. Verifica tu conexión';
    }

    return error.message;
  }

  // PRIORIDAD 5: Fallback genérico
  return 'Error desconocido';
}

/**
 * Maneja respuestas de fetch y lanza errores apropiados
 */
export async function manejarRespuestaFetch<T>(response: Response): Promise<RespuestaBase<T>> {
  if (!response.ok) {
    // Intentar extraer el mensaje del backend
    try {
      const errorData: RespuestaBase = await response.json();
      throw new FetchError(errorData.message || `Error del servidor (${response.status})`, response.status);
    } catch (e) {
      // Si no se puede parsear el JSON, usar mensaje genérico
      if (e instanceof FetchError) {
        throw e;
      }
      throw new FetchError(`Error del servidor (${response.status})`, response.status);
    }
  }

  return response.json();
}
