import API from '../axios'
import { ENDPOINTS } from '../endpoints'
import  type  {
  LoginCredentials,
  RegisterData,
  User,
} from '../../types/auth.types'
import  type   { ApiResponse } from '../../types/api.types'

// ---------- Response Types ----------
interface LoginResponse {
  user: User
  token: string
}

interface RegisterResponse {
  user: User
  token: string
}

// ---------- Auth Service ----------
const authService = {
  /**
   * Login
   */
  login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
    const response = await API.post(ENDPOINTS.LOGIN, credentials)
    return response.data
  },

  /**
   * Register
   */
  register: async (data: RegisterData): Promise<ApiResponse<RegisterResponse>> => {
    const response = await API.post(ENDPOINTS.REGISTER, data)
    return response.data
  },

  /**
   * Logout
   */
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await API.post(ENDPOINTS.LOGOUT)
    return response.data
  },

  /**
   * Get Current Authenticated User
   */
  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await API.get(ENDPOINTS.ME)
    return response.data
  },

  /**
   * Update Profile
   */
  updateProfile: async (
    data: Partial<User>
  ): Promise<ApiResponse<User>> => {
    const response = await API.put(ENDPOINTS.ME, data)
    return response.data
  },

  /**
   * Change Password
   */
  changePassword: async (data: {
    current_password: string
    password: string
    password_confirmation: string
  }): Promise<ApiResponse<null>> => {
    const response = await API.put(`${ENDPOINTS.ME}/password`, data)
    return response.data
  },

  /**
   * Forgot Password - Send Reset Link
   */
  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    const response = await API.post('/forgot-password', { email })
    return response.data
  },

  /**
   * Reset Password
   */
  resetPassword: async (data: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }): Promise<ApiResponse<null>> => {
    const response = await API.post('/reset-password', data)
    return response.data
  },
}

export default authService