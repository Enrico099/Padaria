import React from 'react';
import { TrendingUp, ShoppingBag, Users, Package, AlertTriangle, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { generateDailySalesData, todayStats, mockProducts } from '../utils/mockData';

const salesData = generateDailySalesData();

const categoryData = [
  { name: 'Pães', value: 45, color: '#F97316' },
  { name: 'Doces', value: 25, color: '#F59E0B' },
  { name: 'Salgados', value: 20, color: '#92400E' },
  { name: 'Bebidas', value: 10, color: '#FCD34D' }
];

const hourlyData = [
  { hour: '06h', vendas: 45 },
  { hour: '07h', vendas: 78 },
  { hour: '08h', vendas: 120 },
  { hour: '09h', vendas: 95 },
  { hour: '10h', vendas: 140 },
  { hour: '11h', vendas: 160 },
  { hour: '12h', vendas: 200 },
  { hour: '13h', vendas: 180 },
  { hour: '14h', vendas: 125 },
  { hour: '15h', vendas: 165 },
  { hour: '16h', vendas: 190 },
  { hour: '17h', vendas: 175 }
];

export default function Dashboard() {
  const lowStockProducts = mockProducts.filter(product => product.stock <= product.minStock);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Visão geral das vendas de hoje</p>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Vendas Hoje</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {todayStats.totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                +12.5% vs ontem
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Transações</p>
              <p className="text-2xl font-bold text-gray-900">{todayStats.totalTransactions}</p>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                +8.2% vs ontem
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Ticket Médio</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {todayStats.averageTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                +3.8% vs ontem
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Produtos Cadastrados</p>
              <p className="text-2xl font-bold text-gray-900">{mockProducts.length}</p>
              <p className="text-orange-600 text-sm flex items-center gap-1 mt-1">
                <AlertTriangle className="w-4 h-4" />
                {lowStockProducts.length} em baixa
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de Vendas dos Últimos 7 Dias */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas dos Últimos 7 Dias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip 
                formatter={(value) => [`R$ ${value}`, 'Vendas']}
                labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
              />
              <Line 
                type="monotone" 
                dataKey="totalSales" 
                stroke="#F97316" 
                strokeWidth={3}
                dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Vendas por Categoria */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Vendas por Hora */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas por Hora - Hoje</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="hour" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
            <Bar dataKey="vendas" fill="#F97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Alertas e Produtos em Baixa */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-yellow-800">Produtos com Estoque Baixo</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg p-4 border border-yellow-200">
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">Estoque: {product.stock} unidades</p>
                <p className="text-sm text-red-600">Mínimo: {product.minStock} unidades</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}