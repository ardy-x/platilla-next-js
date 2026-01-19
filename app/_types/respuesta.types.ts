export interface RespuestaBase<T = unknown> {
  error: boolean;
  status: number;
  message: string;
  response: T | null;
}
