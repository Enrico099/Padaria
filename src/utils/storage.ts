import { Product, Sale, Customer, AppState } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'bakery_products',
  SALES: 'bakery_sales',
  CUSTOMERS: 'bakery_customers',
  SETTINGS: 'bakery_settings'
};

export const storage = {
  // Products
  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  saveProducts: (products: Product[]) => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  // Sales
  getSales: (): Sale[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SALES);
    if (!data) return [];
    
    return JSON.parse(data).map((sale: any) => ({
      ...sale,
      timestamp: new Date(sale.timestamp)
    }));
  },

  saveSales: (sales: Sale[]) => {
    localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
  },

  addSale: (sale: Sale) => {
    const sales = storage.getSales();
    sales.push(sale);
    storage.saveSales(sales);
  },

  // Customers
  getCustomers: (): Customer[] => {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (!data) return [];
    
    return JSON.parse(data).map((customer: any) => ({
      ...customer,
      createdAt: new Date(customer.createdAt),
      lastPurchase: customer.lastPurchase ? new Date(customer.lastPurchase) : undefined
    }));
  },

  saveCustomers: (customers: Customer[]) => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  },

  addCustomer: (customer: Customer) => {
    const customers = storage.getCustomers();
    customers.push(customer);
    storage.saveCustomers(customers);
  },

  updateCustomer: (customerId: string, updates: Partial<Customer>) => {
    const customers = storage.getCustomers();
    const index = customers.findIndex(c => c.id === customerId);
    if (index !== -1) {
      customers[index] = { ...customers[index], ...updates };
      storage.saveCustomers(customers);
    }
  },

  // Settings
  getSettings: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      bakeryName: 'Padaria São João',
      cnpj: '12.345.678/0001-90',
      address: 'Rua das Flores, 123 - Centro',
      phone: '(11) 3456-7890',
      notifications: {
        lowStock: true,
        dailyReports: false,
        autoBackup: true
      }
    };
  },

  saveSettings: (settings: any) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
};