import { Search, Bell, Home, List, PlusCircle, Book, BarChart2, Leaf, LogOut } from 'lucide-react';

const Topbar = ({ currentScreen, setCurrentScreen }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Inicio' },
    { id: 'requerimientos', icon: List, label: 'Requerimientos' },
    { id: 'kb', icon: Book, label: 'Base de Conocimiento' },
  ];

  return (
    <header className="bg-slate-900/40 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-40 shadow-lg shadow-black/20">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/40">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">COES-SINAC</p>
            <p className="text-xs text-primary-300">Service Desk</p>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentScreen === item.id
                  ? 'bg-white/15 backdrop-blur-md text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setCurrentScreen('nuevo')}
            className="flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg shadow-primary-500/40 hover:shadow-primary-500/60"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden md:inline">Nuevo Ticket</span>
          </button>
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10 hover:bg-white/15 transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-sm w-32 text-white placeholder-slate-500"
            />
          </div>

          <button className="relative p-2 text-slate-300 hover:text-primary-300 hover:bg-white/10 rounded-lg transition-all duration-300">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-lg"></span>
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-white/10 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">HC</div>
            <div className="hidden md:block text-sm">
              <p className="font-medium text-white leading-none">HC</p>
              <p className="text-xs text-slate-400 mt-1">Usuario</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('login')}
            className="p-2 text-slate-400 hover:text-primary-300 hover:bg-white/10 rounded-lg transition-all duration-300"
            title="Cerrar sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
