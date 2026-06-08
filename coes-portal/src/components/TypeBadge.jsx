const TypeBadge = ({ type }) => {
  const isIncidente = String(type).toLowerCase() === 'incidente';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isIncidente ? 'bg-red-600/40 backdrop-blur-sm text-white border border-white/10' : 'bg-primary-600/40 backdrop-blur-sm text-white border border-white/10'}`}>
      {type}
    </span>
  );
};

export default TypeBadge;
