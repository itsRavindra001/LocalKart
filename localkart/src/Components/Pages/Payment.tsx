import { useState } from 'react';
import { useCart } from '../../Contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import type { SearchResult } from 'leaflet-geosearch';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
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

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
  onClose: () => void;
}

const LeafletMapPicker = ({ onLocationSelect, onClose }: LocationPickerProps) => {
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const provider = new OpenStreetMapProvider();

  const MapClick = () => {
    useMapEvents({
      async click(e) {
        setMarkerPos(e.latlng);
        const results = await provider.search({ query: `${e.latlng.lat}, ${e.latlng.lng}` });
        if (results.length > 0) {
          setAddress(results[0].label);
          onLocationSelect(e.latlng.lat, e.latlng.lng, results[0].label);
        } else {
          onLocationSelect(e.latlng.lat, e.latlng.lng);
        }
      },
    });
    return null;
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    const results = await provider.search({ query: searchQuery });
    setSearchResults(results);
  };

  const handleSelectResult = (result: SearchResult) => {
    setMarkerPos({ lat: result.y, lng: result.x });
    setAddress(result.label);
    setSearchQuery(result.label);
    setSearchResults([]);
    onLocationSelect(result.y, result.x, result.label);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Select Delivery Location</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for an address..."
                className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSearch}
                className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-700 transition"
              >
                Search
              </button>
            </div>
            
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
                    onClick={() => handleSelectResult(result)}
                  >
                    {result.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map Container */}
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-md border border-gray-200">
            <MapContainer
              center={[28.6139, 77.209]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {markerPos && <Marker position={markerPos} />}
              <MapClick />
            </MapContainer>
          </div>

          {/* Selected Location Info */}
          {address && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800">Selected Location:</h4>
              <p className="text-green-700">{address}</p>
              {markerPos && (
                <p className="text-xs text-gray-500 mt-1">
                  Coordinates: {markerPos.lat.toFixed(6)}, {markerPos.lng.toFixed(6)}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (markerPos) {
                  onClose();
                } else {
                  alert('Please select a location on the map');
                }
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessPopup = ({ onClose, orderType }: { onClose: () => void; orderType: string }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">Thank you for your {orderType} order.</p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800">What's next?</h3>
          <p className="text-green-700 text-sm mt-1">
            Your order is being processed. We'll notify you with updates.
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition font-medium"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const locationState = useLocation().state;

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [location, setLocation] = useState<{ lat: number; lng: number; address?: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [orderType, setOrderType] = useState('');

  const cleaningPlan: CleaningPlan | null = locationState?.planTitle
    ? {
        title: locationState.planTitle,
        duration: locationState.planDuration,
        rooms: locationState.planRooms,
        eco: locationState.planEco,
        price: locationState.planPrice,
      }
    : null;

  const groceryTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cleaningTotal = cleaningPlan?.price || 0;
  const total = groceryTotal + cleaningTotal;

  const handleLocationSelect = (lat: number, lng: number, address?: string) => {
    setLocation({ lat, lng, address });
    setShowMap(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate('/services');
  };

  const handleCODOrder = () => {
    setOrderType(cartItems.length > 0 ? 'grocery' : 'cleaning service');
    clearCart();
    setShowSuccess(true);
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
          const verify = await axios.post('/api/payment/verify', response, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (verify.data.success) {
            setOrderType(cartItems.length > 0 ? 'grocery' : 'cleaning service');
            clearCart();
            setShowSuccess(true);
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
      setShowMap(true);
      return;
    }

    if (paymentMethod === 'cod') {
      handleCODOrder();
    } else {
      handleOnlinePayment();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      {showSuccess && <SuccessPopup onClose={handleCloseSuccess} orderType={orderType} />}
      {showMap && (
        <LeafletMapPicker 
          onLocationSelect={handleLocationSelect} 
          onClose={() => setShowMap(false)} 
        />
      )}
      
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
        <h3 className="text-lg font-semibold mb-4">Delivery Location</h3>
        {location ? (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-green-700">{location.address || `Selected location (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})`}</p>
            <button 
              onClick={() => setShowMap(true)}
              className="text-green-600 hover:text-green-800 text-sm mt-2"
            >
              Change location
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowMap(true)}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500"
          >
            + Select Delivery Location
          </button>
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