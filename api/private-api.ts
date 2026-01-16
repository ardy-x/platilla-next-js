import { ENVS } from '@/config/envs.config';
import type { RespuestaBase } from '../types/respuesta.types';

const BASE_URL = ENVS.api.url;
const TIMEOUT = 20000;

interface FetchOptions extends RequestInit {
  timeout?: number;
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}> = [];

export const guardarToken = (accessToken: string, refreshToken: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
};

export const limpiarToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('datosUsuario');
    localStorage.removeItem('datosSistema');
    localStorage.removeItem('ubicacionUsuario');
  }
};

const obtenerToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

const refreshToken = async (): Promise<void> => {
  const response = await fetch(`${BASE_URL}/autenticacion/refresh`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data: RespuestaBase<{ accessToken: string; refreshToken: string }> = await response.json();

  if (data?.response?.accessToken) {
    guardarToken(data.response.accessToken, data.response.refreshToken);
  }
};

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};

async function fetchWithAuthAndRefresh(url: string, options: FetchOptions = {}): Promise<Response> {
  const { timeout = TIMEOUT, _retry = false, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const token = obtenerToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      credentials: 'include',
      headers,
    });

    // Handle 401 Unauthorized
    if (response.status === 401 && !_retry) {
      if (isRefreshing) {
        // Wait for the ongoing refresh
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          // Retry the request
          return fetchWithAuthAndRefresh(url, { ...options, _retry: true });
        });
      }

      isRefreshing = true;

      try {
        await refreshToken();
        processQueue(null);
        return fetchWithAuthAndRefresh(url, { ...options, _retry: true });
      } catch (refreshError) {
        processQueue(refreshError);

        // Check if refresh failed with 403
        if (refreshError instanceof Error) {
          limpiarToken();
          if (typeof window !== 'undefined') {
            window.location.href = process.env.NEXT_PUBLIC_LOGIN_URL as string;
          }
        }
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

const privateApi = {
  get: async <T = unknown>(url: string, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuthAndRefresh(`${BASE_URL}${url}`, {
      ...options,
      method: 'GET',
    });
    return response.json();
  },

  post: async <T = unknown>(url: string, data?: unknown, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuthAndRefresh(`${BASE_URL}${url}`, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  put: async <T = unknown>(url: string, data?: unknown, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuthAndRefresh(`${BASE_URL}${url}`, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  delete: async <T = unknown>(url: string, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuthAndRefresh(`${BASE_URL}${url}`, {
      ...options,
      method: 'DELETE',
    });
    return response.json();
  },

  patch: async <T = unknown>(url: string, data?: unknown, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuthAndRefresh(`${BASE_URL}${url}`, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },
};

export default privateApi;
