import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Scissors,
  Sparkles,
  Smile,
  User,
  Heart,
  CalendarCheck,
  ChevronDown,
  Star,
  Clock,
  Award,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SalonServices = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const serviceCategories = [
    { id: "all", name: "All Services" },
    { id: "hair", name: "Hair" },
    { id: "makeup", name: "Makeup" },
    { id: "skin", name: "Skin Care" },
    { id: "waxing", name: "Waxing" },
    { id: "nails", name: "Nails" },
  ];

  const services = [
    {
      id: 1,
      title: "Blonde Ambition Gloss",
      category: "hair",
      description:
        "Professional gloss treatment for salon-worthy blonde hair that enhances shine and tone.",
      price: "₹1,499",
      duration: "90 min",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details: {
        benefits: [
          "Enhances hair shine and vibrancy",
          "Reduces brassiness",
          "Conditions and strengthens hair",
        ],
        process: [
          "Consultation and strand test",
          "Custom color formulation",
          "Application and processing",
          "Rinse and finish with luxury products",
        ],
      },
    },
    {
      id: 2,
      title: "Bridal Makeup Package",
      category: "makeup",
      description:
        "Complete bridal transformation with trial session included for your perfect look.",
      price: "₹4,999",
      duration: "3-4 hours",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details: {
        benefits: [
          "HD camera-ready finish",
          "Long-lasting (12+ hours)",
          "Includes false lashes",
          "Trial session included",
        ],
        process: [
          "Skin prep and priming",
          "Color correction and foundation",
          "Contour and highlight",
          "Eye makeup and lashes",
          "Final setting and touch-ups",
        ],
      },
    },
    {
      id: 3,
      title: "Signature Facial",
      category: "skin",
      description:
        "Customized facial treatment with relaxing massage for glowing, rejuvenated skin.",
      price: "₹1,299",
      duration: "60 min",
      popular: true,
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details: {
        benefits: [
          "Deep cleansing",
          "Hydration boost",
          "Reduces fine lines",
          "Improves skin texture",
        ],
        process: [
          "Double cleanse",
          "Exfoliation",
          "Extractions (if needed)",
          "Massage with serum",
          "Mask application",
          "Moisturize and protect",
        ],
      },
    },
    {
      id: 4,
      title: "Full Body Waxing",
      category: "waxing",
      description:
        "Complete hair removal service using premium organic wax for smooth skin.",
      price: "₹2,499",
      duration: "90 min",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details: {
        benefits: [
          "Long-lasting results",
          "Reduces hair growth over time",
          "Exfoliates skin",
          "Less irritation than shaving",
        ],
        process: [
          "Skin analysis",
          "Pre-wax cleansing",
          "Professional wax application",
          "Post-wax soothing treatment",
        ],
      },
    },
    {
      id: 5,
      title: "Luxury Manicure & Pedicure",
      category: "nails",
      description:
        "Premium nail care treatment with massage, paraffin wax, and polish.",
      price: "₹1,799",
      duration: "120 min",
      image:
        "https://thumbs.dreamstime.com/b/french-manicure-pedicure-22262276.jpg", // ✅ new image
      details: {
        benefits: [
          "Hands and feet massage",
          "Cuticle treatment",
          "Paraffin wax therapy",
          "Long-lasting polish",
        ],
        process: [
          "Soak and cleanse",
          "Cuticle care",
          "Exfoliation",
          "Massage with hot stones",
          "Polish application",
        ],
      },
    },
    {
      id: 6,
      title: "Keratin Smoothing Treatment",
      category: "hair",
      description:
        "Professional smoothing treatment that reduces frizz and adds shine for up to 3 months.",
      price: "₹3,999",
      duration: "150 min",
      image:
        "https://cdn.shopify.com/s/files/1/0437/1021/8404/files/keratin_smoothing_treatment_before_and_after_2048x2048.webp?v=1718199628", // ✅ new image
      details: {
        benefits: [
          "Reduces 95% of frizz",
          "Lasts 3-4 months",
          "Safe for color-treated hair",
          "Adds intense shine",
        ],
        process: [
          "Hair analysis",
          "Cleansing with special shampoo",
          "Keratin application",
          "Heat sealing",
          "Final rinse and style",
        ],
      },
    },
  ];

  const filteredServices =
    activeFilter === "all"
      ? services
      : services.filter((service) => service.category === activeFilter);

  const toggleServiceExpand = (id: number) => {
    setExpandedService(expandedService === id ? null : id);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hair":
        return <Scissors className="w-5 h-5" />;
      case "makeup":
        return <Sparkles className="w-5 h-5" />;
      case "skin":
        return <User className="w-5 h-5" />;
      case "waxing":
        return <Heart className="w-5 h-5" />;
      case "nails":
        return <Smile className="w-5 h-5" />;
      default:
        return <CalendarCheck className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our Beauty Services
          </motion.h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of professional treatments designed
            to enhance your natural beauty
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="sticky top-0 z-10 bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex space-x-2 overflow-x-auto">
          {serviceCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full flex items-center whitespace-nowrap ${
                activeFilter === category.id
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {getCategoryIcon(category.id)}
              <span className="ml-2">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition border border-gray-100"
            >
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    POPULAR
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    {service.title}
                  </h3>
                  <div className="flex items-center bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                    {getCategoryIcon(service.category)}
                    <span className="ml-1 capitalize">{service.category}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-lg font-bold text-pink-600">
                      {service.price}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      • {service.duration}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleServiceExpand(service.id)}
                    className="text-pink-600 hover:text-pink-700 transition"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedService === service.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                <AnimatePresence>
                  {expandedService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-gray-100">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Award className="w-4 h-4 mr-2 text-pink-600" />
                            Benefits
                          </h4>
                          <ul className="space-y-1 text-gray-600">
                            {service.details.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-pink-500 mr-2">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-pink-600" />
                            Process
                          </h4>
                          <ol className="space-y-1 text-gray-600">
                            {service.details.process.map((step, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-gray-400 text-xs mr-2">
                                  {i + 1}.
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      navigate("/payment", { state: { amount: service.price } })
                    }
                    className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition shadow-md"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Our Salon
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing exceptional service and results
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-pink-600" />,
                title: "Hygienic Standards",
                description:
                  "Stringent sanitation protocols and disposable tools for your safety",
              },
              {
                icon: <Award className="w-8 h-8 text-pink-600" />,
                title: "Certified Experts",
                description:
                  "Our professionals are trained in the latest techniques and trends",
              },
              {
                icon: <Star className="w-8 h-8 text-pink-600" />,
                title: "Premium Products",
                description:
                  "We use only top-tier professional products for best results",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-700 to-purple-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Luxury Beauty?
          </h2>
          <p className="text-xl mb-8">
            Book your appointment today and let our experts enhance your natural
            beauty
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/book")}
            className="px-8 py-3 bg-white text-pink-700 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
          >
            Book Your Appointment
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default SalonServices;
