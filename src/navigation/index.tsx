import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { RootStackParamList } from '../types/navigation';

// Splash Screen
import SplashScreen from '../screens/onboarding/SplashScreen';

// Modals
import ModalSurvey from '../screens/survey/ModalSurvey';
import ModalAchievement from '../screens/home/ModalAchievement';
import ModalCharacterEvolution from '../screens/character/ModalCharacterEvolution';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { isDarkMode, colorScheme } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Group>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="ModalSurvey" component={ModalSurvey} />
          <Stack.Screen name="ModalAchievement" component={ModalAchievement} />
          <Stack.Screen name="ModalCharacterEvolution" component={ModalCharacterEvolution} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
} 