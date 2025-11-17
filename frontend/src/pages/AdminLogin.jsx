import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Lock, User, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login({ username, password });

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 p-8">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
            Xhyz Admin
          </div>
          <p className="text-gray-400 text-sm">Acesso restrito</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2 text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Usuário</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-gray-900/50 border-emerald-500/20 focus:border-emerald-400 text-white"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-900/50 border-emerald-500/20 focus:border-emerald-400 text-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Credenciais padrão:</p>
          <p className="text-gray-400">admin / Xhyz@2025!</p>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
