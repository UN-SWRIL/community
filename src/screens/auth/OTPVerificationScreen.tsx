import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import SafeAreaContainer from '../../components/common/SafeAreaContainer';
import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { AuthScreenProps, AuthStackParamList } from '../../types/navigation';

type OTPVerificationScreenRouteProp = RouteProp<AuthStackParamList, 'OTPVerification'>;

const OTP_LENGTH = 6;

const OTPVerificationScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const navigation = useNavigation<AuthScreenProps<'OTPVerification'>['navigation']>();
  const route = useRoute<OTPVerificationScreenRouteProp>();
  const { verifyOTP } = useUser();
  
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState(30);

  const inputRefs = useRef<(TextInput | null)[]>(Array(OTP_LENGTH).fill(null));

  // Countdown timer for resend button
  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setTimeout(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [remainingTime]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      // Handle paste of entire OTP
      const pastedOtp = text.slice(0, OTP_LENGTH).split('');
      const newOtp = [...otp];
      
      for (let i = 0; i < pastedOtp.length; i++) {
        if (index + i < OTP_LENGTH) {
          newOtp[index + i] = pastedOtp[i];
        }
      }
      
      setOtp(newOtp);
      
      // Move focus to the end
      if (index + pastedOtp.length < OTP_LENGTH) {
        inputRefs.current[index + pastedOtp.length]?.focus();
      } else {
        inputRefs.current[OTP_LENGTH - 1]?.blur();
      }
    } else {
      // Handle typing of a single digit
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      
      // Auto-focus to next input
      if (text !== '' && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    
    setError(null);
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to move to previous input
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    // Reset the timer
    setRemainingTime(30);
    // TODO: Implement actual resend logic
    console.log('Resending code to', phoneNumber);
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== OTP_LENGTH) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    try {
      setIsLoading(true);
      const success = await verifyOTP(otpCode);
      
      if (success) {
        // Navigate to onboarding flow
        navigation.navigate('OnboardingName');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Shortcut for entering the special login code
  const handleUseTestCode = () => {
    const testCode = '000000'.split('');
    setOtp(testCode);
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
              Verification
            </Typography>
            <View style={styles.backButtonPlaceholder} />
          </View>
          
          <View style={styles.content}>
            <Card style={styles.card}>
              <Typography variant="h3" weight="medium" style={styles.title}>
                Enter verification code
              </Typography>
              
              <Typography variant="body" style={styles.subtitle}>
                We've sent a 6-digit code to {formatPhoneNumber(phoneNumber)}
              </Typography>
              
              <View style={styles.otpContainer}>
                {Array(OTP_LENGTH).fill(0).map((_, index) => (
                  <TextInput
                    key={index}
                    ref={ref => inputRefs.current[index] = ref}
                    style={[
                      styles.otpInput,
                      {
                        borderColor: error 
                          ? theme.colors.error 
                          : isDarkMode 
                            ? theme.colors.dark.border 
                            : theme.colors.border,
                        color: isDarkMode ? theme.colors.dark.text : theme.colors.text,
                      }
                    ]}
                    keyboardType="number-pad"
                    maxLength={OTP_LENGTH}
                    value={otp[index]}
                    onChangeText={text => handleOtpChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                  />
                ))}
              </View>
              
              {error && (
                <Typography variant="caption" color={theme.colors.error} style={styles.errorText} center>
                  {error}
                </Typography>
              )}
              
              <TouchableOpacity 
                onPress={handleUseTestCode}
                style={styles.testCodeButton}
              >
                <Typography 
                  variant="bodySmall" 
                  color={theme.colors.primary}
                  center
                >
                  Use test code: 000000
                </Typography>
              </TouchableOpacity>
              
              <View style={styles.resendContainer}>
                <Typography variant="bodySmall" style={styles.resendText}>
                  Didn't receive the code?
                </Typography>
                {remainingTime > 0 ? (
                  <Typography variant="bodySmall" style={styles.timerText}>
                    Resend in {remainingTime}s
                  </Typography>
                ) : (
                  <TouchableOpacity onPress={handleResendCode}>
                    <Typography 
                      variant="bodySmall" 
                      weight="medium"
                      color={theme.colors.primary}
                    >
                      Resend Code
                    </Typography>
                  </TouchableOpacity>
                )}
              </View>
            </Card>
            
            <Button
              title="Verify"
              fullWidth
              onPress={handleVerify}
              isLoading={isLoading}
              disabled={isLoading || otp.some(digit => digit === '')}
              style={styles.verifyButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

// Helper function to format phone number
const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // For Canadian numbers with country code: format as (XXX) XXX-XXXX
  if (phone.startsWith('+1') && phone.length === 12) {
    return `+1 (${phone.substring(2, 5)}) ${phone.substring(5, 8)}-${phone.substring(8)}`;
  }
  
  // For international numbers, just add a + prefix if not present
  if (!phone.startsWith('+')) {
    return `+${phone}`;
  }
  
  return phone;
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
    marginBottom: 32,
    opacity: 0.7,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 45,
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  errorText: {
    marginBottom: 16,
  },
  testCodeButton: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  resendText: {
    marginRight: 4,
    opacity: 0.7,
  },
  timerText: {
    opacity: 0.5,
  },
  verifyButton: {
    marginBottom: 24,
  },
});

export default OTPVerificationScreen; 