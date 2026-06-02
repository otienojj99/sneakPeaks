const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api';

export class ApiError extends Error {
  public status: number
  public body: unknown

  constructor(
    status: number,
    body: unknown,
    message?: string,
  ) {
    super(message ?? `API Error ${status}`)
    this.name = 'ApiError'

    this.status = status
    this.body = body
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  const body = await res.json();
  if (!res.ok) throw new ApiError(res.status, body, body?.message ?? res.statusText);
  return body as T;
}

function buildQueryString(params: Record<string, unknown>): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      qs.append(key, String(value));
    }
  }
  const str = qs.toString();
  return str ? `?${str}` : '';
}

function getHeaders(isJson = true): HeadersInit {
  const headers: HeadersInit = { Accept: 'application/json' };
  if (isJson) headers['Content-Type'] = 'application/json';
  const token = localStorage.getItem('auth_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export const apiClient = {
  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const url = `${BASE_URL}${path}${params ? buildQueryString(params) : ''}`;
    return handleResponse<T>(await fetch(url, { method: 'GET', headers: getHeaders() }));
  },

  async post<T>(path: string, body?: unknown): Promise<T> {
    return handleResponse<T>(
      await fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      }),
    );
  },

  async put<T>(path: string, body?: unknown): Promise<T> {
    return handleResponse<T>(
      await fetch(`${BASE_URL}${path}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      }),
    );
  },

  async patch<T>(path: string, body?: unknown): Promise<T> {
    return handleResponse<T>(
      await fetch(`${BASE_URL}${path}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      }),
    );
  },

  async delete<T>(path: string): Promise<T> {
    return handleResponse<T>(
      await fetch(`${BASE_URL}${path}`, { method: 'DELETE', headers: getHeaders() }),
    );
  },

  async upload<T>(path: string, formData: FormData): Promise<T> {
    return handleResponse<T>(
      await fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: getHeaders(false), // No Content-Type — browser sets multipart boundary
        body: formData,
      }),
    );
  },
};