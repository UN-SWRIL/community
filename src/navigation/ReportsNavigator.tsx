import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReportsStackParamList } from '../types/navigation';

// Import screens
import ReportsDashboardScreen from '../screens/reports/ReportsDashboardScreen';
import InsightDetailsScreen from '../screens/reports/InsightDetailsScreen';
import CityOverviewScreen from '../screens/reports/CityOverviewScreen';
import PersonalStatsScreen from '../screens/reports/PersonalStatsScreen';

const Stack = createNativeStackNavigator<ReportsStackParamList>();

export default function ReportsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ReportsDashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ReportsDashboard" component={ReportsDashboardScreen} />
      <Stack.Screen name="InsightDetails" component={InsightDetailsScreen} />
      <Stack.Screen name="CityOverview" component={CityOverviewScreen} />
      <Stack.Screen name="PersonalStats" component={PersonalStatsScreen} />
    </Stack.Navigator>
  );
} 