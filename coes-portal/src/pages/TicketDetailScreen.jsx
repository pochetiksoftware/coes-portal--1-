import { ArrowLeft, Star, Activity, Clock, Info } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import TypeBadge from '../components/TypeBadge';

const TicketDetailScreen = ({ ticketId, setCurrentScreen, onOpenSurvey, onTicketSolved, tickets }) => {
  const ticket = tickets.find((t) => t.id === ticketId) || tickets[0];
  const isClosed = ticket.status.toLowerCase() === 'resuelto' || ticket.status.toLowerCase() === 'cerrado';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentScreen('requerimientos')}
            className="p-2 text-gray-500 hover:text-[#153a8a] hover:bg-blue-50 rounded-full transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{ticket.id}</h1>
              <StatusBadge status={ticket.status} />
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="text-sm text-gray-500">Registrado el {ticket.date} • </p>
              <TypeBadge type={ticket.type} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {!isClosed && (
            <button
              onClick={() => onTicketSolved(ticket.id)}
              className="px-4 py-2 bg-green-600 text-white border border-green-700 font-medium rounded-lg hover:bg-green-700 flex items-center transition-colors shadow-sm whitespace-nowrap"
            >
              <span className="mr-2">✔</span>
              Ticket Solucionado
            </button>
          )}
          {isClosed && (
            <button
              onClick={() => onOpenSurvey(ticket.id)}
              className="px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 font-medium rounded-lg hover:bg-yellow-100 flex items-center transition-colors shadow-sm whitespace-nowrap"
            >
              <Star className="w-4 h-4 mr-2" />
              Calificar Servicio
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{ticket.subject}</h3>
            <div className="prose text-gray-700 text-sm">
              <p>{ticket.description}</p>
            </div>
          </div>

          {ticket.attachments && ticket.attachments.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Imágenes Adjuntas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ticket.attachments.map((attachment) => (
                  <div key={attachment.name} className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={attachment.dataUrl} alt={attachment.name} className="h-40 w-full object-cover" />
                    <div className="p-2 text-xs text-gray-600">{attachment.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-gray-400" /> Historial del Ticket
            </h3>
            <div className="relative border-l-2 border-blue-100 ml-3 space-y-8">
              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#153a8a] ring-4 ring-white"></span>
                <p className="text-sm font-semibold text-gray-900">Ticket Registrado</p>
                <p className="text-xs text-gray-500">{ticket.date} 09:00 AM • Por Juan Pérez</p>
              </div>
              {!isClosed && (
                <div className="relative pl-6">
                  <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-yellow-400 ring-4 ring-white"></span>
                  <p className="text-sm font-semibold text-gray-900">En Revisión por Especialista</p>
                  <p className="text-xs text-gray-500">{ticket.date} 10:30 AM • Asignado a Soporte N1</p>
                </div>
              )}
              {isClosed && (
                <>
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-400 ring-4 ring-white"></span>
                    <p className="text-sm font-semibold text-gray-900">Solución Aplicada</p>
                    <p className="text-xs text-gray-500">{ticket.date} 02:15 PM • Por Equipo Soporte</p>
                  </div>
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-500 ring-4 ring-white"></span>
                    <p className="text-sm font-semibold text-gray-900">Ticket Resuelto</p>
                    <p className="text-xs text-gray-500">{ticket.date} 02:30 PM • Se solicita validación</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
              <Clock className="w-4 h-4 mr-2 text-[#153a8a]" /> Acuerdos de Servicio (SLA)
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Tiempo Restante</p>
                <p className={`text-xl font-bold ${ticket.sla === '-' ? 'text-gray-400' : 'text-green-600'}`}>
                  {ticket.sla === '-' ? 'No aplica' : ticket.sla}
                </p>
              </div>
              {ticket.sla !== '-' && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Progreso SLA</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center border-b pb-2">
              <Info className="w-4 h-4 mr-2 text-[#153a8a]" /> Detalles Adicionales
            </h4>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500 text-xs">Categoría</dt>
                <dd className="font-medium text-gray-900">Infraestructura / Redes</dd>
              </div>
              <div>
                <dt className="text-gray-500 text-xs">Impacto</dt>
                <dd className="font-medium text-gray-900">Medio</dd>
              </div>
              <div>
                <dt className="text-gray-500 text-xs">Urgencia</dt>
                <dd className="font-medium text-gray-900">Alta</dd>
              </div>
              <div>
                <dt className="text-gray-500 text-xs">Asignado a</dt>
                <dd className="font-medium text-[#153a8a]">Soporte Nivel 2</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailScreen;
