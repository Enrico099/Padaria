import React from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { generateDailySalesData } from '../utils/mockData';

const salesData = generateDailySalesData();

const monthlyData = [
  { month: 'Jan', vendas: 45000, lucro: 18000 },
  { month: 'Fev', vendas: 52000, lucro: 21000 },
  { month: 'Mar', vendas: 48000, lucro: 19000 },
  { month: 'Abr', vendas: 61000, lucro: 25000 },
  { month: 'Mai', vendas: 55000, lucro: 22000 },
  { month: 'Jun', vendas: 67000, lucro: 27000 }
];

const topProducts = [
  { product: 'Pão Francês', quantity: 1250, revenue: 937.50 },
  { product: 'Café Expresso', quantity: 890, revenue: 1780.00 },
  { product: 'Croissant', quantity: 340, revenue: 1530.00 },
  { product: 'Brigadeiro', quantity: 420, revenue: 1050.00 },
  { product: 'Coxinha', quantity: 280, revenue: 980.00 }
];

export default function Reports() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Relatórios</h1>
        <p className="text-gray-600">Análise detalhada de vendas e performance</p>
      </div>

      {/* Filtros de Período */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-700">Período:</span>
          </div>
          <div className="flex gap-4">
            <input
              type="date"
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              defaultValue="2024-01-01"
            />
            <span className="text-gray-500">até</span>
            <input
              type="date"
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-colors">
            Aplicar Filtro
          </button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Vendas no Mês</p>
              <p className="text-2xl font-bold text-gray-900">R$ 67.340</p>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                +18.2% vs mês anterior
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Lucro no Mês</p>
              <p className="text-2xl font-bold text-gray-900">R$ 27.890</p>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                +15.8% vs mês anterior
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Margem Média</p>
              <p className="text-2xl font-bold text-gray-900">41.4%</p>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                +2.1% vs mês anterior
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Transações</p>
              <p className="text-2xl font-bold text-gray-900">2.847</p>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                +22.5% vs mês anterior
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Vendas dos Últimos 7 Dias */}
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

        {/* Vendas e Lucro Mensal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas e Lucro - 6 Meses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
              <Bar dataKey="vendas" fill="#F97316" name="Vendas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lucro" fill="#16A34A" name="Lucro" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Produtos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top 5 Produtos Mais Vendidos</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-500">Produto</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">Quantidade</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">Receita</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">% do Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topProducts.map((product, index) => {
                const totalRevenue = topProducts.reduce((sum, p) => sum + p.revenue, 0);
                const percentage = ((product.revenue / totalRevenue) * 100).toFixed(1);
                
                return (
                  <tr key={index}>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-orange-600 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <span className="font-medium text-gray-900">{product.product}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right font-medium text-gray-900">
                      {product.quantity.toLocaleString()}
                    </td>
                    <td className="py-4 text-right font-semibold text-green-600">
                      R$ {product.revenue.toFixed(2)}
                    </td>
                    <td className="py-4 text-right text-gray-600">
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}