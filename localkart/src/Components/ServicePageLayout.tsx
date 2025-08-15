import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type Props = {
  title: string;
  description: string;
  images?: string[]; // optional
  serviceType?: string;
  additionalContent?: React.ReactNode;
  
  features: string[] | { icon: React.ReactNode; text: string }[];
};

const ServicePageLayout: React.FC<Props> = ({
  title,
  description,
  images = [],
  serviceType,
  additionalContent,
  features
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookNow = () => {
    navigate('/book', {
      state: {
        serviceName: title,
        serviceDescription: description,
        serviceType: serviceType || title.toLowerCase(),
        serviceImages: images,
      }
    });
  };

  const selectedService = location.state?.selectedService;

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4 sm:px-8 font-sans relative z-0">
      {/* Selected Service Banner */}
      {selectedService && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8 max-w-7xl mx-auto rounded">
          <p className="font-medium">
            You've selected: <span className="font-bold">{selectedService}</span>
          </p>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">{title}</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{description}</p>
      </div>

      {/* Gallery */}
      {images.length > 0 && (
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
      )}

      

      {/* Additional Content Section */}
      {additionalContent && <div className="mt-12">{additionalContent}</div>}

      {/* Features Section */}
      <div className="w-full bg-white py-10 px-6 sm:px-10 md:px-16 lg:px-32 shadow-inner">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Why Choose This Service?
        </h2>
        <ul className="list-disc list-inside text-gray-800 text-lg space-y-4 max-w-5xl mx-auto">
          {features.map((item, index) =>
            typeof item === 'string' ? (
              <li key={index} className="leading-relaxed">{item}</li>
            ) : (
              <li key={index} className="flex items-center space-x-2 leading-relaxed">
                {item.icon && <span>{item.icon}</span>}
                <span>{item.text}</span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto mt-16 px-4 gap-4">
        <button
          onClick={handleBookNow}
          className="w-full sm:w-auto inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
        >
          <span className="mr-2">📅</span> Book {title} Service
        </button>

        <button
          onClick={() => navigate('/services')}
          className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-medium"
        >
          <span className="mr-2">🔄</span> View Other Services
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <span className="mr-2">🏠</span> Back to Home
        </button>
      </div>
    </div>
  );
};

export default ServicePageLayout;
