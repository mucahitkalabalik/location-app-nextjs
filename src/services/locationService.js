export const getAllLocations = () => {
    try {
      return JSON.parse(localStorage.getItem('locations')) || [];
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  };
  