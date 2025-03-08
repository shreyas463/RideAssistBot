# RideAssistBot

## Overview
RideAssistBot is a customer support chatbot designed for ride-sharing applications. It enables users to report issues, receive real-time ride updates, and communicate with support representatives.

## Features
- Real-time chat interface for customer support
- Ride status updates and notifications
- Issue reporting and tracking
- Offline message caching
- Push notifications for important updates

## Technical Stack
- React Native with Expo
- React Navigation for screen management
- React Native Paper for UI components
- Expo SQLite for local data persistence
- Expo Notifications for push notifications
- Axios for API communication

## Setup Instructions
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server with placeholder assets:
   ```
   npm run start-with-placeholders
   ```
   This will start the app with built-in placeholder images for icons and assets.

4. Run on a device or emulator:
   - Press `a` to run on Android emulator
   - Press `i` to run on iOS simulator
   - Scan the QR code with Expo Go app on your physical device

## Mock Mode
The application runs in mock mode by default, simulating ride events and support interactions without requiring a backend connection. Mock mode can be toggled from the app's menu (three dots in the top-right corner).

## Placeholder Assets
The app uses built-in placeholder assets for:
- App icon
- Splash screen
- Driver avatars
- Notification icons

These are generated at runtime using SVG data URIs, so you don't need to create any image files to run the app.

## Project Structure
- `/src/components` - Reusable UI components
- `/src/context` - React Context providers
- `/src/database` - SQLite database operations
- `/src/hooks` - Custom React hooks
- `/src/models` - Data models and utilities
- `/src/screens` - Application screens
- `/src/services` - API and notification services
- `/src/utils` - Utility functions and placeholder assets