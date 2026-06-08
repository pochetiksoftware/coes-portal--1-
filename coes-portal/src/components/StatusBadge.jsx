const StatusBadge = ({ status }) => {
  let bg = 'bg-gray-100';
  let text = 'text-gray-800';

  if (status === 'Nuevo') {
    bg = 'bg-blue-100';
    text = 'text-blue-800';
  } else if (status === 'En Proceso') {
    bg = 'bg-yellow-100';
    text = 'text-yellow-800';
  } else if (status === 'Resuelto' || status === 'Cerrado') {
    bg = 'bg-green-100';
    text = 'text-green-800';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
