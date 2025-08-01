import React from 'react';
import { ShoppingCart, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onViewChange('products')}
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              E-commerce
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onViewChange('products')}
              className={`text-sm font-medium transition-colors ${currentView === 'products'
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              Produits
            </button>
            {isAdmin && (
              <button
                onClick={() => onViewChange('admin')}
                className={`text-sm font-medium transition-colors flex items-center ${currentView === 'admin'
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-500 hover:text-gray-900'
                  }`}
              >
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </button>
            )}
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={() => onViewChange('cart')}
              className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Se déconnecter"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;