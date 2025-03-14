import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { registerFCMToken } from './ApiService';

// Get device model name safely
const getDeviceModelName = () => {
  try {
    // Use Device.modelName instead of Constants.platform.ios.model
    return Device.modelName || 'unknown device';
  } catch (error) {
    console.warn('Error getting device model:', error);
    return 'unknown device';
  }
};

/**
 * Register for push notifications
 * 
 * @param {string} userId - The user ID to associate with the token
 * @returns {Promise<string|null>} The push token or null if registration failed
 */
export async function registerForPushNotifications(userId) {
  try {
    // Log device info safely
    console.log('Device info:', getDeviceModelName());
    
    // Check if physical device (notifications don't work on simulators)
    if (!Device.isDevice) {
      console.log('Push notifications are not available on simulator');
      return null;
    }

    // Check permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // If not granted, request permission
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // If still not granted, exit
    if (finalStatus !== 'granted') {
      console.log('Failed to get push notification permissions');
      return null;
    }

    // Get push token
    try {
      // Get project ID safely
      const projectId = Constants.expoConfig?.extra?.eas?.projectId || 'unknown-project';
      
      const token = (await Notifications.getExpoPushTokenAsync({
        projectId: projectId,
      })).data;

      // Register token with server
      if (userId) {
        await registerFCMToken(userId, token);
      }

      // Configure for Android
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#4285F4',
        });
      }

      return token;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  } catch (error) {
    console.error('Error in registerForPushNotifications:', error);
    return null;
  }
}

/**
 * Add a notification listener
 * 
 * @param {Function} handler - The notification handler function
 * @returns {Function} A function to remove the listener
 */
export function addNotificationListener(handler) {
  return Notifications.addNotificationReceivedListener(handler);
}

/**
 * Add a notification response listener (when user taps notification)
 * 
 * @param {Function} handler - The response handler function
 * @returns {Function} A function to remove the listener
 */
export function addNotificationResponseListener(handler) {
  return Notifications.addNotificationResponseReceivedListener(handler);
}

/**
 * Schedule a local notification
 * 
 * @param {string} title - The notification title
 * @param {string} body - The notification body
 * @param {Object} data - Additional data to include with the notification
 * @param {number} seconds - Seconds to wait before showing the notification
 * @returns {Promise<string>} The notification identifier
 */
export async function scheduleLocalNotification(title, body, data = {}, seconds = 1) {
  try {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: { seconds },
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
}

/**
 * Dismiss all notifications
 * 
 * @returns {Promise<void>}
 */
export async function dismissAllNotifications() {
  try {
    await Notifications.dismissAllNotificationsAsync();
  } catch (error) {
    console.error('Error dismissing notifications:', error);
  }
} 