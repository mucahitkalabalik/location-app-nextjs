'use client';

<<<<<<< HEAD
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import PropTypes from 'prop-types';
import { useLocations } from '@/hooks/useLocations';
import { createMarkerIcon, DEFAULT_CENTER, DEFAULT_ZOOM, calculateDistance } from '@/utils/mapUtils';

export default function MultiMapComponent({ showRouting = true }) {
  const { locations, loadLocations } = useLocations();
  const [userLocation, setUserLocation] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
=======
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
  const [loading, setLoading] = useState(false);
>>>>>>> afe52571f3f6ef6cd3424411cd8517c3c42e43e9
  const mapRef = useRef(null);
  const routingRef = useRef(null);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleMarkerClick = (loc) => {
<<<<<<< HEAD
    if (!showRouting) return;
    
    if (userLocation && mapRef.current) {
      setSelectedLocation(loc);
      
      if (routeControl) {
        routeControl.remove();
      }

      try {
        const newRouteControl = L.Routing.control({
          waypoints: [
            L.latLng(userLocation.lat, userLocation.lng),
            L.latLng(loc.position.lat, loc.position.lng),
          ],
          routeWhileDragging: true,
          createMarker: function() { return null; },
          lineOptions: {
            styles: [{ color: '#6FA1EC', weight: 4 }]
          },
          show: false 
        }).addTo(mapRef.current);

        setRouteControl(newRouteControl);
      } catch (error) {
        console.error("Routing error:", error);
      }
=======
    if (!userLocation || !mapRef.current) {
      console.error("Kullanıcı konumu veya harita mevcut değil.");
      return;
>>>>>>> afe52571f3f6ef6cd3424411cd8517c3c42e43e9
    }
  
    if (routingRef.current) {
      routingRef.current.remove();
      routingRef.current = null;
    }
  
    setLoading(true); 
  
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
  
      setLoading(false); 
    });
  
    control.on("routingerror", function (err) {
      alert("Rota çizilemedi.");
      setRouteInfo(null);
      setLoading(false); 
    });
  };

  const mapCenter = useMemo(() => {
    if (userLocation) return [userLocation.lat, userLocation.lng];
    if (locations.length > 0) return [locations[0].position.lat, locations[0].position.lng];
    return [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng];
  }, [locations, userLocation]);

  const mapZoom = useMemo(() => {
    if (selectedLocation && userLocation) return 12;
    if (userLocation) return 13;
    if (locations.length === 1) return 13;
    return DEFAULT_ZOOM;
  }, [locations, selectedLocation, userLocation]);

  const distance = useMemo(() => {
    if (userLocation && selectedLocation) {
      return calculateDistance(userLocation, selectedLocation.position);
    }
    return null;
  }, [userLocation, selectedLocation]);

  return (
<<<<<<< HEAD
    <div>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '70vh', width: '100%', borderRadius: '8px' }}
        whenReady={(e) => { mapRef.current = e.target; }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Location markers */}
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.position.lat, loc.position.lng]}
            icon={createMarkerIcon(loc.color || '#ff0000')}
            eventHandlers={{
              click: () => handleMarkerClick(loc),
            }}
          >
            <Popup>
              <div>
                <strong>{loc.name}</strong>
                <br />
                <small>
                  Lat: {loc.position.lat.toFixed(4)}, Lng: {loc.position.lng.toFixed(4)}
                </small>
                {userLocation && (
                  <div style={{ marginTop: '8px' }}>
                    <small>
                      Uzaklık: {calculateDistance(userLocation, loc.position).toFixed(2)} km
                    </small>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={createMarkerIcon('#3388ff')}
          >
            <Popup>
              <strong>Konumunuz</strong>
              <br />
              <small>
                Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}
              </small>
            </Popup>
=======
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
>>>>>>> afe52571f3f6ef6cd3424411cd8517c3c42e43e9
          </Marker>
        )}
      </MapContainer>

<<<<<<< HEAD
      {/* Distance information */}
      {distance && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <strong>Mesafe:</strong> {distance.toFixed(2)} km
        </div>
      )}
=======
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
>>>>>>> afe52571f3f6ef6cd3424411cd8517c3c42e43e9
    </div>
  );
}

MultiMapComponent.propTypes = {
  showRouting: PropTypes.bool
};
