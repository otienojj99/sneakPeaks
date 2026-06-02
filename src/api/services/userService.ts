import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import type { User } from "../../types/auth.types";


export interface GetUsersParams{
  page?: number;
  per_page?: number;
  search?: string;
  role?: string;
  is_active?: boolean;
  trashed?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: any;
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}


export const userService = {
     // Get paginated users
  getUsers: async (params?: GetUsersParams): Promise<PaginatedResponse<User>> => {
    const response = await API.get(ENDPOINTS.USERS, { params });
    return response.data.data; // adjust based on your API response structure (ours uses success/data)
  },

  // Get single user
  getUser: async (id: number): Promise<User> => {
    const response = await API.get(`${ENDPOINTS.USERS}/${id}`);
    return response.data.data;
  },

  // Create user
  createUser: async (data: Partial<User> & { password?: string; password_confirmation?: string }): Promise<User> => {
    const response = await API.post(ENDPOINTS.USERS, data);
    return response.data.data;
  },

  // Update user
  updateUser: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await API.put(`${ENDPOINTS.USERS}/${id}`, data);
    return response.data.data;
  },

  // Delete user (soft delete)
  deleteUser: async (id: number): Promise<void> => {
    await API.delete(`${ENDPOINTS.USERS}/${id}`);
  },

  // Restore user
  restoreUser: async (id: number): Promise<void> => {
    await API.post(`${ENDPOINTS.USERS}/${id}/restore`);
  },

   // Toggle active
  toggleActive: async (id: number): Promise<User> => {
    const response = await API.patch(`${ENDPOINTS.USERS}/${id}/toggle-active`);
    return response.data.data;
  },
}