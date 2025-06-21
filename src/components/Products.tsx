import React, { useState } from 'react';
import { Package, Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { mockProducts } from '../utils/mockData';
import { Product } from '../types';

export default function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    { value: 'all', label: 'Todas' },
    { value: 'paes', label: 'Pães' },
    { value: 'doces', label: 'Doces' },
    { value: 'salgados', label: 'Salgados' },
    { value: 'bebidas', label: 'Bebidas' },
    { value: 'outros', label: 'Outros' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const getStockStatus = (product: Product) => {
    if (product.stock <= product.minStock) {
      return { status: 'low', color: 'text-red-600 bg-red-100', label: 'Baixo' };
    } else if (product.stock <= product.minStock * 2) {
      return { status: 'medium', color: 'text-yellow-600 bg-yellow-100', label: 'Médio' };
    }
    return { status: 'good', color: 'text-green-600 bg-green-100', label: 'Bom' };
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Produtos</h1>
            <p className="text-gray-600">Gerencie o catálogo de produtos da sua padaria</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Novo Produto
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const stockStatus = getStockStatus(product);
          const margin = ((product.price - product.cost) / product.price * 100).toFixed(1);

          return (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {getCategoryLabel(product.category)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Preço</span>
                  <span className="font-semibold text-green-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Custo</span>
                  <span className="text-gray-900">
                    R$ {product.cost.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Margem</span>
                  <span className="font-medium text-blue-600">
                    {margin}%
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estoque</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{product.stock}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.color}`}>
                      {stockStatus.label}
                    </span>
                  </div>
                </div>

                {product.stock <= product.minStock && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded-lg">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Estoque baixo!</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-600">Tente ajustar os filtros ou adicione novos produtos</p>
        </div>
      )}
    </div>
  );
}