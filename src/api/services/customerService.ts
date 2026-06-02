import API from '../axios'
import { ENDPOINTS } from '../endpoints'
import type {
  Customer,
  CustomerRegisterData,
  CustomerLoginCredentials,
  CustomerLoginResponse,
  CustomerUpdateData,
  CustomerFilters,
} from '../../types/customer.types'
import type { ApiResponse, PaginatedResponse } from '../../types/api.types'


const customerService = {
    // =============================================
  //  CUSTOMER AUTH (Public - Storefront)
  // =============================================

  /**
   * Customer Self-Registration
   * Individual: simple signup
   * Business/Wholesale: requires more fields, may need admin approval
   */

  register: async (
    data:CustomerRegisterData
  ): Promise<ApiResponse<CustomerLoginResponse>> => {
    const response = await API.post(ENDPOINTS.CUSTOMER_LOGIN, data)
    return response.data
  },

   /**
   * Customer Login
   */

   login: async(
    credentials:CustomerLoginCredentials
   ): Promise<ApiResponse<CustomerLoginResponse>> => {
    const response = await API.post(ENDPOINTS.CUSTOMER_LOGIN, credentials)
    return response.data
   },

    /**
   * Customer Logout
   */
  logout: async():Promise<ApiResponse<null>> => {
    const response = await API.post(ENDPOINTS.CUSTOMER_LOGOUT)
    return response.data
  },

  /**
   * Get Current Customer Profile
   */

  getProfile: async(): Promise<ApiResponse<Customer>> => {
    const response = await API.get(ENDPOINTS.CUSTOMER_ME)
    return response.data
  },

  /**
   * Update Own Profile (Customer self-update)
   */

  updateProfile: async (
    data: Partial<CustomerUpdateData>
  ): Promise<ApiResponse<Customer>> => {
    const response = await API.put(ENDPOINTS.CUSTOMER_ME, data)
    return response.data
  },

  /**
   * Verify Email
   */
  verifyEmail: async (token: string): Promise<ApiResponse<null>> => {
    const response = await API.post(ENDPOINTS.CUSTOMER_VERIFY_EMAIL, { token })
    return response.data
  },

  /**
   * Resend Verification Email
   */
  resendVerification: async (): Promise<ApiResponse<null>> => {
    const response = await API.post(`${ENDPOINTS.CUSTOMER_VERIFY_EMAIL}/resend`)
    return response.data
  },

  /**
   * Customer Forgot Password
   */
  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    const response = await API.post(ENDPOINTS.CUSTOMER_FORGOT_PASSWORD, { email })
    return response.data
  },

  /**
   * Customer Reset Password
   */
  resetPassword: async (data: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }): Promise<ApiResponse<null>> => {
    const response = await API.post(ENDPOINTS.CUSTOMER_RESET_PASSWORD, data)
    return response.data
  },

  /**
   * Change Password (logged in customer)
   */
  changePassword: async (data: {
    current_password: string
    password: string
    password_confirmation: string
  }): Promise<ApiResponse<null>> => {
    const response = await API.put(`${ENDPOINTS.CUSTOMER_ME}/password`, data)
    return response.data
  },

   // =============================================
  //  ADMIN MANAGES CUSTOMERS (Dashboard)
  // =============================================

   /**
   * Get All Customers (with filters & pagination)
   */
  getAll: async (
    filters?: CustomerFilters
  ): Promise<PaginatedResponse<Customer>> => {
    const response = await API.get(ENDPOINTS.CUSTOMERS, { params: filters })
    return response.data
  },

  /**
   * Get Single Customer
   */
  getById: async (id: number): Promise<ApiResponse<Customer>> => {
    const response = await API.get(`${ENDPOINTS.CUSTOMERS}/${id}`)
    return response.data
  },

  /**
   * Admin Create Customer (manually add a customer)
   */
  create: async (
    data: CustomerRegisterData
  ): Promise<ApiResponse<Customer>> => {
    const response = await API.post(ENDPOINTS.CUSTOMERS, data)
    return response.data
  },

  /**
   * Admin Update Customer
   */
  update: async (
    id: number,
    data: CustomerUpdateData
  ): Promise<ApiResponse<Customer>> => {
    const response = await API.put(`${ENDPOINTS.CUSTOMERS}/${id}`, data)
    return response.data
  },

  /**
   * Delete Customer (soft delete)
   */
  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await API.delete(`${ENDPOINTS.CUSTOMERS}/${id}`)
    return response.data
  },

  /**
   * Block Customer
   */
  block: async (
    id: number,
    reason: string
  ): Promise<ApiResponse<Customer>> => {
    const response = await API.post(`${ENDPOINTS.CUSTOMERS}/${id}/block`, {
      blocked_reason: reason,
    })
    return response.data
  },

  /**
   * Unblock Customer
   */
  unblock: async (id: number): Promise<ApiResponse<Customer>> => {
    const response = await API.post(`${ENDPOINTS.CUSTOMERS}/${id}/unblock`)
    return response.data
  },

  /**
   * Approve Business/Wholesale Customer
   */
  approve: async (id: number): Promise<ApiResponse<Customer>> => {
    const response = await API.post(`${ENDPOINTS.CUSTOMERS}/${id}/approve`)
    return response.data
  },

  /**
   * Reject Business/Wholesale Customer
   */
  reject: async (
    id: number,
    reason: string
  ): Promise<ApiResponse<Customer>> => {
    const response = await API.post(`${ENDPOINTS.CUSTOMERS}/${id}/reject`, {
      reason,
    })
    return response.data
  },

  /**
   * Update Loyalty Tier
   */
  updateLoyaltyTier: async (
    id: number,
    tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  ): Promise<ApiResponse<Customer>> => {
    const response = await API.put(`${ENDPOINTS.CUSTOMERS}/${id}/loyalty`, {
      loyalty_tier: tier,
    })
    return response.data
  },

  /**
   * Adjust Loyalty Points
   */
  adjustLoyaltyPoints: async (
    id: number,
    points: number,
    reason: string
  ): Promise<ApiResponse<Customer>> => {
    const response = await API.post(
      `${ENDPOINTS.CUSTOMERS}/${id}/loyalty/adjust`,
      { points, reason }
    )
    return response.data
  },

  /**
   * Update Credit Limit (business/wholesale)
   */
  updateCreditLimit: async (
    id: number,
    credit_limit: number
  ): Promise<ApiResponse<Customer>> => {
    const response = await API.put(`${ENDPOINTS.CUSTOMERS}/${id}/credit`, {
      credit_limit,
    })
    return response.data
  },

  /**
   * Get Customer Orders
   */
  getOrders: async (
    customerId: number,
    params?: { page?: number; per_page?: number }
  ): Promise<PaginatedResponse<any>> => {
    const response = await API.get(
      `${ENDPOINTS.CUSTOMERS}/${customerId}/orders`,
      { params }
    )
    return response.data
  },

  /**
   * Export Customers (CSV/Excel)
   */
  export: async (
    filters?: CustomerFilters,
    format: 'csv' | 'excel' = 'csv'
  ): Promise<Blob> => {
    const response = await API.get(`${ENDPOINTS.CUSTOMERS}/export`, {
      params: { ...filters, format },
      responseType: 'blob',
    })
    return response.data
  },

   /**
   * Get Customer Stats (for dashboard)
   */
  getStats: async (): Promise<
    ApiResponse<{
      total_customers: number
      active_customers: number
      new_this_month: number
      individual_count: number
      business_count: number
      wholesale_count: number
      pending_approvals: number
      blocked_count: number
    }>
  > => {
    const response = await API.get(`${ENDPOINTS.CUSTOMERS}/stats`)
    return response.data
  },

}

export default customerService