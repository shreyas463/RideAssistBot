import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.example.com/', // Replace with actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Get messages for a conversation
 * 
 * @param {string} conversationId - The conversation ID
 * @returns {Promise<Array>} Array of message objects
 */
export async function getMessages(conversationId) {
  try {
    const response = await api.get(`/messages?conversationId=${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('API error getting messages:', error);
    throw error;
  }
}

/**
 * Send a message
 * 
 * @param {Object} message - The message object to send
 * @returns {Promise<Object>} The sent message with server-assigned properties
 */
export async function sendMessage(message) {
  try {
    const response = await api.post('/messages', message);
    return response.data;
  } catch (error) {
    console.error('API error sending message:', error);
    throw error;
  }
}

/**
 * Get active ride for a user
 * 
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} The active ride object
 */
export async function getActiveRide(userId) {
  try {
    const response = await api.get(`/rides/${userId}/active`);
    return response.data;
  } catch (error) {
    console.error('API error getting active ride:', error);
    throw error;
  }
}

/**
 * Get ride history for a user
 * 
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of ride objects
 */
export async function getRideHistory(userId) {
  try {
    const response = await api.get(`/rides/${userId}/history`);
    return response.data;
  } catch (error) {
    console.error('API error getting ride history:', error);
    throw error;
  }
}

/**
 * Get ride details
 * 
 * @param {string} rideId - The ride ID
 * @returns {Promise<Object>} The ride details object
 */
export async function getRideDetails(rideId) {
  try {
    const response = await api.get(`/rides/${rideId}`);
    return response.data;
  } catch (error) {
    console.error('API error getting ride details:', error);
    throw error;
  }
}

/**
 * Report an issue
 * 
 * @param {Object} issue - The issue object to report
 * @returns {Promise<Object>} The reported issue with server-assigned properties
 */
export async function reportIssue(issue) {
  try {
    const response = await api.post('/issues', issue);
    return response.data;
  } catch (error) {
    console.error('API error reporting issue:', error);
    throw error;
  }
}

/**
 * Get issues for a user
 * 
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of issue objects
 */
export async function getUserIssues(userId) {
  try {
    const response = await api.get(`/issues/${userId}`);
    return response.data;
  } catch (error) {
    console.error('API error getting user issues:', error);
    throw error;
  }
}

/**
 * Register FCM token with the server
 * 
 * @param {string} userId - The user ID
 * @param {string} token - The FCM token
 * @returns {Promise<Object>} Response data
 */
export async function registerFCMToken(userId, token) {
  try {
    const response = await api.post('/users/fcm-token', { userId, token });
    return response.data;
  } catch (error) {
    console.error('API error registering FCM token:', error);
    throw error;
  }
} 