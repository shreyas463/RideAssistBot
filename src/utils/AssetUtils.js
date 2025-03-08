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
 * Returns a placeholder image URL based on the type
 * @param {string} type - The type of placeholder image to return
 * @returns {string} - The URL of the placeholder image
 */
export const getPlaceholderImage = (type) => {
  switch (type) {
    case 'DRIVER':
      return 'https://randomuser.me/api/portraits/men/32.jpg';
    case 'USER':
      return 'https://randomuser.me/api/portraits/women/44.jpg';
    case 'CAR':
      return 'https://www.pngitem.com/pimgs/m/45-450861_car-top-view-png-transparent-png.png';
    default:
      return 'https://via.placeholder.com/150';
  }
};

/**
 * Create placeholder assets for the app
 * This is a simple implementation that uses in-memory assets
 * In a real app, you would generate actual image files
 */
export function createPlaceholderAssets() {
  console.log('Using in-memory placeholder assets');
  
  // In a real implementation, this would create actual PNG files in the assets directory
  // For this demo, we'll use the base64 encoded SVGs defined above
  return true;
} 