import { ChevronRight, AlertCircle, PlusCircle, List, Clock, Leaf } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import TypeBadge from '../components/TypeBadge';

const DashboardScreen = ({ setCurrentScreen, setSelectedTicket, tickets }) => (
  <div className="space-y-6 max-w-6xl mx-auto p-6">
    <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl shadow-2xl shadow-primary-600/40 p-8 text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
      <div className="absolute right-0 top-0 opacity-15 pointer-events-none">
        <Leaf className="w-64 h-64 -mt-10 -mr-10" />
      </div>
      <div className="relative z-10 mb-6 md:mb-0">
        <h1 className="text-4xl font-bold mb-2">Portal de Servicios de TI</h1>
        <p className="text-primary-100 max-w-lg text-sm md:text-base font-medium">Bienvenido al nuevo centro de atención. ¿En qué podemos ayudarle hoy?</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto">
        <button onClick={() => setCurrentScreen('nuevo')} className="px-6 py-3 bg-primary-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center border border-primary-400">
          <AlertCircle className="w-5 h-5 mr-2 text-red-500" /> Reportar Incidente
        </button>
        <button onClick={() => setCurrentScreen('nuevo')} className="px-6 py-3 bg-primary-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center border border-primary-400">
          <PlusCircle className="w-5 h-5 mr-2 text-primary-200" /> Solicitar Pedido
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Tickets Pendientes', value: tickets.filter((t) => t.status === 'Nuevo' || t.status === 'En Proceso').length.toString(), desc: 'En su bandeja', icon: List, color: 'text-primary-400', bg: 'bg-primary-600/15' },
        { title: 'Tiempo Prom. Rpta', value: '1.5h', desc: 'Últimos 7 días', icon: Clock, color: 'text-primary-400', bg: 'bg-primary-600/15' },
        { title: 'Mantenimiento', value: '2', desc: 'Avisos activos', icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-600/15' },
      ].map((metric, i) => (
        <div key={i} className="bg-white/8 backdrop-blur-2xl rounded-2xl p-6 shadow-lg shadow-black/20 border border-white/10 flex items-center gap-4 hover:shadow-xl hover:shadow-primary-500/15 transition-all duration-300">
          <div className={`p-4 rounded-2xl ${metric.bg}`}>
            <metric.icon className={`w-6 h-6 ${metric.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-300">{metric.title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
              <span className="text-xs text-slate-400">{metric.desc}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-lg shadow-black/20 border border-white/10 overflow-hidden hover:shadow-xl hover:shadow-primary-500/15 transition-all duration-300">
      <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-white/5 to-primary-900/10">
        <h3 className="text-lg font-bold text-white">Tickets Recientes</h3>
        <button onClick={() => setCurrentScreen('requerimientos')} className="text-sm font-medium text-primary-400 hover:text-primary-300 flex items-center transition-colors">
          Ver todos <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Asunto</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">SLA Restante</th>
            </tr>
          </thead>
          <tbody className="bg-white/3 divide-y divide-white/5">
            {tickets.slice(0, 3).map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => {
                  setSelectedTicket(ticket.id);
                  setCurrentScreen('detalle');
                }}
                className="hover:bg-white/10 transition-all cursor-pointer group"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-400 group-hover:underline">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{ticket.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={ticket.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-300">{ticket.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DashboardScreen;
