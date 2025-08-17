import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Scissors, Sparkles, CalendarCheck, Star, User, 
  Heart, Award, Smile, ChevronRight, Phone, MapPin
} from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Salon = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');

  const serviceCategories = [
    { name: "Hair Services", icon: <Scissors className="w-5 h-5" />, color: "bg-pink-100 text-pink-600" },
    { name: "Waxing & Brows", icon: <Sparkles className="w-5 h-5" />, color: "bg-purple-100 text-purple-600" },
    { name: "Makeup & Lashes", icon: <Smile className="w-5 h-5" />, color: "bg-amber-100 text-amber-600" },
    { name: "Skin Services", icon: <User className="w-5 h-5" />, color: "bg-blue-100 text-blue-600" },
    { name: "Ear Piercing", icon: <Heart className="w-5 h-5" />, color: "bg-red-100 text-red-600" },
    { name: "Special Events", icon: <CalendarCheck className="w-5 h-5" />, color: "bg-emerald-100 text-emerald-600" }
  ];

  const featuredServices = [
    { 
      id: 1, 
      title: "Blonde Ambition Gloss", 
      description: "Professional gloss treatment for salon-worthy blonde hair", 
      price: "₹1,499", 
      duration: "90 min",
      popular: true,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: 2, 
      title: "Bridal Makeup Package", 
      description: "Complete bridal transformation with trial session included", 
      price: "₹4,999", 
      duration: "3-4 hours",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: 3, 
      title: "Signature Facial", 
      description: "Customized facial treatment with relaxing massage", 
      price: "₹1,299", 
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const stylists = [
    { 
      name: "Riya Sharma", 
      role: "Senior Stylist", 
      specialty: "Hair Coloring & Styling", 
      rating: 4.9,
      experience: "8 years",
      img: "https://randomuser.me/api/portraits/women/68.jpg" 
    },
    { 
      name: "Ananya Patel", 
      role: "Makeup Artist", 
      specialty: "Bridal & Special Occasion", 
      rating: 4.8,
      experience: "6 years",
      img: "https://randomuser.me/api/portraits/women/45.jpg" 
    },
    { 
      name: "Neha Verma", 
      role: "Skin Specialist", 
      specialty: "Facials & Dermatology", 
      rating: 4.7,
      experience: "5 years",
      img: "https://randomuser.me/api/portraits/women/22.jpg" 
    }
  ];

  const testimonials = [
    {
      name: "Priya M.",
      rating: 5,
      comment: "The best salon experience I've ever had! Riya transformed my hair exactly how I envisioned it.",
      date: "2 weeks ago"
    },
    {
      name: "Rahul K.",
      rating: 5,
      comment: "Ananya's bridal makeup was flawless. I received so many compliments on my wedding day!",
      date: "1 month ago"
    },
    {
      name: "Sonia D.",
      rating: 4,
      comment: "Neha's facial left my skin glowing for days. Will definitely be coming back regularly!",
      date: "3 weeks ago"
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Banner */}
      <section className="relative h-[500px] bg-gradient-to-r from-pink-900 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-20"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Elevate Your Beauty Experience
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Professional salon services in the comfort of your home or at our luxury studio
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/booking")}
            className="px-8 py-3 bg-white text-pink-700 rounded-full font-bold hover:bg-pink-100 transition flex items-center shadow-lg"
          >
            <CalendarCheck className="mr-2" /> Book Your Appointment
          </motion.button>
        </motion.div>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Beauty Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of professional beauty treatments
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/services/${category.name.toLowerCase().replace(' ', '-')}`)}
            >
              <div className={`w-14 h-14 ${category.color} rounded-full flex items-center justify-center mb-4`}>
                {category.icon}
              </div>
              <span className="font-medium text-gray-700 text-center">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Signature Treatments</h2>
              <p className="text-gray-600">Our most requested premium services</p>
            </div>
            <button 
              onClick={() => setActiveTab('services')}
              className="mt-4 md:mt-0 text-pink-600 font-medium flex items-center"
            >
              View all services <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="relative h-60">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-pink-600">{service.price}</span>
                      <span className="text-sm text-gray-500 ml-2">• {service.duration}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate("/booking")}
                      className="text-sm bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beauty Experts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Beauty Experts</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our licensed professionals are committed to bringing your beauty vision to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stylists.map((stylist, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 h-80">
                  <img 
                    src={stylist.img} 
                    alt={stylist.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold">{stylist.name}</h3>
                      <p className="text-pink-200">{stylist.role}</p>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <p className="text-gray-600 mb-1"><span className="font-medium">Specialty:</span> {stylist.specialty}</p>
                  <p className="text-gray-600 mb-3"><span className="font-medium">Experience:</span> {stylist.experience}</p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(stylist.rating) ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{stylist.rating}/5</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what our clients say about their experiences
            </p>
          </div>
          
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                    <div className="flex items-center mb-4">
                      <div className="flex mr-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{testimonial.date}</span>
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-700 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Transformation?</h2>
          <p className="text-xl mb-8">
            Book your appointment today and experience luxury beauty care
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/booking")}
              className="px-8 py-3 bg-white text-pink-700 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
            >
              Book Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition flex items-center justify-center"
            >
              <Phone className="mr-2 h-4 w-4" /> Call Us: +91 98765 43210
            </motion.button>
          </div>
          
          <div className="mt-8 flex items-center justify-center text-sm">
            <MapPin className="mr-2 h-4 w-4" />
            <span>123 Beauty Street, Mumbai, Maharashtra 400001</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Salon;