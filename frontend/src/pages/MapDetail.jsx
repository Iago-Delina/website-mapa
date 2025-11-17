import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMapBySlug } from '../services/apiService';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import DiscordIcon from '../components/icons/DiscordIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { 
  ArrowLeft, 
  Maximize2, 
  Download, 
  Calendar, 
  Ruler, 
  Tag,
  User,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

const MapDetail = () => {
  const { slug } = useParams();
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    fetchMap();
  }, [slug]);

  const fetchMap = async () => {
    try {
      const data = await getMapBySlug(slug);
      setMap(data);
    } catch (error) {
      console.error('Error fetching map:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!map) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Mapa não encontrado</h2>
          <Link to="/">
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              Voltar para Galeria
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b]">
      {/* Back Button */}
      <div className="container mx-auto px-4 lg:px-8 pt-24 pb-8">
        <Link to="/">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-emerald-400 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Galeria
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-900">
                  <img
                    src={map.images[selectedImage]}
                    alt={map.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Zoom Button */}
                  <button
                    onClick={() => setIsImageModalOpen(true)}
                    className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-3 rounded-lg text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {map.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg aspect-square border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-emerald-400 shadow-lg shadow-emerald-500/30'
                        : 'border-gray-700 hover:border-emerald-500/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${map.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Description Card */}
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Sobre o Mapa</h2>
                <p className="text-gray-300 leading-relaxed">
                  {map.description}
                </p>
              </Card>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-6">
              {/* Title & Status */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h1 className="text-3xl font-bold text-white">{map.title}</h1>
                  {map.status === 'available' ? (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Disponível
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="mr-1 h-3 w-3" />
                      Vendido
                    </Badge>
                  )}
                </div>
                <div className="text-2xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Orçamento Sob Consulta
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Entre em contato para valores personalizados
                </p>
              </div>

              {/* Specs Card */}
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Especificações</h3>
                
                <div className="flex items-center text-gray-300">
                  <Ruler className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Tamanho</div>
                    <div className="font-medium">{map.size}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-300">
                  <Tag className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Complexidade</div>
                    <div className="font-medium">{map.complexity}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-300">
                  <Calendar className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Data de Criação</div>
                    <div className="font-medium">{new Date(map.createdAt).toLocaleDateString('pt-BR')}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-300">
                  <User className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500">Autor</div>
                    <div className="font-medium">{map.author}</div>
                  </div>
                </div>
              </Card>

              {/* Tags */}
              <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 p-6">
                <div className="flex items-center mb-3">
                  <Tag className="h-5 w-5 text-emerald-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">Categorias</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {map.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Contact CTA */}
              <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border-emerald-500/30 p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Interessado neste mapa?
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Entre em contato para solicitar orçamento ou tirar dúvidas.
                </p>
                
                <div className="space-y-3">
                  <Button
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => window.open('https://discord.com', '_blank')}
                  >
                    <DiscordIcon className="mr-2" size={20} />
                    Contato via Discord
                  </Button>
                  
                  <Button
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => window.open('https://wa.me/', '_blank')}
                  >
                    <WhatsAppIcon className="mr-2" size={20} />
                    Contato via WhatsApp
                  </Button>
                </div>
              </Card>

              {/* Download Button (if available) */}
              {map.status === 'available' && (
                <Button
                  variant="outline"
                  className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Preview (Baixa Resolução)
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-emerald-400 transition-colors"
            onClick={() => setIsImageModalOpen(false)}
          >
            <XCircle className="h-8 w-8" />
          </button>
          <img
            src={map.images[selectedImage]}
            alt={map.title}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default MapDetail;
