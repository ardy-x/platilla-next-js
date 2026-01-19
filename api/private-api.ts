import type { RespuestaBase } from '@/app/_types/respuesta.types';
import { ENVS } from '@/config/envs.config';

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

const refreshToken = async (): Promise<void> => {
  const response = await fetch('/api/refresh', {
    method: 'POST',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
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

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

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

        if (typeof window !== 'undefined') {
          window.location.href = '/auth/unauthorized?expired=true';
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
