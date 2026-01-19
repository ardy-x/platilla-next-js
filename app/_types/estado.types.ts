import type { PaginacionBase } from './paginacion.types';

export interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface QueryResult<T> extends QueryState<T> {
  refetch: () => Promise<void>;
}

export interface PaginatedQueryState<T> {
  datos: T[];
  paginacion: PaginacionBase;
  loading: boolean;
  error: string | null;
}

export interface PaginatedQueryResult<T> extends PaginatedQueryState<T> {
  irAPagina: (pagina: number) => void;
  cambiarLimite: (limite: number) => void;
  refrescar: () => void;
}

export interface MutationState {
  loading: boolean;
  error: string | null;
  success: boolean;
  successMessage: string | null;
}

export interface MutationResult<TData = void, TVariables = unknown> extends MutationState {
  mutate: (variables: TVariables) => Promise<TData>;
  reset: () => void;
}
