export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  role: 'client' | 'admin';
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}