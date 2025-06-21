import React, { useState } from 'react';
import { Settings as SettingsIcon, Store, User, Bell, Database, Printer, Wifi, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { state, dispatch } = useApp();
  const { settings } = state;
  
  const [bakeryInfo, setBakeryInfo] = useState({
    bakeryName: settings.bakeryName || 'Padaria São João',
    cnpj: settings.cnpj || '12.345.678/0001-90',
    address: settings.address || 'Rua das Flores, 123 - Centro',
    phone: settings.phone || '(11) 3456-7890'
  });

  const [userInfo, setUserInfo] = useState({
    name: 'João Silva',
    email: 'joao@padariasaojoao.com',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    lowStock: settings.notifications?.lowStock ?? true,
    dailyReports: settings.notifications?.dailyReports ?? false,
    autoBackup: settings.notifications?.autoBackup ?? true
  });

  const saveBakeryInfo = () => {
    const updatedSettings = {
      ...settings,
      ...bakeryInfo
    };
    dispatch({ type: 'UPDATE_SETTINGS', payload: updatedSettings });
    alert('Informações da padaria salvas com sucesso!');
  };

  const saveUserInfo = () => {
    if (userInfo.newPassword && userInfo.newPassword !== userInfo.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Perfil atualizado com sucesso!');
    setUserInfo({ ...userInfo, newPassword: '', confirmPassword: '' });
  };

  const saveNotifications = () => {
    const updatedSettings = {
      ...settings,
      notifications
    };
    dispatch({ type: 'UPDATE_SETTINGS', payload: updatedSettings });
    alert('Configurações de notificação salvas!');
  };

  const performBackup = () => {
    const backupData = {
      products: state.products,
      sales: state.sales,
      customers: state.customers,
      settings: state.settings,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-padaria-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    alert('Backup realizado com sucesso!');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações da Padaria */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Store className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Informações da Padaria</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Padaria</label>
              <input
                type="text"
                value={bakeryInfo.bakeryName}
                onChange={(e) => setBakeryInfo({ ...bakeryInfo, bakeryName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ</label>
              <input
                type="text"
                value={bakeryInfo.cnpj}
                onChange={(e) => setBakeryInfo({ ...bakeryInfo, cnpj: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
              <input
                type="text"
                value={bakeryInfo.address}
                onChange={(e) => setBakeryInfo({ ...bakeryInfo, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input
                type="text"
                value={bakeryInfo.phone}
                onChange={(e) => setBakeryInfo({ ...bakeryInfo, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button 
            onClick={saveBakeryInfo}
            className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Salvar Informações
          </button>
        </div>

        {/* Configurações de Usuário */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Usuário</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
              <input
                type="password"
                value={userInfo.newPassword}
                onChange={(e) => setUserInfo({ ...userInfo, newPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
              <input
                type="password"
                value={userInfo.confirmPassword}
                onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button 
            onClick={saveUserInfo}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Atualizar Perfil
          </button>
        </div>

        {/* Notificações */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Notificações</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Estoque Baixo</h3>
                <p className="text-sm text-gray-600">Receber alerta quando produtos estiverem em falta</p>
              </div>
              <button 
                onClick={() => setNotifications({ ...notifications, lowStock: !notifications.lowStock })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.lowStock ? 'bg-orange-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.lowStock ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Relatórios Diários</h3>
                <p className="text-sm text-gray-600">Receber resumo das vendas por email</p>
              </div>
              <button 
                onClick={() => setNotifications({ ...notifications, dailyReports: !notifications.dailyReports })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.dailyReports ? 'bg-orange-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.dailyReports ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Backup Automático</h3>
                <p className="text-sm text-gray-600">Fazer backup dos dados automaticamente</p>
              </div>
              <button 
                onClick={() => setNotifications({ ...notifications, autoBackup: !notifications.autoBackup })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.autoBackup ? 'bg-orange-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.autoBackup ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
          
          <button 
            onClick={saveNotifications}
            className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Salvar Notificações
          </button>
        </div>

        {/* Configurações do Sistema */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-100 p-2 rounded-lg">
              <SettingsIcon className="w-5 h-5 text-gray-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Sistema</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Backup de Dados</h3>
                  <p className="text-sm text-gray-600">Último backup: hoje às 09:00</p>
                </div>
              </div>
              <button 
                onClick={performBackup}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Fazer Backup
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Printer className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Impressora Fiscal</h3>
                  <p className="text-sm text-gray-600">Status: Conectada</p>
                </div>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Testar
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="font-medium text-gray-900">Conexão Internet</h3>
                  <p className="text-sm text-gray-600">Status: Online</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}