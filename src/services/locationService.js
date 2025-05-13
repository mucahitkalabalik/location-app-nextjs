
const STORAGE_KEY = 'locations';

/**
 * @returns {Array}
 */
export const getAllLocations = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

/**

 * @param {Array} locations - 
 * @returns {boolean}
 */
export const saveLocations = (locations) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    return true;
  } catch (error) {
    console.error('Error saving locations:', error);
    return false;
  }
};

/**
 * @param {string} id -
 * @returns {Object|null}
 */
export const getLocationById = (id) => {
  try {
    const locations = getAllLocations();
    return locations.find(loc => loc.id === id) || null;
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

/**
 * @param {Object} location - 
 * @returns {boolean} 
 */
export const addLocationData = (location) => {
  try {
    const locations = getAllLocations();
    saveLocations([...locations, location]);
    return true;
  } catch (error) {
    console.error('Error adding location:', error);
    return false;
  }
};

/**
 * @param {string} id 
 * @param {Object} changes 
 * @returns {boolean} 
 */
export const updateLocationData = (id, changes) => {
  try {
    const locations = getAllLocations();
    const updatedLocations = locations.map(loc => 
      loc.id === id ? { ...loc, ...changes } : loc
    );
    saveLocations(updatedLocations);
    return true;
  } catch (error) {
    console.error('Error updating location:', error);
    return false;
  }
};

/**
 * @param {string} id - 
 * @returns {boolean} 
 */
export const deleteLocationData = (id) => {
  try {
    const locations = getAllLocations();
    const filteredLocations = locations.filter(loc => loc.id !== id);
    saveLocations(filteredLocations);
    return true;
  } catch (error) {
    console.error('Error deleting location:', error);
    return false;
  }
}; 