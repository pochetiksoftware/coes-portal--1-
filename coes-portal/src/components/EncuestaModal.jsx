import { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';

const EncuestaModal = ({ isOpen, onClose, ticketId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl p-4">
      <div className="bg-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl shadow-black/40 p-8 max-w-md w-full transform transition-all border border-white/15">
        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 text-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary-500/50">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Encuesta de Satisfacción</h3>
              <p className="text-sm text-slate-300 mt-2">¿Cómo calificaría la atención recibida en el ticket {ticketId}?</p>
            </div>

            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="focus:outline-none transition-transform hover:scale-110"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-10 h-10 ${(hoverRating || rating) >= star ? 'text-primary-400 fill-primary-400' : 'text-slate-600'} transition-colors`}
                  />
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">Comentarios adicionales (opcional)</label>
              <textarea
                className="w-full border border-white/10 rounded-xl p-3 text-sm bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none transition-all placeholder-slate-500 text-white"
                rows="3"
                placeholder="Cuéntenos cómo podemos mejorar..."
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/15 transition-all border border-white/10"
              >
                Cancelar
              </button>
              <button
                onClick={() => setSubmitted(true)}
                disabled={rating === 0}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-500/40"
              >
                Enviar Encuesta
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-primary-600/40 backdrop-blur-sm text-primary-300 rounded-full flex items-center justify-center mb-4 border border-white/15">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">¡Gracias por su opinión!</h3>
            <p className="text-slate-300 mb-6">Sus comentarios nos ayudan a mejorar continuamente nuestro servicio.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/40"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncuestaModal;
