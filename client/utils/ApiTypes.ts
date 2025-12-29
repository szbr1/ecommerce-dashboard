import { DeliveryStatus, PaymentStatus } from "./types";

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



export type AdminRole = "ADMIN" | "SUPER_ADMIN" | "MODERATOR";

export interface AdminProfile {
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  role: AdminRole[];
}

export interface PaymentCount {
  TotalSales: number,
  FailedSales: number,
  ReturnSales: number
}

export interface OrderCount {
  All: number,
  Return: number,
  Failed: number,
  Completed: number
}



export interface User {
  email: string;
  name: string;
}


export interface Order {
  id: number;
  addressId: number;
  amount: string;
  deliveryStatus: DeliveryStatus
  paymentStatus: PaymentStatus
  createdAt: string;
  updatedAt: string;
  trackingId: string;
  user: User;
  orderItems: OrderItem[];
}

export interface RecentOrders {
  id: number
  amount: number
  user: {
    name: string
    email: string
  }
}

export interface ByMonthSales {
  month: string
  totalAmount: number
}

export interface ByYearSales {
  year: number
  totalAmount: number
}