import { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';

const EncuestaModal = ({ isOpen, onClose, ticketId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full transform transition-all">
        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 bg-blue-100 text-[#153a8a] rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Encuesta de Satisfacción</h3>
              <p className="text-sm text-gray-500 mt-2">¿Cómo calificaría la atención recibida en el ticket {ticketId}?</p>
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
                    className={`w-10 h-10 ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} transition-colors`}
                  />
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Comentarios adicionales (opcional)</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#153a8a] focus:border-transparent outline-none"
                rows="3"
                placeholder="Cuéntenos cómo podemos mejorar..."
              ></textarea>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setSubmitted(true)}
                disabled={rating === 0}
                className="flex-1 px-4 py-2 bg-[#153a8a] text-white font-medium rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Encuesta
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">¡Gracias por su opinión!</h3>
            <p className="text-gray-500 mb-6">Sus comentarios nos ayudan a mejorar continuamente nuestro servicio.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#153a8a] text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
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
