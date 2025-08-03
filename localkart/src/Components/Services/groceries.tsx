import React from 'react';
import { useCart } from '../../Contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const items: GroceryItem[] = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    price: 30,
    image: 'https://thumbs.dreamstime.com/b/boxes-tomatoes-grocery-store-natural-food-boxes-ripe-tomatoes-grocery-store-natural-food-333879743.jpg',
  },
  {
    id: 2,
    name: 'Milk (1L)',
    price: 50,
    image: 'https://img.onmanorama.com/content/dam/mm/en/food/features/images/2024/3/26/amul-milk.jpg?w=1120&h=583',
  },
  {
    id: 3,
    name: 'Potatoes (1kg)',
    price: 25,
    image: 'https://t3.ftcdn.net/jpg/00/34/71/82/360_F_34718294_YaoslbKphl3ixOA0yAFVbmeGarpwVOTt.jpg',
  },
  {
    id: 4,
    name: 'Onions (1kg)',
    price: 40,
    image: 'https://media.gettyimages.com/id/1313847128/photo/onions-for-sale-at-supermarket-in-usa.jpg?s=612x612&w=0&k=20&c=zkE-WCdt24d9LQBVTsrG-w5tyVDZrAkzlB9mJU-zB7M=',
  },
  {
    id: 5,
    name: 'Apples (500g)',
    price: 60,
    image: 'https://thumbs.dreamstime.com/b/apples-18431712.jpg',
  },
  {
    id: 6,
    name: 'Wheat Flour (5kg)',
    price: 200,
    image: 'https://img.youtube.com/vi/zd6pNKVBvIk/hqdefault.jpg',
  },
  {
    id: 7,
    name: 'Sugar (1kg)',
    price: 45,
    image: 'https://www.shutterstock.com/image-photo/indonesia-17-09-2023-1-260nw-2518309505.jpg',
  },
  {
    id: 8,
    name: 'Cooking Oil (1L)',
    price: 120,
    image: 'https://img.youtube.com/vi/ENyOxr3PbYY/hqdefault.jpg',
  },
  {
    id: 9,
    name: 'Cauliflower 1 pc',
    price: 40,
    image: 'https://plantura.garden/uk/wp-content/uploads/sites/2/2022/08/white-cauliflower-560x373.jpg?x54327',
  },
];

const GroceriesPage: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const getQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-700">Grocery Items</h1>
        <button
          className="relative"
          onClick={() => navigate('/cart')}
          title="Go to Cart"
        >
          <ShoppingCart size={30} className="text-green-600" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const quantity = getQuantity(item.id);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-center">{item.name}</h2>
              <p className="text-green-700 font-medium mb-4">₹{item.price}</p>

              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-xl"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-lg"
                    >
                      −
                    </button>
                    <span className="font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 text-sm underline hover:text-red-800"
                  >
                    Remove Item
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroceriesPage;
