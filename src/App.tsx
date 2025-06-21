import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Sales from './components/Sales';
import Customers from './components/Customers';
import Reports from './components/Reports';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'produtos':
        return <Products />;
      case 'vendas':
        return <Sales />;
      case 'clientes':
        return <Customers />;
      case 'relatorios':
        return <Reports />;
      case 'configuracoes':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;
