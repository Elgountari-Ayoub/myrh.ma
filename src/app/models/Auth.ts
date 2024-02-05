export interface Auth {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  login?: string | null;
  address?: string | null;
  phone?: string | null;
  image?: File | null;
  imageUrl?: string | null;
  role?: string | null;
  submissions?: any[] | null;
}
