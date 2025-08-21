// src/Components/Pages/CartPage.tsx
import React from "react";
import { useCart } from "../../Contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2 } from "lucide-react";

const CartPage: React.FC = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Navigate to Payment page with full order preview
  const handleOrderNow = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }

    navigate("/payment", {
      state: {
        from: "cart",
        items: cartItems,
        totalAmount,
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-700 tracking-wide">
        🛒 Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center py-20">
          <p className="text-lg text-gray-600 mb-6">Your cart is currently empty.</p>
          <Link to="/services/groceries">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition"
            >
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-gray-800">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center mt-3 gap-3">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-24 h-fit">
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
            <div className="flex justify-between text-lg mb-6">
              <span>Total</span>
              <span className="font-semibold text-blue-700">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={clearCart}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear Cart
              </button>

              {/* Order Now navigates to Payment page and passes items + total */}
              <button
                type="button"
                onClick={handleOrderNow}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 shadow-md transition"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
