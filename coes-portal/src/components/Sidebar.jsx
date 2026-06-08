import { Home, List, PlusCircle, Book, BarChart2, Zap, LogOut } from 'lucide-react';

const Sidebar = ({ currentScreen, setCurrentScreen }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Resumen (Inicio)' },
    { id: 'requerimientos', icon: List, label: 'Mis Requerimientos' },
    { id: 'nuevo', icon: PlusCircle, label: '+ Nuevo Ticket', special: true },
    { id: 'kb', icon: Book, label: 'Base de Conocimiento' },
    { id: 'metricas', icon: BarChart2, label: 'Métricas de Servicio' },
  ];

  return (
    <div className="w-64 bg-[#153a8a] text-white flex-col h-full shrink-0 hidden md:flex">
      <div className="p-6 flex items-center gap-3 border-b border-blue-800">
        <Zap className="w-8 h-8 text-yellow-400" />
        <div>
          <h2 className="font-bold text-lg leading-tight">COES-SINAC</h2>
          <p className="text-xs text-blue-300">Service Desk</p>
        </div>
      </div>
      <div className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              item.special
                ? 'bg-blue-600 hover:bg-blue-500 shadow-sm mt-2 mb-2'
                : currentScreen === item.id
                ? 'bg-white/10 text-white'
                : 'text-blue-100 hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={() => setCurrentScreen('login')}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
