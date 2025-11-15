import React from 'react';
import { Map } from 'lucide-react';

const MapPlaceholder = ({ title, category }) => {
  // Gera um gradiente baseado na categoria
  const gradients = {
    dungeon: 'from-red-900 via-orange-900 to-yellow-900',
    desert: 'from-yellow-800 via-amber-800 to-orange-800',
    city: 'from-slate-700 via-gray-700 to-zinc-700',
    island: 'from-cyan-800 via-blue-800 to-indigo-800',
    ice: 'from-cyan-600 via-blue-600 to-indigo-600',
    forest: 'from-green-800 via-emerald-800 to-teal-800',
    volcano: 'from-red-800 via-orange-800 to-red-900',
    port: 'from-blue-800 via-slate-700 to-gray-800',
    default: 'from-emerald-900 via-teal-900 to-cyan-900'
  };

  const getGradient = () => {
    for (const [key, value] of Object.entries(gradients)) {
      if (category?.includes(key)) {
        return value;
      }
    }
    return gradients.default;
  };

  return (
    <div className={`w-full h-full bg-gradient-to-br ${getGradient()} flex items-center justify-center`}>
      <div className="text-center p-6">
        <Map className="h-16 w-16 text-white/40 mx-auto mb-3" strokeWidth={1.5} />
        <p className="text-white/60 text-sm font-medium">{title}</p>
      </div>
    </div>
  );
};

export default MapPlaceholder;
