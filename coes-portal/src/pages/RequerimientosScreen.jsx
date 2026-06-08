import { useState } from 'react';
import { Search, PlusCircle, ChevronRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import TypeBadge from '../components/TypeBadge';

const RequerimientosScreen = ({ setCurrentScreen, setSelectedTicket, tickets }) => {
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [search, setSearch] = useState('');

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = statusFilter === 'Todos' || ticket.status === statusFilter;
    const matchesType = typeFilter === 'Todos' || ticket.type === typeFilter;
    const matchesSearch = search.trim() === '' ||
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  return (
  <div className="space-y-6 max-w-6xl mx-auto p-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Mis Requerimientos</h1>
        <p className="text-sm text-slate-300 mt-1">Historial completo de incidentes y pedidos registrados.</p>
      </div>
      <button
        onClick={() => setCurrentScreen('nuevo')}
        className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl shadow-lg shadow-primary-500/30 hover:from-primary-600 hover:to-primary-700 transition-all flex items-center"
      >
        <PlusCircle className="w-4 h-4 mr-2" /> Crear Ticket
      </button>
    </div>

    <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-lg shadow-black/20 border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-primary-900/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/10 text-black text-sm rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent block p-2 shadow-sm placeholder-slate-500"
          >
            <option value="Todos">Todos los Estados</option>
            <option value="Nuevo">Nuevo</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Resuelto">Resuelto</option>
            <option value="Cerrado">Cerrado</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/10 text-black text-sm rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent block p-2 shadow-sm placeholder-slate-500"
          >
            <option value="Todos">Todos los Tipos</option>
            <option value="Incidente">Incidentes</option>
            <option value="Pedido">Pedidos</option>
          </select>
        </div>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent block w-full pl-10 p-2 shadow-sm placeholder-slate-500"
            placeholder="Buscar ticket..."
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Asunto</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Clasificación</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Detalle</th>
            </tr>
          </thead>
          <tbody className="bg-white/3 divide-y divide-white/5">
            {filteredTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="hover:bg-white/10 transition-all group cursor-pointer"
                onClick={() => {
                  setSelectedTicket(ticket.id);
                  setCurrentScreen('detalle');
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-400">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{ticket.date}</td>
                <td className="px-6 py-4 text-sm text-white max-w-[250px] truncate" title={ticket.subject}>{ticket.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap"><TypeBadge type={ticket.type} /></td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={ticket.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button className="text-slate-400 group-hover:text-primary-400 transition-colors p-1 rounded-full hover:bg-white/10">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-white/10 bg-gradient-to-r from-white/5 to-primary-900/10 flex items-center justify-between text-sm text-slate-400">
        <span>Mostrando {filteredTickets.length} registros</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-white/10 rounded-lg hover:bg-white/10 bg-white/5 backdrop-blur-sm transition-all text-slate-300">Anterior</button>
          <button className="px-3 py-1 border border-primary-500 bg-primary-600/50 backdrop-blur-sm text-white rounded-lg font-medium">1</button>
          <button className="px-3 py-1 border border-white/10 rounded-lg hover:bg-white/10 bg-white/5 backdrop-blur-sm transition-all text-slate-300">2</button>
          <button className="px-3 py-1 border border-white/10 rounded-lg hover:bg-white/10 bg-white/5 backdrop-blur-sm transition-all text-slate-300">Siguiente</button>
        </div>
      </div>
    </div>
  </div>
);
}

export default RequerimientosScreen;
