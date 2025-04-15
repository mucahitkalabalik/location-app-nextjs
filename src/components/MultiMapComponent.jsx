'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine'; 

const createMarkerIcon = (color) => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="41" viewBox="0 0 30 41">
      <circle cx="15" cy="15" r="6" fill="${color}" />
    </svg>
  `;
  const iconUrl = 'data:image/svg+xml;base64,' + btoa(svgIcon); 
  return new L.Icon({
    iconUrl,
    iconSize: [30, 41], 
    iconAnchor: [7.5, 20.5], 
    popupAnchor: [0, -34],
  });
};

export default function MultiMarkerMap() {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const [isClient, setIsClient] = useState(false);  // Tarayıcıda olup olmadığını kontrol etmek için bir state

  const mapRef = useRef(null);  

  useEffect(() => {
    // Tarayıcıda olup olmadığınızı kontrol ediyoruz
    setIsClient(typeof window !== 'undefined');

    // localStorage'dan veri alıyoruz
    const savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
    setLocations(savedLocations);
  }, []);

  useEffect(() => {
    // Eğer tarayıcıda isek, kullanıcı konumunu alıyoruz
    if (isClient && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, [isClient]);

  const handleMarkerClick = (loc) => {
    if (userLocation && mapRef.current) {
      if (routeControl) {
        routeControl.remove();
      }

      const newRouteControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lng), 
          L.latLng(loc.position.lat, loc.position.lng), 
        ],
        routeWhileDragging: true,
        createMarker: function() { return null; }, 
      }).addTo(mapRef.current); 

      setRouteControl(newRouteControl); 

      mapRef.current.fitBounds(newRouteControl.getBounds());
    } else {
      console.error("Harita referansı alınamadı.");
    }
  };

  const defaultCenter = { lat: 39.9208, lng: 32.8541 };
  const center = locations.length > 0 ? locations[0].position : defaultCenter;

  if (!isClient) {
    // Eğer sunucuda çalışıyorsak, haritayı render etmiyoruz
    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: '60vh', width: '100%' }}
      whenReady={(e) => { 
        mapRef.current = e.target; 
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={[loc.position.lat, loc.position.lng]}
          icon={createMarkerIcon(loc.color)}
          eventHandlers={{
            click: () => handleMarkerClick(loc),
          }}
        >
          <Popup>
            {loc.name} <br />
            Lat: {loc.position.lat}, Lng: {loc.position.lng}
          </Popup>
        </Marker>
      ))}

      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={createMarkerIcon("blue")} 
        >
          <Popup>Your Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
