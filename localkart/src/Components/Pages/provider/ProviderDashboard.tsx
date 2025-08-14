import React, { useEffect, useMemo, useState } from "react";
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
  userId?: ClientInfo; // populated from backend
}

const statusColors: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<BookingStatus, string> = {
  pending: "⏳ Pending",
  confirmed: "✓ Confirmed",
  completed: "✔ Completed",
  cancelled: "✖ Cancelled",
};

const ORDERED_STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

const ProviderDashboard: React.FC = () => {
  const { userInfo } = useAuth();
  const username = userInfo?.username || localStorage.getItem("username") || "";
  const providerId = userInfo?._id || localStorage.getItem("userId") || "";
  const token = localStorage.getItem("token") || "";

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const idOrUsername = useMemo(
    () => (username?.trim() ? username.trim() : providerId?.trim()),
    [username, providerId]
  );

  useEffect(() => {
    const fetchBookings = async () => {
      // If we don't have required auth/identity, don't get stuck in loading.
      if (!token) {
        setError("You are not logged in. Token missing.");
        setLoading(false);
        return;
      }
      if (!idOrUsername) {
        setError("Provider identity not found (missing username/userId).");
        setLoading(false);
        return;
      }

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

    // Optimistic UI update
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
      // Roll back optimistic change
      setBookings((prev) => prev.map((b) => (b._id === id ? oldBooking : b)));
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleString();
  };

  const totalEarnings = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, booking) => sum + (booking.price || 0), 0);

  const bookingStats = ORDERED_STATUSES.reduce((acc, s) => {
    acc[s] = bookings.filter((b) => b.status === s).length;
    return acc;
  }, {} as Record<BookingStatus, number>);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {username || "Provider"} 👋
          </h1>
          <p className="text-gray-600">
            Manage your bookings, clients, and earnings from this dashboard.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <span className="text-green-600">$</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-semibold">
                ${Number.isFinite(totalEarnings) ? totalEarnings.toFixed(2) : "0.00"}
              </p>
            </div>
          </div>

          {ORDERED_STATUSES.map((status) => (
            <div key={status} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className={`p-3 rounded-full ${statusColors[status]} mr-4`}>
                {statusLabels[status].split(" ")[0]}
              </div>
              <div>
                <p className="text-sm text-gray-500 capitalize">{status} Bookings</p>
                <p className="text-2xl font-semibold">{bookingStats[status] || 0}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Bookings list */}
        {loading ? (
          <div className="p-6 text-center">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No bookings found for your services.
          </div>
        ) : (
          ORDERED_STATUSES.map((status) => {
            const list = bookings.filter((b) => b.status === status);
            return (
              <div key={status} className="bg-white shadow rounded-lg overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {statusLabels[status]} Bookings
                  </h2>
                </div>

                {list.length === 0 ? (
                  <div className="p-6 text-center text-gray-400 italic">
                    No {status} bookings.
                  </div>
                ) : (
                  list.map((booking) => (
                    <div key={booking._id} className="p-6 border-b last:border-none hover:bg-gray-50">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {booking.service}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}
                            >
                              {statusLabels[booking.status]}
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600 text-sm mb-2">
                            <span className="mr-2">📅</span>
                            {formatDate(booking.date)}
                          </div>

                          {typeof booking.price === "number" && (
                            <div className="flex items-center text-gray-800 font-medium mb-3">
                              <span className="mr-2">$</span>
                              ${Number.isFinite(booking.price) ? booking.price.toFixed(2) : "0.00"}
                            </div>
                          )}

                          {booking.userId && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                                <span className="mr-2">👤</span>
                                Client Information
                              </h4>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <span className="font-medium mr-1">Name:</span>
                                  {booking.userId.name}
                                </p>
                                <p>
                                  <span className="font-medium mr-1">Email:</span>
                                  <a
                                    href={`mailto:${booking.userId.email}`}
                                    className="text-blue-600 hover:underline"
                                  >
                                    {booking.userId.email}
                                  </a>
                                </p>
                                {booking.userId.phone && (
                                  <p>
                                    <span className="font-medium mr-1">Phone:</span>
                                    <a
                                      href={`tel:${booking.userId.phone}`}
                                      className="text-blue-600 hover:underline"
                                    >
                                      {booking.userId.phone}
                                    </a>
                                  </p>
                                )}
                                {booking.userId.address && (
                                  <p>
                                    <span className="font-medium mr-1">Address:</span>
                                    {booking.userId.address}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                          {booking.status !== "confirmed" && (
                            <button
                              aria-label={`Confirm booking ${booking._id}`}
                              disabled={updatingId === booking._id}
                              onClick={() => updateBookingStatus(booking._id, "confirmed")}
                              className={`px-3 py-1 text-sm rounded transition ${
                                updatingId === booking._id
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              }`}
                            >
                              {updatingId === booking._id ? "Updating..." : "Confirm"}
                            </button>
                          )}

                          {booking.status !== "completed" && (
                            <button
                              aria-label={`Complete booking ${booking._id}`}
                              disabled={updatingId === booking._id}
                              onClick={() => updateBookingStatus(booking._id, "completed")}
                              className={`px-3 py-1 text-sm rounded transition ${
                                updatingId === booking._id
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              }`}
                            >
                              {updatingId === booking._id ? "Updating..." : "Complete"}
                            </button>
                          )}

                          {booking.status !== "cancelled" && (
                            <button
                              aria-label={`Cancel booking ${booking._id}`}
                              disabled={updatingId === booking._id}
                              onClick={() => updateBookingStatus(booking._id, "cancelled")}
                              className={`px-3 py-1 text-sm rounded transition ${
                                updatingId === booking._id
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                              }`}
                            >
                              {updatingId === booking._id ? "Updating..." : "Cancel"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
