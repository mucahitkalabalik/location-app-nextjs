// components/Map.tsx
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { useState } from "react";

interface Props {
  onSelectPosition: (pos: { lat: number; lng: number }) => void;
  markerColor: string;
}

const CustomMarker = ({ position, color }: { position: LatLngExpression; color: string }) => {
  const icon = new Icon({
    iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=•|${color.replace("#", "")}`,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

  return <Marker position={position} icon={icon} />;
};

const LocationSelector = ({ onSelect }: { onSelect: (pos: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(e) {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

export default function Map({ onSelectPosition, markerColor }: Props) {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  const handleSelect = (pos: { lat: number; lng: number }) => {
    setPosition(pos);
    onSelectPosition(pos);
  };

  return (
    <MapContainer
      center={[39.92077, 32.85411]} 
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationSelector onSelect={handleSelect} />
      {position && <CustomMarker position={position} color={markerColor} />}
    </MapContainer>
  );
}
