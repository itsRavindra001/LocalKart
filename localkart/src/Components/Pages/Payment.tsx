// src/pages/payment.tsx
import React, { useState } from 'react';
import { useCart } from '../../Contexts/CartContext';
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt, FaSearchLocation } from 'react-icons/fa';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface CleaningPlan {
  title: string;
  duration: string;
  rooms: string;
  eco: string;
  price: number;
}

interface LocationSearchProps {
  onSearch: (query: string) => void;
}

const LocationSearch = ({ onSearch }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="absolute top-4 left-4 z-[1000] w-72 shadow-lg">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a location..."
          className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
        >
          <FaSearchLocation size={20} />
        </button>
      </div>
    </form>
  );
};

const LeafletMapPicker = ({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
}) => {
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('');

  const getAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      return data.display_name || 'Selected location';
    } catch (error) {
      console.error('Geocoding error:', error);
      return 'Selected location';
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setMarkerPos(newPos);
        const addr = await getAddress(newPos.lat, newPos.lng);
        setAddress(addr);
        onLocationSelect(newPos.lat, newPos.lng, addr);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const MapClick = () => {
    const map = useMapEvents({
      async click(e) {
        const newPos = e.latlng;
        setMarkerPos(newPos);
        const addr = await getAddress(newPos.lat, newPos.lng);
        setAddress(addr);
        onLocationSelect(newPos.lat, newPos.lng, addr);
      },
    });

    return null;
  };

  return (
    <div className="relative h-96 w-full rounded-xl overflow-hidden border border-gray-200 shadow-md mt-4">
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerPos && (
          <Marker position={markerPos}>
            <Popup>
              <div className="font-medium">
                <FaMapMarkerAlt className="inline mr-1 text-green-600" />
                {address}
              </div>
            </Popup>
          </Marker>
        )}
        <MapClick />
      </MapContainer>
      <LocationSearch onSearch={handleSearch} />
      <div className="absolute bottom-4 left-4 z-[1000] bg-white p-2 rounded-lg shadow-md text-sm">
        <p>Click on the map or search to select location</p>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const locationState = useRouterLocation().state;

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);

  // Extract cleaning plan if exists
  const cleaningPlan: CleaningPlan | null = locationState?.planTitle
    ? {
        title: locationState.planTitle,
        duration: locationState.planDuration,
        rooms: locationState.planRooms,
        eco: locationState.planEco,
        price: locationState.planPrice,
      }
    : null;

  // Calculate totals
  const groceryTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cleaningTotal = cleaningPlan?.price || 0;
  const total = groceryTotal + cleaningTotal;

  const handleLocationSelect = (lat: number, lng: number, address?: string) => {
    setLocation({ lat, lng, address });
  };

  const handleCODOrder = () => {
    alert(`✅ Order placed via Cash on Delivery!\nLocation: ${location?.address || `${location?.lat}, ${location?.lng}`}`);
    clearCart();
    navigate('/services/groceries');
  };

  const handleOnlinePayment = async () => {
    try {
      const { data } = await axios.post(
        '/api/payment/order',
        { amount: total },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'LocalKart',
        description: 'Order Payment',
        order_id: data.id,
        handler: async (response: any) => {
          const verify = await axios.post(
            '/api/payment/verify',
            response,
            { headers: { 'Content-Type': 'application/json' } }
          );

          if (verify.data.success) {
            alert(`✅ Payment Successful!\nLocation: ${location?.address || `${location?.lat}, ${location?.lng}`}`);
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
    <div className="max-w-2xl mx-auto p-6 "> {/* Added pt-20 to account for navbar */}
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Payment</h2>

      {/* Order Summary */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

        {cleaningPlan && (
          <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
            <h4 className="font-bold">Cleaning Service</h4>
            <div className="flex justify-between">
              <span>{cleaningPlan.title}</span>
              <span>₹{cleaningPlan.price}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              <p>Duration: {cleaningPlan.duration}</p>
              <p>Rooms: {cleaningPlan.rooms}</p>
              <p>Includes: {cleaningPlan.eco}</p>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mb-4 p-3 bg-white rounded-md shadow-sm">
            <h4 className="font-bold">Grocery Items</h4>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Choose Payment Method:</h3>
        <div className="flex flex-col space-y-3">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="mr-2 text-green-600 focus:ring-green-500"
            />
            Cash on Delivery
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={() => setPaymentMethod('online')}
              className="mr-2 text-green-600 focus:ring-green-500"
            />
            Online (Razorpay, GPay, PhonePe)
          </label>
        </div>
      </div>

      {/* Delivery Location */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Select Delivery Location</h3>
        <LeafletMapPicker onLocationSelect={handleLocationSelect} />
        {location && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-green-600 mt-1 mr-2" />
              <div>
                <p className="font-medium text-green-800">Selected Delivery Location</p>
                <p className="text-sm text-gray-700">{location.address}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Place Order Button */}
      <div className="text-center mt-10">
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition font-medium text-lg"
        >
          {paymentMethod === 'cod' ? 'Place Order' : 'Pay & Place Order'} (₹{total})
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;