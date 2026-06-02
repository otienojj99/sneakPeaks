import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * 🔥 Custom API Error (from your fetch client — improved)
 */
export class ApiError extends Error {
  public status: number;
  public body: unknown;
  public response?: AxiosResponse<unknown>;

  constructor(
    status: number,
    body: unknown,
    message?: string,
    response?: AxiosResponse<unknown>,
  ) {
    super(message ?? `API Error ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
    this.response = response;
  }
}
const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor - attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle errors
API.interceptors.response.use(
  (response) => response,
  (error: AxiosError<unknown>) => {
    const status = error.response?.status ?? 0
    const body = error.response?.data ?? null
    const message =
      typeof body === 'object' && body && 'message' in body
        ? (body as any).message || error.message
        : error.message || 'Network Error'

    if (status === 401 && !error.config?.url?.includes('/login')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    return Promise.reject(new ApiError(status, body, message, error.response))
  }
)




export const apiClient = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return API.get(url, config);
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return API.post(url, data, config);
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return API.put(url, data, config);
  },

  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return API.patch(url, data, config);
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return API.delete(url, config);
  },

  /**
   * 📁 File Upload (multipart/form-data)
   */
  upload<T>(url: string, formData: FormData): Promise<T> {
    return API.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
}
export default API