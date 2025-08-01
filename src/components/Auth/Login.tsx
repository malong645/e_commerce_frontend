import React, { useState } from 'react';
import { Mail, Lock, User, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!login(email, password)) {
      setError('Email ou mot de passe incorrect');
    }
  };

  const fillDemoCredentials = (type: 'admin' | 'client') => {
    if (type === 'admin') {
      setEmail('admin@store.com');
    } else {
      setEmail('client@store.com');
    }
    setPassword('demo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TechStore</h1>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600 text-center mb-4">Comptes de démonstration :</p>
          <div className="space-y-3">
            <button
              onClick={() => fillDemoCredentials('client')}
              className="w-full flex items-center justify-center space-x-2 bg-green-50 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Compte Client</span>
            </button>
            <button
              onClick={() => fillDemoCredentials('admin')}
              className="w-full flex items-center justify-center space-x-2 bg-purple-50 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Compte Administrateur</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;