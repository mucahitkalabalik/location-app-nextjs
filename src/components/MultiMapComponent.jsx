"use client";

import { MapContainer, Marker, Popup } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { createMarkerIcon, defaultCenter } from "@/utils/mapUtils";
import L from "leaflet";
import "leaflet-routing-machine";
import { Markers } from "./MapComponents/Markers";
import { MapTilePlayer } from "./MapComponents/MapTilePlayer";
export default function MultiMarkerMap() {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const mapRef = useRef(null);

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
        createMarker: function () {
          return null;
        },
      }).addTo(mapRef.current);

      setRouteControl(newRouteControl);
    } else {
      console.error("Harita referansı alınamadı.");
    }
  };

  const center = locations.length > 0 ? locations[0].position : defaultCenter;

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: "70vh", width: "100%" }}
      whenReady={(e) => {
        mapRef.current = e.target;
      }}
    >
      <MapTilePlayer />
      <Markers
        locations={locations}
        handleMarkerClick={handleMarkerClick}
        createMarkerIcon={createMarkerIcon}
      />

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
