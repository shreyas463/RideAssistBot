/**
 * Utility functions for handling assets in the app
 */

// Base64 encoded SVG placeholder images
export const PLACEHOLDER_IMAGES = {
  // App icon - blue square with "RB" text
  ICON: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxyZWN0IHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIGZpbGw9IiM0Mjg1RjQiLz48dGV4dCB4PSI1MTIiIHk9IjUxMiIgZm9udC1zaXplPSIyMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlJCPC90ZXh0Pjwvc3ZnPg==',
  
  // Notification icon - small blue circle with "R" text
  NOTIFICATION: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiB2aWV3Qm94PSIwIDAgMTkyIDE5MiI+PGNpcmNsZSBjeD0iOTYiIGN5PSI5NiIgcj0iOTYiIGZpbGw9IiM0Mjg1RjQiLz48dGV4dCB4PSI5NiIgeT0iOTYiIGZvbnQtc2l6ZT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlI8L3RleHQ+PC9zdmc+',
  
  // Driver placeholder - gray circle with person icon
  DRIVER: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM3NTc1NzUiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjM1IiByPSIxNSIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMjUgODVDMjUgNjUgNzUgNjUgNzUgODUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMTAiIGZpbGw9Im5vbmUiLz48L3N2Zz4='
};

/**
 * Get a placeholder image URI for use in the app
 * 
 * @param {string} type - The type of placeholder image to get
 * @returns {string} The image URI
 */
export function getPlaceholderImage(type) {
  return PLACEHOLDER_IMAGES[type] || PLACEHOLDER_IMAGES.ICON;
}

/**
 * Create a placeholder app icon in the assets directory
 * This is a simple implementation that would need to be replaced with actual
 * image generation in a real app
 */
export function createPlaceholderAssets() {
  console.log('Using placeholder assets. In a real app, you would generate actual image files here.');
  
  // In a real implementation, this would create actual PNG files in the assets directory
  // For this demo, we'll use the base64 encoded SVGs defined above
  return true;
} 