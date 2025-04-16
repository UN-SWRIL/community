// MUST be first — before react, react-native, gesture-handler, etc.
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext';
import Navigation from './src/navigation';
import { View, StyleSheet } from 'react-native';
import { syncService } from './src/services/sync/syncService';

export default function App() {
  // Start background sync service
  React.useEffect(() => {
    syncService.startBackgroundSync();
    
    return () => {
      syncService.stopBackgroundSync();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <UserProvider>
            <Navigation />
          </UserProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
