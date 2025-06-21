import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SaleItem } from '../types';

function Sales() {
  const { state, dispatch } = useApp();
  const { products, customers } = state;

  const [cart, setCart] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'dinheiro' | 'cartao' | 'pix'>('dinheiro');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [customerMoney, setCustomerMoney] = useState<string>('');

  // Função simples para gerar ID único
  function generateId() {
    return Math.random().toString(36).substring(2, 10);
  }

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.unitPrice }
          : item
      ));
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.price,
          total: product.price
        }
      ]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const getChange = () => {
    const money = parseFloat(customerMoney);
    return money > getTotalAmount() ? money - getTotalAmount() : 0;
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const sale = {
      id: generateId(),
      items: cart,
      total: getTotalAmount(),
      paymentMethod,
      customerId: selectedCustomer || undefined,
      timestamp: new Date().toISOString(),
      cashierId: 'caixa1',
    };

    dispatch({ type: 'ADD_SALE', payload: sale });

    setCart([]);
    setPaymentMethod('dinheiro');
    setSelectedCustomer(null);
    setCustomerMoney('');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Nova Venda</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Produtos</h3>
        <div className="grid grid-cols-2 gap-2">
          {products.map(product => (
            <button
              key={product.id}
              className="p-2 bg-green-100 rounded hover:bg-green-200"
              onClick={() => addToCart(product.id)}
            >
              {product.name} - R${product.price.toFixed(2)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Carrinho</h3>
        {cart.length === 0 ? (
          <p>Nenhum item no carrinho</p>
        ) : (
          <ul>
            {cart.map(item => (
              <li key={item.productId} className="flex justify-between mb-1">
                {item.quantity}x {item.productName} - R${item.total.toFixed(2)}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 ml-2"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 font-bold">Total: R${getTotalAmount().toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Forma de Pagamento</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value as 'dinheiro' | 'cartao' | 'pix')}
          className="p-2 border rounded w-full"
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
          <option value="pix">PIX</option>
        </select>

        {paymentMethod === 'dinheiro' && (
          <div className="mt-2">
            <label>Valor recebido:</label>
            <input
              type="number"
              value={customerMoney}
              onChange={(e) => setCustomerMoney(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <p className="mt-1">Troco: R${getChange().toFixed(2)}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Cliente (opcional)</h3>
        <select
          value={selectedCustomer || ''}
          onChange={(e) => setSelectedCustomer(e.target.value || null)}
          className="p-2 border rounded w-full"
        >
          <option value="">Não especificar</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Finalizar Venda
      </button>
    </div>
  );
}

export default Sales;
