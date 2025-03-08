// Simple script to start the Expo app
const { execSync } = require('child_process');

console.log('Starting RideAssistBot with Expo...');

try {
  // Run the Expo start command
  execSync('npx expo start', { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting the app:', error.message);
  process.exit(1);
} 