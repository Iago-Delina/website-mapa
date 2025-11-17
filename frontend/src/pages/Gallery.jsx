import React, { useState, useMemo, useEffect } from 'react';
import { getMaps, getTags } from '../services/apiService';
import MapCard from '../components/MapCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  const [maps, setMaps] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [mapsData, tagsData] = await Promise.all([
        getMaps(),
        getTags()
      ]);
      setMaps(mapsData);
      setAllTags(tagsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredMaps = useMemo(() => {
    return maps.filter(map => {
      const matchesSearch = map.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           map.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 ||
                         selectedTags.some(tag => map.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [maps, searchTerm, selectedTags]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0b]/80 to-[#0a0a0b]" />
        
        <div className="relative container mx-auto px-4 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Mapas Profissionais
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              para servidores de Tibia
            </p>
            <p className="text-base text-gray-500 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Designs únicos e épicos que transformam a experiência dos jogadores.
              Explore a galeria e encontre o mapa perfeito para seu projeto.
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar mapas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900/50 border-emerald-500/20 focus:border-emerald-400 text-white placeholder:text-gray-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 hover:text-emerald-300"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filtros
              {selectedTags.length > 0 && (
                <Badge className="ml-2 bg-emerald-500 text-white">
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
            {(searchTerm || selectedTags.length > 0) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                <X className="mr-2 h-4 w-4" />
                Limpar
              </Button>
            )}
          </div>

          {/* Tags Filter */}
          {showFilters && (
            <div className="bg-gray-900/30 border border-emerald-500/10 rounded-lg p-4 animate-in slide-in-from-top duration-300">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                Filtrar por categoria
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              {filteredMaps.length} {filteredMaps.length === 1 ? 'mapa encontrado' : 'mapas encontrados'}
            </p>
          </div>
        </div>
      </div>

      {/* Maps Grid */}
      <div className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
            </div>
          ) : filteredMaps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaps.map((map, index) => (
                <div
                  key={map.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MapCard map={map} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-20">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                Nenhum mapa encontrado
              </h3>
              <p className="text-gray-500">
                Tente ajustar os filtros ou buscar por outro termo.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="mt-6 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
