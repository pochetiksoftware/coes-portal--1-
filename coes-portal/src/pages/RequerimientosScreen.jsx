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
  <div className="space-y-6 max-w-6xl mx-auto">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mis Requerimientos</h1>
        <p className="text-sm text-gray-500 mt-1">Historial completo de incidentes y pedidos registrados.</p>
      </div>
      <button
        onClick={() => setCurrentScreen('nuevo')}
        className="px-4 py-2 bg-[#153a8a] text-white font-medium rounded-lg shadow-sm hover:bg-blue-800 transition-colors flex items-center"
      >
        <PlusCircle className="w-4 h-4 mr-2" /> Crear Ticket
      </button>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-[#153a8a] focus:border-[#153a8a] block p-2 shadow-sm"
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
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-[#153a8a] focus:border-[#153a8a] block p-2 shadow-sm"
          >
            <option value="Todos">Todos los Tipos</option>
            <option value="Incidente">Incidentes</option>
            <option value="Pedido">Pedidos</option>
          </select>
        </div>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#153a8a] focus:border-[#153a8a] block w-full pl-10 p-2 shadow-sm"
            placeholder="Buscar ticket..."
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Asunto</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Clasificación</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Detalle</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="hover:bg-gray-50 transition-colors group cursor-pointer"
                onClick={() => {
                  setSelectedTicket(ticket.id);
                  setCurrentScreen('detalle');
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#153a8a]">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-[250px] truncate" title={ticket.subject}>{ticket.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap"><TypeBadge type={ticket.type} /></td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={ticket.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button className="text-gray-400 group-hover:text-[#153a8a] transition-colors p-1 rounded-full hover:bg-blue-50">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
        <span>Mostrando {filteredTickets.length} registros</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 bg-white">Anterior</button>
          <button className="px-3 py-1 border border-[#153a8a] bg-blue-50 text-[#153a8a] rounded font-medium">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 bg-white">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 bg-white">Siguiente</button>
        </div>
      </div>
    </div>
  </div>
);
}

export default RequerimientosScreen;
