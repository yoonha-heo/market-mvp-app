export type User = {
  id: string;
  email: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  userId: string;
  imageUrl?: string;
  isFavorite: boolean;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type SignupResponse = {
  id: string;
  email: string;
};
