export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Tiffins' | 'Lunch' | 'Dinner' | 'Cool Drinks' | 'Juices';
  image: string;
  rating: number;
  isOffer?: boolean;
  offerText?: string;
  isRecommended?: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  address?: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: number;
  deliveryAddress: string;
  paymentMethod: string;
}
