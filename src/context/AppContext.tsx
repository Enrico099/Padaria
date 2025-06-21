import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, Sale, Customer } from '../types';
import { storage } from '../utils/storage';
import { mockProducts, mockCustomers } from '../utils/mockData';

interface AppState {
  products: Product[];
  sales: Sale[];
  customers: Customer[];
  settings: any;
}

type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: { id: string; updates: Partial<Product> } }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'ADD_SALE'; payload: Sale }
  | { type: 'SET_SALES'; payload: Sale[] }
  | { type: 'ADD_CUSTOMER'; payload: Customer }
  | { type: 'UPDATE_CUSTOMER'; payload: { id: string; updates: Partial<Customer> } }
  | { type: 'SET_CUSTOMERS'; payload: Customer[] }
  | { type: 'UPDATE_SETTINGS'; payload: any };

const initialState: AppState = {
  products: [],
  sales: [],
  customers: [],
  settings: {}
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'ADD_PRODUCT':
      const newProducts = [...state.products, action.payload];
      storage.saveProducts(newProducts);
      return { ...state, products: newProducts };

    case 'UPDATE_PRODUCT':
      const updatedProducts = state.products.map(product =>
        product.id === action.payload.id
          ? {
              ...product,
              ...action.payload.updates,
              updatedAt: new Date().toISOString()
            }
          : product
      );
      storage.saveProducts(updatedProducts);
      return { ...state, products: updatedProducts };

    case 'DELETE_PRODUCT':
      const filteredProducts = state.products.filter(product => product.id !== action.payload);
      storage.saveProducts(filteredProducts);
      return { ...state, products: filteredProducts };

    case 'ADD_SALE':
      const newSales = [...state.sales, action.payload];
      storage.saveSales(newSales);

      // Atualiza estoque
      const productsAfterSale = state.products.map(product => {
        const saleItem = action.payload.items.find(item => item.productId === product.id);
        if (saleItem) {
          return { ...product, stock: product.stock - saleItem.quantity };
        }
        return product;
      });
      storage.saveProducts(productsAfterSale);

      // Atualiza cliente, se tiver
      if (action.payload.customerId) {
        const updatedCustomers = state.customers.map(customer => {
          if (customer.id === action.payload.customerId) {
            return {
              ...customer,
              totalPurchases: customer.totalPurchases + action.payload.total,
              lastPurchase: action.payload.timestamp
            };
          }
          return customer;
        });
        storage.saveCustomers(updatedCustomers);
        return { ...state, sales: newSales, products: productsAfterSale, customers: updatedCustomers };
      }

      return { ...state, sales: newSales, products: productsAfterSale };

    case 'SET_SALES':
      return { ...state, sales: action.payload };

    case 'ADD_CUSTOMER':
      const newCustomers = [...state.customers, action.payload];
      storage.saveCustomers(newCustomers);
      return { ...state, customers: newCustomers };

    case 'UPDATE_CUSTOMER':
      const updatedCustomers = state.customers.map(customer =>
        customer.id === action.payload.id
          ? { ...customer, ...action.payload.updates }
          : customer
      );
      storage.saveCustomers(updatedCustomers);
      return { ...state, customers: updatedCustomers };

    case 'SET_CUSTOMERS':
      return { ...state, customers: action.payload };

    case 'UPDATE_SETTINGS':
      storage.saveSettings(action.payload);
      return { ...state, settings: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    let products = storage.getProducts();
    if (products.length === 0) {
      products = mockProducts;
      storage.saveProducts(products);
    }

    let customers = storage.getCustomers();
    if (customers.length === 0) {
      customers = mockCustomers;
      storage.saveCustomers(customers);
    }

    const sales = storage.getSales();
    const settings = storage.getSettings();

    dispatch({ type: 'SET_PRODUCTS', payload: products });
    dispatch({ type: 'SET_CUSTOMERS', payload: customers });
    dispatch({ type: 'SET_SALES', payload: sales });
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
