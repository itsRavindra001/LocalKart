// src/pages/SalonServices.tsx

import { useNavigate } from "react-router-dom";
import { Scissors, Sparkles, Brush, Droplet, Heart } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Haircut & Styling",
    description: "Trendy cuts and personalized styling for men & women.",
    price: "₹499",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    icon: <Scissors className="w-6 h-6 text-pink-500" />,
  },
  {
    id: 2,
    name: "Facial & Cleanup",
    description: "Rejuvenating facials and deep cleansing treatments.",
    price: "₹899",
    image:
      "https://images.unsplash.com/photo-1599351431202-1a77d2e9d6c2?auto=format&fit=crop&w=800&q=80",
    icon: <Sparkles className="w-6 h-6 text-indigo-500" />,
  },
  {
    id: 3,
    name: "Hair Coloring",
    description: "Premium coloring, highlights, and touch-ups.",
    price: "₹1499",
    image:
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    icon: <Brush className="w-6 h-6 text-red-500" />,
  },
  {
    id: 4,
    name: "Manicure & Pedicure",
    description: "Relaxing nail care and spa treatments.",
    price: "₹699",
    image:
      "https://images.unsplash.com/photo-1619983081637-0e208fc29d61?auto=format&fit=crop&w=800&q=80",
    icon: <Droplet className="w-6 h-6 text-blue-500" />,
  },
  {
    id: 5,
    name: "Bridal Package",
    description: "Full bridal makeover for your big day.",
    price: "₹4999",
    image:
      "https://images.unsplash.com/photo-1621609775666-7d8dfe8e2cf1?auto=format&fit=crop&w=800&q=80",
    icon: <Heart className="w-6 h-6 text-rose-500" />,
  },
];

const SalonServices: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Pamper Yourself with <span className="text-pink-600">Salon Services</span>
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Discover our professional beauty & grooming services at your doorstep.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-left">
                <div className="flex items-center mb-3">
                  {service.icon}
                  <h3 className="ml-3 text-xl font-semibold text-gray-800">
                    {service.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-pink-600">{service.price}</span>
                  <button
                    onClick={() => navigate("/payment")}
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonServices;
