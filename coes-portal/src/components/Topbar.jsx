import { Search, Bell } from 'lucide-react';

const Topbar = () => (
  <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0">
    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-md">
      <Search className="w-4 h-4 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Buscar tickets, artículos..."
        className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
      />
    </div>
    <div className="flex items-center gap-4 ml-4">
      <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer">
        <div className="w-8 h-8 bg-[#153a8a] rounded-full flex items-center justify-center text-white font-bold text-sm">HC</div>
        <div className="hidden sm:block text-sm">
          <p className="font-medium text-gray-700 leading-none">Hans Castilla</p>
          <p className="text-xs text-gray-500 mt-1">Analista TI</p>
        </div>
      </div>
    </div>
  </header>
);

export default Topbar;
