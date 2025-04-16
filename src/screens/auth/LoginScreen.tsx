import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { AuthScreenProps } from '../../types/navigation';
import { TextInput } from 'react-native';
import WebView from 'react-native-webview';

const LoginScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation<AuthScreenProps<'Login'>['navigation']>();
  const { login, setupRecaptcha } = useUser();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  
  // Initialize recaptcha when component mounts
  useEffect(() => {
    const initRecaptcha = async () => {
      try {
        // Wait for a bit to ensure the DOM is ready
        setTimeout(async () => {
          await setupRecaptcha('recaptcha-container');
          setRecaptchaReady(true);
        }, 1000);
      } catch (error) {
        console.error('Error initializing recaptcha:', error);
        setError('Failed to initialize security verification. Please try again.');
      }
    };
    
    initRecaptcha();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePhoneNumberChange = (text: string) => {
    // Allow only digits
    const formattedNumber = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedNumber);
    setError(null);
  };

  const validatePhoneNumber = (): boolean => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleContinue = async () => {
    if (!validatePhoneNumber()) return;
    if (!recaptchaReady) {
      setError('Please wait for security verification to load');
      return;
    }

    try {
      setIsLoading(true);
      
      // Add Canadian country code +1 if not already present
      let formattedNumber = phoneNumber;
      if (!formattedNumber.startsWith('1')) {
        formattedNumber = '1' + formattedNumber;
      }
      
      // Ensure it has the + prefix for international format
      if (!formattedNumber.startsWith('+')) {
        formattedNumber = '+' + formattedNumber;
      }
      
      console.log(`Formatted phone number: ${formattedNumber}`);
      await login(formattedNumber);
      
      // Navigate to OTP verification screen
      navigation.navigate('OTPVerification', { phoneNumber: formattedNumber });
    } catch (error: any) {
      console.error('Error during login:', error);
      setError(error.message || 'Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaContainer style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color={isDarkMode ? theme.colors.dark.text : theme.colors.text}
              />
            </TouchableOpacity>
            <Typography variant="h2" weight="bold" center>
              Login
            </Typography>
            <View style={styles.backButtonPlaceholder} />
          </View>
          
          <View style={styles.content}>
            <Card style={styles.card}>
              <Typography variant="h3" weight="medium" style={styles.title}>
                Enter your phone number
              </Typography>
              
              <Typography variant="body" style={styles.subtitle}>
                We'll send you a verification code to confirm your identity
              </Typography>
              
              <View style={styles.inputContainer}>
                <View style={styles.phoneInputContainer}>
                  <View style={[
                    styles.countryCodeContainer,
                    { 
                      borderColor: isDarkMode 
                        ? theme.colors.dark.border 
                        : theme.colors.border,
                    }
                  ]}>
                    <Typography variant="body" weight="medium">
                      +1
                    </Typography>
                  </View>
                  <TextInput
                    style={[
                      styles.input,
                      { 
                        borderColor: error 
                          ? theme.colors.error 
                          : isDarkMode 
                            ? theme.colors.dark.border 
                            : theme.colors.border,
                        color: isDarkMode ? theme.colors.dark.text : theme.colors.text,
                      },
                    ]}
                    placeholder="Phone Number (Canada)"
                    placeholderTextColor={isDarkMode ? theme.colors.dark.textTertiary : theme.colors.textTertiary}
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    maxLength={10}
                  />
                </View>
                
                <Typography variant="caption" style={styles.phoneHint}>
                  Canadian numbers only (+1). Enter 10 digits without country code.
                </Typography>
                
                {error && (
                  <Typography variant="caption" color={theme.colors.error} style={styles.errorText}>
                    {error}
                  </Typography>
                )}
              </View>
              
              {/* Invisible recaptcha container - Firebase will use this */}
              <View id="recaptcha-container" style={styles.recaptchaContainer} />
            </Card>
            
            <Typography variant="caption" style={styles.privacyText} center>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Typography>
            
            <Button
              title="Continue"
              fullWidth
              onPress={handleContinue}
              isLoading={isLoading}
              disabled={isLoading || !phoneNumber || !recaptchaReady}
              style={styles.continueButton}
            />
            
            {!recaptchaReady && (
              <Typography variant="caption" center style={styles.loadingText}>
                Preparing security verification...
              </Typography>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  card: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
    opacity: 0.7,
  },
  inputContainer: {
    marginBottom: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  input: {
    flex: 1,
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  phoneHint: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.7,
  },
  errorText: {
    marginTop: 8,
  },
  privacyText: {
    marginBottom: 24,
    opacity: 0.7,
  },
  continueButton: {
    marginBottom: 24,
  },
  recaptchaContainer: {
    width: '100%',
    height: 1,
    overflow: 'hidden',
    opacity: 0.01,
  },
  loadingText: {
    marginBottom: 16,
    opacity: 0.6,
  },
});

export default LoginScreen; 