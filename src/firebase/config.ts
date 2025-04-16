import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzMjnQFcTu0VSgBz4FG93UOGq7wPkRLmM",
  authDomain: "city-pulse-demo.firebaseapp.com",
  projectId: "city-pulse-demo",
  storageBucket: "city-pulse-demo.appspot.com",
  messagingSenderId: "851469630762",
  appId: "1:851469630762:web:a87d8c2ebb5a06b3451c51",
  measurementId: "G-0WL0KE7JNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
export default app; 