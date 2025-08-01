import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Retour aux produits</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-50 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 lg:h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-4xl font-bold text-blue-600">
              {product.price.toLocaleString('fr-FR')} €
            </p>
          </div>

          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${product.stock > 10
            ? 'bg-green-100 text-green-800'
            : product.stock > 0
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
            }`}>
            {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.stock > 0 && (
            <div className="space-y-4">
              {/* Quantity selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantité
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Ajouter au panier - {(product.price * quantity).toLocaleString('fr-FR')} €</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;