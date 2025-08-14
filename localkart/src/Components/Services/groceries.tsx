// src/pages/groceries.tsx
import React from 'react';
import { useCart } from '../../Contexts/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

const items: GroceryItem[] = [
  { id: 1, name: 'Fresh Tomatoes', price: 30, image: 'https://thumbs.dreamstime.com/b/boxes-tomatoes-grocery-store-natural-food-boxes-ripe-tomatoes-grocery-store-natural-food-333879743.jpg', category: 'Vegetables' },
  { id: 2, name: 'Milk (1L)', price: 50, image: 'https://img.onmanorama.com/content/dam/mm/en/food/features/images/2024/3/26/amul-milk.jpg?w=1120&h=583', category: 'Dairy' },
  { id: 3, name: 'Potatoes (1kg)', price: 25, image: 'https://t3.ftcdn.net/jpg/00/34/71/82/360_F_34718294_YaoslbKphl3ixOA0yAFVbmeGarpwVOTt.jpg', category: 'Vegetables' },
  { id: 4, name: 'Onions (1kg)', price: 40, image: 'https://media.gettyimages.com/id/1313847128/photo/onions-for-sale-at-supermarket-in-usa.jpg?s=612x612&w=0&k=20&c=zkE-WCdt24d9LQBVTsrG-w5tyVDZrAkzlB9mJU-zB7M=', category: 'Vegetables' },
  { id: 5, name: 'Apples (500g)', price: 60, image: 'https://thumbs.dreamstime.com/b/apples-18431712.jpg', category: 'Fruits' },
  { id: 6, name: 'Wheat Flour (5kg)', price: 200, image: 'https://img.youtube.com/vi/zd6pNKVBvIk/hqdefault.jpg', category: 'Pantry' },
  { id: 7, name: 'Sugar (1kg)', price: 45, image: 'https://www.shutterstock.com/image-photo/indonesia-17-09-2023-1-260nw-2518309505.jpg', category: 'Pantry' },
  { id: 8, name: 'Cooking Oil (1L)', price: 120, image: 'https://img.youtube.com/vi/ENyOxr3PbYY/hqdefault.jpg', category: 'Pantry' },
  { id: 9, name: 'Cauliflower 1 pc', price: 40, image: 'https://plantura.garden/uk/wp-content/uploads/sites/2/2022/08/white-cauliflower-560x373.jpg?x54327', category: 'Vegetables' },
];

const categories = [...new Set(items.map(item => item.category))];

const GroceriesPage: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const getQuantity = (id: number) =>
    cartItems.find((item) => item.id === id)?.quantity || 0;

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Fresh Groceries
            </h1>
            <p className="text-gray-600 mt-1">Quality products for your home</p>
          </div>
          
          <div className="relative flex items-center gap-4">
            <button
              className="relative flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-lg shadow-sm transition-all border border-gray-200"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={20} className="text-green-600" />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative col-span-1 md:col-span-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="text-gray-400" size={18} />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grocery Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const quantity = getQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                      {item.name}
                    </h2>
                    <p className="text-green-700 font-bold text-xl mb-4">
                      ₹{item.price.toFixed(2)}
                    </p>

                    {quantity === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition"
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-full flex items-center justify-between">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
                            disabled={quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold text-lg min-w-[2rem] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-red-600 text-sm hover:text-red-700 transition"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroceriesPage;