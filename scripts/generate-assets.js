const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Function to create a simple placeholder image
function createPlaceholderImage(filename, width, height, bgColor, text) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `${Math.floor(width / 10)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(assetsDir, filename), buffer);
  
  console.log(`Created ${filename}`);
}

// Generate assets
createPlaceholderImage('icon.png', 1024, 1024, '#4285F4', 'RideAssistBot');
createPlaceholderImage('splash.png', 1242, 2436, '#4285F4', 'RideAssistBot');
createPlaceholderImage('adaptive-icon.png', 1024, 1024, '#4285F4', 'RideAssistBot');
createPlaceholderImage('favicon.png', 64, 64, '#4285F4', 'R');
createPlaceholderImage('notification-icon.png', 192, 192, '#4285F4', 'R');

console.log('All assets generated successfully!'); 