// src/Components/Pages/CartPage.tsx
import React from "react";
import Cart from "./cart";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Optional: fetch from localStorage, Redux, or location.state
  const { cartItems = [] } = location.state || {};

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    navigate(-1);
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    console.log(`Update item ${id} by ${delta}`);
  };

  const handleRemoveItem = (id: number) => {
    console.log(`Remove item ${id}`);
  };

  const handlePayment = async () => {
    try {
      // 1️⃣ Create Razorpay order on backend
      const { data } = await axios.post(
        "/api/payment/order",
        { amount: totalAmount },
        { headers: { "Content-Type": "application/json" } }
      );

      // 2️⃣ Configure Razorpay checkout options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // from .env
        amount: data.amount,
        currency: data.currency,
        name: "LocalKart",
        description: "Order Payment",
        order_id: data.id,
        handler: async (response: any) => {
          // 3️⃣ Verify payment signature on backend
          const verify = await axios.post(
            "/api/payment/verify",
            response,
            { headers: { "Content-Type": "application/json" } }
          );
          if (verify.data.success) {
            alert("✅ Payment Successful");
            navigate("/order-success");
          } else {
            alert("❌ Payment Verification Failed");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      // 4️⃣ Open Razorpay checkout
      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong while processing payment");
    }
  };

  return (
    <div>
      <Cart
        cartItems={cartItems}
        onClose={handleClose}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {cartItems.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3>Total: ₹{totalAmount}</h3>
          <button
            onClick={handlePayment}
            style={{
              backgroundColor: "#3399cc",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
