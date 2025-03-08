#!/bin/bash

# Display welcome message
echo "====================================="
echo "  RideAssistBot - Expo Starter Script"
echo "====================================="
echo ""
echo "This script will start the RideAssistBot app with placeholder assets."
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the app with placeholder assets
echo "Starting the app with placeholder assets..."
npm run start-with-placeholders

# Exit with the same status as the npm command
exit $? 