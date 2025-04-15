'use client'

import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

// Varsayılan marker ikonunu düzelt (Leaflet CSS import edildiğinden emin ol!)
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function MapComponent({ onClickMap }) {
  const [position, setPosition] = useState(null);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        onClickMap({ lat, lng });
      },
    });

    return position ? (
      <Marker position={[position.lat, position.lng]} icon={markerIcon} />
    ) : null;
  }

  return (
    <MapContainer center={[39.9208, 32.8541]} zoom={6} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
