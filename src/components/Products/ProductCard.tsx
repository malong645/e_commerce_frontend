import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onViewDetails(product)}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Voir détails</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {product.price.toLocaleString('fr-FR')} €
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock > 10 
              ? 'bg-green-100 text-green-800' 
              : product.stock > 0 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            product.stock > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.stock > 0 ? 'Ajouter au panier' : 'Indisponible'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;