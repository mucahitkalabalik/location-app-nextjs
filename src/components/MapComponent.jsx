"use client";

import { MapContainer, useMapEvents, Marker } from "react-leaflet";
import { defaultCenter, markerIcon } from "@/utils/mapUtils";
import { useEffect, useState } from "react";
import { MapTilePlayer } from "./MapComponents/MapTilePlayer";
export default function MapComponent({ onClickMap, location }) {
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
      style={{ height: "400px", width: "100%" }}
    >
      <MapTilePlayer />

      <LocationMarker />
    </MapContainer>
  );
}
