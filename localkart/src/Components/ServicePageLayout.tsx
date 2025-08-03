import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  description: string;
  images: string[];
  features: string[];
};

const ServicePageLayout = ({ title, description, images, features }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4 sm:px-8 font-sans relative z-0">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">{title}</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto">
        {images.map((src, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow">
            <img
              src={src}
              alt={`Image of ${title} - ${i + 1}`}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="w-full bg-white py-10 px-6 sm:px-10 md:px-16 lg:px-32 shadow-inner">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Why Choose This Service?</h2>
        <ul className="list-disc list-inside text-gray-800 text-lg space-y-4 max-w-5xl mx-auto">
          {features.map((item, index) => (
            <li key={index} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="flex justify-between items-center max-w-4xl mx-auto mt-16 px-4">
        <button
          onClick={() => navigate('/book')}
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
        >
          📅 Book Now
        </button>

        <button
          onClick={() => navigate('/')}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          🔙 Back to Home
        </button>
      </div>
    </div>
  );
};

export default ServicePageLayout;
