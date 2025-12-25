export interface FormDataInteface {
  name: string;
  description: string;
  avatar: File | null;
  poster?: File | null;
  brandshoot?: File | null;
  brandshootProduct1?: File | null;
  brandshootProduct2?: File | null;
}

export interface PreviewImagesInteface {
  avatar: string;
  brandshoot: string;
  brandshootProduct1: string;
  brandshootProduct2: string;
  poster: string;
}

export interface OrdersInterface {
  id: string;
  customerName: string;
  email: string;
  product: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'return' | 'completed' | 'failed';
  deliveryStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  orderId: string;
  trackingId?: string;
}

export interface Review {
  id: number;
  text: string;
  starRating: number; // 1–5
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
    imageUrl: string;
  };
}

