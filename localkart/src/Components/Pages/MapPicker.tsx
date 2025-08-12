import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapPickerProps {
  onLocationSelect: (address: string) => void;
  initialAddress?: string;
  disabled?: boolean;
}

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [35, 45],
  iconAnchor: [17, 45],
});

const MapPicker: React.FC<MapPickerProps> = ({
  onLocationSelect,
  initialAddress,
  disabled = false,
}) => {
  const [position, setPosition] = useState<[number, number]>([28.6139, 77.209]);
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();

    // If initialAddress is provided, try geocoding it
    if (initialAddress) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          initialAddress
        )}`
      )
        .then((r) => r.json())
        .then((d) => {
          if (d.length) {
            const lat = +d[0].lat,
              lon = +d[0].lon;
            setPosition([lat, lon]);
            onLocationSelect(d[0].display_name || initialAddress);
          }
        })
        .catch(() => console.warn("Failed to geocode initial address"));
    } else {
      // Otherwise try to get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            setPosition([coords.latitude, coords.longitude]);
            reverseGeocode(coords.latitude, coords.longitude);
          },
          () => console.warn("Geolocation denied or failed")
        );
      }
    }
  }, [initialAddress]);

  const reverseGeocode = (lat: number, lon: number) =>
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    )
      .then((r) => r.json())
      .then((d) => onLocationSelect(d.display_name || `Lat:${lat},Lng:${lon}`))
      .catch(() => onLocationSelect(`Lat:${lat},Lng:${lon}`));

  const handleSearch = () => {
    if (!searchText.trim()) return;
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchText
      )}`
    )
      .then((r) => r.json())
      .then((d) => {
        if (!d.length) return alert("Location not found");
        const lat = +d[0].lat,
          lon = +d[0].lon;
        setPosition([lat, lon]);
        onLocationSelect(d[0].display_name || searchText);
      })
      .catch(() => alert("Search error"));
  };

  const handleCurrent = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition([coords.latitude, coords.longitude]);
        reverseGeocode(coords.latitude, coords.longitude);
      },
      () => alert("Unable to get location")
    );
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        if (disabled) return; // prevent marker move when disabled
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        reverseGeocode(lat, lng);
      },
    });
    return <Marker position={position} icon={markerIcon} />;
  };

  const MapRefresher = () => {
    const map = useMap();
    map.setView(position, map.getZoom());
    return null;
  };

  return (
    <div className="space-y-4 w-full relative z-0">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-2 z-10">
        <input
          ref={searchInputRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search location…"
          disabled={disabled}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={disabled}
          className={`px-4 py-2 rounded-md text-sm text-white transition ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          🔍 Search
        </button>
        <button
          onClick={handleCurrent}
          disabled={disabled}
          className={`px-4 py-2 rounded-md text-sm text-white transition ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          📍 Locate Me
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-[350px] rounded-xl border-2 border-blue-200 shadow-lg overflow-hidden z-0 relative">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={!disabled}
          style={{ height: "100%", width: "100%" }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Street">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles © Esri"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <MapRefresher />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPicker;
