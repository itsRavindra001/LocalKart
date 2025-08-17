import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 px-6 py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-900 rounded-full filter blur-[100px] opacity-10 -z-0"></div>
      <div className="absolute top-0 left-0 w-48 h-48 bg-pink-900 rounded-full filter blur-[80px] opacity-10 -z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                LocalKart
              </span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Your trusted local service marketplace for premium on-demand home services with guaranteed satisfaction.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-700 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-sky-500 text-white p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-pink-600 text-white p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-700 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700 inline-block">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/services/plumbing" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                  Plumbing Solutions
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/electrician" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                  Electrical Services
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/cleaning" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                  Professional Cleaning
                </Link>
              </li>
              <li>
                <Link 
                  to="/services/groceries" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                  Grocery Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/privacy" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                  Contact Support
                </Link>
              </li>
              <li>
                <Link 
                  to="/provider" 
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                  Join as Provider
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-gray-700 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-600 p-2 rounded-lg mr-4">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Our Location</h4>
                  <p className="text-gray-400 text-sm mt-1">Rajkot, Gujarat, India</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-600 p-2 rounded-lg mr-4">
                  <FaPhoneAlt className="text-white text-sm" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Phone Number</h4>
                  <p className="text-gray-400 text-sm mt-1">+91 1234567890</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-pink-600 p-2 rounded-lg mr-4">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium">Email Address</h4>
                  <p className="text-gray-400 text-sm mt-1">support@localkart.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LocalKart. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/sitemap" className="text-gray-500 hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
            <Link to="/faq" className="text-gray-500 hover:text-white text-sm transition-colors">
              FAQs
            </Link>
            <Link to="/careers" className="text-gray-500 hover:text-white text-sm transition-colors">
              Careers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;