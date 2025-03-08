import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Appbar, Menu, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useNetwork } from '../context/NetworkContext';
import { useMockMode } from '../context/MockModeContext';
import { useRides } from '../hooks/useRides';
import { useIssues } from '../hooks/useIssues';
import RideStatusCard from '../components/RideStatusCard';
import ConnectionStatusBar from '../components/ConnectionStatusBar';
import ReportIssueDialog from '../components/ReportIssueDialog';
import { initDatabase } from '../database/Database';
import { registerForPushNotifications } from '../services/NotificationService';

// Mock user ID for testing
const MOCK_USER_ID = 'user123';

/**
 * Main screen of the application
 * 
 * @returns {JSX.Element} The rendered component
 */
export default function MainScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { isConnected, checkConnection } = useNetwork();
  const { isMockModeEnabled, setMockModeEnabled } = useMockMode();
  const { activeRide, loading: rideLoading } = useRides(MOCK_USER_ID);
  const { reportIssue } = useIssues(MOCK_USER_ID);
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [issueDialogVisible, setIssueDialogVisible] = useState(false);
  
  // Initialize database and notifications
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize database
        await initDatabase();
        
        // Register for push notifications
        await registerForPushNotifications(MOCK_USER_ID);
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };
    
    initialize();
  }, []);
  
  // Check connection when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkConnection();
    });
    
    return unsubscribe;
  }, [navigation, checkConnection]);
  
  // Handle view ride details
  const handleViewRideDetails = () => {
    if (activeRide) {
      Alert.alert(
        'Ride Details',
        `Ride ID: ${activeRide.id}\nDriver: ${activeRide.driver ? activeRide.driver.name : 'Not assigned'}\nPickup: ${activeRide.pickupLocation}\nDropoff: ${activeRide.dropoffLocation}`
      );
    }
  };
  
  // Handle report issue
  const handleReportIssue = (type, description) => {
    if (activeRide) {
      reportIssue(type, description, activeRide.id)
        .then(success => {
          if (success) {
            Alert.alert('Success', 'Issue reported successfully');
          } else {
            Alert.alert('Error', 'Failed to report issue');
          }
        });
    }
    
    setIssueDialogVisible(false);
  };
  
  // Handle contact support
  const handleContactSupport = () => {
    navigation.navigate('Chat', { conversationId: 'support_chat' });
  };
  
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="RideAssistBot" />
        <Appbar.Action icon="dots-vertical" onPress={() => setMenuVisible(true)} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={{ x: 0, y: 0 }}
          style={styles.menu}
        >
          <Menu.Item
            title={isMockModeEnabled ? "Disable Mock Mode" : "Enable Mock Mode"}
            onPress={() => {
              setMockModeEnabled(!isMockModeEnabled);
              setMenuVisible(false);
            }}
          />
        </Menu>
      </Appbar.Header>
      
      <ConnectionStatusBar />
      
      <ScrollView style={styles.content}>
        <RideStatusCard 
          ride={activeRide} 
          onViewDetails={handleViewRideDetails} 
        />
        
        <Card style={styles.card}>
          <Card.Content>
            <Title>Report Issue</Title>
            <Paragraph>Having trouble with your ride? Report an issue here.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              onPress={() => setIssueDialogVisible(true)}
              disabled={!activeRide}
              style={styles.button}
            >
              Report Issue
            </Button>
          </Card.Actions>
        </Card>
        
        <Card style={styles.card}>
          <Card.Content>
            <Title>Contact Support</Title>
            <Paragraph>Chat with our support team for assistance.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              onPress={handleContactSupport}
              style={styles.button}
            >
              Contact Support
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
      
      <ReportIssueDialog
        visible={issueDialogVisible}
        onDismiss={() => setIssueDialogVisible(false)}
        onSubmit={handleReportIssue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  content: {
    flex: 1,
    padding: 8
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4
  },
  button: {
    marginLeft: 'auto'
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 10
  }
}); 