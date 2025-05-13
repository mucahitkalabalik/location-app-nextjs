'use client';

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
  const mapRef = useRef(null);

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
    }
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
          </Marker>
        )}
      </MapContainer>

      {/* Distance information */}
      {distance && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <strong>Mesafe:</strong> {distance.toFixed(2)} km
        </div>
      )}
    </div>
  );
}

MultiMapComponent.propTypes = {
  showRouting: PropTypes.bool
};
