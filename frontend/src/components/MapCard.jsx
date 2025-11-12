import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, Eye } from 'lucide-react';

const MapCard = ({ map }) => {
  return (
    <Link to={`/map/${map.slug}`} className="group block">
      <Card className="overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={map.thumbnail}
            alt={map.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Status Badge */}
          {map.status === 'sold' && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive" className="bg-red-500/90 backdrop-blur-sm">
                Vendido
              </Badge>
            </div>
          )}
          
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

          {/* Price */}
          <div className="flex items-center justify-between pt-3 border-t border-emerald-500/10">
            <span className="text-sm text-gray-500">
              {map.dimensions.width} × {map.dimensions.height}px
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              R$ {map.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default MapCard;
