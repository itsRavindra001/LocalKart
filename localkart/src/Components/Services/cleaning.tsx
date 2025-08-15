// src/pages/HouseCleaning.tsx
import React from 'react';
import { Sparkles, Home, Bath, ShowerHead, Leaf, CalendarCheck } from 'lucide-react';
import ServicePageLayout from '../ServicePageLayout';
import { useNavigate } from 'react-router-dom';

const HouseCleaning = () => {
  const navigate = useNavigate();

  const houseCleaningImages = [
    'https://cdn.pixabay.com/photo/2024/07/28/17/51/woman-8928096_640.png',
    'https://media.istockphoto.com/id/1409789197/vector/professional-cleaner-with-a-sanitizing-spray-and-a-mop-vector-illustration.jpg?s=612x612&w=0&k=20&c=GYjqPrZYdkwkb7-NmKjMhcvRhW0fEFST5ivflHSwb1U=',
    'https://img.freepik.com/free-vector/cleaners-with-cleaning-products-housekeeping-service_18591-52068.jpg?semt=ais_hybrid',
    'https://static.vecteezy.com/system/resources/thumbnails/001/984/801/small/housekeeping-team-with-cleaning-equipment-free-vector.jpg',
  ];

  const features = [
    { icon: <Sparkles className="w-6 h-6 text-green-600" />, text: 'Complete deep cleaning service' },
    { icon: <Bath className="w-6 h-6 text-green-600" />, text: 'Bathroom sanitization & grout cleaning' },
    { icon: <Home className="w-6 h-6 text-green-600" />, text: 'Move-in/move-out special cleaning' },
    { icon: <Leaf className="w-6 h-6 text-green-600" />, text: 'Eco-friendly cleaning products' },
    { icon: <ShowerHead className="w-6 h-6 text-green-600" />, text: 'Kitchen degreasing & appliance cleaning' },
    { icon: <CalendarCheck className="w-6 h-6 text-green-600" />, text: 'Flexible scheduling options' },
  ];

  const servicePlans = [
    {
      title: "Basic Home Refresh",
      duration: "2-3 hours",
      rooms: "Up to 3 rooms",
      eco: "Eco-friendly products",
      price: 120,
      icon: <Sparkles className="w-8 h-8 text-green-600 mx-auto" />
    },
    {
      title: "Complete Deep Clean",
      duration: "4-6 hours",
      rooms: "Whole house",
      eco: "Eco-friendly products + disinfectants",
      price: 200,
      icon: <Sparkles className="w-8 h-8 text-green-600 mx-auto" />,
      popular: true
    },
    {
      title: "Move-In / Move-Out Special",
      duration: "5-8 hours",
      rooms: "Whole house + cabinets & appliances",
      eco: "Eco-friendly products",
      price: 250,
      icon: <Home className="w-8 h-8 text-green-600 mx-auto" />
    }
  ];

  return (
    <ServicePageLayout
      title="Professional House Cleaning Services"
      description="Transform your home with our thorough cleaning services using premium products and attention to detail"
      images={houseCleaningImages}
      features={features}
      serviceType="house-cleaning"
      additionalContent={
        <div className="max-w-7xl mx-auto px-4 py-12">

          {/* Cleaning Packages / Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {servicePlans.map((plan, index) => (
              <div key={index} className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow ${plan.popular ? 'ring-2 ring-green-500' : ''}`}>
                {plan.popular && <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">MOST POPULAR</div>}
                <div className="flex justify-center mb-4">{plan.icon}</div>
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">{plan.title}</h3>
                <p><strong>Duration:</strong> {plan.duration}</p>
                <p><strong>Rooms:</strong> {plan.rooms}</p>
                <p><strong>Type:</strong> {plan.eco}</p>
                <p className="text-2xl font-bold text-center text-green-600 mb-4">₹{plan.price}</p>
                <button
                  onClick={() =>
                    navigate('/payment', {
                      state: {
                        planTitle: plan.title,
                        planDuration: plan.duration,
                        planRooms: plan.rooms,
                        planEco: plan.eco,
                        planPrice: plan.price
                      }
                    })
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Book This Plan
                </button>
              </div>
            ))}
          </div>

          {/* Cleaning Process */}
          <div className="bg-green-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Cleaning Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Preparation", desc: "We bring all necessary supplies and equipment" },
                { step: "2", title: "Dusting", desc: "Top-to-bottom dusting of all surfaces" },
                { step: "3", title: "Sanitizing", desc: "Disinfection of high-touch areas" },
                { step: "4", title: "Final Touches", desc: "Vacuuming, mopping, and quality check" }
              ].map((step, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3 font-bold">{step.step}</div>
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default HouseCleaning;
