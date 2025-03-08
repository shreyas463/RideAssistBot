import { useState, useEffect, useCallback } from 'react';
import { useNetwork } from '../context/NetworkContext';
import { useMockMode } from '../context/MockModeContext';
import * as ApiService from '../services/ApiService';

/**
 * Custom hook for managing rides
 * 
 * @param {string} userId - The user ID
 * @returns {Object} Ride-related state and functions
 */
export function useRides(userId) {
  const [activeRide, setActiveRide] = useState(null);
  const [rideHistory, setRideHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isConnected } = useNetwork();
  const { isMockModeEnabled, getMockRide } = useMockMode();

  // Load active ride
  useEffect(() => {
    let isMounted = true;
    
    const loadActiveRide = async () => {
      try {
        if (isMockModeEnabled) {
          // Use mock data
          if (isMounted) {
            setActiveRide(getMockRide());
            setLoading(false);
          }
        } else if (isConnected) {
          // Use API data
          const ride = await ApiService.getActiveRide(userId);
          if (isMounted) {
            setActiveRide(ride);
            setLoading(false);
          }
        } else {
          // Offline mode, no data
          if (isMounted) {
            setActiveRide(null);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error loading active ride:', err);
        if (isMounted) {
          setError('Failed to load active ride');
          setLoading(false);
        }
      }
    };
    
    loadActiveRide();
    
    return () => {
      isMounted = false;
    };
  }, [userId, isConnected, isMockModeEnabled, getMockRide]);

  // Load ride history
  const loadRideHistory = useCallback(async () => {
    try {
      setLoading(true);
      
      if (isMockModeEnabled) {
        // Use mock data
        setRideHistory([getMockRide()]);
      } else if (isConnected) {
        // Use API data
        const history = await ApiService.getRideHistory(userId);
        setRideHistory(history);
      } else {
        // Offline mode, no data
        setRideHistory([]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading ride history:', err);
      setError('Failed to load ride history');
      setLoading(false);
    }
  }, [userId, isConnected, isMockModeEnabled, getMockRide]);

  // Get ride details
  const getRideDetails = useCallback(async (rideId) => {
    try {
      if (activeRide && activeRide.id === rideId) {
        return activeRide;
      }
      
      const historyRide = rideHistory.find(ride => ride.id === rideId);
      if (historyRide) {
        return historyRide;
      }
      
      if (isConnected && !isMockModeEnabled) {
        return await ApiService.getRideDetails(rideId);
      }
      
      return null;
    } catch (err) {
      console.error('Error getting ride details:', err);
      return null;
    }
  }, [activeRide, rideHistory, isConnected, isMockModeEnabled]);

  return {
    activeRide,
    rideHistory,
    loading,
    error,
    loadRideHistory,
    getRideDetails
  };
} 