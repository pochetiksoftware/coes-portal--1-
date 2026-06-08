import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import LoginScreen from './pages/LoginScreen';
import DashboardScreen from './pages/DashboardScreen';
import RequerimientosScreen from './pages/RequerimientosScreen';
import NuevoTicketScreen from './pages/NuevoTicketScreen';
import TicketDetailScreen from './pages/TicketDetailScreen';
import EncuestaModal from './components/EncuestaModal';
import { MOCK_TICKETS } from './data/mockTickets';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [tickets, setTickets] = useState(MOCK_TICKETS);

  const addNewTicket = (newTicket) => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const ticketId = newTicket.tipo === 'incidente'
      ? `INC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`
      : `REQ-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`;

    const createdTicket = {
      id: ticketId,
      date: formattedDate,
      subject: newTicket.asunto,
      type: newTicket.tipo === 'incidente' ? 'Incidente' : 'Pedido',
      status: 'Nuevo',
      sla: newTicket.tipo === 'incidente' ? '24h 00m' : '48h 00m',
      description: newTicket.descripcion,
      categoria: newTicket.categoria,
      attachments: newTicket.attachments || [],
    };

    setTickets([createdTicket, ...tickets]);
  };

  const handleTicketSolved = (ticketId) => {
    setTickets((prev) => prev.map((ticket) => (
      ticket.id === ticketId ? { ...ticket, status: 'Resuelto' } : ticket
    )));
  };

  if (currentScreen === 'login') {
    return <LoginScreen setCurrentScreen={setCurrentScreen} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans text-white overflow-hidden">
      <Topbar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      <main className="flex-1 overflow-y-auto relative">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              setCurrentScreen={setCurrentScreen}
              setSelectedTicket={setSelectedTicket}
              tickets={tickets}
            />
          )}
          {currentScreen === 'requerimientos' && (
            <RequerimientosScreen
              setCurrentScreen={setCurrentScreen}
              setSelectedTicket={setSelectedTicket}
              tickets={tickets}
            />
          )}
          {currentScreen === 'nuevo' && (
            <NuevoTicketScreen setCurrentScreen={setCurrentScreen} onAddTicket={addNewTicket} />
          )}
          {currentScreen === 'detalle' && selectedTicket && (
            <TicketDetailScreen
              ticketId={selectedTicket}
              setCurrentScreen={setCurrentScreen}
              onOpenSurvey={() => setShowSurveyModal(true)}
              onTicketSolved={handleTicketSolved}
              tickets={tickets}
            />
          )}
          {(currentScreen === 'kb' || currentScreen === 'metricas') && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="p-4 bg-gray-200 rounded-full">
                <p className="text-2xl font-bold text-gray-700">Módulo en Desarrollo</p>
              </div>
              <p className="text-gray-500 max-w-md">Esta sección estará disponible próximamente.</p>
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="mt-4 px-4 py-2 bg-[#153a8a] text-white rounded-md hover:bg-blue-800"
              >
                Volver al Inicio
              </button>
            </div>
          )}
        </main>
      <EncuestaModal
        isOpen={showSurveyModal}
        onClose={() => setShowSurveyModal(false)}
        ticketId={selectedTicket}
      />
    </div>
  );
}
