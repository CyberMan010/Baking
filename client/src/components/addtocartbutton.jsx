import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const response = await axios.get('/api/cart');
    setCartItems(response.data);
  };

  const addToCart = async (item) => {
    await axios.post('/api/cart/add', item);
    fetchCartItems();
  };

  const checkout = async () => {
    await axios.post('/api/checkout', { items: cartItems });
    // Handle successful checkout (e.g., clear cart, show confirmation)
  };

  return (
    <div>
      {/* Render cart items */}
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default Cart;