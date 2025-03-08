import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { View, Text } from 'react-native';

// Import test file
import './src/test';

// Import screens
import MainScreen from './src/screens/MainScreen';
import ChatScreen from './src/screens/ChatScreen';

// Import context providers
import { NetworkProvider } from './src/context/NetworkContext';
import { MockModeProvider } from './src/context/MockModeContext';

// Import asset utilities
import { createPlaceholderAssets } from './src/utils/AssetUtils';

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

// Loading screen component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4285F4' }}>
    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>RideAssistBot</Text>
    <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
  </View>
);

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Request notification permissions and create placeholder assets
  useEffect(() => {
    const prepare = async () => {
      try {
        // Create placeholder assets
        createPlaceholderAssets();
        
        // Simulate a short loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsReady(true);
      } catch (error) {
        console.warn('Error preparing app:', error);
        setError(error.message);
        setIsReady(true);
      }
    };
    
    prepare();
  }, []);

  if (!isReady) {
    return <LoadingScreen />;
  }

  // If there was an error during initialization, show it but still render the app
  if (error) {
    console.warn('App initialized with errors:', error);
  }

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