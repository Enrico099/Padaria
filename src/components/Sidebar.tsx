import React from 'react';
import { Home, Package, ShoppingCart, Users, BarChart3, Settings, Coffee } from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'produtos', label: 'Produtos', icon: Package },
  { id: 'vendas', label: 'PDV', icon: ShoppingCart },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
  { id: 'configuracoes', label: 'Configurações', icon: Settings }
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="bg-gradient-to-b from-orange-600 to-orange-700 text-white w-64 min-h-screen p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white/10 p-2 rounded-lg">
          <Coffee className="w-8 h-8 text-orange-200" />
        </div>
        <div>
          <h1 className="text-xl font-bold">PadaSystem</h1>
          <p className="text-orange-200 text-sm">Gestão Inteligente</p>
        </div>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
                activeTab === item.id
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-orange-100 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-8">
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-orange-200 text-sm">Padaria São João</p>
          <p className="text-white font-medium">Caixa: João Silva</p>
          <p className="text-orange-200 text-xs mt-1">
            {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
}