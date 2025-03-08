import { useState, useEffect, useCallback } from 'react';
import { useNetwork } from '../context/NetworkContext';
import { useMockMode } from '../context/MockModeContext';
import { createIssue } from '../models/Issue';
import * as ApiService from '../services/ApiService';

/**
 * Custom hook for managing issues
 * 
 * @param {string} userId - The user ID
 * @returns {Object} Issue-related state and functions
 */
export function useIssues(userId) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isConnected } = useNetwork();
  const { isMockModeEnabled } = useMockMode();

  // Load user issues
  useEffect(() => {
    let isMounted = true;
    
    const loadIssues = async () => {
      try {
        setLoading(true);
        
        if (isMockModeEnabled) {
          // Use mock data
          if (isMounted) {
            setIssues([]);
            setLoading(false);
          }
        } else if (isConnected) {
          // Use API data
          const userIssues = await ApiService.getUserIssues(userId);
          if (isMounted) {
            setIssues(userIssues);
            setLoading(false);
          }
        } else {
          // Offline mode, no data
          if (isMounted) {
            setIssues([]);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error loading issues:', err);
        if (isMounted) {
          setError('Failed to load issues');
          setLoading(false);
        }
      }
    };
    
    loadIssues();
    
    return () => {
      isMounted = false;
    };
  }, [userId, isConnected, isMockModeEnabled]);

  // Report an issue
  const reportIssue = useCallback(async (type, description, rideId) => {
    try {
      const issue = createIssue(type, description, userId, rideId);
      
      if (isMockModeEnabled || !isConnected) {
        // In mock mode or offline, just add to local state
        setIssues(prevIssues => [...prevIssues, issue]);
        return true;
      } else {
        // Send to API
        const reportedIssue = await ApiService.reportIssue(issue);
        setIssues(prevIssues => [...prevIssues, reportedIssue]);
        return true;
      }
    } catch (err) {
      console.error('Error reporting issue:', err);
      return false;
    }
  }, [userId, isConnected, isMockModeEnabled]);

  return {
    issues,
    loading,
    error,
    reportIssue
  };
} 