import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

type Props = {
  title: string;
  description: string;
  images?: string[];
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
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {location.state?.selectedService && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center bg-blue-50 text-blue-800 px-4 py-2 rounded-full shadow-sm mb-8 border border-blue-100"
            >
              <div className="bg-blue-100 p-1 rounded-full mr-2">
                <FiCheck className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">
                Selected: <span className="font-bold">{location.state.selectedService}</span>
              </span>
            </motion.div>
          )}

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:w-1/2"
            >
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                {serviceType || 'Premium Service'}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {description}
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleBookNow}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md"
              >
                Book Now
              </motion.button>
            </motion.div>

            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:w-1/2 w-full"
              >
                <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video">
                  <img
                    src={images[0]}
                    alt={`Featured ${title} service`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-6">
                    <span className="text-white font-medium text-lg">Featured Service</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {images.length > 1 && (
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {images.slice(1).map((src, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="relative group overflow-hidden rounded-xl shadow-md bg-gray-100 aspect-square"
                >
                  <img
                    src={src}
                    alt={`${title} example ${i + 2}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium">Example {i + 2}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* Additional Content Section */}
      {additionalContent && (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.8,
      ease: [0.16, 0.77, 0.47, 0.97],
      delay: 0.2
    }}
    className="relative py-24 overflow-hidden"
  >
    {/* Luxury background elements */}
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/30 via-white to-white"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/10 rounded-full blur-3xl"></div>
      </div>
    </div>

    {/* Premium content container */}
    <div className="max-w-7xl mx-auto px-6">
      <div className="relative group">
        {/* Luxury border effect */}
        <div className="absolute -inset-px rounded-[22px] bg-gradient-to-br from-blue-200/50 via-transparent to-indigo-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        
        {/* Main card */}
        <div className="relative bg-white rounded-[20px] shadow-2xl overflow-hidden border border-gray-100/80 backdrop-blur-sm">
          {/* Premium header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 px-10 py-8">
            <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5f9a6e5477b0bc3b8a5c9b5b/5f9a6e5477b0bc7a4a5c9b7b_noise.png')] opacity-10 mix-blend-overlay"></div>
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20 mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Enhanced Details</h3>
              </div>
            </div>
          </div>
          
          {/* Luxury content area */}
          <div className="p-10 sm:p-12 md:p-14 bg-white/95 relative">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5f9a6e5477b0bc3b8a5c9b5b/5f9a6e5477b0bc7a4a5c9b7b_noise.png')] opacity-5 pointer-events-none"></div>
            
            {/* Content with premium typography */}
            <div className="prose prose-lg max-w-none text-gray-700 relative">
              <div className="prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-strong:text-gray-900 prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-lg">
                {additionalContent}
              </div>
            </div>
          </div>
          
          {/* Luxury footer */}
          <div className="px-10 py-6 bg-gray-50/50 border-t border-gray-100/70 flex justify-end">
            
          </div>
        </div>
      </div>
    </div>
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