// BookingPage.tsx
import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import MapPicker from "./MapPicker";
import { Link, useLocation } from "react-router-dom";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiPhone,
  FiMail,
  FiRotateCw,
  FiStar,
  FiClock,
  FiCheck,
} from "react-icons/fi";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Provider {
  _id: string;
  username: string;
  name?: string;
  services?: string[];
  rating?: number;
  experience?: number;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  address: string;
  providerId: string;
  captcha: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  providerId?: string;
  date?: string;
  address?: string;
  captcha?: string;
  general?: string;
}

const SERVICES = [
  { name: "Plumbing", price: 250, icon: "🛠️", color: "bg-blue-100 text-blue-800" },
  { name: "Electrician", price: 300, icon: "⚡", color: "bg-yellow-100 text-yellow-800" },
  { name: "AC Repair", price: 500, icon: "❄️", color: "bg-cyan-100 text-cyan-800" },
  { name: "Salon at Home", price: 400, icon: "✂️", color: "bg-pink-100 text-pink-800" },
  { name: "House Cleaning", price: 350, icon: "🧹", color: "bg-green-100 text-green-800" },
  { name: "Painting", price: 450, icon: "🎨", color: "bg-purple-100 text-purple-800" },
  { name: "Carpentry", price: 300, icon: "🪚", color: "bg-amber-100 text-amber-800" },
  { name: "Pest Control", price: 600, icon: "🐜", color: "bg-red-100 text-red-800" },
  { name: "Tutors", price: 200, icon: "📚", color: "bg-indigo-100 text-indigo-800" },
  { name: "Tailors", price: 150, icon: "🧵", color: "bg-teal-100 text-teal-800" },
];

const BookingPage: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: location.state?.serviceName || "",
    date: "",
    address: "",
    providerId: "",
    captcha: "",
  });

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [captcha, setCaptcha] = useState({ question: "", answer: 0 });
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [showServiceSelection, setShowServiceSelection] = useState(!location.state?.serviceName);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string);
    generateCaptcha();
    fetchUserDetails();

    // If service is pre-selected from navigation, load providers
    if (location.state?.serviceName) {
      fetchProviders(location.state.serviceName);
    }
  }, [location.state]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("/api/bookings/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        name: data.name || prev.name,
        email: data.email || prev.email,
        phone: data.phone || prev.phone,
      }));
    } catch (err) {
      console.warn("Could not prefill user details:", err);
    }
  };

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 8) + 1;
    const b = Math.floor(Math.random() * 8) + 1;
    setCaptcha({ question: `${a} + ${b} = ?`, answer: a + b });
    setFormData((prev) => ({ ...prev, captcha: "" }));
    setErrors((prev) => ({ ...prev, captcha: undefined }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!/^\d{10,15}$/.test(formData.phone)) newErrors.phone = "Enter a valid phone number (10-15 digits)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!formData.service) newErrors.service = "Please choose a service";
    if (!formData.providerId) newErrors.providerId = "Please choose a provider";
    if (!formData.date) newErrors.date = "Please select a date";
    else if (new Date(formData.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.date = "Date cannot be in the past";
    }
    if (!formData.address.trim()) newErrors.address = "Please enter a service address";
    if (Number(formData.captcha) !== captcha.answer) newErrors.captcha = "Captcha answer is incorrect";
    return newErrors;
  };

  const fetchProviders = async (service: string) => {
    setProviders([]);
    setSelectedProvider(null);
    if (!service) return;
    setLoadingProviders(true);
    try {
      const res = await fetch(`/api/providers?service=${encodeURIComponent(service)}`);
      if (!res.ok) throw new Error("Failed to load providers");
      const data = await res.json();
      setProviders(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrors({ general: "Unable to load providers — please try again." });
    } finally {
      setLoadingProviders(false);
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    setFormData((prev) => ({ ...prev, service: serviceName, providerId: "" }));
    fetchProviders(serviceName);
    setErrors((prev) => ({ ...prev, service: undefined, general: undefined }));
    setShowServiceSelection(false);
  };

  const handleProviderSelect = (id: string) => {
    setFormData((prev) => ({ ...prev, providerId: id }));
    const p = providers.find((x) => x._id === id) || null;
    setSelectedProvider(p);
    setErrors((prev) => ({ ...prev, providerId: undefined }));
  };

  const handleLocationSelect = (address: string) => {
    setFormData((prev) => ({ ...prev, address }));
    setErrors((prev) => ({ ...prev, address: undefined }));
  };

  const getServicePrice = () => {
    const svc = SERVICES.find((s) => s.name === formData.service);
    return svc ? svc.price : 0;
  };

  const serviceToKey = (serviceName: string) => {
    return serviceName
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const loadRazorpayScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.Razorpay) return resolve();
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(script);
    });
  };

  const handlePaymentAndBooking = async () => {
    setErrors({});
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in to continue.");

      const servicePrice = getServicePrice();
      if (!servicePrice || servicePrice <= 0) {
        throw new Error("Invalid service price");
      }

      const serviceKey = serviceToKey(formData.service);

      const orderResp = await fetch("/api/bookings/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ service: serviceKey }),
      });

      if (!orderResp.ok) {
        const errorData = await orderResp.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "Payment init failed");
      }

      const orderJson = await orderResp.json();
      const { orderId, amount, currency, key } = orderJson;

      if (!orderId || !key || !amount) throw new Error("Payment service unavailable");

      const expectedPaise = Math.round(servicePrice * 100);
      if (amount !== expectedPaise) {
        throw new Error("Price mismatch with server. Please try again.");
      }

      await loadRazorpayScript();

      const options: any = {
        key,
        amount,
        currency: currency || "INR",
        name: "LocalKart",
        description: `${formData.service} booking`,
        order_id: orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#4f46e5" },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            setErrors({ general: "Payment was cancelled" });
          },
        },
        handler: async (razorpayResponse: any) => {
          try {
            const verifyResp = await fetch("/api/bookings/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                providerId: formData.providerId,
                service: serviceKey,
                date: new Date(formData.date).toISOString(),
                address: formData.address,
                phone: formData.phone,
                amount: amount / 100,
              }),
            });

            if (!verifyResp.ok) {
              const errData = await verifyResp.json().catch(() => ({}));
              throw new Error(errData.error || errData.message || "Payment verification failed");
            }

            const verifyJson = await verifyResp.json();
            if (!verifyJson.success) {
              throw new Error(verifyJson.error || "Payment not verified");
            }

            const booking = verifyJson.booking;
            setSuccess(true);
            setBookingRef(booking._id || booking.id || null);

            setFormData((prev) => ({
              ...prev,
              phone: "",
              service: "",
              date: "",
              address: "",
              providerId: "",
              captcha: "",
            }));
            setProviders([]);
            setSelectedProvider(null);
            generateCaptcha();
          } catch (err: any) {
            console.error("Post-payment error:", err);
            setErrors({ general: err.message || "Payment completed but verification failed" });
          } finally {
            setIsSubmitting(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment error:", err);
      setErrors({ general: err.message || "Payment failed. Please try again." });
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await handlePaymentAndBooking();
  };

  const selectedPrice = getServicePrice();

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Book a Service</h1>
              <p className="text-gray-600 mt-2">
                Quick — pick a service, select a provider, choose date & location.
              </p>
            </header>

            {errors.general && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-700">{errors.general}</div>
              </div>
            )}

            {!success ? (
              <>
                {showServiceSelection ? (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose a service</h3>
                    {errors.service && <div className="text-sm text-red-500 mb-2">{errors.service}</div>}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {SERVICES.map((svc) => (
                        <button
                          key={svc.name}
                          type="button"
                          onClick={() => handleServiceSelect(svc.name)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                            formData.service === svc.name 
                              ? `border-indigo-600 ${svc.color.replace('text', 'bg')} shadow-md` 
                              : "border-gray-200 hover:border-indigo-300 hover:shadow-sm"
                          }`}
                          aria-pressed={formData.service === svc.name}
                        >
                          <div className="text-3xl">{svc.icon}</div>
                          <div className="font-medium text-gray-800 text-sm">{svc.name}</div>
                          <div className="text-xs font-semibold text-gray-600">₹{svc.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        SERVICES.find(s => s.name === formData.service)?.color || 'bg-gray-100'
                      }`}>
                        {SERVICES.find(s => s.name === formData.service)?.icon || '🛠️'}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{formData.service}</div>
                        <div className="text-sm text-gray-600">₹{selectedPrice}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowServiceSelection(true)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Change
                    </button>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Your Provider</h3>
                  {errors.providerId && <div className="text-sm text-red-500 mb-2">{errors.providerId}</div>}
                  {loadingProviders ? (
                    <div className="py-8 flex flex-col items-center justify-center text-gray-500">
                      <FiLoader className="animate-spin text-2xl mb-2" />
                      <span>Loading available providers...</span>
                    </div>
                  ) : providers.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <div className="text-gray-500 mb-2">
                        {formData.service 
                          ? "No providers available for this service" 
                          : "Select a service to see available providers"}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {providers.map((p) => (
                        <div 
                          key={p._id} 
                          className={`p-4 rounded-xl border-2 transition-all ${formData.providerId === p._id ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="font-semibold text-gray-800">{p.name || p.username}</div>
                              <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                                {p.rating && (
                                  <span className="flex items-center gap-1">
                                    <FiStar className="text-yellow-500" />
                                    {p.rating.toFixed(1)}
                                  </span>
                                )}
                                {p.experience && (
                                  <span className="flex items-center gap-1">
                                    <FiClock />
                                    {p.experience} yrs exp
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleProviderSelect(p._id)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                formData.providerId === p._id
                                  ? "bg-indigo-600 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {formData.providerId === p._id ? (
                                <span className="flex items-center gap-1">
                                  <FiCheck size={16} /> Selected
                                </span>
                              ) : "Select"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Full name</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, name: e.target.value }));
                            setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          className={`block w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:ring-2 focus:outline-none transition`}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Phone number</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="text-gray-400" />
                        </div>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, phone: e.target.value }));
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }}
                          className={`block w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:ring-2 focus:outline-none transition`}
                          placeholder="10–15 digits"
                          required
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </label>
                  </div>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Email address</span>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, email: e.target.value }));
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`block w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:ring-2 focus:outline-none transition`}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Service date</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiCalendar className="text-gray-400" />
                        </div>
                        <input
                          name="date"
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.date}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, date: e.target.value }));
                            setErrors((prev) => ({ ...prev, date: undefined }));
                          }}
                          className={`block w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.date ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:ring-2 focus:outline-none transition`}
                          required
                        />
                      </div>
                      {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                    </label>

                    <label className="block">
                      <span className="block text-sm font-medium text-gray-700 mb-1">Quick captcha</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiRotateCw className="text-gray-400" />
                        </div>
                        <input
                          name="captcha"
                          type="number"
                          value={formData.captcha}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, captcha: e.target.value }));
                            setErrors((prev) => ({ ...prev, captcha: undefined }));
                          }}
                          className={`block w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.captcha ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:ring-2 focus:outline-none transition`}
                          placeholder={captcha.question}
                          required
                        />
                        <button 
                          type="button" 
                          onClick={generateCaptcha}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-600 hover:text-indigo-800"
                        >
                          <FiRotateCw className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500">{captcha.question}</span>
                        {errors.captcha && <span className="text-xs text-red-600">{errors.captcha}</span>}
                      </div>
                    </label>
                  </div>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-1">Service address</span>
                    <div className="relative">
                      <div className="absolute top-3 left-3">
                        <FiMapPin className="text-gray-400" />
                      </div>
                      <textarea
                        name="address"
                        rows={3}
                        value={formData.address}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, address: e.target.value }));
                          setErrors((prev) => ({ ...prev, address: undefined }));
                        }}
                        className={`block w-full pl-10 pr-3 py-2.5 rounded-lg border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:ring-2 focus:outline-none transition resize-none`}
                        placeholder="Full address with landmark"
                        required
                      />
                    </div>
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    <p className="mt-1 text-xs text-gray-500">Or pick on the map below</p>
                  </label>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <FiLoader className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Pay ₹{selectedPrice} & Confirm Booking</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Pick location (optional)</h4>
                  <div className="h-64 rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                    <MapPicker onLocationSelect={handleLocationSelect} initialAddress={formData.address} disabled={isSubmitting} />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <FiCheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We've saved your booking and sent a confirmation to <span className="font-medium">{formData.email}</span>.
                </p>
                {bookingRef && (
                  <div className="bg-gray-50 inline-block px-4 py-2 rounded-lg mb-6">
                    <div className="text-xs text-gray-500">Reference ID</div>
                    <div className="font-mono text-sm font-medium">{bookingRef}</div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setSuccess(false);
                    setErrors({});
                    setShowServiceSelection(true);
                  }}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Book another service
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="sticky top-4 h-fit">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">Booking Summary</h4>

            <div className="space-y-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Service</div>
                {formData.service ? (
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      SERVICES.find(s => s.name === formData.service)?.color || 'bg-gray-100'
                    }`}>
                      {SERVICES.find(s => s.name === formData.service)?.icon || '🛠️'}
                    </div>
                    <div>
                      <div className="font-semibold">{formData.service}</div>
                      <div className="text-sm text-gray-600">₹{selectedPrice}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 italic">Not selected</div>
                )}
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Provider</div>
                {selectedProvider ? (
                  <div className="font-semibold">{selectedProvider.name || selectedProvider.username}</div>
                ) : formData.providerId ? (
                  <div className="text-indigo-600">Provider selected</div>
                ) : (
                  <div className="text-gray-400 italic">Not selected</div>
                )}
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Date</div>
                {formData.date ? (
                  <div className="font-semibold">{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                ) : (
                  <div className="text-gray-400 italic">Not selected</div>
                )}
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Address</div>
                {formData.address ? (
                  <div className="font-medium text-gray-800 break-words">{formData.address}</div>
                ) : (
                  <div className="text-gray-400 italic">Not provided</div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Total Amount</div>
                  <div className="text-2xl font-bold text-gray-900">₹{selectedPrice}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Need help?</h5>
              <p className="text-sm text-gray-600 mb-3">
                Contact our support team for any assistance with your booking.
              </p>
              <Link
                to="/contact"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BookingPage;