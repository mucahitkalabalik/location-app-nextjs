import L from 'leaflet';

export const DEFAULT_CENTER = { lat: 39.9208, lng: 32.8541 }; 

export const DEFAULT_ZOOM = 6;

/**
 * @param {string} color
 * @returns {L.Icon}
 */
export const createMarkerIcon = (color = '#ff0000') => {

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="41" viewBox="0 0 30 41">
      <path fill="${color}" d="M15 0c-8.3 0-15 6.7-15 15 0 3.4 1.2 6.6 3.2 9.2l11.8 16.8 11.8-16.8c2-2.6 3.2-5.8 3.2-9.2 0-8.3-6.7-15-15-15z"/>
      <circle cx="15" cy="15" r="6" fill="white" />
    </svg>
  `;
  
  const iconUrl = 'data:image/svg+xml;base64,' + btoa(svgIcon);
  
  return new L.Icon({
    iconUrl,
    iconSize: [30, 41],
    iconAnchor: [15, 41],
    popupAnchor: [0, -41],
  });
};

export const defaultMarkerIcon = createMarkerIcon('#ff0000');

export const userMarkerIcon = createMarkerIcon('#3388ff');

/**
 * @param {Object} coord1 
 * @param {Object} coord2 
 * @returns {number} 
 */
export const calculateDistance = (coord1, coord2) => {
  if (!coord1 || !coord2) return null;
  
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
const toRad = (deg) => deg * Math.PI / 180; 