// BookingPage.tsx
import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import MapPicker from "./MapPicker";
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

// authoritative service list & prices (frontend display only; backend enforces prices)
const SERVICES = [
  { name: "Plumbing", price: 250, icon: "🛠️" },
  { name: "Electrician", price: 300, icon: "⚡" },
  { name: "AC Repair", price: 500, icon: "❄️" },
  { name: "Salon at Home", price: 400, icon: "✂️" },
  { name: "House Cleaning", price: 350, icon: "🧹" },
  { name: "Painting", price: 450, icon: "🎨" },
  { name: "Carpentry", price: 300, icon: "🪚" },
  { name: "Pest Control", price: 600, icon: "🐜" },
  { name: "Tutors", price: 200, icon: "📚" },
  { name: "Tailors", price: 150, icon: "🧵" },
];

const BookingPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    address: "",
    providerId: "",
    captcha: "",
  });

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [captcha, setCaptcha] = useState({ question: "", answer: 0 });
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string);
    generateCaptcha();
    fetchUserDetails();
  }, []);

  // Prefill name/email/phone if backend returns user info
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
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!/^\d{10,15}$/.test(formData.phone))
      return "Enter a valid phone number (10–15 digits).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Enter a valid email address.";
    if (!formData.service) return "Please choose a service.";
    if (!formData.providerId) return "Please choose a provider.";
    if (!formData.date) return "Please select a date.";
    if (
      new Date(formData.date).setHours(0, 0, 0, 0) <
      new Date().setHours(0, 0, 0, 0)
    )
      return "Date cannot be in the past.";
    if (!formData.address.trim()) return "Please enter a service address.";
    if (Number(formData.captcha) !== captcha.answer)
      return "Captcha answer is incorrect.";
    return null;
  };

  // Fetch providers for selected service
  const fetchProviders = async (service: string) => {
    setProviders([]);
    setSelectedProvider(null);
    if (!service) return;
    setLoadingProviders(true);
    try {
      const res = await fetch(
        `/api/providers?service=${encodeURIComponent(service)}`
      );
      if (!res.ok) throw new Error("Failed to load providers");
      const data = await res.json();
      setProviders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Unable to load providers — please try again.");
    } finally {
      setLoadingProviders(false);
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    setFormData((prev) => ({ ...prev, service: serviceName, providerId: "" }));
    fetchProviders(serviceName);
    setError(null);
  };

  const handleProviderSelect = (id: string) => {
    setFormData((prev) => ({ ...prev, providerId: id }));
    const p = providers.find((x) => x._id === id) || null;
    setSelectedProvider(p);
    setError(null);
  };

  const handleLocationSelect = (address: string) => {
    setFormData((prev) => ({ ...prev, address }));
  };

  const getServicePrice = () => {
    const svc = SERVICES.find((s) => s.name === formData.service);
    return svc ? svc.price : 0;
  };

  // create a slug/key that matches backend service keys (lowercase, hyphenated)
  const serviceToKey = (serviceName: string) => {
    return serviceName
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // Load Razorpay script helper
  const loadRazorpayScript = () => {
    return new Promise<void>((resolve, reject) => {
      if ((window as any).Razorpay) return resolve();
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(script);
    });
  };

  // Main payment + booking flow (calls backend endpoints under /api/bookings)
  const handlePaymentAndBooking = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in to continue.");

      // Use frontend price only for display and double-check; backend is authoritative.
      const servicePrice = getServicePrice();
      if (!servicePrice || servicePrice <= 0) {
        throw new Error("Invalid service price");
      }

      // create order on backend - send normalized service key
      const serviceKey = serviceToKey(formData.service);

      const orderResp = await fetch("/api/bookings/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ service: serviceKey }), // backend looks up price
      });

      if (!orderResp.ok) {
        const errorData = await orderResp.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "Payment init failed");
      }

      const orderJson = await orderResp.json();
      // expected: { success: true, orderId, amount, currency, key }
      const { orderId, amount, currency, key } = orderJson;

      if (!orderId || !key || !amount) throw new Error("Payment service unavailable");

      // amount is in paise from backend — verify matches frontend expected paise
      const expectedPaise = Math.round(servicePrice * 100);
      if (amount !== expectedPaise) {
        // don't open checkout if mismatch; safer to surface an error
        throw new Error("Price mismatch with server. Please try again.");
      }

      // load SDK if needed
      await loadRazorpayScript();

      const options: any = {
        key, // key from backend response (process.env.RAZORPAY_KEY_ID)
        amount, // paise
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
            setError("Payment was cancelled");
          },
        },
        handler: async (razorpayResponse: any) => {
          try {
            // call backend verify endpoint (backend will validate HMAC and create booking)
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
                amount: amount / 100, // send rupees for record
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

            // backend created booking and returned it
            const booking = verifyJson.booking;
            setSuccess(true);
            setBookingRef(booking._id || booking.id || null);

            // keep name/email, reset other fields
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
            setError(err.message || "Payment completed but verification failed");
          } finally {
            setIsSubmitting(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    await handlePaymentAndBooking();
  };

  // small helpers
  const selectedPrice = getServicePrice();

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Book a Service</h1>
            <p className="text-sm text-gray-500 mt-1">
              Quick — pick a service, select a provider, choose date & location.
            </p>
          </header>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 flex items-start gap-3">
              <FiAlertCircle className="text-red-500 mt-0.5" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          {!success ? (
            <>
              {/* Service picker as buttons (fast selection) */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Choose a service</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SERVICES.map((svc) => (
                    <button
                      key={svc.name}
                      type="button"
                      onClick={() => handleServiceSelect(svc.name)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-sm transition ${
                        formData.service === svc.name ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-indigo-300"
                      }`}
                      aria-pressed={formData.service === svc.name}
                    >
                      <div className="text-2xl">{svc.icon}</div>
                      <div className="font-medium text-gray-800">{svc.name}</div>
                      <div className="text-xs text-gray-600">₹{svc.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Provider list (appears after service select) */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Pick a provider</h3>
                {loadingProviders ? (
                  <div className="py-6 flex items-center justify-center text-gray-500">
                    <FiLoader className="animate-spin mr-2" />Loading providers...
                  </div>
                ) : providers.length === 0 ? (
                  <div className="text-sm text-gray-500 py-4">No providers loaded. Select a service to load providers.</div>
                ) : (
                  <div className="space-y-3">
                    {providers.map((p) => (
                      <div key={p._id} className={`p-3 rounded-lg border flex items-center justify-between ${formData.providerId === p._id ? "border-indigo-600 bg-indigo-50" : "border-gray-200"}`}>
                        <div>
                          <div className="font-medium">{p.name || p.username}</div>
                          <div className="text-xs text-gray-500">{p.experience ? `${p.experience} yrs` : ""} {p.rating ? `• ⭐ ${p.rating}` : ""}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleProviderSelect(p._id)}
                            className="px-3 py-1 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Booking details form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <div className="text-sm text-gray-700 mb-1">Full name</div>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 text-gray-400" />
                      <input
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 border rounded-md"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <div className="text-sm text-gray-700 mb-1">Phone</div>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-3 text-gray-400" />
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 border rounded-md"
                        placeholder="10–15 digits"
                        required
                      />
                    </div>
                  </label>
                </div>

                <label className="block">
                  <div className="text-sm text-gray-700 mb-1">Email</div>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-3 py-2 border rounded-md"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <div className="text-sm text-gray-700 mb-1">Service date</div>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                      <input
                        name="date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.date}
                        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 border rounded-md"
                        required
                      />
                    </div>
                  </label>

                  <label className="block">
                    <div className="text-sm text-gray-700 mb-1">Quick captcha</div>
                    <div className="relative">
                      <FiRotateCw className="absolute left-3 top-3 text-gray-400" />
                      <input
                        name="captcha"
                        type="number"
                        value={formData.captcha}
                        onChange={(e) => setFormData((prev) => ({ ...prev, captcha: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 border rounded-md"
                        placeholder={captcha.question}
                        required
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center justify-between">
                      <span>{captcha.question}</span>
                      <button type="button" onClick={generateCaptcha} className="text-blue-600 text-xs">Regenerate</button>
                    </div>
                  </label>
                </div>

                <label className="block">
                  <div className="text-sm text-gray-700 mb-1">Service address</div>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      className="w-full pl-10 pr-3 py-2 border rounded-md resize-none"
                      placeholder="Full address with landmark"
                      required
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Or pick on the map below</div>
                </label>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md"
                  >
                    {isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <span>Pay ₹{selectedPrice} & Confirm Booking</span>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            // success UI
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Booking Confirmed</h3>
              <p className="text-sm text-gray-600 mb-4">We've saved your booking and sent a confirmation to {formData.email}.</p>
              {bookingRef && <div className="text-xs text-gray-500 mb-4">Reference: {bookingRef}</div>}
              <button
                onClick={() => {
                  setSuccess(false);
                  setError(null);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Book another service
              </button>
            </div>
          )}

          {/* Map picker (always present) */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Pick location (optional)</h4>
            <div className="h-56 rounded-md overflow-hidden border">
              <MapPicker onLocationSelect={handleLocationSelect} initialAddress={formData.address} disabled={isSubmitting} />
            </div>
          </div>
        </div>

        {/* Summary panel */}
        <aside className="bg-white rounded-xl shadow p-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Booking summary</h4>

          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <div className="text-xs text-gray-500">Service</div>
              <div className="font-medium">{formData.service || "—"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Provider</div>
              <div className="font-medium">{selectedProvider?.name || selectedProvider?.username || (formData.providerId ? "Selected" : "—")}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Date</div>
              <div className="font-medium">{formData.date ? new Date(formData.date).toLocaleDateString() : "—"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Address</div>
              <div className="font-medium break-words">{formData.address || "—"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Amount</div>
              <div className="text-xl font-semibold">₹{selectedPrice}</div>
            </div>
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="text-xs text-gray-500">Need help?</div>
            <div className="text-sm text-gray-700">Contact support or check provider details before confirming.</div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BookingPage;
