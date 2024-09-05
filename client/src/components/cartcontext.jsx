// context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/cart/add', 
        { productId: product._id, quantity, price: product.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/cart/remove', 
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/cart/update', 
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/cart/clear', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};