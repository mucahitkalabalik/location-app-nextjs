import L from 'leaflet';

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

export const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

 export  const defaultCenter = { lat: 39.9208, lng: 32.8541 };