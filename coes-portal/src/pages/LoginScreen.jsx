import { Zap, CheckCircle } from 'lucide-react';

const LoginScreen = ({ setCurrentScreen }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
    <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
          <Zap className="w-10 h-10 text-[#153a8a]" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">COES-SINAC</h1>
        <p className="text-sm text-gray-500 mt-1">Portal de Service Desk Institucional</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setCurrentScreen('dashboard'); }} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Corporativo</label>
          <input
            type="email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-[#153a8a] focus:ring-1 focus:ring-[#153a8a] outline-none transition-all"
            placeholder="usuario@coes.org.pe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-[#153a8a] focus:ring-1 focus:ring-[#153a8a] outline-none transition-all"
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#153a8a] focus:ring-[#153a8a]" />
            <span className="ml-2 text-sm text-gray-600">Recordarme</span>
          </label>
          <a href="#" className="text-sm font-medium text-[#153a8a] hover:text-blue-800 transition-colors">¿Olvidó su contraseña?</a>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center rounded-lg bg-[#153a8a] py-3 px-4 text-sm font-bold text-white shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-[#153a8a] focus:ring-offset-2 transition-all mt-4"
        >
          Ingresar al Portal
        </button>
      </form>

      <div className="mt-8 border-t border-gray-100 pt-6 text-center">
        <p className="text-xs font-medium text-gray-400 flex items-center justify-center gap-1">
          <CheckCircle className="w-3 h-3" /> Seguridad de la Información • ISO 27001
        </p>
      </div>
    </div>
  </div>
);

export default LoginScreen;
