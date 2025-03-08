import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Appbar, ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useMessages } from '../hooks/useMessages';
import { useNetwork } from '../context/NetworkContext';
import { useMockMode } from '../context/MockModeContext';
import MessageItem from '../components/MessageItem';
import ConnectionStatusBar from '../components/ConnectionStatusBar';

/**
 * Chat screen of the application
 * 
 * @returns {JSX.Element} The rendered component
 */
export default function ChatScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { conversationId = 'default_conversation' } = route.params || {};
  const { messages, loading, error, sendMessage, markAsRead, addSystemMessage, addReceivedMessage, getMockResponse } = useMessages(conversationId);
  const { isConnected } = useNetwork();
  const { isMockModeEnabled } = useMockMode();
  
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const flatListRef = useRef(null);
  
  // Mark messages as read when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      markAsRead();
    });
    
    return unsubscribe;
  }, [navigation, markAsRead]);
  
  // Add welcome message if no messages
  useEffect(() => {
    if (!loading && messages.length === 0 && isMockModeEnabled) {
      addSystemMessage('Welcome to RideAssist Support. How can we help you today?');
    }
  }, [loading, messages.length, isMockModeEnabled, addSystemMessage]);
  
  // Handle send message
  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      return;
    }
    
    setSending(true);
    
    try {
      await sendMessage(messageText.trim(), 'You');
      setMessageText('');
      
      // In mock mode, simulate a response after a delay
      if (isMockModeEnabled) {
        setTimeout(() => {
          addReceivedMessage(getMockResponse(), 'Support Agent');
        }, 1000 + Math.random() * 2000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length]);
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Support Chat" />
      </Appbar.Header>
      
      <ConnectionStatusBar />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={item => item.id?.toString() || item.timestamp.toString()}
          contentContainerStyle={styles.messageList}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />
      )}
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type your message here..."
            style={styles.input}
            multiline
            maxLength={500}
            disabled={sending}
          />
          <Button
            mode="contained"
            onPress={handleSendMessage}
            disabled={sending || !messageText.trim()}
            loading={sending}
            style={styles.sendButton}
            icon="send"
          >
            Send
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageList: {
    paddingVertical: 8
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    maxHeight: 100
  },
  sendButton: {
    marginLeft: 8,
    borderRadius: 20
  }
}); 