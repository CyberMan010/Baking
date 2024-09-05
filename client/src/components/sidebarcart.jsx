// import React, { useEffect, useState } from 'react';
// import { CSSTransition } from 'react-transition-group';

// const CartSidebar = ({  isOpen, onClose, cartItems, removeItem, updateQuantity, onCheckout, onContinueShopping }) => {
//   const [isRendered, setIsRendered] = useState(false);

//   // Calculate the subtotal of the cart
//   const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   // Manage rendering of the sidebar based on `isOpen` state
//   useEffect(() => {
//     if (isOpen) {
//       setIsRendered(true);
//     }
//   }, [isOpen]);

//   const handleTransitionEnd = () => {
//     if (!isOpen) {
//       setIsRendered(false);
//     }
//   };

//   return (
//     <>
//       {isRendered && (
//         <>
//           {/* Overlay for closing the cart */}
//           <div 
//             className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`} 
//             onClick={onClose}
//           />

//           {/* Cart Sidebar */}
//           <CSSTransition
//             in={isOpen}
//             timeout={300}
//             classNames={{
//               enter: 'translate-x-full',
//               enterActive: 'translate-x-0',
//               exit: 'translate-x-0',
//               exitActive: 'translate-x-full'
//             }}
//             onExited={handleTransitionEnd}
//           >
//             <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
//               {/* Header */}
//               <div className="p-4">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-lg font-semibold">Your cart ({cartItems.length})</h2>
//                   <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition duration-150">
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>

//                 {/* Cart Items */}
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex items-center mb-4">
//                     <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
//                     <div className="flex-grow">
//                       <h3 className="text-sm font-medium">{item.name}</h3>
//                       <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
//                       <div className="flex items-center mt-1">
//                         <button 
//                           onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
//                           className="text-gray-500 hover:text-gray-700 transition duration-150"
//                         >
//                           -
//                         </button>
//                         <span className="mx-2">{item.quantity}</span>
//                         <button 
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)} 
//                           className="text-gray-500 hover:text-gray-700 transition duration-150"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition duration-150">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}

//                 {/* Recommendations (Placeholder for recommended items) */}
//                 <div className="mt-4">
//                   <h3 className="text-lg font-semibold">We Recommend</h3>
//                   {/* Placeholder for recommended items */}
//                 </div>

//                 {/* Subtotal and Action Buttons */}
//                 <div className="mt-6">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="font-medium">Subtotal</span>
//                     <span>${subtotal.toFixed(2)}</span>
//                   </div>
//                   <button 
//                     onClick={onContinueShopping}
//                     className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition duration-150 mb-2"
//                   >
//                     Continue Shopping
//                   </button>
//                   <button 
//                     onClick={onCheckout}
//                     className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-150"
//                   >
//                     Check Out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </CSSTransition>
//         </>
//       )}
//     </>
//   );
// };

// export default CartSidebar;


function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-1/2 pl-4">
      <h2 className="text-2xl font-semibold mb-2">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="mb-2 p-2 border rounded">
                <span>{item.name} - ${item.price}</span>
                <button
                  onClick={() => removeFromCart(index)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total: ${total.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import ProductList from './components/ProductList';
// import Cart from './components/Cart';

function CartSidebar() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart App</h1>
      <div className="flex">
        <Cart cart={cart} removeFromCart={removeFromCart} />
      </div>
      <div>
        <button onClick={() => navigate('/checkout')}>Checkout</button>

      </div>
    </div>
  );
}
export default CartSidebar;
