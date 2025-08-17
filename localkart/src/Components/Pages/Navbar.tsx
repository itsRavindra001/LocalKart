
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { 
  FaSnowflake, FaBolt, FaCut, FaBroom, FaPaintRoller, 
  FaHammer, FaShoppingBasket, FaBook, FaTshirt, FaTint,
  FaChevronDown, FaChevronUp, FaTimes
} from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, userInfo } = useAuth();

  const services = [
    { 
      name: "AC Repair", 
      path: "ac-repair", 
      icon: <FaSnowflake className="text-blue-400" />, 
      description: "Professional AC installation and repair services" 
    },
    { 
      name: "Electrician", 
      path: "electrician", 
      icon: <FaBolt className="text-yellow-400" />, 
      description: "Certified electricians for all your needs" 
    },
    { 
      name: "Salon at Home", 
      path: "salon", 
      icon: <FaCut className="text-pink-400" />, 
      description: "Beauty services in the comfort of your home" 
    },
    { 
      name: "House Cleaning", 
      path: "cleaning", 
      icon: <FaBroom className="text-green-500" />, 
      description: "Thorough cleaning for your living space" 
    },
    { 
      name: "Painting", 
      path: "painting", 
      icon: <FaPaintRoller className="text-red-400" />, 
      description: "Interior and exterior painting services" 
    },
    { 
      name: "Carpentry", 
      path: "carpentry", 
      icon: <FaHammer className="text-amber-600" />, 
      description: "Custom woodwork and repairs" 
    },
    { 
      name: "Groceries", 
      path: "groceries", 
      icon: <FaShoppingBasket className="text-emerald-500" />, 
      description: "Fresh groceries delivered to your door" 
    },
    { 
      name: "Tutors", 
      path: "tutors", 
      icon: <FaBook className="text-indigo-500" />, 
      description: "Personalized learning with expert tutors" 
    },
    { 
      name: "Tailors", 
      path: "tailors", 
      icon: <FaTshirt className="text-purple-400" />, 
      description: "Custom clothing alterations and repairs" 
    },
    { 
      name: "Plumbing", 
      path: "plumbing", 
      icon: <FaTint className="text-blue-500" />, 
      description: "Comprehensive plumbing solutions" 
    }
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      
      if (servicesRef.current && !servicesRef.current.contains(target)) {
        setServicesOpen(false);
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
      
      if (mobileMenuOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(target) &&
          mobileMenuButtonRef.current && 
          !mobileMenuButtonRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleServiceClick = () => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setServicesOpen(!servicesOpen);
  };

  const isAdmin = userInfo?.role === "admin";
  const isProvider = userInfo?.role === "provider";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">

            <span className="ml-2 text-2xl font-extrabold tracking-tight text-indigo-600">
  Local<span className="text-gray-900">Kart</span>
</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Home
            </Link>

            <Link
              to="/provider"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/provider" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Become a Provider
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={toggleServicesDropdown}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  location.pathname.startsWith("/services") || servicesOpen
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>Services</span>
                {servicesOpen ? (
                  <FaChevronUp className="ml-1 h-3 w-3" />
                ) : (
                  <FaChevronDown className="ml-1 h-3 w-3" />
                )}
              </button>

              {servicesOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-2 px-3 grid gap-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        All Services
                      </h3>
                      <button 
                        onClick={() => setServicesOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <FaTimes className="h-3 w-3" />
                      </button>
                    </div>
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={`/services/${service.path}`}
                        onClick={handleServiceClick}
                        className="flex items-start p-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg mr-3">{service.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{service.name}</p>
                          <p className="text-xs text-gray-500">{service.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {!isLoggedIn ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-blue-700 border border-blue-700 hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  to="/book"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Book Now
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white focus:outline-none"
                  >
                    {userInfo?.username?.charAt(0).toUpperCase() || "👤"}
                  </button>
                  {dropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700">
                          <div>Signed in as</div>
                          <div className="font-medium truncate">{userInfo?.username || "User"}</div>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Your Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef} 
          className="md:hidden bg-white shadow-xl absolute top-16 left-0 right-0 z-50"
        >
         
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Home
            </Link>

            <Link
              to="/provider"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/provider" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Become a Provider
            </Link>

            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={toggleServicesDropdown}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex justify-between items-center ${
                  location.pathname.startsWith("/services") || servicesOpen
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>Services</span>
                {servicesOpen ? (
                  <FaChevronUp className="h-4 w-4" />
                ) : (
                  <FaChevronDown className="h-4 w-4" />
                )}
              </button>

              {servicesOpen && (
                <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-50 rounded-md mx-2">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={`/services/${service.path}`}
                      onClick={handleServiceClick}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <span className="mr-2">{service.icon}</span>
                      <div>
                        <div>{service.name}</div>
                        <div className="text-xs text-gray-500">{service.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isLoggedIn && (
              <Link
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Book Now
              </Link>
            )}
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {userInfo?.username?.charAt(0).toUpperCase() || "👤"}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{userInfo?.username || "User"}</div>
                  <div className="text-sm font-medium text-gray-500">{userInfo?.email || "N/A"}</div>
                </div>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;