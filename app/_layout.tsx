import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../src/context/ThemeContext';
import { UserProvider } from '../src/context/UserContext';
import { View, StyleSheet } from 'react-native';
import { syncService } from '../src/services/sync/syncService';
import { useEffect } from 'react';

export default function RootLayout() {
  // Start background sync service
  useEffect(() => {
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
            <Stack
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
              }}
            />
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
