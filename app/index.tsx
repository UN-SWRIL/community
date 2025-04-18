import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import SplashScreen from '../src/screens/onboarding/SplashScreen';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  // After loading, redirect to the auth group
  return <Redirect href="/(auth)" />;
}
