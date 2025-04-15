'use client';

import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function MapComponent({ onClickMap, location }) {
  const defaultCenter = { lat: 39.9208, lng: 32.8541 }; 
  const [position, setPosition] = useState(location || null);

  useEffect(() => {
    if (location) {
      setPosition(location);
    }
  }, [location]);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        onClickMap && onClickMap({ lat, lng });
      },
    });

    return position ? (
      <Marker position={[position.lat, position.lng]} icon={markerIcon} />
    ) : null;
  }

  return (
    <MapContainer
      center={position || defaultCenter}
      zoom={position ? 13 : 6}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
