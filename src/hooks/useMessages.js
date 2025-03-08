import { useState, useEffect, useCallback } from 'react';
import { useNetwork } from '../context/NetworkContext';
import { useMockMode } from '../context/MockModeContext';
import { createMessage, MessageType } from '../models/Message';
import * as Database from '../database/Database';
import * as ApiService from '../services/ApiService';

/**
 * Custom hook for managing messages
 * 
 * @param {string} conversationId - The conversation ID
 * @returns {Object} Message-related state and functions
 */
export function useMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isConnected } = useNetwork();
  const { isMockModeEnabled, getMockResponses } = useMockMode();

  // Load messages
  useEffect(() => {
    let isMounted = true;
    
    const loadMessages = async () => {
      try {
        setLoading(true);
        
        // Get messages from local database
        const localMessages = await Database.getMessages(conversationId);
        
        if (isMounted) {
          setMessages(localMessages);
          
          // If online and not in mock mode, try to get messages from API
          if (isConnected && !isMockModeEnabled) {
            try {
              const apiMessages = await ApiService.getMessages(conversationId);
              
              // Save API messages to local database
              for (const message of apiMessages) {
                await Database.saveMessage(message);
              }
              
              // Update state with fresh messages
              if (isMounted) {
                const updatedMessages = await Database.getMessages(conversationId);
                setMessages(updatedMessages);
              }
            } catch (apiError) {
              console.error('Error fetching messages from API:', apiError);
              // Continue with local messages
            }
          }
          
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading messages:', err);
        if (isMounted) {
          setError('Failed to load messages');
          setLoading(false);
        }
      }
    };
    
    loadMessages();
    
    return () => {
      isMounted = false;
    };
  }, [conversationId, isConnected, isMockModeEnabled]);

  // Send a message
  const sendMessage = useCallback(async (content, sender) => {
    try {
      // Create message object
      const message = createMessage(content, sender, MessageType.SENT, conversationId);
      
      // Save to local database first
      const savedMessage = await Database.saveMessage(message);
      
      // Update state
      setMessages(prevMessages => [...prevMessages, savedMessage]);
      
      // If online and not in mock mode, send to API
      if (isConnected && !isMockModeEnabled) {
        try {
          await ApiService.sendMessage(savedMessage);
        } catch (apiError) {
          console.error('Error sending message to API:', apiError);
          // Message is already saved locally, so we can continue
        }
      }
      
      return true;
    } catch (err) {
      console.error('Error sending message:', err);
      return false;
    }
  }, [conversationId, isConnected, isMockModeEnabled]);

  // Mark conversation as read
  const markAsRead = useCallback(async () => {
    try {
      await Database.markConversationAsRead(conversationId);
      
      // Update state to reflect read status
      setMessages(prevMessages => 
        prevMessages.map(msg => ({
          ...msg,
          isRead: true
        }))
      );
    } catch (err) {
      console.error('Error marking conversation as read:', err);
    }
  }, [conversationId]);

  // Add a system message (for mock mode)
  const addSystemMessage = useCallback(async (content) => {
    try {
      const message = createMessage(content, 'System', MessageType.SYSTEM, conversationId);
      const savedMessage = await Database.saveMessage(message);
      setMessages(prevMessages => [...prevMessages, savedMessage]);
    } catch (err) {
      console.error('Error adding system message:', err);
    }
  }, [conversationId]);

  // Add a received message (for mock mode)
  const addReceivedMessage = useCallback(async (content, sender) => {
    try {
      const message = createMessage(content, sender, MessageType.RECEIVED, conversationId);
      const savedMessage = await Database.saveMessage(message);
      setMessages(prevMessages => [...prevMessages, savedMessage]);
    } catch (err) {
      console.error('Error adding received message:', err);
    }
  }, [conversationId]);

  // Get a random mock response
  const getMockResponse = useCallback(() => {
    const responses = getMockResponses();
    return responses[Math.floor(Math.random() * responses.length)];
  }, [getMockResponses]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    markAsRead,
    addSystemMessage,
    addReceivedMessage,
    getMockResponse
  };
} 