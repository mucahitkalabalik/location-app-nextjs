"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { createMarkerIcon, defaultCenter } from "@/utils/mapUtils";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

export default function MultiMarkerMap() {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const mapRef = useRef(null);
  const routingRef = useRef(null);

  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    setLocations(savedLocations);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  const handleMarkerClick = (loc) => {
    if (!userLocation || !mapRef.current) {
      console.error("Kullanıcı konumu veya harita mevcut değil.");
      return;
    }
  
    // Önceki rotayı temizle
    if (routingRef.current) {
      routingRef.current.remove();
      routingRef.current = null;
    }
  
    setLoading(true); // Start loading
  
    const control = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(loc.position.lat, loc.position.lng),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null,
      show: false,
      lineOptions: {
        styles: [{ color: "#00aaff", weight: 4 }],
      },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
      }),
    }).addTo(mapRef.current);
  
    routingRef.current = control;
  
    control.on("routesfound", function (e) {
      const route = e.routes[0];
      const distanceKm = (route.summary.totalDistance / 1000).toFixed(2);
      const durationMin = Math.round(route.summary.totalTime / 60);
  
      setRouteInfo({
        distance: distanceKm,
        duration: durationMin,
      });
  
      setLoading(false); // Stop loading
    });
  
    control.on("routingerror", function (err) {
      alert("Rota çizilemedi.");
      setRouteInfo(null);
      setLoading(false); // Stop loading
    });
  };

  const center = locations.length > 0 ? locations[0].position : defaultCenter;

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={center}
        zoom={6}
        style={{ height: "70vh", width: "100%" }}
        whenReady={(e) => {
          mapRef.current = e.target;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
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

      {routeInfo && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "white",
            padding: "10px 14px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
            fontSize: "14px",
          }}
        >
          <strong>Mesafe:</strong> {routeInfo.distance} km<br />
          <strong>Süre:</strong> {routeInfo.duration} dakika
        </div>
      )}

      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#000000",
            zIndex: 1000,
          }}
        >
          Yükleniyor...
        </div>
      )}
    </div>
  );
}
