import type { User } from './user.types'

export interface Order {
  id: number
  user_id: number
  order_number: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  shipping_address: string
  payment_method: string
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  items: OrderItem[]
  user?: User
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
  size: string
  color: string
}