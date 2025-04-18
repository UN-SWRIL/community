import { Stack } from 'expo-router';
import { useUser } from '../../src/context/UserContext';
import { Redirect } from 'expo-router';

export default function MainLayout() {
  const { user } = useUser();

  // If no user is authenticated, redirect to auth
  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
} 