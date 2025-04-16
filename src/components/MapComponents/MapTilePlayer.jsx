import React from 'react'
import { TileLayer } from 'react-leaflet';
export const MapTilePlayer = () => {
  return (
    <TileLayer
           attribution='&copy; OpenStreetMap contributors'
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         
  )
}
