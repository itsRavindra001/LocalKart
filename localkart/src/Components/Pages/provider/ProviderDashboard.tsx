import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

interface ClientInfo {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

interface Booking {
  _id: string;
  service: string;
  date: string;
  price: number;
  status: BookingStatus;
  userId?: ClientInfo;
}

const statusColors: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
};

const statusIcons: Record<BookingStatus, JSX.Element> = {
  pending: <span className="text-amber-500">⏳</span>,
  confirmed: <span className="text-blue-500">✓</span>,
  completed: <span className="text-emerald-500">✔</span>,
  cancelled: <span className="text-rose-500">✖</span>,
};

const statusLabels: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const ORDERED_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

const ProviderDashboard: React.FC = () => {
  const { userInfo, token, setUserInfo } = useAuth();
  const navigate = useNavigate();

  const username = userInfo?.username || localStorage.getItem("username") || "";
  const providerId = userInfo?._id || localStorage.getItem("userId") || "";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<BookingStatus | "all">("all");

  const idOrUsername = useMemo(
    () => (username?.trim() ? username.trim() : providerId?.trim()),
    [username, providerId]
  );

  // ✅ Restore user from localStorage if context empty
  useEffect(() => {
    if (!userInfo) {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        try {
          setUserInfo(JSON.parse(storedUser));
        } catch {
          console.error("Invalid userInfo in localStorage");
        }
      }
    }
  }, [userInfo, setUserInfo]);

  // ✅ Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // ✅ Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !idOrUsername) return;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookings/provider/${encodeURIComponent(
            idOrUsername
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Failed to fetch bookings: ${res.status} ${text}`);
        }

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [idOrUsername, token]);

  const updateBookingStatus = async (id: string, newStatus: BookingStatus) => {
    if (!token) {
      setError("Unauthorized: token missing");
      return;
    }

    setError(null);
    setUpdatingId(id);

    const oldBooking = bookings.find((b) => b._id === id);
    if (!oldBooking) {
      setError("Booking not found");
      setUpdatingId(null);
      return;
    }

    // Optimistic update
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
    );

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${encodeURIComponent(id)}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`Failed to update booking status: ${res.status} ${body}`);
      }

      const updated = await res.json().catch(() => null);
      if (updated && updated._id) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, ...(updated as Partial<Booking>) } : b))
        );
      }
    } catch (err) {
      console.error("Error updating booking status:", err);
      setBookings((prev) => prev.map((b) => (b._id === id ? oldBooking : b)));
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // FIXED: Total earnings calculation - ensure we're correctly filtering and summing
  const totalEarnings = useMemo(() => {
    return bookings
      .filter((b) => b.status.toLowerCase() === "completed")
      .reduce((sum, booking) => sum + (Number(booking.price) || 0), 0);
  }, [bookings]);

  const bookingStats = ORDERED_STATUSES.reduce((acc, s) => {
    acc[s] = bookings.filter((b) => b.status === s).length;
    return acc;
  }, {} as Record<BookingStatus, number>);

  const filteredBookings = activeStatus === "all" 
    ? bookings 
    : bookings.filter(b => b.status === activeStatus);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {username || "Provider"}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your bookings, clients, and earnings from this dashboard.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-indigo-50 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${Number.isFinite(totalEarnings) ? totalEarnings.toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
          </div>

          {ORDERED_STATUSES.map((status) => (
            <div key={status} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${statusColors[status]} mr-4`}>
                  {statusIcons[status]}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{statusLabels[status]}</p>
                  <p className="text-2xl font-bold text-gray-900">{bookingStats[status] || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
            
            {/* Status Filter */}
            <div className="mt-3 sm:mt-0 flex space-x-2">
              <button
                onClick={() => setActiveStatus("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${activeStatus === "all" ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}
              >
                All
              </button>
              {ORDERED_STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${activeStatus === status ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {statusLabels[status]}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings list */}
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Loading bookings...</span>
              </div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeStatus === "all" 
                  ? "Get started by creating your first service." 
                  : `No ${activeStatus} bookings at the moment.`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {booking.service}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                              {statusIcons[booking.status]}
                              <span className="ml-1">{statusLabels[booking.status]}</span>
                            </span>
                            <span className="ml-3 text-sm text-gray-500">
                              {formatDate(booking.date)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            ${Number.isFinite(booking.price) ? booking.price.toFixed(2) : "0.00"}
                          </div>
                        </div>
                      </div>

                      {booking.userId && (
                        <div className="bg-gray-50 p-4 rounded-lg mt-4">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Client Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Name</p>
                              <p className="font-medium text-gray-900">{booking.userId.name}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Email</p>
                              <a
                                href={`mailto:${booking.userId.email}`}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                {booking.userId.email}
                              </a>
                            </div>
                            {booking.userId.phone && (
                              <div>
                                <p className="text-gray-500">Phone</p>
                                <a
                                  href={`tel:${booking.userId.phone}`}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  {booking.userId.phone}
                                </a>
                              </div>
                            )}
                            {booking.userId.address && (
                              <div>
                                <p className="text-gray-500">Address</p>
                                <p className="font-medium text-gray-900">{booking.userId.address}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 justify-end">
                      {booking.status !== "confirmed" && booking.status !== "cancelled" && (
                        <button
                          disabled={updatingId === booking._id}
                          onClick={() => updateBookingStatus(booking._id, "confirmed")}
                          className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${updatingId === booking._id
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          }`}
                        >
                          {updatingId === booking._id ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing
                            </>
                          ) : (
                            "Confirm"
                          )}
                        </button>
                      )}

                      {booking.status !== "completed" && booking.status !== "cancelled" && (
                        <button
                          disabled={updatingId === booking._id}
                          onClick={() => updateBookingStatus(booking._id, "completed")}
                          className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${updatingId === booking._id
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          Complete
                        </button>
                      )}

                      {booking.status !== "cancelled" && (
                        <button
                          disabled={updatingId === booking._id}
                          onClick={() => updateBookingStatus(booking._id, "cancelled")}
                          className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${updatingId === booking._id
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                          }`}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;