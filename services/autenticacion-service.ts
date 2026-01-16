import { guardarToken } from '@/api/private-api';
import publicApi from '@/api/public-api';
import { extraerDatos } from '@/lib/api-helpers';
import type { DatosIntercambioCodigo, RespuestaIntercambioCodigo } from '@/types/autenticacion.types';

export const autenticacionService = {
  intercambiarCodigo: async (codigo: string): Promise<DatosIntercambioCodigo> => {
    const response = await publicApi.get<RespuestaIntercambioCodigo>(`/autenticacion/intercambio-codigo/${codigo}`);
    const respuesta = extraerDatos<RespuestaIntercambioCodigo>(response);

    guardarToken(respuesta.tokens.accessToken, respuesta.tokens.refreshToken);

    // Retornar solo los datos sin los tokens
    return {
      datosSistema: respuesta.datosSistema,
      datosUsuario: respuesta.datosUsuario,
      ubicacionUsuario: respuesta.ubicacionUsuario,
    };
  },
};
