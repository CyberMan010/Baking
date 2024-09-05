const express = require('express');
const router = express.Router();

// Add item to cart
router.post('/cart/add', async (req, res) => {
  // Logic to add item to cart in database
});

// Get cart items
router.get('/cart', async (req, res) => {
  // Logic to retrieve cart items from database
});

// Checkout
router.post('/checkout', async (req, res) => {
  try {
    const { orderPrice, orderDetails } = req.body;
    const userId = req.userId; // Set by authentication middleware

    // Create order
    const order = new Order({
      orderMaker: userId,
      orderPrice: orderPrice,
      orderDetails: orderDetails
    });

    await order.save();

    // Clear the cart (assuming you want to clear it after order is placed)
    await Cart.findOneAndUpdate(
      { userId: userId },
      { $set: { items: [] } }
    );

    res.status(200).json({ message: "Order placed successfully", orderId: order._id });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "An error occurred during checkout" });
  }
});
  // Logic to process checkout


module.exports = router;