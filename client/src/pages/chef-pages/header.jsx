import React, { useState, useEffect } from 'react';
import { Croissant, Home, ShoppingBag } from 'lucide-react';
import Catalog_chef from './Catalog_chef';
import ChefProfilePage from './home';
import Chef_profile from './profile';
import Contactus_chef from './chef-contact';
import Recipe_dish_creation from './recpie-dish';
import Recipe_dish_management from './recpie-dish-management';
import Cartsidebar from '../../components/sidebarcart'

const Header_chef = () => {
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chef_id, set_chef_id] = useState("66d775724924397e1179e5eb");
  const [chef, set_chef] = useState();
  const [active_tab, set_active_tab] = useState(sessionStorage.getItem("tab") || "home");
  const [isCartOpen, setIsCartOpen] = useState(false);  // State to manage cart sidebar visibility

  const handleTabChange = (tab) => {
    set_active_tab(tab);
    sessionStorage.setItem("tab", tab);
    setIsMenuOpen(false);
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cart);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
  };

  const renderContent = () => {
    switch (active_tab) {
      case "home":
        return <ChefProfilePage />;
      case "catalog":
        return <Catalog_chef />;
      case "profile":
        return <Chef_profile />;
      case "contact":
        return <Contactus_chef />;
      case "dish-recipes-creation":
        return <Recipe_dish_creation />;
      case "management":
        return <Recipe_dish_management />;
      default:
        return <ChefProfilePage />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <header className="bg-[#c98d83] shadow-md w-full sm:w-16 lg:w-64 h-auto sm:h-[85vh] fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-20">
        <div className="h-full flex items-center justify-between max-sm:justify-center sm:flex-col mt-4 p-4">
          <div className="flex sm:flex-col items-center justify-center mb-6">
            <Croissant className="text-white mr-2 sm:mr-0 sm:mb-2" size={24} />
            <h1 className="text-2xl font-bold text-white lg:block hidden">BAKER</h1>
            <span className="text-xs text-white block text-center mt-2 lg:block hidden">EST. 1892</span>
          </div>
          <nav className="flex sm:flex-col w-full">
            <button onClick={() => handleTabChange("home")} className="text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9">
              <Home size={24} />
              <span className="ml-2">Home</span>
            </button>
            <button onClick={() => handleTabChange("catalog")} className="text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mb-9">
              <ShoppingBag size={24} />
              <span className="ml-2">Catalog</span>
            </button>
          </nav>

          {/* Cart Icon Button */}
          <button onClick={handleCartOpen} className="text-white hover:text-rose-200 transition duration-300 text-left w-full flex items-center sm:justify-start mt-9">
            <ShoppingBag size={24} />
            <span className="ml-2">Cart</span>
            {cart.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="bg-[#c98d83] shadow-md w-full sm:w-[calc(100%-80px)] lg:w-[1200px] h-[calc(100vh-64px)] sm:h-[85vh] sm:ml-20 lg:ml-[270px] mt-16 sm:mt-0 sm:fixed sm:left-4 sm:top-1/2 sm:-translate-y-1/2 rounded-lg overflow-hidden z-10">
        <div className="h-full overflow-auto p-6">
          {renderContent()}
        </div>
      </main>

      {/* Cart Sidebar */}
      <Cartsidebar
        isOpen={isCartOpen}
        onClose={handleCartClose}
        cartItems={cart}
        removeItem={handleRemoveItem}
        updateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        onContinueShopping={handleContinueShopping}
      />
    </div>
  );
};

export default Header_chef;
