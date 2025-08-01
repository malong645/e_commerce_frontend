import React from 'react';
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CartProps {
  onBack: () => void;
}

const Cart: React.FC<CartProps> = ({ onBack }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour aux produits</span>
        </button>

        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
          <p className="text-gray-600 mb-6">Ajoutez quelques produits pour commencer vos achats</p>
          <button
            onClick={onBack}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Découvrir nos produits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Continuer les achats</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Panier ({cartItems.length} {cartItems.length > 1 ? 'articles' : 'article'})
            </h1>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Vider le panier
            </button>
          </div>

          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{item.product.description}</p>
                    <p className="text-lg font-semibold text-blue-600 mt-1">
                      {item.product.price.toLocaleString('fr-FR')} €
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-medium min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {(item.product.price * item.quantity).toLocaleString('fr-FR')} €
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 hover:text-red-700 text-sm mt-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Résumé de commande</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Sous-total</span>
              <span className="font-medium">{getTotalPrice().toLocaleString('fr-FR')} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Livraison</span>
              <span className="font-medium text-green-600">Gratuite</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  {getTotalPrice().toLocaleString('fr-FR')} €
                </span>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all">
            Passer commande
          </button>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            Paiement sécurisé et livraison gratuite
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;