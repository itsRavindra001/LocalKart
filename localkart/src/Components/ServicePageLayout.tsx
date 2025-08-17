import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-14 px-4 sm:px-8 font-sans relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-blue-50 to-indigo-50 -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-30 -z-10" />

      {/* Selected Service Banner */}
      {selectedService && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 text-blue-800 p-4 mb-8 max-w-7xl mx-auto rounded-lg shadow-sm flex items-center"
        >
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="font-medium">
            You've selected: <span className="font-bold text-blue-900">{selectedService}</span>
          </p>
        </motion.div>
      )}

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
          {serviceType || 'Premium Service'}
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Gallery */}
      {images.length > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-7xl mx-auto"
        >
          {images.map((src, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={src}
                alt={`Image of ${title} - ${i + 1}`}
                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium text-lg">Feature {i + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Additional Content Section */}
      {additionalContent && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 mb-20 max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-12"
        >
          {additionalContent}
        </motion.div>
      )}

      {/* Features Section */}
      <div className="w-full bg-white py-20 px-6 sm:px-10 md:px-16 lg:px-32 relative">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our <span className="text-blue-600">Service</span>?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We deliver exceptional quality and unparalleled customer service
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-start bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-100 transition-all"
              >
                {typeof item === "string" ? (
                  <>
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">{item}</p>
                  </>
                ) : (
                  <div className="flex items-start space-x-4">
                    {item.icon && (
                      <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-2xl flex-shrink-0">
                        {item.icon}
                      </div>
                    )}
                    <p className="text-gray-700 text-lg leading-relaxed">{item.text}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto mt-24 mb-16 px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Experience the best service in the industry with our expert team
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookNow}
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition font-semibold text-lg shadow-md"
            >
              <span className="mr-3">📅</span> Book {title} Service
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition font-semibold text-lg"
            >
              <span className="mr-3">💬</span> Contact Our Team
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center gap-6 mt-12">
        <button
          onClick={() => navigate('/services')}
          className="text-gray-600 hover:text-blue-600 flex items-center transition font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          All Services
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-blue-600 flex items-center transition font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </button>
      </div>
    </div>
  );
};

export default ServicePageLayout;