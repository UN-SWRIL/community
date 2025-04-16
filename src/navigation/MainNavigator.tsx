import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';

// Import stack navigators
import HomeNavigator from './HomeNavigator';
import SurveyNavigator from './SurveyNavigator';
import CharacterNavigator from './CharacterNavigator';
import ReportsNavigator from './ReportsNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: isDarkMode ? theme.colors.dark.textSecondary : theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: isDarkMode ? theme.colors.dark.card : theme.colors.card,
          borderTopColor: isDarkMode ? theme.colors.dark.border : theme.colors.border,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Surveys" 
        component={SurveyNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Character" 
        component={CharacterNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileNavigator} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
} 