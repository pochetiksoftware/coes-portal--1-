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
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 pb-2">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="p-2 text-gray-500 hover:text-[#153a8a] hover:bg-blue-50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrar Nuevo Ticket</h1>
          <p className="text-sm text-gray-500">Asistente de creación en 3 pasos.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 overflow-hidden">
        <div className="flex items-center justify-between relative max-w-2xl mx-auto">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#153a8a] z-0 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 ${step >= 1 ? 'bg-[#153a8a] border-blue-100 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <span className={`text-xs mt-2 font-medium ${step >= 1 ? 'text-[#153a8a]' : 'text-gray-500'}`}>Clasificación</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 ${step >= 2 ? 'bg-[#153a8a] border-blue-100 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className={`text-xs mt-2 font-medium ${step >= 2 ? 'text-[#153a8a]' : 'text-gray-500'}`}>Detalles</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 ${step >= 3 ? 'bg-[#153a8a] border-blue-100 text-white' : 'bg-white border-gray-200 text-gray-400'}`}>
              3
            </div>
            <span className={`text-xs mt-2 font-medium ${step >= 3 ? 'text-[#153a8a]' : 'text-gray-500'}`}>Adjuntos & Fin</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px] flex flex-col">
        <div className="p-6 md:p-8 space-y-6 flex-1">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 shadow-sm mb-6">
                <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-blue-900 mb-1">Guía rápida de clasificación (ITIL)</h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li><strong>Incidente:</strong> Interrupción no planificada o falla (Ej: "No funciona mi correo").</li>
                    <li><strong>Pedido (Requerimiento):</strong> Solicitud de algo nuevo (Ej: "Solicitar acceso a VPN").</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ¿Qué desea realizar? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.tipo === 'incidente' ? 'border-[#153a8a] bg-blue-50 ring-1 ring-[#153a8a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="radio" name="tipo" value="incidente" checked={formData.tipo === 'incidente'} onChange={(e) => setFormData({ ...formData, tipo: e.target.value })} className="h-4 w-4 text-[#153a8a] focus:ring-[#153a8a]" />
                      <div className="ml-3 flex flex-col">
                        <span className="text-sm font-medium text-gray-900 flex items-center"><AlertCircle className="w-4 h-4 mr-1 text-red-500" /> Reportar Incidente</span>
                        <span className="text-xs text-gray-500 mt-1">Algo no funciona correctamente.</span>
                      </div>
                    </label>
                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.tipo === 'pedido' ? 'border-[#153a8a] bg-blue-50 ring-1 ring-[#153a8a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input type="radio" name="tipo" value="pedido" checked={formData.tipo === 'pedido'} onChange={(e) => setFormData({ ...formData, tipo: e.target.value })} className="h-4 w-4 text-[#153a8a] focus:ring-[#153a8a]" />
                      <div className="ml-3 flex flex-col">
                        <span className="text-sm font-medium text-gray-900 flex items-center"><HelpCircle className="w-4 h-4 mr-1 text-indigo-500" /> Solicitar Pedido</span>
                        <span className="text-xs text-gray-500 mt-1">Necesito un nuevo acceso o equipo.</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categoría Afectada <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#153a8a] outline-none shadow-sm"
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
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Asunto Corto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.asunto}
                  onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                  placeholder="Ej: Problema al conectar VPN"
                  className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#153a8a] shadow-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Descripción Detallada <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="6"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Describa el problema o solicitud con detalle..."
                  className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#153a8a] shadow-sm resize-y outline-none"
                ></textarea>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Imágenes Adjuntas (Opcional)</label>
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <UploadCloud className="mx-auto h-10 w-10 text-gray-400 group-hover:text-[#153a8a] mb-3 transition-colors" />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-[#153a8a]">Selecciona imágenes</span> o arrastra aquí
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Se aceptan solo imágenes</p>
                </label>

                {attachments.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {attachments.map((attachment) => (
                      <div key={attachment.name} className="relative rounded-xl overflow-hidden border border-gray-200 bg-white">
                        <img src={attachment.dataUrl} alt={attachment.name} className="h-28 w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(attachment.name)}
                          className="absolute top-2 right-2 bg-white/90 text-gray-700 rounded-full p-1 hover:bg-white"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-3">Aún no ha cargado ninguna imagen.</p>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 border-b pb-2">Resumen del Ticket</h4>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500 text-xs">Clasificación</dt>
                    <dd className="font-medium text-gray-900 capitalize">{formData.tipo || 'No definido'} • {formData.categoria || 'No definido'}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-gray-500 text-xs">Asunto</dt>
                    <dd className="font-medium text-gray-900">{formData.asunto || 'No definido'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Atrás
            </button>
          ) : (
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="px-5 py-2.5 text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              Cancelar
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              className="px-5 py-2.5 bg-[#153a8a] border border-transparent text-white font-medium rounded-lg shadow-sm hover:bg-blue-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-2.5 bg-green-600 border border-transparent text-white font-medium rounded-lg shadow-sm hover:bg-green-700 transition-colors flex items-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" /> Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NuevoTicketScreen;
