// src/Components/Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import {
  FaSnowflake,
  FaBolt,
  FaCut,
  FaBroom,
  FaPaintRoller,
  FaHammer,
  FaShoppingBasket,
  FaBook,
  FaTshirt,
  FaTint,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaBars,
} from "react-icons/fa";

const Navbar: React.FC = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileBtnRef = useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout, userInfo } = useAuth();

  const services = [
    {
      name: "AC Repair",
      path: "ac-repair",
      icon: <FaSnowflake className="text-blue-400" />,
      description: "Professional AC installation and repair services",
    },
    {
      name: "Electrician",
      path: "electrician",
      icon: <FaBolt className="text-yellow-400" />,
      description: "Certified electricians for all your needs",
    },
    {
      name: "Salon at Home",
      path: "salon",
      icon: <FaCut className="text-pink-400" />,
      description: "Beauty services in the comfort of your home",
    },
    {
      name: "House Cleaning",
      path: "cleaning",
      icon: <FaBroom className="text-green-500" />,
      description: "Thorough cleaning for your living space",
    },
    {
      name: "Painting",
      path: "painting",
      icon: <FaPaintRoller className="text-red-400" />,
      description: "Interior and exterior painting services",
    },
    {
      name: "Carpentry",
      path: "carpentry",
      icon: <FaHammer className="text-amber-600" />,
      description: "Custom woodwork and repairs",
    },
    {
      name: "Groceries",
      path: "groceries",
      icon: <FaShoppingBasket className="text-emerald-500" />,
      description: "Fresh groceries delivered to your door",
    },
    {
      name: "Tutors",
      path: "tutors",
      icon: <FaBook className="text-indigo-500" />,
      description: "Personalized learning with expert tutors",
    },
    {
      name: "Tailors",
      path: "tailors",
      icon: <FaTshirt className="text-purple-400" />,
      description: "Custom clothing alterations and repairs",
    },
    {
      name: "Plumbing",
      path: "plumbing",
      icon: <FaTint className="text-blue-500" />,
      description: "Comprehensive plumbing solutions",
    },
  ];

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;

      // Close services dropdown if clicked outside AND it's not the mobile services button
      if (
        servicesRef.current && 
        !servicesRef.current.contains(target) &&
        !(target instanceof HTMLElement && target.closest('[data-mobile-services]'))
      ) {
        setServicesOpen(false);
      }

      // Close profile dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }

      // Close mobile menu if clicked outside
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        mobileBtnRef.current &&
        !mobileBtnRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [mobileMenuOpen]);

  const toggleServicesMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setServicesOpen(!servicesOpen);
  };

  const closeAllMenus = () => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeAllMenus();
    navigate("/login");
  };

  const handleServiceNavigate = (path: string) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: `/services/${path}` } });
      closeAllMenus();
      return;
    }
    closeAllMenus();
    navigate(`/services/${path}`);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" onClick={closeAllMenus} className="flex items-center">
              <span className="text-2xl font-extrabold tracking-tight text-indigo-600">
                Local<span className="text-gray-900">Kart</span>
              </span>
            </NavLink>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <NavLink
              to="/"
              onClick={closeAllMenus}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/provider"
              onClick={closeAllMenus}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              Become a Provider
            </NavLink>

            {/* Services dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                type="button"
                onClick={toggleServicesMenu}
                aria-expanded={servicesOpen}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  location.pathname.startsWith("/services") || servicesOpen
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>Services</span>
                <span className="ml-2">{servicesOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
              </button>

              {servicesOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-3 grid gap-2">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">All Services</h3>
                      <button aria-label="Close services" onClick={() => setServicesOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <FaTimes />
                      </button>
                    </div>

                    {services.map((s) => (
                      <button
                        key={s.path}
                        onClick={() => handleServiceNavigate(s.path)}
                        className="flex items-start w-full p-2 rounded-md hover:bg-gray-50 text-left transition-colors"
                      >
                        <span className="text-lg mr-3">{s.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{s.name}</p>
                          <p className="text-xs text-gray-500">{s.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auth area */}
            {!isLoggedIn ? (
              <div className="flex items-center space-x-2 ml-4">
                <NavLink
                  to="/login"
                  onClick={closeAllMenus}
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-blue-700 border border-blue-700 hover:bg-blue-50"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={closeAllMenus}
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <NavLink to="/book" onClick={closeAllMenus} className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  Book Now
                </NavLink>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((d) => !d)}
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white focus:outline-none"
                    aria-expanded={dropdownOpen}
                  >
                    {userInfo?.username?.charAt(0).toUpperCase() || "U"}
                  </button>

                  {dropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 text-sm text-gray-700">
                          <div className="text-xs text-gray-500">Signed in as</div>
                          <div className="font-medium truncate">{userInfo?.username || "User  "}</div>
                        </div>
                        <NavLink to="/profile" onClick={closeAllMenus} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Your Profile
                        </NavLink>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
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
          <div className="flex md:hidden">
            <button
              ref={mobileBtnRef}
              onClick={() => setMobileMenuOpen((m) => !m)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden transition-max-h duration-300 ease-in-out overflow-hidden bg-white shadow-xl ${mobileMenuOpen ? "max-h-screen" : "max-h-0"}`}
        inert={!mobileMenuOpen} // Use inert instead of aria-hidden
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/provider"
            onClick={closeAllMenus}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            Become a Provider
          </NavLink>

          {/* Mobile services accordion */}
          <div className="border-t border-gray-100 pt-2">
            <button
              data-mobile-services
              onClick={toggleServicesMenu}
              className="w-full text-left px-3 py-2 rounded-md flex items-center justify-between text-gray-700 hover:bg-gray-100"
            >
              <span>Services</span>
              <span>{servicesOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>

            <div className={`transition-all duration-300 ${servicesOpen ? 'max-h-[1000px]' : 'max-h-0 overflow-hidden'}`}>
              <div className="px-3 pt-2 pb-4 space-y-1 bg-gray-50 rounded-md mx-2">
                {services.map((s) => (
                  <button
                    key={s.path}
                    onClick={() => handleServiceNavigate(s.path)}
                    className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <span className="mr-3">{s.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Auth buttons / profile area */}
          <div className="pt-4 pb-4 border-t border-gray-200">
            {!isLoggedIn ? (
              <div className="px-2 space-y-1">
                <NavLink to="/login" onClick={closeAllMenus} className="block w-full px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50">
                  Login
                </NavLink>
                <NavLink to="/signup" onClick={closeAllMenus} className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <>
                <div className="px-5">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      {userInfo?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{userInfo?.username || "User  "}</div>
                      <div className="text-sm text-gray-500">{userInfo?.email || "N/A"}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 px-2 space-y-1">
                  <NavLink to="/book" onClick={closeAllMenus} className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700">
                    Book Now
                  </NavLink>
                  <NavLink to="/profile" onClick={closeAllMenus} className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </NavLink>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
