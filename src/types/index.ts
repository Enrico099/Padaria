// types.ts

export interface User {
  full_name: any;
  id: string;
  name: string;
  avatarUrl?: string;
  email?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO string, para facilitar formato e comparações
  read?: boolean;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  last_message?: string;
  last_message_at?: string; // ISO string
  createdAt: string;
  updatedAt: string;
}

// Tipos que você já tinha no seu projeto (exemplo para venda)

export interface Product {
  id: string;
  name: string;
  category: 'paes' | 'doces' | 'salgados' | 'bebidas' | 'outros';
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  image?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  paymentMethod: 'dinheiro' | 'cartao' | 'pix';
  customerId?: string;
  timestamp: string;
  cashierId: string;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  totalPurchases: number;
  lastPurchase?: string;
  createdAt: string;
}

export interface AppState {
  products: Product[];
  sales: Sale[];
  customers: Customer[];
  currentUser: {
    id: string;
    name: string;
    role: string;
  };
}

export interface DailySales {
  date: string;
  totalSales: number;
  totalTransactions: number;
  topProducts: Array<{
    productName: string;
    quantity: number;
    revenue: number;
  }>;

}
