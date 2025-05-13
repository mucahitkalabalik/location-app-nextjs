'use client';

import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CENTER, DEFAULT_ZOOM, createMarkerIcon } from '@/utils/mapUtils';

export default function MapComponent({ onClickMap, location, markerColor = '#ff0000' }) {
  const [position, setPosition] = useState(location || null);
  const markerIcon = createMarkerIcon(markerColor);

  useEffect(() => {
    if (location) {
      setPosition(location);
    }
  }, [location]);

  const LocationMarker = useCallback(() => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newPosition = { lat, lng };
        setPosition(newPosition);
        onClickMap && onClickMap(newPosition);
      },
    });

    useEffect(() => {
      if (position && map) {
        map.flyTo([position.lat, position.lng], map.getZoom());
      }
    }, [position, map]);

    return position ? (
      <Marker position={[position.lat, position.lng]} icon={markerIcon} />
    ) : null;
  }, [position, markerIcon, onClickMap]);

  return (
    <MapContainer
      center={position ? [position.lat, position.lng] : [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng]}
      zoom={position ? 13 : DEFAULT_ZOOM}
      style={{ height: '400px', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

MapComponent.propTypes = {
  onClickMap: PropTypes.func,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  markerColor: PropTypes.string
};
