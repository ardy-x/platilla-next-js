import { cookies } from 'next/headers';
import type { RespuestaBase } from '@/app/_types/respuesta.types';
import { ENVS } from '@/config/envs.config';

const BASE_URL = ENVS.api.url;
const TIMEOUT = 20000;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

async function fetchWithAuth(url: string, options: FetchOptions = {}): Promise<Response> {
  const { timeout = TIMEOUT, ...fetchOptions } = options;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers,
    });

    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

const privateApiServer = {
  get: async <T = unknown>(url: string, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuth(`${BASE_URL}${url}`, {
      ...options,
      method: 'GET',
    });
    return response.json();
  },

  post: async <T = unknown>(url: string, data?: unknown, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuth(`${BASE_URL}${url}`, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  put: async <T = unknown>(url: string, data?: unknown, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuth(`${BASE_URL}${url}`, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  delete: async <T = unknown>(url: string, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuth(`${BASE_URL}${url}`, {
      ...options,
      method: 'DELETE',
    });
    return response.json();
  },

  patch: async <T = unknown>(url: string, data?: unknown, options?: FetchOptions): Promise<RespuestaBase<T>> => {
    const response = await fetchWithAuth(`${BASE_URL}${url}`, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },
};

export default privateApiServer;
