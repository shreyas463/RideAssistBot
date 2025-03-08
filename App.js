import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

// Import screens
import MainScreen from './src/screens/MainScreen';
import ChatScreen from './src/screens/ChatScreen';

// Import context providers
import { NetworkProvider } from './src/context/NetworkContext';
import { MockModeProvider } from './src/context/MockModeContext';

// Import asset utilities
import { createPlaceholderAssets } from './src/utils/AssetUtils';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Create custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4285F4',
    accent: '#DB4437',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#212121',
    disabled: '#757575',
    placeholder: '#BDBDBD',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
};

// Create navigation stack
const Stack = createStackNavigator();

export default function App() {
  // Request notification permissions and create placeholder assets
  useEffect(() => {
    (async () => {
      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
      }
      
      // Create placeholder assets
      createPlaceholderAssets();
    })();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NetworkProvider>
        <MockModeProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen 
                name="Main" 
                component={MainScreen} 
                options={{ title: 'RideAssistBot' }} 
              />
              <Stack.Screen 
                name="Chat" 
                component={ChatScreen} 
                options={{ title: 'Support Chat' }} 
              />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </MockModeProvider>
      </NetworkProvider>
    </PaperProvider>
  );
} 