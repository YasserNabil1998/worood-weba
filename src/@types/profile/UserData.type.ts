export interface UserData {
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
  gender: string;
  address: string;
  address2?: string;
  password?: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}
