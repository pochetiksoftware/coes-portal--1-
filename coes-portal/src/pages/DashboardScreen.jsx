import { ChevronRight, AlertCircle, PlusCircle, List, Clock, Zap } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import TypeBadge from '../components/TypeBadge';

const DashboardScreen = ({ setCurrentScreen, setSelectedTicket, tickets }) => (
  <div className="space-y-6 max-w-6xl mx-auto">
    <div className="bg-gradient-to-r from-[#153a8a] to-blue-700 rounded-xl shadow-lg p-8 text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
      <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
        <Zap className="w-64 h-64 -mt-10 -mr-10" />
      </div>
      <div className="relative z-10 mb-6 md:mb-0">
        <h1 className="text-3xl font-extrabold mb-2">Portal de Servicios de TI</h1>
        <p className="text-blue-100 max-w-lg text-sm md:text-base">Bienvenido al nuevo centro de atención. ¿En qué podemos ayudarle hoy?</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto">
        <button onClick={() => setCurrentScreen('nuevo')} className="px-5 py-3 bg-white text-[#153a8a] font-bold rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center justify-center">
          <AlertCircle className="w-5 h-5 mr-2 text-red-500" /> Reportar Incidente
        </button>
        <button onClick={() => setCurrentScreen('nuevo')} className="px-5 py-3 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-900 transition-colors flex items-center justify-center border border-blue-600">
          <PlusCircle className="w-5 h-5 mr-2 text-blue-300" /> Solicitar Pedido
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Tickets Pendientes', value: tickets.filter((t) => t.status === 'Nuevo' || t.status === 'En Proceso').length.toString(), desc: 'En su bandeja', icon: List, color: 'text-blue-600', bg: 'bg-blue-100' },
        { title: 'Tiempo Prom. Rpta', value: '1.5h', desc: 'Últimos 7 días', icon: Clock, color: 'text-green-600', bg: 'bg-green-100' },
        { title: 'Mantenimiento', value: '2', desc: 'Avisos activos', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
      ].map((metric, i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className={`p-3 rounded-lg ${metric.bg} ${metric.color}`}>
            <metric.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{metric.title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <span className="text-xs text-gray-400">{metric.desc}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="text-lg font-bold text-gray-800">Tickets Recientes</h3>
        <button onClick={() => setCurrentScreen('requerimientos')} className="text-sm font-medium text-[#153a8a] hover:text-blue-800 flex items-center">
          Ver todos <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Asunto</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">SLA Restante</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.slice(0, 3).map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => {
                  setSelectedTicket(ticket.id);
                  setCurrentScreen('detalle');
                }}
                className="hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#153a8a] group-hover:underline">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={ticket.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{ticket.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DashboardScreen;
