
export type AdminRole = "ADMIN" | "SUPER_ADMIN" | "MODERATOR";

export interface AdminProfile {
  name: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  role: AdminRole[];
}