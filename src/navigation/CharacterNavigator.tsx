import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharacterStackParamList } from '../types/navigation';

// Import screens
import CharacterHomeScreen from '../screens/character/CharacterHomeScreen';
import CharacterDetailScreen from '../screens/character/CharacterDetailScreen';
import CharacterEvolutionScreen from '../screens/character/CharacterEvolutionScreen';
import CharacterCustomizationScreen from '../screens/character/CharacterCustomizationScreen';

const Stack = createNativeStackNavigator<CharacterStackParamList>();

export default function CharacterNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="CharacterHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CharacterHome" component={CharacterHomeScreen} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
      <Stack.Screen name="CharacterEvolution" component={CharacterEvolutionScreen} />
      <Stack.Screen name="CharacterCustomization" component={CharacterCustomizationScreen} />
    </Stack.Navigator>
  );
} 