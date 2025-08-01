import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Product } from './types';
import { initialProducts } from './data/products';
import { useEffect } from 'react';


// Components
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import Cart from './components/Cart/Cart';
import AdminDashboard from './components/Admin/AdminDashboard';

const AppContent: React.FC = () => {
  useEffect(() => {
    const response = fetch('http://localhost:8000/api/products'); // Assuming you have an API endpoint to fetch products
    response.then(res => res.json()).then(data => {
      console.log(data);
    });
  }, []);
  const { isAuthenticated, isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState<string>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedProduct(null);
  };

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={handleViewChange} />

      <main>
        {currentView === 'products' && (
          <ProductList
            products={products}
            onViewDetails={handleViewProductDetails}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => handleViewChange('products')}
          />
        )}

        {currentView === 'cart' && (
          <Cart onBack={() => handleViewChange('products')} />
        )}

        {currentView === 'admin' && isAdmin && (
          <AdminDashboard
            products={products}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;