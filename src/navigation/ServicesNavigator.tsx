import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ServicesStackParamList } from '../types/navigation';
import { ServicesHomeScreen } from '../screens/services/ServicesHomeScreen';
import { ServiceListScreen } from '../screens/services/ServiceListScreen';
import { ServiceDetailsScreen } from '../screens/services/ServiceDetailsScreen';
import ServiceRequestScreen from '../screens/services/ServiceRequestScreen';
import ServiceRequestsScreen from '../screens/services/ServiceRequestsScreen';
import { useTheme } from '../hooks/useTheme';
import { IconButton } from '../components/IconButton';

const Stack = createNativeStackNavigator<ServicesStackParamList>();

export const ServicesNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="ServicesHome"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="ServicesHome"
        component={ServicesHomeScreen}
        options={{
          title: 'City Services',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ServiceList"
        component={ServiceListScreen}
        options={({ navigation }) => ({
          headerTitle: "",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <IconButton
              icon="arrow-back"
              onPress={() => navigation.goBack()}
              color={theme.colors.text}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ServiceDetails"
        component={ServiceDetailsScreen}
        options={({ navigation, route }) => ({
          title: route.params?.serviceName || "Service Details",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <IconButton
              icon="arrow-back"
              onPress={() => navigation.goBack()}
              color={theme.colors.text}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ServiceRequests"
        component={ServiceRequestsScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ServiceRequest"
        component={ServiceRequestScreen}
        options={{
          headerShown: false
        }}
      />
      {/* These screens will be implemented in future phases */}
      {/*
      <Stack.Screen name="ServiceFeedback" component={ServiceFeedbackScreen} />
      <Stack.Screen name="ServiceStatus" component={ServiceStatusScreen} />
      <Stack.Screen name="ServicePayment" component={ServicePaymentScreen} />
      <Stack.Screen name="ServiceReminder" component={ServiceReminderScreen} />
      */}
    </Stack.Navigator>
  );
}; 