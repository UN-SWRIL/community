import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types/navigation';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import NotificationScreen from '../screens/home/NotificationScreen';
import AchievementScreen from '../screens/home/AchievementScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Achievement" component={AchievementScreen} />
    </Stack.Navigator>
  );
} 