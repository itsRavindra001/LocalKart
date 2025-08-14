// src/pages/payment.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../../Contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import MapPicker from './MapPicker';
import axios from 'axios';

const PaymentPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Load Google Maps Script
  useEffect(() => {
    const existingScript = document.getElementById('google-maps');

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBrQMQWxNscKbUpbFiFP-DCzLo11yocfMI&libraries=places`;
      script.async = true;
      script.id = 'google-maps';
      document.body.appendChild(script);
      script.onload = () => setMapLoaded(true);
    } else {
      setMapLoaded(true);
    }
  }, []);

  // Initialize Map Picker
  useEffect(() => {
    if (mapLoaded && window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.209 }, // Delhi
        zoom: 14,
      });

      const marker = new window.google.maps.Marker({ map, draggable: true });

      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        const latLng = e.latLng;
        if (latLng) {
          marker.setPosition(latLng);
          setLocation({ lat: latLng.lat(), lng: latLng.lng() });

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK' && results && results.length > 0) {
              setAddress(results[0].formatted_address);
            }
          });
        }
      });
    }
  }, [mapLoaded]);

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  const handleCODOrder = () => {
    alert(`✅ Order placed via Cash on Delivery!\nAddress: ${address}`);
    clearCart();
    navigate('/services/groceries');
  };

  const handleOnlinePayment = async () => {
    try {
      // 1️⃣ Create Razorpay order from backend
      const { data } = await axios.post(
        '/api/payment/order',
        { amount: total },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // 2️⃣ Setup Razorpay checkout options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'LocalKart',
        description: 'Order Payment',
        order_id: data.id,
        handler: async (response: any) => {
          // 3️⃣ Verify payment on backend
          const verify = await axios.post(
            '/api/payment/verify',
            response,
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (verify.data.success) {
            alert(`✅ Payment Successful!\nAddress: ${address}`);
            clearCart();
            navigate('/services/groceries');
          } else {
            alert('❌ Payment Verification Failed');
          }
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: { color: '#3399cc' },
      };

      // 4️⃣ Open Razorpay payment popup
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong with the payment.');
    }
  };

  const handlePlaceOrder = () => {
    if (!location) {
      alert('📍 Please select a delivery location.');
      return;
    }
    if (paymentMethod === 'cod') {
      handleCODOrder();
    } else {
      handleOnlinePayment();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Payment</h2>

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </li>
        ))}
      </ul>

      <p className="text-right mt-6 text-xl font-bold">Total: ₹{total}</p>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Choose Payment Method:</h3>
        <div className="space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="mr-2"
            />
            Cash on Delivery
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={() => setPaymentMethod('online')}
              className="mr-2"
            />
            Online (Razorpay, GPay, PhonePe)
          </label>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Select Delivery Location</h2>
        <MapPicker onLocationSelect={handleLocationSelect} />
        {location && (
          <div className="mt-4 text-gray-700">
            📍 Selected Coordinates:
            <div>Latitude: {location.lat}</div>
            <div>Longitude: {location.lng}</div>
          </div>
        )}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition"
        >
          {paymentMethod === 'cod' ? 'Place Order' : 'Pay & Place Order'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
