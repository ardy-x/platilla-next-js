import { useEffect, useState } from 'react';

interface DatosUsuario {
  idUsuario: string;
  nombreCompleto: string;
  correo: string;
  imagenUsuario: string;
  nombreUsuario: string;
  activo: boolean;
  verificado: boolean;
  creadoEn: string;
  ultimoAcceso: string;
  unidad: string;
}

interface DatosModulo {
  nombre: string;
  ruta: string;
  icono: string;
  orden: number;
  submodulos: Submodulo[];
}

interface Submodulo {
  icono: string;
  nombre: string;
  orden: number;
  ruta: string;
}

interface DatosSistema {
  roles: string;
  modulos: DatosModulo[];
  permisos: string[];
}

interface DatosUbicacion {
  idDepartamento: number;
  departamento: string;
  latitud?: number | null;
  longitud?: number | null;
}

export function useAuth() {
  const defaultDatosUsuario: DatosUsuario = {
    idUsuario: '',
    nombreCompleto: '',
    correo: '',
    imagenUsuario: '',
    nombreUsuario: '',
    activo: false,
    verificado: false,
    creadoEn: '',
    ultimoAcceso: '',
    unidad: '',
  };

  const defaultDatosSistema: DatosSistema = {
    roles: '',
    modulos: [],
    permisos: [],
  };

  const [datosUsuario, setDatosUsuarioState] = useState<DatosUsuario>(defaultDatosUsuario);
  const [datosSistema, setDatosSistemaState] = useState<DatosSistema>(defaultDatosSistema);
  const defaultDatosUbicacion: DatosUbicacion = {
    idDepartamento: 0,
    departamento: '',
    latitud: null,
    longitud: null,
  };
  const [ubicacionUsuario, setUbicacionUsuarioState] = useState<DatosUbicacion>(defaultDatosUbicacion);

  useEffect(() => {
    const usuario = localStorage.getItem('datosUsuario');
    const sistema = localStorage.getItem('datosSistema');
    const ubicacion = localStorage.getItem('ubicacionUsuario');

    if (usuario && usuario !== 'undefined' && usuario !== 'null') {
      try {
        setDatosUsuarioState(JSON.parse(usuario));
      } catch (error) {
        console.error('Error parsing datosUsuario:', error);
        localStorage.removeItem('datosUsuario');
      }
    }

    if (sistema && sistema !== 'undefined' && sistema !== 'null') {
      try {
        setDatosSistemaState(JSON.parse(sistema));
      } catch (error) {
        console.error('Error parsing datosSistema:', error);
        localStorage.removeItem('datosSistema');
      }
    }

    if (ubicacion && ubicacion !== 'undefined' && ubicacion !== 'null') {
      try {
        setUbicacionUsuarioState(JSON.parse(ubicacion));
      } catch (error) {
        console.error('Error parsing ubicacionUsuario:', error);
        localStorage.removeItem('ubicacionUsuario');
      }
    }
  }, []);

  const setDatosUsuario = (datos: DatosUsuario) => {
    localStorage.setItem('datosUsuario', JSON.stringify(datos));
    setDatosUsuarioState(datos);
  };

  const setDatosSistema = (datos: DatosSistema) => {
    localStorage.setItem('datosSistema', JSON.stringify(datos));
    setDatosSistemaState(datos);
  };

  const setDatosUbicacion = (datos: DatosUbicacion) => {
    localStorage.setItem('ubicacionUsuario', JSON.stringify(datos));
    setUbicacionUsuarioState(datos);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('datosSistema');
    localStorage.removeItem('ubicacionUsuario');
    localStorage.removeItem('accessToken');

    window.close();
  };

  return {
    // Estado
    datosUsuario,
    datosSistema,
    ubicacionUsuario,

    // Acciones
    setDatosUsuario,
    setDatosSistema,
    setDatosUbicacion,
    cerrarSesion,

    // Helpers
    tieneRol: (rol: string) => datosSistema.roles === rol || false,
    tienePermiso: (permiso: string) => datosSistema.permisos.includes(permiso) || false,
    tieneModulo: (modulo: string) => datosSistema.modulos.some((m) => m.nombre === modulo) || false,
  };
}
