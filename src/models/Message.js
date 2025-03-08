/**
 * Message model for the RideAssistBot application.
 */

// Message types
export const MessageType = {
  SENT: 0,
  RECEIVED: 1,
  SYSTEM: 2
};

/**
 * Create a new message object
 * 
 * @param {string} content - The message content
 * @param {string} sender - The sender name
 * @param {number} type - The message type (from MessageType enum)
 * @param {string} conversationId - The conversation ID
 * @returns {Object} A new message object
 */
export function createMessage(content, sender, type, conversationId) {
  return {
    id: null, // Will be set by the database
    content,
    sender,
    timestamp: new Date(),
    type,
    isRead: false,
    conversationId
  };
}

/**
 * Format a message timestamp for display
 * 
 * @param {Date} timestamp - The message timestamp
 * @returns {string} Formatted time string (e.g., "10:30 AM")
 */
export function formatMessageTime(timestamp) {
  return timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
} 