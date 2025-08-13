// BookingPage.tsx
import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import MapPicker from "./MapPicker";

interface Provider {
  _id: string;
  username: string;
  name?: string;
  services?: string[];
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

const SERVICES = [
  "Plumbing", "Electrician", "AC Repair", "Salon at Home",
  "House Cleaning", "Painting", "Carpentry", "Pest Control",
  "Groceries", "Tutors", "Tailors",
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
  const [captcha, setCaptcha] = useState({ question: "", answer: 0 });
  const [loadingProviders, setLoadingProviders] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch logged-in user's name & email on mount (for prefill)
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string);
    generateCaptcha();

    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/bookings/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          // If 401/403/404 or other, just skip prefill
          console.warn("Could not fetch user details for booking prefill:", res.status);
          return;
        }

        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
          // phone intentionally NOT auto-filled — user types it manually
        }));
      } catch (err) {
        console.error("❌ Failed to load user data:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ question: `What is ${a} + ${b}?`, answer: a + b });
    setFormData((prev) => ({ ...prev, captcha: "" }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Name is required";
    if (!/^\d{10,15}$/.test(formData.phone)) return "Invalid phone number (10-15 digits)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email";
    if (!formData.service) return "Please select a service";
    if (!formData.providerId) return "Please select a provider";
    if (!formData.date) return "Please select a date";
    if (new Date(formData.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
      return "Date must be today or in the future";
    }
    if (!formData.address.trim()) return "Please enter an address";
    if (+formData.captcha !== captcha.answer) return "Incorrect CAPTCHA answer";
    return null;
  };

  const fetchProviders = async (service: string) => {
    setProviders([]);
    if (!service) return;
    setLoadingProviders(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/providers?service=${encodeURIComponent(service)}`
      );
      if (!res.ok) throw new Error(`Failed to fetch providers: ${res.status}`);
      const data = await res.json();
      setProviders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch providers:", err);
      setError("Failed to load providers. Please try again.");
    } finally {
      setLoadingProviders(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "service") {
      fetchProviders(value);
      setFormData((prev) => ({ ...prev, providerId: "" }));
    }
  };

  const handleLocationSelect = (address: string) => {
    setFormData((prev) => ({ ...prev, address }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login to book a service");

      // Send confirmation email (optional)
      await emailjs.send("service_lfwrs5j", "template_7ab41ra", {
        user_name: formData.name,
        user_phone: formData.phone,
        user_email: formData.email,
        user_service: formData.service,
        user_date: new Date(formData.date).toLocaleDateString(),
        user_address: formData.address,
      });

      // Save to database — include phone (from frontend)
      const dbRes = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          providerId: formData.providerId,
          service: formData.service,
          date: new Date(formData.date).toISOString(),
          address: formData.address,
          phone: formData.phone, // <-- IMPORTANT: include phone
        }),
      });

      if (!dbRes.ok) {
        const errorData = await dbRes.json().catch(() => ({}));
        throw new Error(errorData?.error || "Booking failed");
      }

      setSuccess(true);
      // keep name & email, clear booking-specific fields + phone optionally
      setFormData((prev) => ({
        ...prev,
        phone: "",      // user must re-enter phone next time
        service: "",
        date: "",
        address: "",
        providerId: "",
        captcha: "",
      }));
      setProviders([]);
      generateCaptcha();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit booking");
      console.error("Booking error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 py-12 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Form Section */}
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Book a Service</h2>
          <p className="text-gray-500 text-sm mb-8">Fill out the form and we'll confirm your booking shortly.</p>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">✅ Booking submitted successfully! We'll contact you shortly.</div>}

          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name - auto-filled and readOnly */}
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              />

              {/* Phone - manual entry */}
              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email - auto-filled and readOnly */}
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Service</option>
              {SERVICES.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>

            <select
              name="providerId"
              value={formData.providerId}
              onChange={handleChange}
              required
              disabled={!formData.service || loadingProviders || isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Provider</option>
              {loadingProviders ? (
                <option disabled>Loading providers...</option>
              ) : providers.length > 0 ? (
                providers.map((provider) => (
                  <option key={provider._id} value={provider._id}>
                    {provider.name || provider.username}
                    {provider.services && ` (${provider.services.join(", ")})`}
                  </option>
                ))
              ) : (
                formData.service && <option disabled>No providers found for this service</option>
              )}
            </select>

            <input
              name="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="address"
              rows={3}
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <div>
              <label className="block text-gray-600 font-medium mb-1">Human Verification: {captcha.question}</label>
              <input
                name="captcha"
                type="number"
                value={formData.captcha}
                onChange={handleChange}
                placeholder="Enter your answer"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Processing..." : "Book Now"}
            </button>
          </form>
        </div>

        {/* Map Picker Section */}
        <div className="bg-blue-50 flex items-center justify-center p-6 lg:p-10">
          <MapPicker onLocationSelect={handleLocationSelect} initialAddress={formData.address} disabled={isSubmitting} />
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
