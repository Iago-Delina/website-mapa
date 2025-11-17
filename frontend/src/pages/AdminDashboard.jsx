import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { getAdminMaps, deleteMap } from '../services/apiService';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LogOut, Plus, Trash2, Edit, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { admin, logout, isLoading: authLoading } = useAdmin();
  const [maps, setMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
    }
  }, [admin, authLoading, navigate]);

  useEffect(() => {
    if (admin) {
      fetchMaps();
    }
  }, [admin]);

  const fetchMaps = async () => {
    try {
      const data = await getAdminMaps();
      setMaps(data);
    } catch (error) {
      console.error('Error fetching maps:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este mapa?')) return;
    try {
      await deleteMap(id);
      setMaps(maps.filter(m => m._id !== id));
    } catch (error) {
      alert('Erro ao deletar mapa');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b] pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard Admin</h1>
            <p className="text-gray-400">Bem-vindo, {admin?.username}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/admin/maps/new')}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo Mapa
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {maps.length === 0 ? (
            <Card className="bg-gray-900/50 border-emerald-500/20 p-12 text-center">
              <p className="text-gray-400 mb-4">Nenhum mapa cadastrado ainda</p>
              <Button onClick={() => navigate('/admin/maps/new')} className="bg-emerald-500 hover:bg-emerald-600">
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Mapa
              </Button>
            </Card>
          ) : (
            maps.map((map) => (
              <Card key={map._id} className="bg-gray-900/50 border-emerald-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{map.title}</h3>
                      <Badge className={map.status === 'available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}>
                        {map.status === 'available' ? 'Disponível' : 'Vendido'}
                      </Badge>
                      <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                        {map.size}
                      </Badge>
                      <Badge variant="outline" className="border-teal-500/30 text-teal-400">
                        {map.complexity}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{map.description}</p>
                    <div className="flex gap-2 mt-2">
                      {map.tags.map((tag, i) => (
                        <span key={i} className="text-xs text-gray-500">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500/30 text-emerald-400"
                      onClick={() => navigate(`/admin/maps/edit/${map._id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/30 text-red-400"
                      onClick={() => handleDelete(map._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
