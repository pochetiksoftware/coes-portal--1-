const TypeBadge = ({ type }) => {
  const isIncidente = String(type).toLowerCase() === 'incidente';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isIncidente ? 'bg-red-100 text-red-800' : 'bg-indigo-100 text-indigo-800'}`}>
      {type}
    </span>
  );
};

export default TypeBadge;
