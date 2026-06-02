export interface User {
  id: number;
  name: string; // full name
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  profile_photo: string | null;
  role: 'super_admin' | 'admin1' | 'admin2' | 'user';
  is_active: boolean;
  warehouse_id: number | null;
  warehouse?: { id: number; name: string } | null; // optional relation
  last_login_at: string | null;
  last_login_ip: string | null;
  created_at: string;
  updated_at: string;
  // audit fields (optional)
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
  // full name accessor already provided by backend? we have name field.
}