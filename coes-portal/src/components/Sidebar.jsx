import { Home, List, PlusCircle, Book, BarChart2, Leaf, LogOut } from 'lucide-react';

const Sidebar = ({ currentScreen, setCurrentScreen }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Resumen (Inicio)' },
    { id: 'requerimientos', icon: List, label: 'Mis Requerimientos' },
    { id: 'nuevo', icon: PlusCircle, label: '+ Nuevo Ticket', special: true },
    { id: 'kb', icon: Book, label: 'Base de Conocimiento' },
    { id: 'metricas', icon: BarChart2, label: 'Métricas de Servicio' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex-col h-full shrink-0 hidden md:flex backdrop-blur-xl border-r border-slate-700/50 shadow-xl shadow-black/50">
      <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/50">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">COES-SINAC</h2>
          <p className="text-xs text-primary-300">Service Desk</p>
        </div>
      </div>
      <div className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
              item.special
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/40 hover:shadow-primary-500/60 mt-2 mb-2'
                : currentScreen === item.id
                ? 'bg-slate-700/60 text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-700/40 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={() => setCurrentScreen('login')}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 hover:text-primary-300 hover:bg-slate-700/40 rounded-xl transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
