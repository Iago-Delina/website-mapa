import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { getAdminMaps, updateMap, uploadImage } from '../services/apiService';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';

const AdminMapEdit = () => {
  const { id } = useParams();
  const { admin } = useAdmin();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    size: 'Médio',
    complexity: 'Intermediário',
    status: 'available'
  });
  const [images, setImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }
    fetchMap();
  }, [admin, id]);

  const fetchMap = async () => {
    try {
      const maps = await getAdminMaps();
      const map = maps.find(m => m._id === id);
      if (map) {
        setFormData({
          title: map.title,
          description: map.description,
          tags: map.tags.join(', '),
          size: map.size,
          complexity: map.complexity,
          status: map.status
        });
        setImages(map.images || []);
      }
    } catch (error) {
      alert('Erro ao carregar mapa');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploadingImages(true);
    
    try {
      const uploadPromises = files.map(file => uploadImage(file));
      const results = await Promise.all(uploadPromises);
      const urls = results.map(r => r.url);
      setImages([...images, ...urls]);
    } catch (error) {
      alert('Erro ao fazer upload das imagens');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
      
      await updateMap(id, {
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formData.description,
        tags: tagsArray,
        size: formData.size,
        complexity: formData.complexity,
        thumbnail: images[0] || '',
        images: images,
        status: formData.status
      });

      alert('Mapa atualizado com sucesso!');
      navigate('/admin/dashboard');
    } catch (error) {
      alert('Erro ao atualizar mapa');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b] flex items-center justify-center pt-24">
        <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b] pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin/dashboard')}
          className="text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="bg-gray-900/50 border-emerald-500/20 p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Editar Mapa</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Título *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="bg-gray-900/50 border-emerald-500/20 text-white"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Descrição *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="bg-gray-900/50 border-emerald-500/20 text-white min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Tamanho *</label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="w-full bg-gray-900/50 border border-emerald-500/20 text-white rounded-md p-2"
                >
                  <option>Minúsculo</option>
                  <option>Pequeno</option>
                  <option>Médio</option>
                  <option>Grande</option>
                  <option>Enorme</option>
                  <option>Colossal</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Complexidade *</label>
                <select
                  value={formData.complexity}
                  onChange={(e) => setFormData({...formData, complexity: e.target.value})}
                  className="w-full bg-gray-900/50 border border-emerald-500/20 text-white rounded-md p-2"
                >
                  <option>Básico</option>
                  <option>Intermediário</option>
                  <option>Avançado</option>
                  <option>Épico</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Tags (separadas por vírgula)</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="bg-gray-900/50 border-emerald-500/20 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full bg-gray-900/50 border border-emerald-500/20 text-white rounded-md p-2"
              >
                <option value="available">Disponível</option>
                <option value="sold">Vendido</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Imagens</label>
              <div className="border-2 border-dashed border-emerald-500/20 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={uploadingImages}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {uploadingImages ? (
                    <Loader2 className="h-8 w-8 text-emerald-400 animate-spin mx-auto mb-2" />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  )}
                  <p className="text-gray-400">Adicionar mais imagens</p>
                </label>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {images.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt="" className="w-full h-24 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500"
              >
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Salvar Alterações
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/dashboard')}
                className="border-gray-600 text-gray-400"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminMapEdit;
