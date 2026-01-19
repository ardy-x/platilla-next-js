export interface PaginacionBase {
  paginaActual: number;
  totalPaginas: number;
  totalElementos: number;
  elementosPorPagina: number;
}

export interface RespuestaPaginada<T> {
  datos: T[];
  paginacion: PaginacionBase;
}

export interface ParametrosPaginacion {
  pagina?: number;
  elementosPorPagina?: number;
}

export interface ParametrosBusqueda extends ParametrosPaginacion {
  busqueda?: string;
  idDepartamento?: number;
  idProvincia?: number;
  idMunicipio?: number;
}
