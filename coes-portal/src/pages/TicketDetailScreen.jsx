import { ArrowLeft, Star, Activity, Clock, Info } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import TypeBadge from '../components/TypeBadge';

const TicketDetailScreen = ({ ticketId, setCurrentScreen, onOpenSurvey, onTicketSolved, tickets }) => {
  const ticket = tickets.find((t) => t.id === ticketId) || tickets[0];
  const isClosed = ticket.status.toLowerCase() === 'resuelto' || ticket.status.toLowerCase() === 'cerrado';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('requerimientos')}
            className="p-2 text-slate-400 hover:text-primary-400 hover:bg-white/10 rounded-full transition-all shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{ticket.id}</h1>
              <StatusBadge status={ticket.status} />
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-sm text-slate-300">Registrado el {ticket.date} • </p>
              <TypeBadge type={ticket.type} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {!isClosed && (
            <button
              onClick={() => onTicketSolved(ticket.id)}
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white border border-transparent font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 flex items-center transition-all shadow-lg shadow-primary-500/30 whitespace-nowrap"
            >
              <span className="mr-2">✔</span>
              Ticket Solucionado
            </button>
          )}
          {isClosed && (
            <button
              onClick={() => onOpenSurvey(ticket.id)}
              className="px-4 py-2 bg-amber-600/40 backdrop-blur-sm text-white border border-white/10 font-medium rounded-xl hover:bg-amber-600/50 flex items-center transition-all shadow-lg whitespace-nowrap"
            >
              <Star className="w-4 h-4 mr-2" />
              Calificar Servicio
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-lg shadow-black/20 border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-4">{ticket.subject}</h3>
            <div className="prose text-slate-300 text-sm">
              <p>{ticket.description}</p>
            </div>
          </div>

          {ticket.attachments && ticket.attachments.length > 0 && (
            <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-lg shadow-black/20 border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Imágenes Adjuntas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ticket.attachments.map((attachment) => (
                  <div key={attachment.name} className="rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all">
                    <img src={attachment.dataUrl} alt={attachment.name} className="h-40 w-full object-cover" />
                    <div className="p-2 text-xs text-slate-300">{attachment.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-lg shadow-black/20 border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-slate-400" /> Historial del Ticket
            </h3>
            <div className="relative border-l-2 border-primary-600/30 ml-3 space-y-8">
              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 ring-4 ring-slate-900 shadow-lg"></span>
                <p className="text-sm font-semibold text-white">Ticket Registrado</p>
                <p className="text-xs text-slate-400">{ticket.date} 09:00 AM • Por Juan Pérez</p>
              </div>
              {!isClosed && (
                <div className="relative pl-6">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-400 ring-4 ring-slate-900 shadow-lg"></span>
                  <p className="text-sm font-semibold text-white">En Revisión por Especialista</p>
                  <p className="text-xs text-slate-400">{ticket.date} 10:30 AM • Asignado a Soporte N1</p>
                </div>
              )}
              {isClosed && (
                <>
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-400 ring-4 ring-white shadow-lg"></span>
                    <p className="text-sm font-semibold text-secondary-900">Solución Aplicada</p>
                    <p className="text-xs text-secondary-500">{ticket.date} 02:15 PM • Por Equipo Soporte</p>
                  </div>
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 ring-4 ring-slate-900 shadow-lg"></span>
                    <p className="text-sm font-semibold text-white">Ticket Resuelto</p>
                    <p className="text-xs text-slate-400">{ticket.date} 02:30 PM • Se solicita validación</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-lg shadow-black/20 border border-white/10 p-5">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center border-b border-white/10 pb-2">
              <Clock className="w-4 h-4 mr-2 text-primary-400" /> Acuerdos de Servicio (SLA)
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Tiempo Restante</p>
                <p className={`text-xl font-bold ${ticket.sla === '-' ? 'text-slate-400' : 'text-primary-400'}`}>
                  {ticket.sla === '-' ? 'No aplica' : ticket.sla}
                </p>
              </div>
              {ticket.sla !== '-' && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Progreso SLA</span>
                    <span className="font-medium text-white">25%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full shadow-lg shadow-primary-500/50" style={{ width: '25%' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-lg shadow-black/20 border border-white/10 p-5">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center border-b border-white/10 pb-2">
              <Info className="w-4 h-4 mr-2 text-primary-400" /> Detalles Adicionales
            </h4>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-400 text-xs">Categoría</dt>
                <dd className="font-medium text-white">Infraestructura / Redes</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs">Impacto</dt>
                <dd className="font-medium text-white">Medio</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs">Urgencia</dt>
                <dd className="font-medium text-white">Alta</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs">Asignado a</dt>
                <dd className="font-medium text-primary-400">Soporte Nivel 2</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailScreen;
