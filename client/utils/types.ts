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
  avatar: string
  brandshoot: string;
  brandshootProduct1: string;
  brandshootProduct2: string;
  poster: string;
}
