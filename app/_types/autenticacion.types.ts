interface Submodulo {
  nombre: string;
  ruta: string;
  icono: string;
  orden: number;
  submodulos: Array<Submodulo>;
}

export interface DatosSistema {
  id: string;
  modulos: Array<{
    nombre: string;
    ruta: string;
    icono: string;
    orden: number;
    submodulos: Array<{
      nombre: string;
      ruta: string;
      icono: string;
      orden: number;
      submodulos: Array<Submodulo>;
    }>;
  }>;
  permisos: string[];
  rol: string;
}

export interface DatosUsuario {
  idUsuario: string;
  nombreUsuario: string;
  correo: string;
  activo: boolean;
  nombreCompleto: string;
  nombre: string;
  apellido: string;
  imagenUsuario: string;
  verificado: boolean;
  creadoEn: string;
  ultimoAcceso: string;
  unidad: string;
  grado: string;
}

export interface UbicacionUsuario {
  departamento: string;
  idDepartamento: number;
  latitud: number;
  longitud: number;
}

export interface DatosIntercambioCodigo {
  datosSistema: DatosSistema;
  datosUsuario: DatosUsuario;
  ubicacionUsuario?: UbicacionUsuario;
}

export interface RespuestaIntercambioCodigo extends DatosIntercambioCodigo {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  iat: number;
  exp: number;
}
