const StatusBadge = ({ status }) => {
  let bg = 'bg-white/10 backdrop-blur-sm';
  let text = 'text-slate-300';

  if (status === 'Nuevo') {
    bg = 'bg-primary-600/40 backdrop-blur-sm';
    text = 'text-white font-semibold';
  } else if (status === 'En Proceso') {
    bg = 'bg-amber-600/40 backdrop-blur-sm';
    text = 'text-white font-semibold';
  } else if (status === 'Resuelto' || status === 'Cerrado') {
    bg = 'bg-green-600/40 backdrop-blur-sm';
    text = 'text-white font-semibold';
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bg} ${text} border border-white/10`}>
      {status}
    </span>
  );
};

export default StatusBadge;
