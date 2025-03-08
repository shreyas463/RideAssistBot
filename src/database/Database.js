import * as SQLite from 'expo-sqlite';

// Open database
const db = SQLite.openDatabase('rideassistbot.db');

/**
 * Initialize the database by creating necessary tables
 */
export function initDatabase() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create messages table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          content TEXT NOT NULL,
          sender TEXT NOT NULL,
          timestamp INTEGER NOT NULL,
          type INTEGER NOT NULL,
          isRead INTEGER NOT NULL,
          conversationId TEXT NOT NULL
        )`,
        [],
        () => {
          console.log('Database initialized successfully');
          resolve();
        },
        (_, error) => {
          console.error('Error initializing database:', error);
          reject(error);
        }
      );
    });
  });
}

/**
 * Save a message to the database
 * 
 * @param {Object} message - The message object to save
 * @returns {Promise<Object>} The saved message with ID
 */
export function saveMessage(message) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO messages (content, sender, timestamp, type, isRead, conversationId)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          message.content,
          message.sender,
          message.timestamp.getTime(),
          message.type,
          message.isRead ? 1 : 0,
          message.conversationId
        ],
        (_, result) => {
          resolve({
            ...message,
            id: result.insertId
          });
        },
        (_, error) => {
          console.error('Error saving message:', error);
          reject(error);
        }
      );
    });
  });
}

/**
 * Get messages for a specific conversation
 * 
 * @param {string} conversationId - The conversation ID
 * @returns {Promise<Array>} Array of message objects
 */
export function getMessages(conversationId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM messages WHERE conversationId = ? ORDER BY timestamp ASC`,
        [conversationId],
        (_, result) => {
          const messages = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            messages.push({
              id: row.id,
              content: row.content,
              sender: row.sender,
              timestamp: new Date(row.timestamp),
              type: row.type,
              isRead: row.isRead === 1,
              conversationId: row.conversationId
            });
          }
          resolve(messages);
        },
        (_, error) => {
          console.error('Error getting messages:', error);
          reject(error);
        }
      );
    });
  });
}

/**
 * Get unread messages
 * 
 * @returns {Promise<Array>} Array of unread message objects
 */
export function getUnreadMessages() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM messages WHERE isRead = 0 ORDER BY timestamp ASC`,
        [],
        (_, result) => {
          const messages = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            messages.push({
              id: row.id,
              content: row.content,
              sender: row.sender,
              timestamp: new Date(row.timestamp),
              type: row.type,
              isRead: false,
              conversationId: row.conversationId
            });
          }
          resolve(messages);
        },
        (_, error) => {
          console.error('Error getting unread messages:', error);
          reject(error);
        }
      );
    });
  });
}

/**
 * Mark all messages in a conversation as read
 * 
 * @param {string} conversationId - The conversation ID
 * @returns {Promise<void>}
 */
export function markConversationAsRead(conversationId) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE messages SET isRead = 1 WHERE conversationId = ?`,
        [conversationId],
        (_, result) => {
          resolve();
        },
        (_, error) => {
          console.error('Error marking conversation as read:', error);
          reject(error);
        }
      );
    });
  });
} 