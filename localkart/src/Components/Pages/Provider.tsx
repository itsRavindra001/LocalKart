import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Provider = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    city: "",
    experience: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [serviceSuggestions, setServiceSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Common services list
  const commonServices = [
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "AC Repair",
    "Home Cleaning",
    "Pest Control",
    "Appliance Repair",
    "Mason",
    "Gardener",
    "Tailor",
    "Beautician",
    "Driver",
    "Cook",
    "Personal Trainer",
    "Tutor",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "service") {
      if (value.length > 1) {
        const filtered = commonServices.filter((service) =>
          service.toLowerCase().includes(value.toLowerCase())
        );
        setServiceSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const selectService = (service: string) => {
    setFormData({ ...formData, service });
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/providers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to submit application");
      }

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        city: "",
        experience: "",
        about: "",
      });

      setTimeout(() => {
        navigate("/"); // redirect after success
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Join Our Network of{" "}
          <span className="text-blue-600">Trusted Professionals</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-6">
          Grow your business by connecting with customers in your area. Simple
          registration, more opportunities.
        </p>
        <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-blue-700 px-8 py-5">
            <h2 className="text-2xl font-bold text-white">
              Service Provider Application
            </h2>
            <p className="text-blue-100">Fill in your details to get started</p>
          </div>

          {/* Show success/error */}
          {success && (
            <div className="bg-green-100 text-green-700 p-3 text-center">
              ✅ Application submitted successfully! Redirecting...
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 text-center">
              ❌ {error}
            </div>
          )}

          {/* Form Body */}
          <div className="p-8 grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-medium"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1 relative">
              <label
                htmlFor="service"
                className="block text-gray-700 font-medium"
              >
                Service Offered
              </label>
              <input
                type="text"
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                autoComplete="off"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {showSuggestions && serviceSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {serviceSuggestions.map((service, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
                      onClick={() => selectService(service)}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label
                htmlFor="city"
                className="block text-gray-700 font-medium"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="experience"
                className="block text-gray-700 font-medium"
              >
                Years of Experience
              </label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label
                htmlFor="about"
                className="block text-gray-700 font-medium"
              >
                About Your Service
              </label>
              <textarea
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="md:col-span-2 pt-4">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="ml-2 text-gray-600 text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </form>

        {/* Additional Info */}
        <div className="text-center mt-8 text-gray-500">
          <p>
            Have questions?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact our support team
            </a>
          </p>
          <p className="mt-2 text-sm">
            We typically respond to applications within 2 business days
          </p>
        </div>
      </div>
    </div>
  );
};

export default Provider;
