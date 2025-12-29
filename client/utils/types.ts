export interface FormDataInteface {
  name: string;
  description: string;
  avatarUrl: File | null;
  poster?: File | null;
  brandshoot?: File | null;
  brandshootProduct1?: File | null;
  brandshootProduct2?: File | null;
}

export interface PreviewImagesInteface {
  avatarUrl: string;
  brandshoot: string;
  brandshootProduct1: string;
  brandshootProduct2: string;
  poster: string;
}

export enum DeliveryStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  UNPAID = "UNPAID",
  RETURN = "RETURN",
  FAILED = "FAILED",
}


export interface OrdersInterface {
  id: string;
  customerName: string;
  email: string;
  product: string;
  amount: number;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  createdAt: string;
  orderId: string;
  trackingId?: string;
}


export interface Review {
  id: number;
  comment: string;
  stars: number; // 1–5
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
    profile: {
      imageUrl: string;
    }
  };
}

