import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Eye } from 'lucide-react';
import MapPlaceholder from './MapPlaceholder';
import { useLanguage } from '../context/LanguageContext';

const MapCard = ({ map }) => {
  const { t } = useLanguage();
  return (
    <Link to={`/map/${map.slug}`} className="group block">
      <Card className="overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]" style={{backgroundColor: '#1f2937'}}>
          {map.thumbnail ? (
            <>
              <img
                src={map.thumbnail.startsWith('http') ? map.thumbnail : `${process.env.REACT_APP_BACKEND_URL}${map.thumbnail}`}
                alt={map.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{zIndex: 1}}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{zIndex: 2}} />
            </>
          ) : (
            <MapPlaceholder title={map.title} category={map.tags[0]} />
          )}
          
          {/* Status Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2" style={{zIndex: 10}}>
            {map.status === 'sold' ? (
              <Badge className="bg-red-500/90 backdrop-blur-sm text-white border-0">
                {map.cliente ? `Vendido: ${map.cliente}` : 'Vendido'}
              </Badge>
            ) : (
              <Badge className="bg-emerald-500/90 backdrop-blur-sm text-white border-0">
                Disponível
              </Badge>
            )}
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center space-x-2 text-white">
              <Eye className="h-5 w-5" />
              <span className="text-sm font-medium">Ver Detalhes</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
              {map.title}
            </h3>
            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-emerald-400 transition-colors flex-shrink-0 ml-2" />
          </div>

          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {map.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {map.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {map.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs border-gray-600 text-gray-400"
              >
                +{map.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Size & Complexity */}
          <div className="flex items-center justify-between pt-3 border-t border-emerald-500/10">
            <span className="text-sm text-gray-400">
              Tamanho: <span className="text-emerald-400 font-medium">{map.size}</span>
            </span>
            <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30">
              {map.complexity}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MapCard;
