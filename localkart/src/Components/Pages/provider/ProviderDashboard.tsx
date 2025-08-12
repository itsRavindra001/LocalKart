import React, { useEffect, useState } from "react";
import { useAuth } from "../../../Contexts/AuthContext";

interface ClientInfo {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface Booking {
  _id: string;
  service: string;
  date: string;
  status?: string;
  clientId?: ClientInfo; // Ensure this is the correct field for client details
}

const ProviderDashboard: React.FC = () => {
  const { userInfo } = useAuth();
  const username: string | null =
    userInfo?.username || localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchBookings = async () => {
      if (!username || !token) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/bookings/${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [username, token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {username || "Provider"} 👋
        </h1>
        <p className="text-gray-600 mb-6">
          This is your provider dashboard. From here, you can manage your
          services, view bookings, and track your earnings.
        </p>

        {/* Bookings Section */}
        <div className="bg-white shadow rounded-lg p-5 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            My Bookings
          </h2>
          {loading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p> // Display error message
          ) : bookings.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {bookings.map((b) => (
                <li key={b._id} className="py-3">
                  <p className="font-semibold">{b.service}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(b.date).toLocaleDateString()}{" "}
                    {b.status && (
                      <>
                        | Status: <span className="capitalize">{b.status}</span>
                      </>
                    )}
                  </p>

                  {b.clientId && (
                    <div className="mt-2 text-sm text-gray-500">
                      <p>
                        <strong>Client:</strong> {b.clientId.name} (
                        {b.clientId.email})
                      </p>
                      {b.clientId.phone && (
                        <p>
                          <strong>Phone:</strong> {b.clientId.phone}
                        </p>
                      )}
                      {b.clientId.address && (
                        <p>
                          <strong>Address:</strong> {b.clientId.address}
                        </p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found for your services.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
