export interface Order {
  id: number;
  userId: number;
  trackingId: string | null;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  addressId: number;
  address: Address;
  orderItems: OrderItem[];
  user: User;
}

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
