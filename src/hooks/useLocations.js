<<<<<<< HEAD
"use client";
=======
>>>>>>> ee5c6617577502e9d6057f6e8e362b53a4ce16de
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { 
  addLocation, 
  setLocations,
  updateLocation,
  removeLocation
} from '@/store/locationsSlice';
import {
  getAllLocations,
  saveLocations,
  getLocationById,
  addLocationData,
  updateLocationData,
  deleteLocationData
} from '@/services/locationService';

/**
 * Custom hook for managing locations
 */
export function useLocations() {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.items);

  // Load locations from localStorage
  const loadLocations = useCallback(() => {
    const savedLocations = getAllLocations();
    dispatch(setLocations(savedLocations));
    return savedLocations;
  }, [dispatch]);

  // Add a new location
  const createLocation = useCallback((locationData) => {
    try {
      if (!locationData.position || !locationData.name) {
        toast.error('Konum ve isim gereklidir!');
        return false;
      }

      const newLocation = {
        id: uuidv4(),
        ...locationData,
        createdAt: new Date().toISOString(),
      };

      dispatch(addLocation(newLocation));
      const success = addLocationData(newLocation);
      
      if (success) {
        toast.success('Konum başarıyla kaydedildi!');
        return true;
      } else {
        toast.error('Konum kaydedilirken bir hata oluştu');
        return false;
      }
    } catch (error) {
      toast.error('Beklenmeyen bir hata oluştu');
      console.error('Error adding location:', error);
      return false;
    }
  }, [dispatch]);

  // Update an existing location
  const editLocation = useCallback((id, changes) => {
    try {
      if (!id) {
        toast.error('Geçersiz konum ID');
        return false;
      }

      dispatch(updateLocation({ id, ...changes }));
      const success = updateLocationData(id, changes);
      
      if (success) {
        toast.success('Konum başarıyla güncellendi!');
        return true;
      } else {
        toast.error('Konum güncellenirken bir hata oluştu');
        return false;
      }
    } catch (error) {
      toast.error('Beklenmeyen bir hata oluştu');
      console.error('Error updating location:', error);
      return false;
    }
  }, [dispatch]);

  // Delete a location
  const deleteLocation = useCallback((id) => {
    try {
      if (!id) {
        toast.error('Geçersiz konum ID');
        return false;
      }

      dispatch(removeLocation(id));
      const success = deleteLocationData(id);
      
      if (success) {
        toast.success('Konum başarıyla silindi!');
        return true;
      } else {
        toast.error('Konum silinirken bir hata oluştu');
        return false;
      }
    } catch (error) {
      toast.error('Beklenmeyen bir hata oluştu');
      console.error('Error deleting location:', error);
      return false;
    }
  }, [dispatch]);

  // Get a location by ID
  const getLocation = useCallback((id) => {
    return getLocationById(id);
  }, []);

  return {
    locations,
    loadLocations,
    createLocation,
    editLocation,
    deleteLocation,
    getLocation
  };
} 