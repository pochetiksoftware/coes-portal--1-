import { useState } from 'react';
import { ArrowLeft, Info, AlertCircle, HelpCircle, UploadCloud, ChevronRight, Check, CheckCircle } from 'lucide-react';

const NuevoTicketScreen = ({ setCurrentScreen, onAddTicket }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ tipo: '', categoria: '', asunto: '', descripcion: '' });
  const [attachments, setAttachments] = useState([]);

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const isStep1Valid = formData.tipo !== '' && formData.categoria !== '';
  const isStep2Valid = formData.asunto.trim() !== '' && formData.descripcion.trim() !== '';

  const handleFinish = () => {
    if (isStep2Valid) {
      onAddTicket({ ...formData, attachments });
      setCurrentScreen('dashboard');
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    Promise.all(imageFiles.map((file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, dataUrl: reader.result });
      reader.readAsDataURL(file);
    }))).then((loaded) => {
      setAttachments((current) => [...current, ...loaded]);
    });
  };

  const handleRemoveAttachment = (name) => {
    setAttachments((current) => current.filter((attachment) => attachment.name !== name));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 p-6">
      <div className="flex items-center gap-4 pb-2">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="p-2 text-slate-400 hover:text-primary-400 hover:bg-white/10 rounded-full transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Registrar Nuevo Ticket</h1>
          <p className="text-sm text-slate-300">Asistente de creación en 3 pasos.</p>
        </div>
      </div>

      <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-lg shadow-black/20 border border-white/10 p-6 mb-6 overflow-hidden">
        <div className="flex items-center justify-between relative max-w-2xl mx-auto">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-white/10 z-0 rounded-full"></div>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-primary-500 to-primary-600 z-0 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= 1 ? 'bg-gradient-to-br from-primary-400 to-primary-600 border-primary-300 text-white shadow-lg' : 'bg-white/10 border-white/20 text-slate-500'}`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <span className={`text-xs mt-2 font-medium transition-colors ${step >= 1 ? 'text-primary-400' : 'text-slate-500'}`}>Clasificación</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= 2 ? 'bg-gradient-to-br from-primary-400 to-primary-600 border-primary-300 text-white shadow-lg' : 'bg-white/10 border-white/20 text-slate-500'}`}>
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className={`text-xs mt-2 font-medium transition-colors ${step >= 2 ? 'text-primary-400' : 'text-slate-500'}`}>Detalles</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${step >= 3 ? 'bg-gradient-to-br from-primary-400 to-primary-600 border-primary-300 text-white shadow-lg' : 'bg-white/10 border-white/20 text-slate-500'}`}>
              3
            </div>
            <span className={`text-xs mt-2 font-medium transition-colors ${step >= 3 ? 'text-primary-400' : 'text-slate-500'}`}>Adjuntos & Fin</span>
          </div>
        </div>
      </div>

      <div className="bg-white/8 backdrop-blur-2xl rounded-3xl shadow-lg shadow-black/20 border border-white/10 overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-6 md:p-8 space-y-6 flex-1">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-primary-600/20 to-primary-500/10 backdrop-blur-sm border border-primary-500/30 rounded-2xl p-4 flex gap-3 shadow-sm mb-6">
                <Info className="w-6 h-6 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Guía rápida de clasificación (ITIL)</h4>
                  <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                    <li><strong>Incidente:</strong> Interrupción no planificada o falla (Ej: "No funciona mi correo").</li>
                    <li><strong>Pedido (Requerimiento):</strong> Solicitud de algo nuevo (Ej: "Solicitar acceso a VPN").</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    ¿Qué desea realizar? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${formData.tipo === 'incidente' ? 'border-primary-500 bg-primary-600/40 backdrop-blur-sm ring-1 ring-primary-400' : 'border-white/10 hover:bg-white/10 hover:border-primary-400/30'}`}>
                      <input type="radio" name="tipo" value="incidente" checked={formData.tipo === 'incidente'} onChange={(e) => setFormData({ ...formData, tipo: e.target.value })} className="h-4 w-4 text-primary-600 focus:ring-primary-400" />
                      <div className="ml-3 flex flex-col">
                        <span className="text-sm font-medium text-white flex items-center"><AlertCircle className="w-4 h-4 mr-1 text-red-400" /> Reportar Incidente</span>
                        <span className="text-xs text-slate-400 mt-1">Algo no funciona correctamente.</span>
                      </div>
                    </label>
                    <label className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${formData.tipo === 'pedido' ? 'border-primary-500 bg-primary-600/40 backdrop-blur-sm ring-1 ring-primary-400' : 'border-white/10 hover:bg-white/10 hover:border-primary-400/30'}`}>
                      <input type="radio" name="tipo" value="pedido" checked={formData.tipo === 'pedido'} onChange={(e) => setFormData({ ...formData, tipo: e.target.value })} className="h-4 w-4 text-primary-600 focus:ring-primary-400" />
                      <div className="ml-3 flex flex-col">
                        <span className="text-sm font-medium text-white flex items-center"><HelpCircle className="w-4 h-4 mr-1 text-primary-400" /> Solicitar Pedido</span>
                        <span className="text-xs text-slate-400 mt-1">Necesito un nuevo acceso o equipo.</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Categoría Afectada <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/10 text-black py-3 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent shadow-sm placeholder-slate-500"
                  >
                    <option value="">Seleccione una categoría...</option>
                    <option value="hw">Hardware (Equipos, Impresoras)</option>
                    <option value="sw">Software (Sistemas, Ofimática)</option>
                    <option value="red">Redes y Comunicaciones (Internet, VPN)</option>
                    <option value="acc">Accesos y Cuentas</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Asunto Corto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.asunto}
                  onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                  placeholder="Ej: Problema al conectar VPN"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/10 text-white py-3 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm outline-none placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Descripción Detallada <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="6"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Describa el problema o solicitud con detalle..."
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/10 text-white py-3 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm resize-y outline-none placeholder-slate-500"
                ></textarea>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Imágenes Adjuntas (Opcional)</label>
                <label className="border-2 border-dashed border-white/15 rounded-2xl p-8 text-center bg-gradient-to-br from-primary-600/10 to-primary-500/5 hover:to-primary-500/10 hover:border-primary-400/40 transition-all cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <UploadCloud className="mx-auto h-10 w-10 text-primary-400/60 group-hover:text-primary-400 mb-3 transition-colors" />
                  <p className="text-sm text-slate-300">
                    <span className="font-semibold text-primary-400">Selecciona imágenes</span> o arrastra aquí
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Se aceptan solo imágenes</p>
                </label>

                {attachments.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {attachments.map((attachment) => (
                      <div key={attachment.name} className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all">
                        <img src={attachment.dataUrl} alt={attachment.name} className="h-28 w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(attachment.name)}
                          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full p-1 hover:bg-white shadow-lg"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 mt-3">Aún no ha cargado ninguna imagen.</p>
                )}
              </div>

              <div className="bg-gradient-to-br from-white/10 to-primary-600/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 mt-6">
                <h4 className="text-sm font-bold text-white mb-3 border-b border-white/10 pb-2">Resumen del Ticket</h4>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
                  <div>
                    <dt className="text-slate-500 text-xs">Clasificación</dt>
                    <dd className="font-medium text-white capitalize">{formData.tipo || 'No definido'} • {formData.categoria || 'No definido'}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-slate-500 text-xs">Asunto</dt>
                    <dd className="font-medium text-white">{formData.asunto || 'No definido'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gradient-to-r from-white/5 to-primary-600/10 backdrop-blur-sm border-t border-white/10 flex justify-between items-center">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium rounded-xl shadow-sm hover:bg-white/15 transition-all flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
            </button>
          ) : (
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="px-5 py-2.5 text-slate-400 font-medium hover:text-primary-400 transition-colors"
            >
              Cancelar
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 border border-transparent text-white font-medium rounded-xl shadow-lg shadow-primary-500/30 hover:from-primary-600 hover:to-primary-700 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 border border-transparent text-white font-medium rounded-xl shadow-lg shadow-primary-500/30 hover:from-primary-600 hover:to-primary-700 transition-all flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" /> Enviar Ticket
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NuevoTicketScreen;
