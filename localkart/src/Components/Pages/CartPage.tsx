// src/Components/Pages/CartPage.tsx
import React from "react";
import Cart from "./Cart";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Optional: fetch from localStorage, Redux, or location.state
  const { cartItems = [] } = location.state || {};

  const handleClose = () => {
    navigate(-1);
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    // You'd need real state handling here
    console.log(`Update item ${id} by ${delta}`);
  };

  const handleRemoveItem = (id: number) => {
    // You'd need real state handling here
    console.log(`Remove item ${id}`);
  };

  return (
    <Cart
      cartItems={cartItems}
      onClose={handleClose}
      onUpdateQuantity={handleUpdateQuantity}
      onRemoveItem={handleRemoveItem}
    />
  );
};

export default CartPage;
