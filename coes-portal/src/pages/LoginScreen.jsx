import { Leaf, CheckCircle } from 'lucide-react';

const LoginScreen = ({ setCurrentScreen }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative overflow-hidden">
    {/* Gradient Orbs */}
    <div className="absolute top-20 left-10 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
    
    <div className="bg-slate-800/50 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl shadow-black/50 w-full max-w-md border border-slate-700/50 relative z-10">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center mb-4 shadow-xl shadow-primary-500/40">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">COES-SINAC</h1>
        <p className="text-sm text-slate-300 mt-2 font-medium">Portal de Service Desk Institucional</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setCurrentScreen('dashboard'); }} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">Correo Corporativo</label>
          <input
            type="email"
            required
            className="w-full rounded-xl border border-slate-600/50 px-4 py-3 bg-slate-700/40 backdrop-blur-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-400/50 outline-none transition-all placeholder-slate-500 text-white"
            placeholder="usuario@coes.org.pe"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">Contraseña</label>
          <input
            type="password"
            required
            className="w-full rounded-xl border border-slate-600/50 px-4 py-3 bg-slate-700/40 backdrop-blur-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-400/50 outline-none transition-all placeholder-slate-500 text-white"
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-700/40 text-primary-600 focus:ring-primary-400" />
            <span className="ml-2 text-sm text-slate-300">Recordarme</span>
          </label>
          <a href="#" className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">¿Olvidó su contraseña?</a>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary-600/50 hover:shadow-primary-600/70"
        >
          Iniciar Sesión
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <p className="text-xs text-slate-400 text-center mb-3">Credenciales de Demostración</p>
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
            <span>Email: <span className="font-medium">usuario@coes.org.pe</span></span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
            <span>Contraseña: <span className="font-medium">cualquier valor</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginScreen;
