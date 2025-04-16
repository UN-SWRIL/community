import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getDeviceId } from '../utils/deviceId';
import { User, UserPreferences } from '../types';
import { 
  PhoneAuthProvider, 
  signInWithCredential, 
  signOut,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Keys for storing user data in secure storage
const USER_TOKEN_KEY = 'user_token';
const USER_DATA_KEY = 'user_data';
const USER_CREDENTIALS_KEY = 'user_credentials'; // New key for storing login credentials

// For test mode/dev environments
const TEST_MODE = true; // Setting to true to make development easier
const TEST_VERIFICATION_CODE = '000000';

// This will hold the verification ID from Firebase
let verificationCodeFromFirebase: string | null = null;

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phone: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  addXP: (amount: number) => Promise<number>;
  setupRecaptcha: (containerID: string) => Promise<void>;
  saveCredentials: (phone: string) => Promise<void>; // New function to save credentials
  getSavedCredentials: () => Promise<string | null>; // New function to retrieve credentials
}

// Create the context
const UserContext = createContext<AuthContextValue | undefined>(undefined);

// Helper function to generate a user ID
const generateUserId = () => {
  return 'user_' + Math.random().toString(36).substring(2, 15);
};

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingPhoneNumber, setPendingPhoneNumber] = useState<string | null>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  
  // Check for existing user on app load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await SecureStore.getItemAsync(USER_TOKEN_KEY);
        const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  // Save user credentials for future login
  const saveCredentials = async (phone: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(USER_CREDENTIALS_KEY, phone);
    } catch (error) {
      console.error('Error saving credentials:', error);
    }
  };
  
  // Get saved credentials
  const getSavedCredentials = async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(USER_CREDENTIALS_KEY);
    } catch (error) {
      console.error('Error retrieving credentials:', error);
      return null;
    }
  };

  // Send OTP to the user's phone
  const login = async (phone: string): Promise<void> => {
    try {
      // Save the phone number for future logins
      await saveCredentials(phone);
      
      // Store the phone number for verification later
      setPendingPhoneNumber(phone);
      
      if (!TEST_MODE) {
        // Real Firebase implementation would go here
        // const recaptchaVerifier = window.recaptchaVerifier;
        // const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
        // verificationCodeFromFirebase = confirmationResult.verificationId;
        // setVerificationId(verificationCodeFromFirebase);
      } else {
        // Test mode - just simulate sending an OTP
        console.log(`Test mode: Simulating OTP sent to ${phone}`);
        // In a real app, this would be provided by Firebase
        verificationCodeFromFirebase = 'test-verification-id';
        setVerificationId(verificationCodeFromFirebase);
      }
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  };

  // Verify OTP code
  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      // Always check for our test code
      if (otp === TEST_VERIFICATION_CODE) {
        console.log('Test verification code accepted');
      } else {
        // In test mode, accept any 6-digit code
        console.log(`Verification code entered: ${otp}`);
      }

      if (!pendingPhoneNumber) {
        throw new Error('No pending phone number');
      }

      // Get device ID for user identification
      const deviceId = await getDeviceId();

      // Generate a simple token
      const token = 'token_' + Math.random().toString(36).substring(2, 15);

      // Create or update user
      const newUser: User = {
        id: generateUserId(),
        deviceId,
        phone: pendingPhoneNumber,
        xp: 0,
        level: 1,
        createdAt: new Date(),
        lastActive: new Date(),
        hasCompletedOnboarding: false,
        preferences: {
          notifications: true,
          locationTracking: true,
          darkMode: false,
          dataSharing: {
            anonymous: true,
            identifiable: false,
          },
        },
      };

      // Save the user data and token
      await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(newUser));

      // Update state
      setUser(newUser);
      setPendingPhoneNumber(null);
      setVerificationId(null);
      verificationCodeFromFirebase = null;

      return true;
    } catch (error) {
      console.error('Error in verifyOTP:', error);
      return false;
    }
  };

  // Logout user
  const logout = async (): Promise<void> => {
    try {
      // Clear secure storage but keep credentials for easier login next time
      await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
      
      // Clear state
      setUser(null);
      setPendingPhoneNumber(null);
      setVerificationId(null);
      verificationCodeFromFirebase = null;
      
      // Sign out of Firebase
      if (!TEST_MODE) {
        await signOut(auth);
      }
    } catch (error) {
      console.error('Error in logout:', error);
      throw error;
    }
  };

  // Update user data
  const updateUser = async (userData: Partial<User>): Promise<void> => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      // Update the user object
      const updatedUser = {
        ...user,
        ...userData,
        lastActive: new Date(),
      };

      // Save to secure storage
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      console.log('User updated successfully:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  // Update user preferences
  const updatePreferences = async (preferences: Partial<UserPreferences>): Promise<void> => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      // Update the preferences
      const updatedPreferences = {
        ...user.preferences,
        ...preferences,
      };

      // Update the user object
      const updatedUser = {
        ...user,
        preferences: updatedPreferences,
        lastActive: new Date(),
      };

      // Save to secure storage
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  };

  // Mark onboarding as complete
  const completeOnboarding = async (): Promise<void> => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      // Update the user object
      const updatedUser = {
        ...user,
        hasCompletedOnboarding: true,
        lastActive: new Date(),
      };

      // Save to secure storage
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      throw error;
    }
  };

  // Add XP to user
  const addXP = async (amount: number): Promise<number> => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      const currentXP = user.xp || 0;
      const newXP = currentXP + amount;
      
      // Calculate level (simple formula: 1 level per 100 XP)
      const newLevel = Math.floor(newXP / 100) + 1;
      
      // Update the user object
      const updatedUser = {
        ...user,
        xp: newXP,
        level: newLevel,
        lastActive: new Date(),
      };

      // Save to secure storage
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      
      return newXP;
    } catch (error) {
      console.error('Error adding XP:', error);
      throw error;
    }
  };

  // Setup reCAPTCHA verification
  const setupRecaptcha = async (containerID: string): Promise<void> => {
    if (TEST_MODE) {
      console.log('Test mode: Skipping reCAPTCHA setup');
      return;
    }
    
    try {
      // Real implementation would go here
      // window.recaptchaVerifier = new RecaptchaVerifier(auth, containerID, {
      //   size: 'invisible',
      //   callback: () => {
      //     console.log('reCAPTCHA verified');
      //   },
      //   'expired-callback': () => {
      //     console.log('reCAPTCHA expired');
      //   }
      // });
      
      console.log('reCAPTCHA set up');
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      throw error;
    }
  };

  const contextValue: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    verifyOTP,
    logout,
    updateUser,
    updatePreferences,
    completeOnboarding,
    addXP,
    setupRecaptcha,
    saveCredentials,
    getSavedCredentials,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 