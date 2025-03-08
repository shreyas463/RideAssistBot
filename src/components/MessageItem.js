import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MessageType, formatMessageTime } from '../models/Message';

/**
 * Component to display a single message in the chat
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - The message object to display
 * @returns {JSX.Element} The rendered component
 */
export default function MessageItem({ message }) {
  const theme = useTheme();
  
  // Render different message types
  switch (message.type) {
    case MessageType.SENT:
      return (
        <View style={styles.sentContainer}>
          <View style={[styles.sentBubble, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.sentText}>{message.content}</Text>
          </View>
          <Text style={styles.timestamp}>{formatMessageTime(message.timestamp)}</Text>
        </View>
      );
      
    case MessageType.RECEIVED:
      return (
        <View style={styles.receivedContainer}>
          <Text style={styles.sender}>{message.sender}</Text>
          <View style={[styles.receivedBubble, { backgroundColor: theme.colors.surface }]}>
            <Text style={styles.receivedText}>{message.content}</Text>
          </View>
          <Text style={styles.timestamp}>{formatMessageTime(message.timestamp)}</Text>
        </View>
      );
      
    case MessageType.SYSTEM:
      return (
        <View style={styles.systemContainer}>
          <View style={[styles.systemBubble, { backgroundColor: theme.colors.disabled }]}>
            <Text style={styles.systemText}>{message.content}</Text>
          </View>
        </View>
      );
      
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  sentContainer: {
    alignItems: 'flex-end',
    marginVertical: 4,
    marginHorizontal: 8,
    marginLeft: 64
  },
  sentBubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '100%'
  },
  sentText: {
    color: 'white'
  },
  receivedContainer: {
    alignItems: 'flex-start',
    marginVertical: 4,
    marginHorizontal: 8,
    marginRight: 64
  },
  receivedBubble: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  receivedText: {
    color: '#212121'
  },
  systemContainer: {
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16
  },
  systemBubble: {
    borderRadius: 16,
    padding: 8,
    minWidth: 120,
    alignItems: 'center'
  },
  systemText: {
    color: 'white',
    fontStyle: 'italic',
    textAlign: 'center'
  },
  sender: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2,
    fontWeight: 'bold',
    marginLeft: 8
  },
  timestamp: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
    marginHorizontal: 8
  }
}); 