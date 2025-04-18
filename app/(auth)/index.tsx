import { Redirect } from 'expo-router';
import { useUser } from '../../src/context/UserContext';
import LoginScreen from '../../src/screens/auth/LoginScreen';

export default function AuthIndex() {
  const { user } = useUser();

  // If user is already authenticated, redirect to main
  if (user) {
    return <Redirect href="/(main)" />;
  }

  return <LoginScreen />;
} 