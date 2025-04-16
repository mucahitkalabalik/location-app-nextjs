import React from 'react'
import { Marker, Popup } from 'react-leaflet'

export const Markers = ({ locations, handleMarkerClick, createMarkerIcon }) => {
  return (
    <>
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
    </>
  )
}
