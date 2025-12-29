import { DeliveryStatus, PaymentStatus } from './types';

export interface Address {
  zip?: string;
  state: string;
  province: string;
  street1: string;
  street2?: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  storeId: number;
  categoryId: number;
  title: string;
  subTitle: string | null;
  description: string | null;
  price: string; // "57.8"
  stock: number;
  sold: number;
  colors?: string[];
  size?: string[];
  imagesUrl: string[];
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export type AdminRole = 'ADMIN' | 'SUPER_ADMIN' | 'MODERATOR';

export interface AdminProfile {
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  role: AdminRole[];
}

export interface PaymentCount {
  TotalSales: number;
  FailedSales: number;
  ReturnSales: number;
}

export interface OrderCount {
  All: number;
  Return: number;
  Failed: number;
  Completed: number;
}

export interface User {
  email: string;
  name: string;
}

export interface Order {
  id: number;
  addressId: number;
  amount: string;
  deliveryStatus: DeliveryStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  trackingId: string;
  user: User;
  orderItems: OrderItem[];
}

export interface RecentOrders {
  id: number;
  amount: number;
  user: {
    name: string;
    email: string;
  };
}

export interface ByMonthSales {
  month: string;
  totalAmount: number;
}

export interface ByYearSales {
  year: number;
  totalAmount: number;
}

export enum StoreStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  FROZEN = 'FROZEN',
  DELETED = 'DELETED',
}

export interface StoreProfile {
  storeId: number;
  profile: {
    name: string;
    description: string;
    avatarUrl: string | null;
    banner: string | null;
    brandshoot: string | null;
    brandshootProduct1: string | null;
    brandshootProduct2: string | null;
  };
  status: string
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IStore {
  id: number;
  status: StoreStatus;
  userId: number;
  profile: StoreProfile;
  createdAt: string | Date;
  updatedAt: string | Date;
}
