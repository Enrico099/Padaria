import { Product, Sale, Customer, DailySales } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pão Francês',
    category: 'paes',
    price: 0.75,
    cost: 0.35,
    stock: 150,
    minStock: 30,
    description: 'Pão francês tradicional',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '2',
    name: 'Pão de Açúcar',
    category: 'paes',
    price: 1.20,
    cost: 0.60,
    stock: 80,
    minStock: 20,
    description: 'Pão doce tradicional',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '3',
    name: 'Croissant',
    category: 'doces',
    price: 4.50,
    cost: 2.20,
    stock: 25,
    minStock: 10,
    description: 'Croissant folhado',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '4',
    name: 'Brigadeiro',
    category: 'doces',
    price: 2.50,
    cost: 1.00,
    stock: 40,
    minStock: 15,
    description: 'Brigadeiro gourmet',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '5',
    name: 'Coxinha',
    category: 'salgados',
    price: 3.50,
    cost: 1.80,
    stock: 30,
    minStock: 10,
    description: 'Coxinha de frango',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '6',
    name: 'Café Expresso',
    category: 'bebidas',
    price: 2.00,
    cost: 0.50,
    stock: 100,
    minStock: 20,
    description: 'Café expresso tradicional',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  }
];

export const mockSales: Sale[] = [
  {
    id: '1',
    items: [
      { productId: '1', productName: 'Pão Francês', quantity: 10, unitPrice: 0.75, total: 7.50 },
      { productId: '6', productName: 'Café Expresso', quantity: 1, unitPrice: 2.00, total: 2.00 }
    ],
    total: 9.50,
    paymentMethod: 'dinheiro',
    timestamp: new Date().toISOString(),
    cashierId: 'caixa1'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Maria Silva',
    phone: '(11) 99999-9999',
    email: 'maria@email.com',
    totalPurchases: 150.80,
    lastPurchase: new Date().toISOString(),
    createdAt: new Date('2024-01-01').toISOString()
  }
];

export const generateDailySalesData = (): DailySales[] => {
  const today = new Date();
  const data: DailySales[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    data.push({
      date: date.toISOString().split('T')[0],
      totalSales: Math.floor(Math.random() * 2000) + 500,
      totalTransactions: Math.floor(Math.random() * 100) + 20,
      topProducts: [
        { productName: 'Pão Francês', quantity: Math.floor(Math.random() * 50) + 20, revenue: Math.floor(Math.random() * 100) + 50 },
        { productName: 'Café Expresso', quantity: Math.floor(Math.random() * 30) + 15, revenue: Math.floor(Math.random() * 80) + 40 },
        { productName: 'Croissant', quantity: Math.floor(Math.random() * 20) + 5, revenue: Math.floor(Math.random() * 150) + 70 }
      ]
    });
  }

  return data;
};

export const todayStats = {
  totalSales: 1847.50,
  totalTransactions: 94,
  averageTicket: 19.65,
  topSellingProduct: 'Pão Francês'
};
