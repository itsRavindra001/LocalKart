import React from 'react';
import { useCart } from '../../Contexts/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, Search, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Images
import basmatiRice from '../../assets/Groceries/Basmati Rice 5kg.jpg';
import AashirvaadAtta from '../../assets/Groceries/Aashirvaad Atta 10kg.jpg';
import FortuneSunliteOil from '../../assets/Groceries/Fortune Sunlite Oil 5L.jpg';
import AmulButter from '../../assets/Groceries/Amul Butter 500g.jpg';
import MotherDairyMilk from '../../assets/Groceries/Mother Dairy Milk 1L.jpg';
import TataSalt from '../../assets/Groceries/Tata Salt 1kg.jpg';
import MaggiNoodles from '../../assets/Groceries/Maggi Noodles 560g.jpg';
import RedLabelTea from '../../assets/Groceries/Red Label Tea 1kg.jpg';
import NescafeCoffee from '../../assets/Groceries/Nescafe Coffee 200g.jpg';
import BruCoffee from '../../assets/Groceries/Bru Coffee 200g.jpg';
import KelloggsCornFlakes from '../../assets/Groceries/Kelloggs Corn Flakes 1.2kg.jpg';
import ParleGBiscuits from '../../assets/Groceries/Parle-G Biscuits 800g.jpg';
import BritanniaGoodDay from '../../assets/Groceries/Britannia Good Day 600g.jpg';
import LaysChips from '../../assets/Groceries/Lay\'s Classic Salted 200g.jpg';
import Pepsi2l from '../../assets/Groceries/Pepsi 2L.jpg';
import Sprite2l from '../../assets/Groceries/Sprite 2L.jpg';
import RealMixedFruitJuice from '../../assets/Groceries/Real Mixed Fruit Juice 1L.jpg';
import TropicanaOrangeJuice from '../../assets/Groceries/Tropicana Orange Juice 1L.jpg';
import EverestGaramMasala from '../../assets/Groceries/Everest Garam Masala 100g.jpg';
import Cola from '../../assets/Groceries/Coca-Cola 2L.jpg';
import Mango from '../../assets/fruits/Mango Alphonso 1kg.jpg';
import Apple from '../../assets/fruits/Fresh Apple 1kg.jpg';
import Banana from '../../assets/fruits/Banana (12 pcs).jpg';
import Orange from '../../assets/fruits/Orange 1kg.jpg';
import Pomegranate from '../../assets/fruits/Pomegranate 1kg.jpg';
import Papaya from '../../assets/fruits/Papaya (Medium).jpg';
import GrapesGreen from '../../assets/fruits/Grapes Green 500g.jpg';
import GrapesBlack from '../../assets/fruits/Grapes Black 500g.jpg';
import Watermelon from '../../assets/fruits/Watermelon (Large).jpg';
import Strawberry from '../../assets/fruits/Strawberry 200g.jpg';
import Tomato from '../../assets/Vegetables/Tomato 1kg.jpg';
import Potato from '../../assets/Vegetables/Potato 1kg.jpg';

type GroceryItem = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  subCategory: string;
  brand: string;
  weight: string;
  rating: number;
  ratingCount: number;
  sponsored?: boolean;
  deal?: string;
  delivery?: string;
};

const items: GroceryItem[] = [
  { id: 1, name: 'Basmati Rice 5kg', price: 599, originalPrice: 699, discount: 14, image: basmatiRice, category: 'Groceries', subCategory: 'Basmati Rice', brand: 'Daawat', weight: '5 kg', rating: 4.3, ratingCount: 1243, delivery: 'Tomorrow' },
  { id: 2, name: 'Aashirvaad Atta 10kg', price: 499, originalPrice: 549, discount: 9, image: AashirvaadAtta, category: 'Groceries', subCategory: 'Whole Wheat', brand: 'Aashirvaad', weight: '10 kg', rating: 4.5, ratingCount: 5678, delivery: 'Today' },
  { id: 3, name: 'Fortune Sunlite Oil 5L', price: 849, originalPrice: 899, discount: 6, image: FortuneSunliteOil, category: 'Groceries', subCategory: 'Sunflower Oil', brand: 'Fortune', weight: '5 L', rating: 4.2, ratingCount: 3210, delivery: 'Today' },
  { id: 4, name: 'Amul Butter 500g', price: 275, originalPrice: 295, discount: 7, image: AmulButter, category: 'Groceries', subCategory: 'Butter', brand: 'Amul', weight: '500 g', rating: 4.6, ratingCount: 7890, delivery: 'Tomorrow' },
  { id: 5, name: 'Mother Dairy Milk 1L', price: 64, originalPrice: 66, discount: 3, image: MotherDairyMilk, category: 'Groceries', subCategory: 'Milk', brand: 'Mother Dairy', weight: '1 L', rating: 4.4, ratingCount: 4321, delivery: 'Today' },
  { id: 6, name: 'Tata Salt 1kg', price: 25, originalPrice: 28, discount: 11, image: TataSalt, category: 'Groceries', subCategory: 'Iodized Salt', brand: 'Tata', weight: '1 kg', rating: 4.7, ratingCount: 9876, delivery: 'Tomorrow' },
  { id: 7, name: 'Maggi Noodles 560g', price: 75, originalPrice: 85, discount: 12, image: MaggiNoodles, category: 'Groceries', subCategory: 'Instant Noodles', brand: 'Maggi', weight: '560 g', rating: 4.2, ratingCount: 5678, delivery: 'Today' },
  { id: 8, name: 'Red Label Tea 1kg', price: 450, originalPrice: 500, discount: 10, image: RedLabelTea, category: 'Groceries', subCategory: 'Black Tea', brand: 'Brooke Bond', weight: '1 kg', rating: 4.3, ratingCount: 3456, delivery: 'Tomorrow' },
  { id: 9, name: 'Nescafe Coffee 200g', price: 550, originalPrice: 599, discount: 8, image: NescafeCoffee, category: 'Groceries', subCategory: 'Instant Coffee', brand: 'Nescafe', weight: '200 g', rating: 4.5, ratingCount: 2310, delivery: 'Today' },
  { id: 10, name: 'Bru Coffee 200g', price: 280, originalPrice: 310, discount: 10, image: BruCoffee, category: 'Groceries', subCategory: 'Instant Coffee', brand: 'Bru', weight: '200 g', rating: 4.4, ratingCount: 1820, delivery: 'Tomorrow' },
  { id: 11, name: 'Kelloggs Corn Flakes 1.2kg', price: 410, originalPrice: 450, discount: 9, image: KelloggsCornFlakes, category: 'Groceries', subCategory: 'Cereal', brand: 'Kelloggs', weight: '1.2 kg', rating: 4.3, ratingCount: 2210, delivery: 'Tomorrow' },
  { id: 12, name: 'Parle-G Biscuits 800g', price: 80, originalPrice: 90, discount: 11, image: ParleGBiscuits, category: 'Groceries', subCategory: 'Biscuits', brand: 'Parle', weight: '800 g', rating: 4.6, ratingCount: 7650, delivery: 'Today' },
  { id: 13, name: 'Britannia Good Day 600g', price: 120, originalPrice: 140, discount: 14, image: BritanniaGoodDay, category: 'Groceries', subCategory: 'Biscuits', brand: 'Britannia', weight: '600 g', rating: 4.5, ratingCount: 5432, delivery: 'Tomorrow' },
  { id: 14, name: 'Lay\'s Classic Salted 200g', price: 85, originalPrice: 95, discount: 10, image: LaysChips, category: 'Groceries', subCategory: 'Chips', brand: 'Lay\'s', weight: '200 g', rating: 4.4, ratingCount: 4123, delivery: 'Today' },
  { id: 15, name: 'Coca-Cola 2L', price: 95, originalPrice: 110, discount: 14, image: Cola, category: 'Beverages', subCategory: 'Soft Drink', brand: 'Coca-Cola', weight: '2 L', rating: 4.5, ratingCount: 6721, delivery: 'Today' },
  { id: 16, name: 'Pepsi 2L', price: 90, originalPrice: 105, discount: 14, image: Pepsi2l, category: 'Beverages', subCategory: 'Soft Drink', brand: 'Pepsi', weight: '2 L', rating: 4.4, ratingCount: 5430, delivery: 'Today' },
  { id: 17, name: 'Sprite 2L', price: 92, originalPrice: 108, discount: 15, image: Sprite2l, category: 'Beverages', subCategory: 'Soft Drink', brand: 'Sprite', weight: '2 L', rating: 4.3, ratingCount: 5120, delivery: 'Tomorrow' },
  { id: 18, name: 'Tropicana Orange Juice 1L', price: 110, originalPrice: 125, discount: 12, image: TropicanaOrangeJuice, category: 'Beverages', subCategory: 'Juice', brand: 'Tropicana', weight: '1 L', rating: 4.5, ratingCount: 4310, delivery: 'Today' },
  { id: 19, name: 'Real Mixed Fruit Juice 1L', price: 105, originalPrice: 120, discount: 13, image: RealMixedFruitJuice, category: 'Beverages', subCategory: 'Juice', brand: 'Real', weight: '1 L', rating: 4.4, ratingCount: 4230, delivery: 'Today' },
  { id: 20, name: 'Everest Garam Masala 100g', price: 80, originalPrice: 90, discount: 11, image: EverestGaramMasala, category: 'Gr', subCategory: 'Masala', brand: 'Everest', weight: '100 g', rating: 4.6, ratingCount: 2700, delivery: 'Today' },
 { id: 21, name: 'Fresh Apple 1kg', price: 120, originalPrice: 140, discount: 14, image: Apple, category: '🍇Fruits🍑', subCategory: 'Apple', brand: 'Farm Fresh', weight: '1 kg', rating: 4.7, ratingCount: 2100, delivery: 'Today' },
  { id: 22, name: 'Banana (12 pcs)', price: 50, originalPrice: 60, discount: 16, image: Banana, category: '🍇Fruits🍑', subCategory: 'Banana', brand: 'Farm Fresh', weight: '12 pcs', rating: 4.6, ratingCount: 1850, delivery: 'Today' },
  { id: 23, name: 'Orange 1kg', price: 90, originalPrice: 110, discount: 18, image: Orange, category: '🍇Fruits🍑', subCategory: 'Orange', brand: 'Farm Fresh', weight: '1 kg', rating: 4.5, ratingCount: 1700, delivery: 'Today' },
  { id: 24, name: 'Pomegranate 1kg', price: 180, originalPrice: 200, discount: 10, image: Pomegranate, category: '🍇Fruits🍑', subCategory: 'Pomegranate', brand: 'Farm Fresh', weight: '1 kg', rating: 4.6, ratingCount: 1600, delivery: 'Tomorrow' },
  { id: 25, name: 'Papaya (Medium)', price: 45, originalPrice: 55, discount: 18, image: Papaya, category: '🍇Fruits🍑', subCategory: 'Papaya', brand: 'Farm Fresh', weight: '1 pc', rating: 4.4, ratingCount: 1200, delivery: 'Today' },
  { id: 26, name: 'Grapes Green 500g', price: 75, originalPrice: 90, discount: 16, image: GrapesGreen, category: '🍇Fruits🍑', subCategory: 'Grapes', brand: 'Farm Fresh', weight: '500 g', rating: 4.5, ratingCount: 1100, delivery: 'Today' },
  { id: 27, name: 'Grapes Black 500g', price: 85, originalPrice: 100, discount: 15, image: GrapesBlack, category: '🍇Fruits🍑', subCategory: 'Grapes', brand: 'Farm Fresh', weight: '500 g', rating: 4.5, ratingCount: 1050, delivery: 'Tomorrow' },
  { id: 28, name: 'Watermelon (Large)', price: 70, originalPrice: 80, discount: 12, image: Watermelon, category: '🍇Fruits🍑', subCategory: 'Watermelon', brand: 'Farm Fresh', weight: '1 pc', rating: 4.6, ratingCount: 990, delivery: 'Today' },
  { id: 29, name: 'Mango Alphonso 1kg', price: 300, originalPrice: 350, discount: 14, image: Mango, category: '🍇Fruits🍑', subCategory: 'Mango', brand: 'Farm Fresh', weight: '1 kg', rating: 4.8, ratingCount: 1500, delivery: 'Tomorrow' },
  { id: 30, name: 'Strawberry 200g', price: 85, originalPrice: 100, discount: 15, image: Strawberry, category: '🍇Fruits🍑', subCategory: 'Strawberry', brand: 'Farm Fresh', weight: '200 g', rating: 4.6, ratingCount: 870, delivery: 'Today' },
  { id: 31, name: 'Tomato 1kg', price: 40, originalPrice: 50, discount: 20, image: Tomato, category: '🥔Vegetables🧅', subCategory: 'Tomato', brand: 'Farm Fresh', weight: '1 kg', rating: 4.4, ratingCount: 1900, delivery: 'Today' },
  { id: 32, name: 'Potato 1kg', price: 35, originalPrice: 45, discount: 22, image: Potato, category: '🥔Vegetables🧅', subCategory: 'Potato', brand: 'Farm Fresh', weight: '1 kg', rating: 4.5, ratingCount: 2000, delivery: 'Today' }
];

const GroceriesPage: React.FC = () => {
  const { cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All'); // Category state

  const getQuantity = (id: number) =>
    cartItems.find((item) => item.id === id)?.quantity || 0;

  const categories = ['All', '🍇Fruits🍑', '🥔Vegetables🧅', 'Groceries','Beverages'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Fresh Groceries</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:flex-none md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Cart Button */}
            <button
              className="relative flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full shadow">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 mb-6">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => {
              const quantity = getQuantity(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1"
                >
                  <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      onError={e => { e.currentTarget.src = 'https://via.placeholder.com/160x160?text=Product+Image'; }}
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{item.brand}</p>
                    <h2 className="text-md font-semibold text-gray-800 line-clamp-2 h-12 mb-2">{item.name}</h2>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < Math.floor(item.rating) ? "#f59e0b" : "none"}
                            stroke="#f59e0b"
                            className="mr-0.5"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({item.ratingCount.toLocaleString()})</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</p>
                      <p className="text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">{item.discount}% off</p>
                    </div>

                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs text-gray-500">{item.weight}</p>
                      <p className="text-xs font-medium text-green-600">
                        {item.delivery} <span className="text-gray-400">FREE</span>
                      </p>
                    </div>

                    {/* Add to Cart */}
                    <div className="mt-2">
                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all shadow-md hover:shadow-lg"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-orange-50 rounded-lg p-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="p-1.5 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-all shadow-sm"
                              disabled={quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-semibold text-gray-800 min-w-[1.5rem] text-center">{quantity}</span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="p-1.5 bg-white hover:bg-gray-100 text-gray-800 rounded-lg transition-all shadow-sm"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 bg-white hover:bg-red-50 text-red-600 rounded-lg transition-all shadow-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-gray-300 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-2xl font-medium text-gray-600 mb-3">No products found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any items matching your search</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all shadow-md"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroceriesPage;
