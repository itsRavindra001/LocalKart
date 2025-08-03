import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  LayersControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Props = { onLocationSelect: (address: string) => void };

const markerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [35, 45],
  iconAnchor: [17, 45],
});

const MapPicker: React.FC<Props> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<[number, number]>([28.6139, 77.209]);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Autofocus the search input
    searchInputRef.current?.focus();

    // Try to get user's current location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setPosition([latitude, longitude]);
          reverseGeocode(latitude, longitude);
        },
        () => {
          // fallback to default if denied
          console.warn('Geolocation denied or failed');
        }
      );
    }
  }, []);

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
        if (!d.length) return alert('Location not found');
        const lat = +d[0].lat,
          lon = +d[0].lon;
        setPosition([lat, lon]);
        onLocationSelect(d[0].display_name || searchText);
      })
      .catch(() => alert('Search error'));
  };

  const handleCurrent = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition([coords.latitude, coords.longitude]);
        reverseGeocode(coords.latitude, coords.longitude);
      },
      () => alert('Unable to get location')
    );
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
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
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
        >
          🔍 Search
        </button>
        <button
          onClick={handleCurrent}
          className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
        >
          📍 Locate Me
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-[350px] rounded-xl border-2 border-blue-200 shadow-lg overflow-hidden z-0 relative">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
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
